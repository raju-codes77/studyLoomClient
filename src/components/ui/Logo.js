import React from "react";

export default function Logo({ className = "w-10 h-10", iconSize = "w-6 h-6" }) {
  return (
    <div className={`${className} rounded-full bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] flex items-center justify-center shadow-sm`}>
      <svg viewBox="0 0 100 100" className={iconSize}>
        <g transform="rotate(0, 50, 50)">
          <path d="M50 50C50 50 35 15 50 5C65 15 50 50 50 50Z" fill="#FFF" opacity="0.9"/>
        </g>
        <g transform="rotate(72, 50, 50)">
          <path d="M50 50C50 50 35 15 50 5C65 15 50 50 50 50Z" fill="#FFF" opacity="0.8"/>
        </g>
        <g transform="rotate(144, 50, 50)">
          <path d="M50 50C50 50 35 15 50 5C65 15 50 50 50 50Z" fill="#FFF" opacity="0.85"/>
        </g>
        <g transform="rotate(216, 50, 50)">
          <path d="M50 50C50 50 35 15 50 5C65 15 50 50 50 50Z" fill="#FFF" opacity="0.9"/>
        </g>
        <g transform="rotate(288, 50, 50)">
          <path d="M50 50C50 50 35 15 50 5C65 15 50 50 50 50Z" fill="#FFF" opacity="0.8"/>
        </g>
        <circle cx="50" cy="50" r="8" fill="#FF758C" />
      </svg>
    </div>
  );
}
