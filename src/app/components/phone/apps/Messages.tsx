"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

interface Bubble {
  id: number;
  from: "them" | "me";
  text: string;
}

interface Thread {
  id: string;
  name: string;
  initial: string;
  color: string;
  preview: string;
  messages: Bubble[];
}

const initialThreads: Thread[] = [
  {
    id: "recruiter",
    name: "Talent Partner",
    initial: "T",
    color: "#4f8bf0",
    preview: "Loved your portfolio — are you open to chatting?",
    messages: [
      { id: 1, from: "them", text: "Hey! Really loved your portfolio site." },
      { id: 2, from: "them", text: "Are you open to chatting about an opening?" },
    ],
  },
  {
    id: "client",
    name: "Yeiza Team",
    initial: "Y",
    color: "#dd8fe0",
    preview: "The new gift card flow looks great 🎉",
    messages: [
      { id: 1, from: "them", text: "The new gift card flow looks great 🎉" },
      { id: 2, from: "them", text: "Merchants are already asking for the next batch." },
    ],
  },
  {
    id: "self",
    name: "Notes to self",
    initial: "N",
    color: "#37c98f",
    preview: "Ship the recents switcher tonight",
    messages: [{ id: 1, from: "them", text: "Ship the recents switcher tonight." }],
  },
];

const Messages = () => {
  const [threads, setThreads] = useState(initialThreads);
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const openThread = threads.find((t) => t.id === openThreadId) ?? null;

  function sendMessage() {
    if (!openThread || !draft.trim()) return;
    const text = draft.trim();
    setThreads((prev) =>
      prev.map((t) =>
        t.id === openThread.id
          ? { ...t, messages: [...t.messages, { id: t.messages.length + 1, from: "me", text }] }
          : t
      )
    );
    setDraft("");
  }

  if (openThread) {
    return (
      <div className="flex h-full w-full flex-col bg-[#0e0e10]">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <button onClick={() => setOpenThreadId(null)} aria-label="Back">
            <FaArrowLeft className="text-white" size={16} />
          </button>
          <span className="text-sm font-semibold text-white">{openThread.name}</span>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
          {openThread.messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                m.from === "me"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message"
            className="flex-1 rounded-full bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none"
          />
          <button
            onClick={sendMessage}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
            aria-label="Send"
          >
            <FaPaperPlane size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#0e0e10] pt-8">
      <h2 className="px-4 text-lg font-semibold text-white">Messages</h2>
      <div className="mt-3 divide-y divide-white/10">
        {threads.map((t) => (
          <div
            key={t.id}
            onClick={() => setOpenThreadId(t.id)}
            className="flex items-center gap-3 px-4 py-3"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: t.color }}
            >
              {t.initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{t.name}</p>
              <p className="truncate text-xs text-gray-400">{t.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
