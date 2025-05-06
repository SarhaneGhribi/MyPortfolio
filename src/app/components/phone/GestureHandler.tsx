import { motion } from "framer-motion";
import React, { useState, useRef, useEffect, useCallback } from "react";

interface GestureHandlerProps {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: React.ReactNode;
  sensitivity?: number;
}

const GestureHandler = React.memo(({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  sensitivity = 50
}: GestureHandlerProps) => {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'vertical' | 'horizontal' | null>(null);
  const startY = useRef(0);
  const startX = useRef(0);
  const isSwiping = useRef(false);
  const touchAreaRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    console.log('TOUCH START - setting isSwiping to true');
    e.stopPropagation();
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    isSwiping.current = true;
    console.log('isSwiping after start:', isSwiping.current);
    setSwipeProgress(0);
    setSwipeDirection(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    console.log('Current isSwiping:', isSwiping.current);
    if (!isSwiping.current) {
      console.warn('Movement ignored - isSwiping is false!');
      return;
    }
    
    const deltaY = e.touches[0].clientY - startY.current;
    const deltaX = e.touches[0].clientX - startX.current;
    
    console.log('TOUCH MOVE', {
      deltaY,
      deltaX,
      isSwiping: isSwiping.current,
      swipeDirection
    });

    if (!swipeDirection) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setSwipeDirection('vertical');
      } else {
        setSwipeDirection('horizontal');
      }
    }
    
    if (swipeDirection === 'vertical') {
      setSwipeProgress(Math.min(Math.abs(deltaY) / sensitivity, 1));
    } else if (swipeDirection === 'horizontal') {
      setSwipeProgress(Math.min(Math.abs(deltaX) / sensitivity, 1));
    }
  }, [sensitivity, swipeDirection]);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    console.log('TOUCH END', {
      isSwiping: isSwiping.current,
      swipeDirection
    });

    if (!isSwiping.current) {
      console.log('SWIPE CANCELLED (not swiping)');
      return;
    }
    
    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const deltaY = endY - startY.current;
    const deltaX = endX - startX.current;

    console.log('SWIPE RESULTS', {
      deltaY,
      deltaX,
      sensitivity,
      required: sensitivity,
      isSwiping: isSwiping.current
    });

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      console.log('VERTICAL SWIPE DETECTED');
      if (deltaY < -sensitivity) {
        console.log('✅ SWIPE UP TRIGGERED');
        onSwipeUp?.();
      }
      if (deltaY > sensitivity) {
        console.log('✅ SWIPE DOWN TRIGGERED');
        onSwipeDown?.();
      }
    } else {
      console.log('HORIZONTAL SWIPE DETECTED');
      if (deltaX < -sensitivity && onSwipeLeft) onSwipeLeft();
      if (deltaX > sensitivity && onSwipeRight) onSwipeRight();
    }

    isSwiping.current = false;
    setSwipeProgress(0);
    setSwipeDirection(null);
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, sensitivity]);

  useEffect(() => {
    const element = touchAreaRef.current;
    if (!element) return;

    console.log('Stable event listeners added');

    const handleStart = (e: TouchEvent) => {
      console.log('Native touchstart');
      handleTouchStart(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    const handleMove = (e: TouchEvent) => {
      console.log('Native touchmove');
      handleTouchMove(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    const handleEnd = (e: TouchEvent) => {
      console.log('Native touchend');
      handleTouchEnd(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    element.addEventListener('touchstart', handleStart, { passive: false });
    element.addEventListener('touchmove', handleMove, { passive: false });
    element.addEventListener('touchend', handleEnd);

    return () => {
      console.log('Cleanup called');
      element.removeEventListener('touchstart', handleStart);
      element.removeEventListener('touchmove', handleMove);
      element.removeEventListener('touchend', handleEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div 
      ref={touchAreaRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255,0,0,0.2)', // Visual debug - remove when working
        touchAction: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {isSwiping.current && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-blue-500 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: swipeProgress }}
          transition={{ type: 'spring', damping: 20 }}
        />
      )}
    </div>
  );
});

export default GestureHandler;