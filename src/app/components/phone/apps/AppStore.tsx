"use client";
import React from "react";
import Image from "next/image";
import type { Screen } from "../types";

interface AppStoreProps {
  onIconClick: (screen: Screen) => void;
}

interface StoreEntry {
  name: string;
  developer: string;
  icon: string;
  target?: Screen;
}

const entries: StoreEntry[] = [
  { name: "Yeiza", developer: "GA Huset AB", icon: "/yeiza-icon.png", target: "yeiza" },
  { name: "AvatarID", developer: "Infinitum Tech", icon: "/AvatarID.png", target: "avatarid" },
  { name: "Yeiza Business", developer: "GA Huset AB", icon: "/yeiza-business-icon.png" },
];

const AppStore = ({ onIconClick }: AppStoreProps) => {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#0e0e10] pb-6 pt-8">
      <h2 className="px-4 text-lg font-semibold text-white">App Store</h2>
      <p className="px-4 pb-4 pt-1 text-xs text-gray-500">Apps by Sarhane Ghribi</p>

      <div className="space-y-1">
        {entries.map((entry) => (
          <div key={entry.name} className="flex items-center gap-3 px-4 py-3">
            <Image
              src={entry.icon}
              alt={entry.name}
              width={44}
              height={44}
              className="rounded-xl"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{entry.name}</p>
              <p className="truncate text-xs text-gray-500">{entry.developer}</p>
            </div>
            <button
              onClick={() => entry.target && onIconClick(entry.target)}
              disabled={!entry.target}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold ${
                entry.target
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {entry.target ? "OPEN" : "GET"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppStore;
