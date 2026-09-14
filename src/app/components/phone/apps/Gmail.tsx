"use client";
import React, { useState } from "react";

interface Email {
  id: string;
  sender: string;
  initial: string;
  color: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

const initialEmails: Email[] = [
  {
    id: "1",
    sender: "GitHub",
    initial: "G",
    color: "#333333",
    subject: "New star on react-native-permissions-ui",
    preview: "Someone just starred your repository...",
    time: "9:14 AM",
    unread: true,
  },
  {
    id: "2",
    sender: "LinkedIn",
    initial: "in",
    color: "#0a66c2",
    subject: "You appeared in 12 searches this week",
    preview: "See who's been looking at your profile...",
    time: "8:02 AM",
    unread: true,
  },
  {
    id: "3",
    sender: "Yeiza Team",
    initial: "Y",
    color: "#dd8fe0",
    subject: "Weekly business summary",
    preview: "Here's how your loyalty program performed...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    sender: "npm",
    initial: "n",
    color: "#cb3837",
    subject: "Weekly download report",
    preview: "react-native-permissions-ui had 340 downloads...",
    time: "Mon",
    unread: false,
  },
];

const Gmail = () => {
  const [emails, setEmails] = useState(initialEmails);

  function markRead(id: string) {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)));
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-white pb-6 pt-8">
      <h2 className="px-4 text-lg font-semibold text-gray-800">Inbox</h2>
      <div className="mt-2 divide-y divide-gray-100">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => markRead(email.id)}
            className="flex items-start gap-3 px-4 py-3"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: email.color }}
            >
              {email.initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className={`truncate text-sm ${email.unread ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                  {email.sender}
                </p>
                <span className="shrink-0 text-[10px] text-gray-400">{email.time}</span>
              </div>
              <p className={`truncate text-xs ${email.unread ? "font-medium text-gray-800" : "text-gray-500"}`}>
                {email.subject}
              </p>
              <p className="truncate text-xs text-gray-400">{email.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gmail;
