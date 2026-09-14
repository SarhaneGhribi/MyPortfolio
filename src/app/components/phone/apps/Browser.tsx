"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface Shortcut {
  label: string;
  url: string;
  letter: string;
  color: string;
}

const shortcuts: Shortcut[] = [
  { label: "GitHub", url: "https://github.com/SarhaneGhribi", letter: "G", color: "#333333" },
  { label: "LinkedIn", url: "https://linkedin.com/in/sarhaneghribi", letter: "in", color: "#0a66c2" },
  { label: "npm", url: "https://www.npmjs.com/~sarhaneghribi", letter: "n", color: "#cb3837" },
  { label: "Medium", url: "https://medium.com/@sarhane.ghribi", letter: "M", color: "#000000" },
];

interface BrowserProps {
  variant: "chrome" | "mibrowser";
}

const Browser = ({ variant }: BrowserProps) => {
  const accent = variant === "chrome" ? "#4285F4" : "#ff6900";
  const label = variant === "chrome" ? "Google" : "Mi Browser";

  return (
    <div className="flex h-full w-full flex-col bg-[#f1f3f4] pt-8">
      <div className="flex items-center gap-2 px-3 pb-3">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 shadow">
          <FaSearch size={12} className="text-gray-500" />
          <span className="text-xs text-gray-500">Search or type a URL</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 bg-white px-4 pt-8">
        <span className="text-xl font-medium" style={{ color: accent }}>
          {label}
        </span>

        <div className="grid grid-cols-3 gap-4">
          {shortcuts.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white shadow"
                style={{ backgroundColor: s.color }}
              >
                {s.letter}
              </div>
              <span className="text-[10px] text-gray-600">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browser;
