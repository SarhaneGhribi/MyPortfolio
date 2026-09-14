"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  FaCalculator,
  FaRegClock,
  FaCog,
  FaCamera,
  FaMusic,
  FaStickyNote,
  FaSms,
  FaPhone,
  FaStore,
  FaChrome,
  FaCompass,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";
import HomeScreens from "./HomeScreens";
import type { AppScreen, Screen } from "./types";

// Every app below is only ever needed once its icon is tapped, so each is
// its own lazily-loaded chunk instead of being bundled into the initial
// page load — this matters most for Space (three.js) and AvatarID
// (@mediapipe/tasks-vision), both sizeable libraries most visitors will
// never actually open.
const loading = () => <div className="h-full w-full bg-black" />;
const TicTacToe = dynamic(() => import("./apps/TicTacToe"), { loading });
const AvatarID = dynamic(() => import("./apps/avatarid/AvatarID"), { loading });
const Folder = dynamic(() => import("./apps/folder/Folder"), { loading });
const Space = dynamic(() => import("./apps/space/Space"), { loading, ssr: false });
const Yeiza = dynamic(() => import("./apps/yeiza/Yeiza"), { loading });
const Calculator = dynamic(() => import("./apps/Calculator"), { loading });
const Clock = dynamic(() => import("./apps/Clock"), { loading });
const Settings = dynamic(() => import("./apps/Settings"), { loading });
const Camera = dynamic(() => import("./apps/Camera"), { loading });
const Music = dynamic(() => import("./apps/Music"), { loading });
const Notes = dynamic(() => import("./apps/Notes"), { loading });
const Messages = dynamic(() => import("./apps/Messages"), { loading });
const Dialer = dynamic(() => import("./apps/Dialer"), { loading });
const AppStore = dynamic(() => import("./apps/AppStore"), { loading });
const Browser = dynamic(() => import("./apps/Browser"), { loading });
const Gmail = dynamic(() => import("./apps/Gmail"), { loading });
const YouTube = dynamic(() => import("./apps/YouTube"), { loading });

const APP_META: Record<AppScreen, { label: string; gradient: string; iconNode: React.ReactNode }> = {
  tictactoe: {
    label: "TicTacToe",
    gradient: "linear-gradient(160deg, #27B3F0, #e3f2fd)",
    iconNode: (
      <Image src="/tictactoe.png" alt="TicTacToe" width={28} height={28} className="rounded-md" />
    ),
  },
  avatarid: {
    label: "AvatarID",
    gradient: "linear-gradient(160deg, #1f1f1f, #3a3a3a)",
    iconNode: (
      <Image src="/AvatarID.png" alt="AvatarID" width={28} height={28} className="rounded-md" />
    ),
  },
  folder: {
    label: "Files",
    gradient: "linear-gradient(160deg, #2c2c2c, #4a4a4a)",
    iconNode: (
      <Image src="/filemanager.png" alt="Files" width={28} height={28} className="rounded-md" />
    ),
  },
  space: {
    label: "Explore",
    gradient: "linear-gradient(160deg, #05050f, #1a1a3a)",
    iconNode: (
      <Image src="/space.jpg" alt="Explore" width={28} height={28} className="rounded-md" />
    ),
  },
  yeiza: {
    label: "Yeiza",
    gradient: "linear-gradient(160deg, #f0a3f0, #dd8fe0)",
    iconNode: (
      <Image src="/yeiza-icon.png" alt="Yeiza" width={28} height={28} className="rounded-md" />
    ),
  },
  calculator: {
    label: "Calculator",
    gradient: "linear-gradient(160deg, #3a3a3c, #1c1c1e)",
    iconNode: <FaCalculator size={20} className="text-white" />,
  },
  clock: {
    label: "Clock",
    gradient: "linear-gradient(160deg, #1c1c1e, #000000)",
    iconNode: <FaRegClock size={20} className="text-white" />,
  },
  settings: {
    label: "Settings",
    gradient: "linear-gradient(160deg, #6b6b6e, #3a3a3c)",
    iconNode: <FaCog size={20} className="text-white" />,
  },
  camera: {
    label: "Camera",
    gradient: "linear-gradient(160deg, #3a3a3c, #000000)",
    iconNode: <FaCamera size={20} className="text-white" />,
  },
  music: {
    label: "Music",
    gradient: "linear-gradient(160deg, #6b3fa0, #1c1c1e)",
    iconNode: <FaMusic size={20} className="text-white" />,
  },
  notes: {
    label: "Notes",
    gradient: "linear-gradient(160deg, #ffd84d, #e0b400)",
    iconNode: <FaStickyNote size={20} className="text-white" />,
  },
  messages: {
    label: "Messages",
    gradient: "linear-gradient(160deg, #2ecc71, #1c1c1e)",
    iconNode: <FaSms size={20} className="text-white" />,
  },
  dialer: {
    label: "Phone",
    gradient: "linear-gradient(160deg, #27ae60, #145a32)",
    iconNode: <FaPhone size={20} className="text-white" />,
  },
  appstore: {
    label: "App Store",
    gradient: "linear-gradient(160deg, #0a84ff, #1c1c1e)",
    iconNode: <FaStore size={20} className="text-white" />,
  },
  chrome: {
    label: "Chrome",
    gradient: "linear-gradient(160deg, #4285F4, #ffffff)",
    iconNode: <FaChrome size={20} className="text-white" />,
  },
  mibrowser: {
    label: "Mi Browser",
    gradient: "linear-gradient(160deg, #ff6900, #ffffff)",
    iconNode: <FaCompass size={20} className="text-white" />,
  },
  gmail: {
    label: "Gmail",
    gradient: "linear-gradient(160deg, #d93025, #ffffff)",
    iconNode: <FaEnvelope size={20} className="text-white" />,
  },
  youtube: {
    label: "YouTube",
    gradient: "linear-gradient(160deg, #ff0000, #282828)",
    iconNode: <FaYoutube size={20} className="text-white" />,
  },
};

const SWIPE_UP_THRESHOLD = 30;

function PhoneFrame() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [recentApps, setRecentApps] = useState<AppScreen[]>([]);
  const [showRecents, setShowRecents] = useState(false);
  const navPointerStartY = useRef<number | null>(null);
  const navPointerAction = useRef<string | null>(null);

  function openApp(screen: Screen) {
    setShowRecents(false);
    setCurrentScreen(screen);
    if (screen !== "home" && screen !== "medium") {
      setRecentApps((prev) => [screen, ...prev.filter((s) => s !== screen)]);
    }
  }

  function switchToRecent(screen: AppScreen) {
    setShowRecents(false);
    setCurrentScreen(screen);
    setRecentApps((prev) => [screen, ...prev.filter((s) => s !== screen)]);
  }

  function dismissRecent(screen: AppScreen) {
    setRecentApps((prev) => prev.filter((s) => s !== screen));
  }

  function handleNavPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Capture the pointer so drag/release keeps targeting this nav bar even
    // once the finger/cursor moves up over the app content above it —
    // without this, releasing outside the (fairly small) nav strip fires a
    // click on whatever app icon happens to be underneath instead.
    e.currentTarget.setPointerCapture(e.pointerId);
    navPointerStartY.current = e.clientY;
    const target = (e.target as HTMLElement).closest("[data-nav-action]");
    navPointerAction.current = target?.getAttribute("data-nav-action") ?? null;
  }

  function handleNavPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const startY = navPointerStartY.current;
    const action = navPointerAction.current;
    navPointerStartY.current = null;
    navPointerAction.current = null;
    if (startY === null) return;

    if (startY - e.clientY > SWIPE_UP_THRESHOLD) {
      setShowRecents(true);
      return;
    }

    if (action === "recents") {
      setShowRecents(true);
    } else if (action === "back" && showRecents) {
      setShowRecents(false);
    } else {
      setShowRecents(false);
      setCurrentScreen("home");
    }
  }

  return (
    <div className="relative w-[300px] h-[640px] rounded-lg overflow-hidden cursor-pointer">
      <Image
        src="/xiaomi12-5g.png"
        alt="bg frame"
        fill
        sizes="300px"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
        {currentScreen === "home" && <HomeScreens onIconClick={openApp} />}
        {currentScreen === "tictactoe" && <TicTacToe />}
        {currentScreen === "avatarid" && <AvatarID />}
        {currentScreen === "folder" && <Folder />}
        {currentScreen === "space" && <Space />}
        {currentScreen === "yeiza" && <Yeiza />}
        {currentScreen === "calculator" && <Calculator />}
        {currentScreen === "clock" && <Clock />}
        {currentScreen === "settings" && <Settings />}
        {currentScreen === "camera" && <Camera />}
        {currentScreen === "music" && <Music />}
        {currentScreen === "notes" && <Notes />}
        {currentScreen === "messages" && <Messages />}
        {currentScreen === "dialer" && <Dialer />}
        {currentScreen === "appstore" && <AppStore onIconClick={openApp} />}
        {currentScreen === "chrome" && <Browser variant="chrome" />}
        {currentScreen === "mibrowser" && <Browser variant="mibrowser" />}
        {currentScreen === "gmail" && <Gmail />}
        {currentScreen === "youtube" && <YouTube />}

        {showRecents && (
          <div
            className="absolute inset-0 z-20 flex flex-col justify-center gap-3 bg-black/85 px-4 backdrop-blur-sm"
            onClick={() => setShowRecents(false)}
          >
            <p className="text-center text-xs uppercase tracking-wide text-gray-400">
              Recent apps
            </p>
            {recentApps.length === 0 ? (
              <p className="text-center text-sm text-gray-400">
                No recent apps
              </p>
            ) : (
              <div
                className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-2"
                onClick={(e) => e.stopPropagation()}
              >
                {recentApps.map((app) => (
                  <div
                    key={app}
                    className="relative h-56 w-32 flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-xl shadow-lg"
                    style={{ background: APP_META[app].gradient }}
                    onClick={() => switchToRecent(app)}
                  >
                    <button
                      className="absolute right-1 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissRecent(app);
                      }}
                      aria-label={`Close ${APP_META[app].label}`}
                    >
                      ×
                    </button>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-black/40 py-2">
                      {APP_META[app].iconNode}
                      <span className="text-[10px] text-white">
                        {APP_META[app].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 z-30 flex h-20 items-end justify-center space-x-12 pb-8"
          onPointerDown={handleNavPointerDown}
          onPointerUp={handleNavPointerUp}
        >
          <div
            className="h-5 w-5 rounded bg-gray-300"
            data-nav-action="recents"
          ></div>
          <div
            className="relative flex items-center justify-center"
            data-nav-action="home"
          >
            <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
            <div className="absolute h-3.5 w-3.5 rounded-full bg-gray-300"></div>
          </div>
          <div
            className="h-0 w-0 border-y-[10px] border-r-[12px] border-y-transparent border-r-gray-300"
            data-nav-action="back"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PhoneFrame;
