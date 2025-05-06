import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import { useAppStore } from "@/app/utilities/store";
import { motion } from "framer-motion";
import GestureHandler from "./GestureHandler";

interface PhoneHomeProps {
  onIconClick: (
    screen: "home" | "tictactoe" | "avatarid" | "folder" | "space" | "medium"
  ) => void;
  showTaskSwitcher: boolean;
  setShowTaskSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IconData {
  id: string;
  src: string;
  alt: string;
  label: string;
  action: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  app: string;
  time: string;
  icon: string;
}

const PhoneHome = ({ onIconClick, showTaskSwitcher, setShowTaskSwitcher }: PhoneHomeProps) => {
  const [location, setLocation] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [batteryLevel, setBatteryLevel] = useState<number>(82);
  const [isWifiConnected, setIsWifiConnected] = useState<boolean>(true);
  const [isMobileDataActive, setIsMobileDataActive] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const iconSize: number = 45;

  // App state management
  const { openApps, activeApp, addOpenApp, setActiveApp, closeApp, closeAllApps } = useAppStore();

  // Drag and drop states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedIconId, setDraggedIconId] = useState<string | null>(null);
  const [icons, setIcons] = useState<IconData[]>([]);
  const draggedIcon = useRef<HTMLDivElement | null>(null);
  const iconPositions = useRef<Map<string, { x: number, y: number }>>(new Map());
  const [isPressed, setIsPressed] = useState({
    isPressed: false,
    icon: "",
  });

  // Animation state
  const [expandingApp, setExpandingApp] = useState<{
    isExpanding: boolean;
    appId: string | null;
    position: { x: number; y: number; width: number; height: number } | null;
  }>({
    isExpanding: false,
    appId: null,
    position: null,
  });

  // Refs for measuring card positions
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // When an app icon is clicked
  const handleAppOpen = (appId: string, appName: string, appIcon: string) => {
    addOpenApp({
      id: appId,
      name: appName,
      icon: appIcon,
    });
    setActiveApp(appId);
    setShowTaskSwitcher(false);
    onIconClick(appId as any);
  };

  // Handle opening app from task switcher with animation
  const handleOpenFromSwitcher = (appId: string, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setExpandingApp({
      isExpanding: true,
      appId: appId,
      position: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      },
    });

    setTimeout(() => {
      setActiveApp(appId);
      setShowTaskSwitcher(false);
      onIconClick(appId as any);
      setTimeout(() => {
        setExpandingApp({
          isExpanding: false,
          appId: null,
          position: null,
        });
      }, 300);
    }, 300);
  };

  // Initialize icons and notifications
  useEffect(() => {
    const openProfile = (url: string) => {
      window.open(url, "_blank");
    };

    setIcons([
      {
        id: "github",
        src: "/github.png",
        alt: "GitHub",
        label: "GitHub",
        action: () => openProfile("https://github.com/SarhaneGhribi")
      },
      {
        id: "linkedin",
        src: "/linkedin.png",
        alt: "LinkedIn",
        label: "LinkedIn",
        action: () => openProfile("https://linkedin.com/in/sarhaneghribi")
      },
      {
        id: "avatarid",
        src: "/AvatarID.png",
        alt: "Camera",
        label: "AvatarID",
        action: () => handleAppOpen("avatarid", "AvatarID", "/AvatarID.png")
      },
      {
        id: "tictactoe",
        src: "/tictactoe.png",
        alt: "Tic Tac Toe",
        label: "TicTacToe",
        action: () => handleAppOpen("tictactoe", "Tic Tac Toe", "/tictactoe.png")
      },
      {
        id: "space",
        src: "/space.jpg",
        alt: "Explore",
        label: "Explore",
        action: () => handleAppOpen("space", "Space Explorer", "/space.jpg")
      },
      {
        id: "medium",
        src: "/meduim.png",
        alt: "Medium",
        label: "Medium",
        action: () => openProfile("https://medium.com/@sarhane.ghribi")
      },
      {
        id: "npm",
        src: "/npm.png",
        alt: "NPM",
        label: "Npm",
        action: () => openProfile("https://www.npmjs.com/~sarhaneghribi")
      },
      {
        id: "files",
        src: "/filemanager.png",
        alt: "Folder Browser",
        label: "Files",
        action: () => handleAppOpen("folder", "File Manager", "/filemanager.png")
      }
    ]);

    // Simulate some notifications
    setNotifications([
      {
        id: 1,
        title: "New Message",
        message: "You have a new message from Sarhane",
        app: "Messages",
        time: "10:30 AM",
        icon: "/message-icon.png"
      },
      {
        id: 2,
        title: "Weather Update",
        message: "Rain expected later today",
        app: "Weather",
        time: "9:45 AM",
        icon: "/weather-icon.png"
      },
      {
        id: 3,
        title: "GitHub",
        message: "New commit to repository",
        app: "GitHub",
        time: "Yesterday",
        icon: "/github.png"
      }
    ]);

    // Simulate battery drain over time
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(prev - 0.1, 10));
    }, 60000);

    return () => clearInterval(batteryInterval);
  }, [onIconClick]);

  // Get user's current location and weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation();
        fetchWeather(latitude, longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
      const dayOfWeek = now.toLocaleString("en-US", { weekday: "short" });
      const dayOfMonth = now.getDate();
      const month = now.toLocaleString("en-US", { month: "long" });
      setFormattedDate(`${dayOfWeek}, ${dayOfMonth} ${month}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch location name
  const fetchLocation = async () => {
    try {
      const response = await fetch('https://ipwho.is/');
      const data = await response.json();
      setLocation(data.city);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };  

  // Fetch weather data
  const fetchWeather = async (latitude: number, longitude: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();      
      setTemperature(data.current_weather.temperature);
      setWeatherCode(data.current_weather.weathercode);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  // Toggle task switcher
  const toggleTaskSwitcher = () => {
    setShowTaskSwitcher(!showTaskSwitcher);
    setShowNotifications(false);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setIsDragging(true);
    setDraggedIconId(id);
    draggedIcon.current = e.currentTarget;
    
    const img = document.createElement('img');
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
    
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDragging || !draggedIcon.current) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    const iconsContainer = document.getElementById("icons-container");
    if (iconsContainer) {
      const iconElements = Array.from(iconsContainer.querySelectorAll(".icon-wrapper"));
      
      for (const iconEl of iconElements) {
        if (iconEl.id === `icon-${draggedIconId}`) continue;
        
        const rect = iconEl.getBoundingClientRect();
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          const targetId = iconEl.id.replace("icon-", "");
          
          setIcons((prevIcons) => {
            const newIcons = [...prevIcons];
            const draggedIndex = newIcons.findIndex((icon) => icon.id === draggedIconId);
            const targetIndex = newIcons.findIndex((icon) => icon.id === targetId);
            
            if (draggedIndex !== -1 && targetIndex !== -1) {
              const [draggedIcon] = newIcons.splice(draggedIndex, 1);
              newIcons.splice(targetIndex, 0, draggedIcon);
            }
            
            return newIcons;
          });
          
          break;
        }
      }
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setDraggedIconId(null);
    
    if (draggedIcon.current) {
      draggedIcon.current.style.opacity = "1";
      draggedIcon.current = null;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (draggedIconId === targetId) return;
    
    setIcons((prevIcons) => {
      const newIcons = [...prevIcons];
      const draggedIndex = newIcons.findIndex((icon) => icon.id === draggedIconId);
      const targetIndex = newIcons.findIndex((icon) => icon.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [draggedIcon] = newIcons.splice(draggedIndex, 1);
        newIcons.splice(targetIndex, 0, draggedIcon);
      }
      
      return newIcons;
    });
  };

  const handleIconClick = (action: () => void) => {
    if (!isDragging) {
      action();
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        style={{
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "95%",
          width: "90%",
          position: "absolute",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-8 bg-black bg-opacity-30 flex justify-between items-center px-4 text-white text-xs z-50">
          <div className="flex items-center">
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            {isMobileDataActive && (
              <Image src="/cellular.png" alt="Mobile Data" width={16} height={16} />
            )}
            {isWifiConnected && (
              <Image src="/wifi.png" alt="WiFi" width={16} height={16} />
            )}
            <div className="flex items-center">
              <Image src="/battery.png" alt="Battery" width={16} height={16} />
              <span className="ml-1">{batteryLevel.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {showNotifications && (
          <div className="absolute top-8 left-0 right-0 bg-black bg-opacity-80 text-white z-40 p-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Notifications</h3>
              <button 
                onClick={clearNotifications}
                className="text-blue-400 text-sm"
              >
                Clear All
              </button>
            </div>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className="mb-3 p-2 bg-gray-800 rounded-lg">
                  <div className="flex items-start">
                    <Image 
                      src={notification.icon} 
                      alt={notification.app} 
                      width={32} 
                      height={32} 
                      className="mr-2"
                    />
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-bold">{notification.title}</h4>
                        <span className="text-gray-400 text-xs">{notification.time}</span>
                      </div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.app}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-4">No notifications</p>
            )}
          </div>
        )}

        {showTaskSwitcher && (
          <div className="absolute inset-0 bg-black/90 z-30 flex flex-col backdrop-blur-sm">
            <div className="flex justify-between items-center p-4 pt-6">
              <h2 className="text-white text-xl font-semibold">Recent Apps</h2>
              <button 
                onClick={toggleTaskSwitcher}
                className="text-gray-300 hover:text-white transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-3 p-4 overflow-y-auto">
              {openApps.map((app, index) => (
                <motion.div 
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className={`relative aspect-square bg-gray-700/80 rounded-xl flex flex-col items-center justify-center p-2 ${
                    isPressed.icon === String(index) ? 'ring-2 ring-blue-500 bg-gray-600/80' : ''
                  }`}
                  onClick={() => setIsPressed({isPressed:!isPressed.isPressed, icon: String(index)})}
                >
                  <div className="relative w-16 h-16 mb-2">
                    <Image 
                      src={app.icon} 
                      alt={app.name} 
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                  
                  <span className="text-white text-xs font-medium text-center px-1 truncate w-full">
                    {app.name}
                  </span>
                  
                  {isPressed.icon === String(index) && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-1 left-1 right-1 flex space-x-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenFromSwitcher(app.id, index);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] flex-1 flex items-center justify-center transition-colors"
                      >
                        Open
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          closeApp(String(index));
                          setIsPressed({isPressed:false, icon: ''});
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-[10px] flex-1 flex items-center justify-center transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700/50">
              <button 
                onClick={() => {
                  closeAllApps();
                  toggleTaskSwitcher();
                }}
                className="text-red-400 hover:text-red-300 text-sm flex items-center justify-center w-full py-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Close All Apps
              </button>
            </div>
          </div>
        )}

        {/* Expanding App Animation */}
        {expandingApp.isExpanding && expandingApp.position && (
          <motion.div
            className="fixed bg-gray-900 z-50 rounded-xl overflow-hidden"
            initial={{
              x: expandingApp.position.x,
              y: expandingApp.position.y,
              width: expandingApp.position.width,
              height: expandingApp.position.height,
            }}
            animate={{
              x: 0,
              y: 0,
              width: '100%',
              height: '100%',
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            style={{
              originX: expandingApp.position.x / window.innerWidth,
              originY: expandingApp.position.y / window.innerHeight,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
              >
                <Image 
                  src={icons.find(icon => icon.id === expandingApp.appId)?.src || ''}
                  alt="App"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        {!showTaskSwitcher && !expandingApp.isExpanding && (
          <div className="pt-8 h-full">
            <div className="mt-60 w-full flex justify-center mb-4">
              <form
                action="https://www.google.com/search"
                method="GET"
                className="flex w-5/6 bg-gray-500 rounded-2xl overflow-hidden shadow-md"
              >
                <div className="flex items-center">
                  <Image
                    src="/google-logo.png"
                    alt="Google Logo"
                    width={36}
                    height={36}
                    className="ml-2"
                  />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder=""
                  className="flex-grow px-4 py-2 text-sm border-none outline-none bg-transparent"
                />
              </form>
            </div>

            {/* Weather Information */}
            <div className="absolute top-10 right-4 text-white">
              {loading ? (
                <p>Loading weather...</p>
              ) : (
                <>
                  <p>{location}</p>
                  <p>
                    {temperature ? `${temperature}°C` : "Temperature not available"}
                  </p>
                </>
              )}
            </div>
            
            {/* Icon Grid */}
            <div 
              id="icons-container" 
              className="absolute bottom-20 left-0 right-0 grid grid-cols-4 gap-3 px-4"
            >
              {icons.map(icon => (
                <div
                  key={icon.id}
                  id={`icon-${icon.id}`}
                  className="flex flex-col items-center icon-wrapper transition-all duration-300"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, icon.id)}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, icon.id)}
                  onClick={() => handleIconClick(icon.action)}
                  style={{
                    cursor: "move",
                    zIndex: draggedIconId === icon.id ? 100 : 1
                  }}
                >
                  <div className={`icon-image-container ${draggedIconId === icon.id ? 'opacity-50' : ''}`}>
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={iconSize}
                      height={iconSize}
                      className={`rounded-lg ${icon.id === "tictactoe" ? "bg-white" : ""}`}
                    />
                  </div>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "11px" }}
                  >
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PhoneHome;