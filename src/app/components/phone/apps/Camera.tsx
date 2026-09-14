"use client";
import React, { useState } from "react";
import { FaCamera, FaSyncAlt, FaBolt } from "react-icons/fa";

const Camera = () => {
  const [flash, setFlash] = useState(false);

  function takePhoto() {
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-black">
      {flash && <div className="absolute inset-0 z-20 bg-white" />}

      <div className="flex items-center justify-between px-6 pt-6 text-white/80">
        <FaBolt size={16} />
        <span className="text-xs">Photo</span>
        <FaSyncAlt size={16} />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="h-3/4 w-[85%] rounded-lg bg-gradient-to-br from-gray-800 to-black" />
      </div>

      <div className="flex items-center justify-between px-8 pb-8">
        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-gray-600 to-gray-800" />
        <button
          onClick={takePhoto}
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/80 active:scale-95"
          aria-label="Take photo"
        >
          <span className="h-12 w-12 rounded-full bg-white" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center text-white/60">
          <FaCamera size={20} />
        </div>
      </div>
    </div>
  );
};

export default Camera;
