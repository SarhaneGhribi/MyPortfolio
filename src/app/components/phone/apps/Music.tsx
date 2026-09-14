"use client";
import React, { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaMusic,
  FaHeart,
} from "react-icons/fa";

const playlist = [
  { title: "Focus Flow", artist: "Lo-Fi Beats", color: "#6b6ef2" },
  { title: "Late Night Debugging", artist: "Synthwave Sessions", color: "#f2766b" },
  { title: "Ship It", artist: "Deploy Friday", color: "#37c98f" },
];

const TRACK_LENGTH = 30; // seconds, purely for the fake progress bar

const Music = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const track = playlist[trackIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= TRACK_LENGTH ? 0 : p + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  function changeTrack(direction: 1 | -1) {
    setTrackIndex((i) => (i + direction + playlist.length) % playlist.length);
    setProgress(0);
  }

  const minutes = Math.floor(progress / 60);
  const seconds = (progress % 60).toString().padStart(2, "0");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-black to-gray-900 px-6">
      <div
        className="flex h-40 w-40 items-center justify-center rounded-2xl shadow-lg"
        style={{ background: `linear-gradient(160deg, ${track.color}, #000)` }}
      >
        <FaMusic size={40} className="text-white/80" />
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-white">{track.title}</p>
        <p className="text-sm text-gray-400">{track.artist}</p>
      </div>

      <div className="w-full">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${(progress / TRACK_LENGTH) * 100}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>
            {minutes}:{seconds}
          </span>
          <span>0:{TRACK_LENGTH}</span>
        </div>
      </div>

      <div className="flex items-center gap-8 text-white">
        <button onClick={() => changeTrack(-1)} aria-label="Previous track">
          <FaStepBackward size={18} />
        </button>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="ml-0.5" />}
        </button>
        <button onClick={() => changeTrack(1)} aria-label="Next track">
          <FaStepForward size={18} />
        </button>
      </div>

      <FaHeart size={14} className="text-gray-600" />
    </div>
  );
};

export default Music;
