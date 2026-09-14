"use client";
import React from "react";
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
import type { Screen } from "./types";

interface AppDrawerProps {
  onIconClick: (screen: Screen) => void;
}

const apps: { screen: Screen; label: string; icon: React.ReactNode; bg: string }[] = [
  { screen: "calculator", label: "Calculator", icon: <FaCalculator size={20} />, bg: "#2c2c2e" },
  { screen: "clock", label: "Clock", icon: <FaRegClock size={20} />, bg: "#1c1c1e" },
  { screen: "settings", label: "Settings", icon: <FaCog size={20} />, bg: "#5b5b5e" },
  { screen: "camera", label: "Camera", icon: <FaCamera size={20} />, bg: "#3a3a3c" },
  { screen: "music", label: "Music", icon: <FaMusic size={20} />, bg: "#6b3fa0" },
  { screen: "notes", label: "Notes", icon: <FaStickyNote size={20} />, bg: "#e0b400" },
  { screen: "messages", label: "Messages", icon: <FaSms size={20} />, bg: "#2ecc71" },
  { screen: "dialer", label: "Phone", icon: <FaPhone size={20} />, bg: "#27ae60" },
  { screen: "appstore", label: "App Store", icon: <FaStore size={20} />, bg: "#0a84ff" },
  { screen: "chrome", label: "Chrome", icon: <FaChrome size={20} />, bg: "#4285F4" },
  { screen: "mibrowser", label: "Mi Browser", icon: <FaCompass size={20} />, bg: "#ff6900" },
  { screen: "gmail", label: "Gmail", icon: <FaEnvelope size={20} />, bg: "#d93025" },
  { screen: "youtube", label: "YouTube", icon: <FaYoutube size={20} />, bg: "#282828" },
];

const AppDrawer = ({ onIconClick }: AppDrawerProps) => {
  return (
    <div
      className="h-full w-full rounded-[20px]"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p
        className="pt-16 text-center text-xs uppercase tracking-wide text-white/60"
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
      >
        More apps
      </p>
      <div className="absolute inset-x-0 bottom-20 top-24 overflow-y-auto px-2">
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {apps.map((app) => (
            <div
              key={app.screen}
              className="flex flex-col items-center"
              onClick={() => onIconClick(app.screen)}
            >
              <div
                className="flex h-[45px] w-[45px] items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: app.bg }}
              >
                {app.icon}
              </div>
              <span
                className="text-center text-xs text-white"
                style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "11px" }}
              >
                {app.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppDrawer;
