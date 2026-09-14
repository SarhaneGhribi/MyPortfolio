"use client";
import React, { useState } from "react";

interface ToggleRowProps {
  label: string;
  defaultOn?: boolean;
}

const ToggleRow = ({ label, defaultOn = false }: ToggleRowProps) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <span className="text-sm text-white">{label}</span>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          on ? "bg-green-500" : "bg-gray-600"
        }`}
        aria-pressed={on}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-black pb-6 pt-8">
      <h2 className="mb-4 px-4 text-lg font-semibold text-white">Settings</h2>

      <p className="px-4 pb-2 text-xs uppercase tracking-wide text-gray-500">
        Preferences
      </p>
      <ToggleRow label="Dark mode" defaultOn />
      <ToggleRow label="Notifications" defaultOn />
      <ToggleRow label="Wi-Fi" defaultOn />
      <ToggleRow label="Bluetooth" />

      <p className="px-4 pb-2 pt-6 text-xs uppercase tracking-wide text-gray-500">
        About
      </p>
      <div className="px-4 text-sm text-gray-300">
        <p>Portfolio OS</p>
        <p className="mt-1 text-gray-500">Built by Sarhane Ghribi with Next.js, TypeScript &amp; a lot of curiosity.</p>
      </div>
    </div>
  );
};

export default Settings;
