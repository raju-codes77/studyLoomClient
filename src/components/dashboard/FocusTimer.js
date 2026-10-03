"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function FocusTimer({ initialMinutes = 25 }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const ringRef = useRef(null);

  const totalTime = initialMinutes * 60;
  const progress = timeLeft / totalTime;
  const dashoffset = 283 * (1 - progress);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        strokeDashoffset: dashoffset,
        duration: 1,
        ease: "linear",
      });
    }
  }, [dashoffset]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialMinutes * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <div className="relative w-64 h-64 flex flex-col items-center justify-center mb-6 z-10">
        
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-lavender)] to-[var(--color-surface-pink)] rounded-full opacity-40 blur-xl" />
        
        {/* Outer subtle ticks (analog look) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "repeating-conic-gradient(from 0deg, var(--color-text-primary) 0deg 1deg, transparent 1deg 6deg)", borderRadius: "50%", maskImage: "radial-gradient(transparent 68%, black 70%)", WebkitMaskImage: "radial-gradient(transparent 68%, black 70%)" }} />

        {/* Timer SVGs */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="var(--color-surface)" stroke="rgba(0,0,0,0.02)" strokeWidth="1" />
          <circle 
            ref={ringRef} 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="url(#timer-grad)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeDasharray="283" 
            strokeDashoffset="0"
          />
          <defs>
            <linearGradient id="timer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-lavender-primary)" />
              <stop offset="100%" stopColor="var(--color-pink-primary)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[0.2em] text-[var(--color-text-secondary)] uppercase font-semibold mb-1 opacity-70">Focus Session</span>
          <h1 className="text-6xl font-editorial font-light text-[var(--color-text-primary)]" style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatTime(timeLeft)}
          </h1>
          <span className="text-xs text-[var(--color-text-muted)] mt-2 font-medium italic">Deep Work</span>
        </div>
      </div>

      <div className="flex items-center gap-6 relative z-10">
        <button 
          onClick={toggleTimer}
          className="px-6 py-2.5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-sm font-medium hover:bg-[var(--color-lavender-primary)] transition-colors duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          {isActive ? "Pause" : "Start Focus"}
        </button>
        <button 
          onClick={resetTimer}
          className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors underline decoration-[var(--color-surface-lavender)] underline-offset-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
