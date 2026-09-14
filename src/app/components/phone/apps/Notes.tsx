"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Note {
  id: string;
  text: string;
}

const STORAGE_KEY = "portfolio-os-notes";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {
      // ignore malformed/unavailable storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // storage may be unavailable (private mode, quota) — fail silently
    }
  }, [notes, loaded]);

  function addNote() {
    const text = draft.trim();
    if (!text) return;
    setNotes((prev) => [{ id: crypto.randomUUID(), text }, ...prev]);
    setDraft("");
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#1c1c1e] pt-8">
      <h2 className="px-4 text-lg font-semibold text-white">Notes</h2>

      <div className="flex gap-2 px-4 pt-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="New note..."
          className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none"
        />
        <button
          onClick={addNote}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500 text-black"
          aria-label="Add note"
        >
          <FaPlus size={14} />
        </button>
      </div>

      <div className="mt-4 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {notes.length === 0 ? (
          <p className="pt-8 text-center text-sm text-gray-500">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between gap-2 rounded-lg bg-yellow-500/90 px-3 py-2 text-sm text-black shadow"
            >
              <p className="whitespace-pre-wrap break-words">{note.text}</p>
              <button
                onClick={() => deleteNote(note.id)}
                className="mt-0.5 shrink-0 text-black/60 hover:text-black"
                aria-label="Delete note"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
