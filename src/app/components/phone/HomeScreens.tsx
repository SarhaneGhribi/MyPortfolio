"use client";
import React, { useRef, useState } from "react";
import PhoneHome from "./PhoneHome";
import AppDrawer from "./AppDrawer";
import type { Screen } from "./types";

interface HomeScreensProps {
  onIconClick: (screen: Screen) => void;
}

const PAGE_COUNT = 2;
const DRAG_DEADZONE = 8;

const HomeScreens = ({ onIconClick }: HomeScreensProps) => {
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);
  const trackWidth = useRef(300);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    hasDragged.current = false;
    trackWidth.current = e.currentTarget.parentElement?.clientWidth || 300;
    setIsDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > DRAG_DEADZONE) hasDragged.current = true;
    setDragOffset(delta);
  }

  function endDrag() {
    if (dragStartX.current === null) return;
    const width = trackWidth.current || 300;
    const threshold = width * 0.2;
    setPage((prev) => {
      if (dragOffset < -threshold && prev < PAGE_COUNT - 1) return prev + 1;
      if (dragOffset > threshold && prev > 0) return prev - 1;
      return prev;
    });
    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }

  // A real drag shouldn't also trigger a tap on whichever icon the pointer
  // happened to end up over — swallow that synthetic click here.
  function handleClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const width = trackWidth.current || 300;
  const basePercent = -page * 50;
  const dragPercent = (dragOffset / width) * 50;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full w-[200%]"
        style={{
          transform: `translateX(${basePercent + dragPercent}%)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
          touchAction: "pan-y",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
      >
        {/* `relative` here matters: the track's `transform` makes it a new
            containing block for `position: absolute` descendants, so
            without this, PhoneHome/AppDrawer's absolute inner content would
            size itself against the 200%-wide track instead of one page. */}
        <div className="relative h-full w-1/2 flex-shrink-0">
          <PhoneHome onIconClick={onIconClick} />
        </div>
        <div className="relative h-full w-1/2 flex-shrink-0">
          <AppDrawer onIconClick={onIconClick} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: PAGE_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              page === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreens;
