"use client";
import React, { useState } from "react";
import Image from "next/image";
import PhoneHome from "./PhoneHome";
import TicTacToe from "./apps/TicTacToe";
import AvatarID from "./apps/avatarid/AvatarID";
import Folder from "./apps/folder/Folder";
import Space from "./apps/space/Space";
import Medium from "./apps/medium/Medium";
function PhoneFrame() {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "tictactoe" | "avatarid" | "folder" | "space" | "medium"
  >("home");
  return (
    <div className="relative w-[300px] h-[640px] rounded-lg overflow-hidden cursor-pointer">
      <Image
        src="/xiaomi12-5g.png"
        alt="bg frame"
        layout="fill"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
        {currentScreen === "home" && (
          <PhoneHome onIconClick={setCurrentScreen} />
        )}
        {currentScreen === "tictactoe" && <TicTacToe />}
        {currentScreen === "avatarid" && <AvatarID />}
        {currentScreen === "folder" && <Folder />}
        {currentScreen === "space" && <Space />}
        <div
          className="absolute bottom-8 flex justify-center items-center space-x-12"
          onClick={() => setCurrentScreen("home")}
        >
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
            <div className="absolute w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
          </div>
          <div
            className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-gray-300 "
            onClick={() => setCurrentScreen("home")}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PhoneFrame;
