"use client";
import React from "react";
import { FaYoutube } from "react-icons/fa";

interface Video {
  title: string;
  channel: string;
  views: string;
  gradient: string;
}

const videos: Video[] = [
  {
    title: "Building a Face Liveness Detector in React Native",
    channel: "Sarhane Ghribi",
    views: "2.1K views",
    gradient: "linear-gradient(160deg, #1f1f1f, #3a3a3a)",
  },
  {
    title: "I built a solar system in Three.js from scratch",
    channel: "Sarhane Ghribi",
    views: "4.7K views",
    gradient: "linear-gradient(160deg, #05050f, #1a1a3a)",
  },
  {
    title: "From Business Manager to Full-Stack Developer",
    channel: "Sarhane Ghribi",
    views: "8.3K views",
    gradient: "linear-gradient(160deg, #f0a3f0, #8b6cf2)",
  },
  {
    title: "NestJS + Stripe: a loyalty platform backend",
    channel: "Sarhane Ghribi",
    views: "1.5K views",
    gradient: "linear-gradient(160deg, #37c98f, #1c1c1e)",
  },
];

const YouTube = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-black pb-6 pt-8">
      <div className="flex items-center gap-2 px-4 pb-4">
        <FaYoutube size={22} className="text-red-600" />
        <span className="text-sm font-semibold text-white">YouTube</span>
      </div>

      <div className="space-y-4 px-4">
        {videos.map((video) => (
          <div key={video.title} className="space-y-1.5">
            <div
              className="flex h-28 w-full items-center justify-center rounded-lg"
              style={{ background: video.gradient }}
            >
              <FaYoutube size={24} className="text-white/30" />
            </div>
            <p className="text-sm leading-snug text-white">{video.title}</p>
            <p className="text-xs text-gray-400">
              {video.channel} · {video.views}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTube;
