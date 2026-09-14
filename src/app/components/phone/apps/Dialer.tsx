"use client";
import React, { useState } from "react";
import { FaPhone, FaBackspace } from "react-icons/fa";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

const Dialer = () => {
  const [number, setNumber] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  function press(digit: string) {
    setNumber((n) => (n + digit).slice(0, 18));
  }

  function backspace() {
    setNumber((n) => n.slice(0, -1));
  }

  function call() {
    if (!number) return;
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      setNumber("");
    }, 2200);
  }

  if (isCalling) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-black">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <FaPhone size={28} className="animate-pulse text-green-500" />
        </div>
        <p className="text-lg text-white">Calling…</p>
        <p className="text-sm text-gray-400">{number}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-black px-6 pb-8 pt-10">
      <span className="min-h-[2.5rem] text-2xl tracking-wide text-white">
        {number || " "}
      </span>

      <div className="grid grid-cols-3 gap-y-3">
        {KEYS.flat().map((key) => (
          <button
            key={key}
            onClick={() => press(key)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl text-white active:bg-white/20"
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex w-full items-center justify-center gap-10">
        <button
          onClick={call}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white active:opacity-80"
          aria-label="Call"
        >
          <FaPhone size={22} />
        </button>
        {number && (
          <button
            onClick={backspace}
            className="text-white/70"
            aria-label="Backspace"
          >
            <FaBackspace size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialer;
