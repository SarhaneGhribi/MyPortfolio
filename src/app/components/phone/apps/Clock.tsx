"use client";
import React, { useEffect, useState } from "react";

const Clock = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";
  const date = now
    ? now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
    : "";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black">
      <span className="text-5xl font-light tabular-nums text-white">{time}</span>
      <span className="text-sm text-gray-400">{date}</span>
    </div>
  );
};

export default Clock;
