import React from "react";
import Image from "next/image";

interface PhoneHomeProps {
  onIconClick: (screen: "home" | "tictactoe" | "avatarid" | "folder") => void;
}
function PhoneHome({ onIconClick }: PhoneHomeProps) {
  const openProfile = (url: string) => {
    window.open(url, "_blank");
  };
  const iconSize: number = 45;
  return (
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
          className="flex w-4/5 bg-gray rounded-lg overflow-hidden shadow-md"
        >
          <input
            type="text"
            name="q"
            placeholder=""
            className="flex-grow px-4 py-2 text-sm border-none outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 text-sm hover:bg-blue-600"
          >
            Search
          </button>
        </form>
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
          <span className="text-sm text-gray-700">GitHub</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => openProfile("https://linkedin.com/in/sarhaneghribi")}
        >
          <Image
            src="/linkedin.png"
            alt="LinkedIn"
            width={iconSize}
            height={iconSize}
            className="rounded-lg"
          />
          <span className="text-sm text-gray-700">LinkedIn</span>
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
          <span className="text-sm text-gray-700">AvatarID</span>
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
          <span className="text-sm text-gray-700">TicTacToe</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/filemanager.png"
            alt="Folder Browser"
            width={iconSize}
            height={iconSize}
            className="rounded-lg"
          />
          <span className="text-sm text-gray-700">Files</span>
        </div>
      </div>
    </div>
  );
}

export default PhoneHome;
