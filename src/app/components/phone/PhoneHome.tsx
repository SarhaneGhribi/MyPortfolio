import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { Screen } from "./types";

interface PhoneHomeProps {
  onIconClick: (screen: Screen) => void;
}

const PhoneHome = ({ onIconClick }: PhoneHomeProps) => {
  const [location, setLocation] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const iconSize: number = 45;

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

  // Reverse-geocode the city name via BigDataCloud's free, keyless client-side
  // API — no API key needed, so nothing to leak in the client bundle.
  const fetchLocation = async (latitude: number, longitude: number) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLocation(data.city || data.locality || "Location not found");
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLocation("Location not found");
    }
  };

  // Fetch weather data from OpenWeatherMap
  const fetchWeather = async (latitude: number, longitude: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(data.current_weather.temperature);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  const openProfile = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="h-full w-full overflow-hidden rounded-[20px]"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
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
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              GitHub
            </span>
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
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              LinkedIn
            </span>
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
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              AvatarID
            </span>
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
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              TicTacToe
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/space.jpg"
              alt="Explore"
              width={iconSize}
              height={iconSize}
              className="rounded-lg"
              onClick={() => onIconClick("space")}
            />
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              Explore
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/meduim.png"
              alt="Medium"
              width={iconSize}
              height={iconSize}
              className="rounded-lg"
              onClick={() => openProfile("https://medium.com/@sarhane.ghribi")}
            />
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              Medium
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/npm.png"
              alt="NPM"
              width={iconSize}
              height={iconSize}
              className="rounded-lg"
              onClick={() =>
                openProfile("https://www.npmjs.com/~sarhaneghribi")
              }
            />
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              Npm
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/filemanager.png"
              alt="Folder Browser"
              width={iconSize}
              height={iconSize}
              className="rounded-lg"
              onClick={() => onIconClick("folder")}
            />
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              Files
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/yeiza-icon.png"
              alt="Yeiza"
              width={iconSize}
              height={iconSize}
              className="rounded-lg"
              onClick={() => onIconClick("yeiza")}
            />
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
            >
              Yeiza
            </span>
          </div>
        </div>
    </div>
  );
};

export default PhoneHome;
