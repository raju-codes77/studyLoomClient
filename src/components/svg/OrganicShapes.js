import React from "react";

export const LeafDecoration = ({ className = "" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C7 2 3 6 3 11C3 16.5 12 22 12 22C12 22 21 16.5 21 11C21 6 17 2 12 2Z" fill="var(--color-green)" opacity="0.4" />
    <path d="M12 2V22" stroke="var(--color-background)" strokeWidth="1" opacity="0.6"/>
  </svg>
);

export const SunDecoration = ({ className = "" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="6" fill="var(--color-yellow)" opacity="0.5"/>
    <path d="M16 2V6M16 26V30M2 16H6M26 16H30M6.1 6.1L8.9 8.9M23.1 23.1L25.9 25.9M6.1 25.9L8.9 23.1M23.1 6.1L25.9 8.9" stroke="var(--color-yellow)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

export const TinyStar = ({ className = "" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="var(--color-peach)" opacity="0.6"/>
  </svg>
);

export const OrganicCircle = ({ className = "" }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M85 50C85 69.33 69.33 88 50 88C30.67 88 15 69.33 15 50C15 30.67 30.67 12 50 12C69.33 12 85 30.67 85 50Z" stroke="var(--color-lavender-soft)" strokeWidth="0.5" strokeDasharray="4 4" fill="var(--color-surface-lavender)" opacity="0.3"/>
  </svg>
);
