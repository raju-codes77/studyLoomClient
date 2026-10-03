"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Logo from "@/components/ui/Logo";

export default function Signup() {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bloom Flower Animation (Background)
      gsap.to(".bloom-petal", {
        rotation: "random(-10, 10)",
        transformOrigin: "center center",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.2
      });

      // Floating Elements Animation
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(4, 6)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { amount: 2, from: "random" }
      });

      gsap.fromTo(".fade-up", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFE] relative flex items-center justify-center overflow-hidden" ref={bgRef}>
      
      {/* ---------------- BACKGROUND ANIMATIONS ---------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* Soft Blurs */}
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-[#FF9A9E] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-[#FECFEF] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Large Background Bloom Flower */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 scale-150">
          <svg viewBox="0 0 200 200" className="w-[500px] h-[500px]">
            <g className="bloom-petal" transform="rotate(0, 100, 100)">
              <path d="M100 100C100 100 70 30 100 10C130 30 100 100 100 100Z" fill="#FF758C" opacity="0.8"/>
            </g>
            <g className="bloom-petal" transform="rotate(72, 100, 100)">
              <path d="M100 100C100 100 70 30 100 10C130 30 100 100 100 100Z" fill="#FF9A9E" opacity="0.8"/>
            </g>
            <g className="bloom-petal" transform="rotate(144, 100, 100)">
              <path d="M100 100C100 100 70 30 100 10C130 30 100 100 100 100Z" fill="#FF7EB3" opacity="0.8"/>
            </g>
            <g className="bloom-petal" transform="rotate(216, 100, 100)">
              <path d="M100 100C100 100 70 30 100 10C130 30 100 100 100 100Z" fill="#FECFEF" opacity="0.8"/>
            </g>
            <g className="bloom-petal" transform="rotate(288, 100, 100)">
              <path d="M100 100C100 100 70 30 100 10C130 30 100 100 100 100Z" fill="#FF758C" opacity="0.8"/>
            </g>
            <circle cx="100" cy="100" r="15" fill="#FFF8E7" />
            <circle cx="100" cy="100" r="10" fill="#FFD700" opacity="0.5" />
          </svg>
        </div>

        {/* Floating Background Clock */}
        <div className="absolute top-[20%] left-[20%] floating-element opacity-40">
          <svg viewBox="0 0 100 100" className="w-32 h-32 transform -scale-x-100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FF758C" strokeWidth="6" strokeDasharray="180" strokeDashoffset="60" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="25" stroke="#1D1B20" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="50" x2="70" y2="50" stroke="#FF758C" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" fill="#1D1B20" />
          </svg>
        </div>

        {/* Floating Background Streak */}
        <div className="absolute bottom-[20%] right-[20%] floating-element opacity-50 bg-white/40 backdrop-blur-sm p-4 rounded-3xl">
          <span className="text-4xl">🔥</span>
        </div>
      </div>

      {/* ---------------- FOREGROUND FORM ---------------- */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="bg-white/80 backdrop-blur-2xl border border-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgba(30,30,47,0.08)]">
          
          <div className="flex flex-col items-center text-center mb-8 fade-up">
            <Logo className="w-12 h-12 mb-3" iconSize="w-7 h-7" />
            <h1 className="text-xl font-bold tracking-tight text-[#1D1B20] mb-1">Study<span className="text-[#FF758C] font-editorial italic font-normal">Bloom</span></h1>
            <h2 className="text-2xl font-editorial font-bold text-[#1D1B20]">Create an account.</h2>
          </div>

          <form className="flex flex-col gap-4 fade-up" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-700 tracking-widest uppercase">Full Name</label>
              <input 
                type="text" 
                placeholder="Yajuddin"
                className="w-full bg-white/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF758C] focus:ring-1 focus:ring-[#FF758C] transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-700 tracking-widest uppercase">Email</label>
              <input 
                type="email" 
                placeholder="hello@example.com"
                className="w-full bg-white/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF758C] focus:ring-1 focus:ring-[#FF758C] transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-700 tracking-widest uppercase">Date of Birth</label>
              <input 
                type="date" 
                className="w-full bg-white/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF758C] focus:ring-1 focus:ring-[#FF758C] transition-all text-gray-700"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-700 tracking-widest uppercase">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF758C] focus:ring-1 focus:ring-[#FF758C] transition-all placeholder:text-gray-400"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-200/50 hover:opacity-90 transition-all mt-4 hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide">
              Sign Up
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 font-medium mt-6 fade-up">
            Already have an account? <Link href="/login" className="font-bold text-[#FF758C] hover:underline">Log in</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
