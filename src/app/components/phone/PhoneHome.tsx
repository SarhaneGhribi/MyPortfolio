import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

interface PhoneHomeProps {
  onIconClick: (screen: "home" | "tictactoe" | "avatarid" | "folder") => void;
}

const PhoneHome = ({ onIconClick }: PhoneHomeProps) => {
  const [location, setLocation] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const iconSize: number = 45;
  const openCageApiKey = "ad11634efa4d4752b7c345ffaec3f03a"; // Replace with your OpenCage API key

  // Get user's current location and weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude);
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

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch location name using OpenCage API
  const fetchLocation = async (latitude: number, longitude: number) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocation(data.results[0].components.city);
      } else {
        setLocation("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  // Fetch weather data from OpenWeatherMap
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

  // Function to determine if it's daytime or nighttime
  const isDaytime = (): boolean => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18; // Daytime is from 6 AM to 6 PM
  };

  // Function to get weather image based on weather code and time of day
  const getWeatherImage = () => {
    if (loading) return null;

    const daytime = isDaytime();
    const weatherIconMap: Record<number, string> = {
      0: daytime ? "/sunny.png" : "/moon.png", // Clear sky
      1: daytime ? "/sunny.png" : "/moon.png", // Mainly clear
      2: daytime ? "/cloudy.png" : "/cloudy-night.png", // Partly cloudy
      3: daytime ? "/cloudy.png" : "/cloudy-night.png", // Cloudy
      4: daytime ? "/overcast.png" : "/cloudy-night.png", // Overcast
      5: "/rain.png", // Rain
      6: "/snow.png", // Snow
      7: "/thunderstorm.png", // Thunderstorm
    };

    return (
      <Image
        src={weatherIconMap[weatherCode ?? 0]}
        alt="Weather Icon"
        width={iconSize}
        height={iconSize}
      />
    );
  };

  const openProfile = (url: string) => {
    window.open(url, "_blank");
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
      }}
    >
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
      <div className="absolute top-10 left-4 text-white text-lg">
        <p className="text-4xl">{time}</p>
        <p className="text-xs">{formattedDate}</p>
      </div>
      <div className="absolute bottom-20 left-0 right-0 grid grid-cols-4 gap-3">
        <div
          className="flex flex-col items-center"
          onClick={() => openProfile("https://github.com/SarhaneGhribi")}
        >
          <Image
            src="/github.png"
            alt="GitHub"
            width={iconSize}
            height={iconSize}
            className="rounded-lg"
          />
          <span className="text-xs" style={{ fontFamily: 'Roboto, sans-serif',fontSize:"11px" }}>GitHub</span>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => openProfile("https://linkedin.com/in/sarhaneghribi")}
        >
          <Image
            src="/linkedin.png"
            alt="LinkedIn"
            width={iconSize}
            height={iconSize}
            className="rounded-lg"
          />
          <span className="text-xs" style={{ fontFamily: 'Roboto, sans-serif',fontSize:"11px" }}>LinkedIn</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/AvatarID.png"
            alt="Camera"
            width={iconSize}
            height={iconSize}
            className="rounded-lg"
            onClick={() => onIconClick("avatarid")}
          />
          <span className="text-xs" style={{ fontFamily: 'Roboto, sans-serif',fontSize:"11px" }}>AvatarID</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/tictactoe.png"
            alt="Tic Tac Toe"
            width={iconSize}
            height={iconSize}
            className="rounded-lg bg-white"
            onClick={() => onIconClick("tictactoe")}
          />
          <span className="text-xs" style={{ fontFamily: 'Roboto, sans-serif',fontSize:"11px" }}>TicTacToe</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/filemanager.png"
            alt="Folder Browser"
            width={iconSize}
            height={iconSize}
            className="rounded-lg"
          />
          <span className="text-xs" style={{ fontFamily: 'Roboto, sans-serif',fontSize:"11px" }}>Files</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default PhoneHome;
