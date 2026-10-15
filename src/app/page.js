"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Bell, Home, Calendar, CheckSquare, User, Play, Pause, Flame, Target, LogIn, UserPlus, Users, BookOpen, ArrowRight, Heart, Sparkles, CheckCircle2, Award, Clock, Star, ShieldCheck, Compass, GraduationCap, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function StudyBloomDashboard() {
  const containerRef = useRef(null);
  const userName = "Yajuddin"; // This can later be populated from user auth/context
  
  // Timer State
  const initialMinutes = 48;
  const initialSeconds = 27;
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60 + initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timerRingRef = useRef(null);
  const desktopHeroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalTime = 60 * 60; // Just for visual reference in this demo
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
    if (timerRingRef.current) {
      gsap.to(timerRingRef.current, { strokeDashoffset: dashoffset, duration: 1, ease: "linear" });
    }

    // GSAP Desktop Landing Page Animations
    const ctx = gsap.context(() => {
      if (desktopHeroRef.current) {
        // Floating decorative elements
        gsap.to(".landing-float", {
          y: "random(-15, 15)",
          x: "random(-10, 10)",
          rotation: "random(-10, 10)",
          duration: "random(4, 6)",
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: { amount: 2, from: "random" }
        });

        // Hero content reveal
        gsap.fromTo(".hero-reveal", 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );

        // App preview float in
        gsap.fromTo(".app-preview",
          { opacity: 0, x: 50, rotation: 5 },
          { opacity: 1, x: 0, rotation: 0, duration: 1.2, ease: "power3.out", stagger: 0.2, delay: 0.5 }
        );
        
        // Section Scroll Reveals
        gsap.utils.toArray(".gsap-reveal-up").forEach((el) => {
          gsap.fromTo(el, 
            { opacity: 0, y: 35 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.9, 
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        // Staggered Steps Animation
        gsap.fromTo(".step-card",
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.1)",
            scrollTrigger: {
              trigger: ".steps-container",
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Feature cards reveal
        gsap.fromTo(".studybloom-feature-card",
          { opacity: 0, y: 35 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            stagger: 0.15, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".studybloom-features-grid",
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Dashboard mock reveal
        gsap.fromTo(".dashboard-preview-card",
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".dashboard-preview-section",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );

        // Testimonial cards reveal
        gsap.fromTo(".testimonial-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".testimonials-grid",
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, desktopHeroRef);

    return () => ctx.revert();
  }, [dashoffset]);



  const toggleTimer = () => setIsActive(!isActive);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    return () => lenis.destroy();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen text-[#2D2A32] font-sans pb-28 md:pb-0 transition-colors duration-1000 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/bg.png')" }}
    >
      {/* Global Scroll Progress Bar (linear gradient 90deg, #e0679c, #8e5bd1) - Desktop & Mobile */}
      <div className="fixed top-0 left-0 right-0 h-[3px] md:h-[3.5px] z-[100] bg-white/10 pointer-events-none">
        <div 
          className="h-full transition-all duration-75 ease-out rounded-r-full shadow-[0_0_12px_rgba(224,103,156,0.6)]"
          style={{ 
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #e0679c, #8e5bd1)"
          }}
        />
      </div>
      
      {/* Mobile Top Bar */}
      <header className="pt-12 pb-4 px-6 flex justify-between items-center sticky top-0 z-40 transition-colors duration-1000 md:hidden bg-white/60 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">Study<span className="text-[#FF758C] font-editorial italic font-normal">Bloom</span></h1>
            <span className="text-[10px] font-bold text-[#FF758C] tracking-widest uppercase">SSC EXAM '26</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 relative bg-white shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF758C] rounded-full border-2 border-white"></span>
          </button>
          <button className="w-10 h-10 rounded-full border border-pink-100 bg-pink-50 flex items-center justify-center text-xl shadow-sm hover:scale-105 transition-transform">
            🌸
          </button>
        </div>
      </header>

      {/* ---------------- DESKTOP LANDING PAGE ---------------- */}
      <div 
        className="hidden md:flex flex-col w-full bg-[#FCFAFA] relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/bg.png')" }}
        ref={desktopHeroRef}
      >

        {/* Sticky/Fixed Top Navigation Bar (Preserves original transparent banner aesthetic on scroll) */}
        <nav className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-8 lg:px-12 py-5 bg-transparent">
            {/* Left Brand Logo */}
            <div className="flex items-center gap-2.5">
              <div className="text-white drop-shadow-md">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C12 2 8 8 8 13C8 17.5 12 20 12 20C12 20 16 17.5 16 13C16 8 12 2 12 2Z" />
                  <path d="M12 20C9.5 20 4 17.5 3 13C2 9.5 5 7 5 7C5 7 6.5 11 9 13.5" />
                  <path d="M12 20C14.5 20 20 17.5 21 13C22 9.5 19 7 19 7C19 7 17.5 11 15 13.5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">StudyBloom</span>
            </div>

            {/* Centered Glass Pill Menu */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg shadow-black/5 text-xs lg:text-sm font-medium">
              <button className="px-5 py-1.5 rounded-full bg-white text-gray-800 font-semibold shadow-sm transition-all hover:bg-white/95">
                Home
              </button>
              <button className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                Study Plan
              </button>
              <button className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                Resources
              </button>
              <button className="px-4 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                About
              </button>
            </div>

            {/* Right Action Menu: Language & Sign up */}
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1.5 text-white/90 hover:text-white font-medium text-sm transition-colors drop-shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" x2="22" y1="12" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>EN</span>
              </button>
              <Link 
                href="/signup" 
                className="px-5 py-1.5 rounded-full bg-white text-gray-800 font-semibold text-sm shadow-md hover:bg-white/90 hover:shadow-lg transition-all"
              >
                Sign up
              </Link>
            </div>
          </nav>

        {/* Desktop Banner Container (Matches Design with hero-bg.png) */}
        <section 
          className="relative w-full h-screen min-h-[700px] max-h-[1080px] bg-cover bg-center flex flex-col justify-between overflow-hidden px-8 lg:px-12 pt-20 pb-6 select-none"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
          {/* Subtle warm sunset atmospheric overlay for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20 pointer-events-none" />

          {/* Main Hero Interactive Canvas Area with Perfect Absolute Card Positions */}
          <div className="relative z-10 w-full flex-1 flex flex-col justify-start pt-2">
            
            {/* Center Hero Heading & Call to Action */}
            <div className="text-center mx-auto max-w-xl">
              <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/90 mb-1.5 drop-shadow-sm">
                SMALL STEPS &nbsp; BIG DREAMS
              </div>
              <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-serif text-white tracking-tight drop-shadow-md mb-2">
                StudyBloom
              </h1>
              <p className="text-white/90 text-xs lg:text-sm font-normal mb-4 drop-shadow-sm">
                Your personal study planner for a better tomorrow.
              </p>
              <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#2D2A32] font-semibold text-xs lg:text-sm shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 transition-all group">
                <span>Start Studying</span>
                <ArrowRight className="w-4 h-4 text-[#2D2A32] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Left Top Card: Today's Plan */}
            <div className="absolute left-2 lg:left-4 top-8 xl:top-12 w-[280px] xl:w-[305px] bg-white/90 backdrop-blur-xl rounded-[24px] p-4 xl:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/70 text-[#2D2A32] transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-pink-100/70 text-[#FF758C] flex items-center justify-center shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 leading-tight">Today&apos;s Plan</h3>
                  <p className="text-[10px] text-gray-400 font-medium">Tue, 14 Oct</p>
                </div>
              </div>

              {/* Plan Items */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF758C] flex items-center justify-center text-white shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="font-semibold text-gray-800">Mathematics <span className="font-normal text-gray-500">(Coaching)</span></span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">12:00 – 2:00 PM</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF758C] flex items-center justify-center text-white shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="font-semibold text-gray-800">Physics <span className="font-normal text-gray-500">(Sir)</span></span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">3:00 – 5:00 PM</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />
                    <span className="font-semibold text-gray-700">Chemistry <span className="font-normal text-gray-500">(Sir)</span></span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">8:00 – 10:00 PM</span>
                </div>
              </div>

              <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF758C] hover:text-[#ff5c77] hover:gap-2 transition-all">
                <span>View Full Schedule</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Left Bottom Card: Subjects 2x2 Grid */}
            <div className="absolute left-2 lg:left-4 bottom-1 xl:bottom-2 w-[280px] xl:w-[305px] bg-white/90 backdrop-blur-xl rounded-[24px] p-4 xl:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/70 text-[#2D2A32] transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-xs font-bold text-gray-800 mb-2.5">Subjects</h3>
              <div className="grid grid-cols-2 gap-2">
                {/* Math */}
                <div className="bg-[#FFF3F5] rounded-xl p-2.5 flex flex-col justify-between h-16 border border-pink-100/50 hover:bg-[#ffeaf0] transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-md bg-pink-100 text-[#FF758C] flex items-center justify-center text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">Math</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#FF758C] transition-all" />
                  </div>
                </div>

                {/* Physics */}
                <div className="bg-[#F5F2FE] rounded-xl p-2.5 flex flex-col justify-between h-16 border border-purple-100/50 hover:bg-[#ede7fe] transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-md bg-purple-100 text-[#8B5CF6] flex items-center justify-center text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 0 0 0 20"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">Physics</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#8B5CF6] transition-all" />
                  </div>
                </div>

                {/* Chemistry */}
                <div className="bg-[#FDF2F8] rounded-xl p-2.5 flex flex-col justify-between h-16 border border-pink-100/40 hover:bg-[#fce7f3] transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-md bg-pink-100 text-[#EC4899] flex items-center justify-center text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31L4.35 19.55a2 2 0 0 0 1.65 3.45h16a2 2 0 0 0 1.65-3.45L14 9.31V2z"/></svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">Chemistry</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#EC4899] transition-all" />
                  </div>
                </div>

                {/* English */}
                <div className="bg-[#FFF7ED] rounded-xl p-2.5 flex flex-col justify-between h-16 border border-orange-100/50 hover:bg-[#ffedd5] transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-md bg-orange-100 text-[#F97316] flex items-center justify-center text-xs">
                    <BookOpen className="w-3 h-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">English</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#F97316] transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Top Card: Overall Progress */}
            <div className="absolute right-2 lg:right-4 top-16 xl:top-20 w-[280px] xl:w-[305px] bg-white/90 backdrop-blur-xl rounded-[24px] p-4 xl:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/70 text-[#2D2A32] transition-transform hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-gray-900">Overall Progress</h3>
                <span className="text-[10px] text-gray-400 font-medium">This Week</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Radial Progress Ring (68%) */}
                <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                  <svg className="w-18 h-18 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-pink-100"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#FF758C]"
                      strokeDasharray="68, 100"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-sm font-bold text-gray-800">68%</span>
                  </div>
                </div>

                {/* Progress Breakdown list */}
                <div className="flex-1 space-y-1 text-[10px] xl:text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF758C]" /> Math
                    </span>
                    <span className="font-semibold text-gray-800">80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4929D]" /> Physics
                    </span>
                    <span className="font-semibold text-gray-800">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FDA4AF]" /> Chemistry
                    </span>
                    <span className="font-semibold text-gray-800">55%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> English
                    </span>
                    <span className="font-semibold text-gray-800">70%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bottom Card: Motivational Quote */}
            <div className="absolute right-2 lg:right-4 bottom-1 xl:bottom-2 w-[280px] xl:w-[305px] bg-white/90 backdrop-blur-xl rounded-[24px] p-4 xl:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/70 text-[#2D2A32] flex items-stretch justify-between overflow-hidden transition-transform hover:-translate-y-1 duration-300">
              <div className="flex flex-col justify-between max-w-[150px] xl:max-w-[165px] z-10">
                <div>
                  <div className="text-[#8B5CF6] mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <p className="text-[11px] xl:text-xs font-semibold text-gray-700 leading-snug">
                    A little progress each day adds up to big results. 💜
                  </p>
                </div>

                <button className="inline-flex items-center gap-1.5 text-[10px] xl:text-[11px] font-bold text-gray-800 hover:text-[#FF758C] mt-2 group transition-colors">
                  <span>Keep Going</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right side decorative pink floral books aesthetic */}
              <div className="flex flex-col items-center justify-end pl-2 shrink-0">
                <div className="text-xl mb-1 filter drop-shadow-sm">🌸</div>
                <div className="w-12 h-1.5 rounded bg-pink-200/90 mb-0.5 shadow-2xs" />
                <div className="w-14 h-2 rounded bg-pink-300/80 mb-0.5 shadow-2xs" />
                <div className="w-16 h-2.5 rounded bg-purple-200/80 shadow-2xs" />
                
                <div className="mt-1 text-center text-[9px] font-handwriting text-pink-500 font-medium leading-tight">
                  You<br/>Can<br/>Do It<br/>♡
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Features Glass Pill Bar */}
          <div className="relative z-20 w-full max-w-[1180px] mx-auto mt-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-8 py-3.5 shadow-lg shadow-black/5 flex items-center justify-between text-white">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="21" y2="21"/>
                  <line x1="4" x2="20" y1="10" y2="10"/>
                  <line x1="12" x2="12" y1="3" y2="21"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight drop-shadow-sm">Smart Study Planner</span>
                <span className="text-[10px] text-white/80 drop-shadow-sm">Plan your routine easily</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="12 8 8 12 12 16 16 12 12 8"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight drop-shadow-sm">AI Study Assistant</span>
                <span className="text-[10px] text-white/80 drop-shadow-sm">Get help anytime</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight drop-shadow-sm">Class &amp; Exam Tracker</span>
                <span className="text-[10px] text-white/80 drop-shadow-sm">Stay on track</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight drop-shadow-sm">Notes &amp; Resources</span>
                <span className="text-[10px] text-white/80 drop-shadow-sm">Everything in one place</span>
              </div>
            </div>
          </div>
        </section>



        {/* ========================================================================= */}
        {/* SECTION B — FEATURES (Uses /images/studybloom/features-floral-bg.webp)     */}
        {/* ========================================================================= */}
        <section 
          id="features"
          className="studybloom-features-section relative z-10 w-full px-8 lg:px-14 py-28 bg-cover bg-center overflow-hidden border-t border-white/40"
          style={{ 
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.88)), url('/images/studybloom/features-floral-bg.webp')" 
          }}
        >
          <div className="max-w-[1320px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FFF0F5] text-[#FF758C] px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-pink-100 shadow-xs uppercase tracking-wider gsap-reveal-up">
              Why StudyBloom
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-serif text-[#1D1B20] tracking-tight mb-4 gsap-reveal-up">
              Everything You Need for Academic Success
            </h2>
            
            <p className="text-gray-600 font-normal text-base lg:text-lg max-w-2xl mx-auto mb-16 leading-relaxed gsap-reveal-up">
              Powerful tools designed to help you study smarter, stay organized, and reach your goals.
            </p>

            <div className="studybloom-features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" x2="20" y1="21" y2="21"/>
                      <line x1="4" x2="20" y1="10" y2="10"/>
                      <line x1="12" x2="12" y1="3" y2="21"/>
                    </svg>
                  ),
                  iconBg: "bg-[#FFF0F5] text-[#FF758C] border-pink-100",
                  title: "Smart Study Planner",
                  description: "Intelligent daily schedules that automatically adjust to your exam timeline and natural study rhythm.",
                  tag: "Routine & Schedule"
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="12 8 8 12 12 16 16 12 12 8"/>
                    </svg>
                  ),
                  iconBg: "bg-[#F5F2FE] text-[#8B5CF6] border-purple-100",
                  title: "AI Study Assistant",
                  description: "Instant personalized summaries, doubt resolution, and flashcard generation tailored to your curriculum.",
                  tag: "24/7 Companion"
                },
                {
                  icon: <Calendar className="w-5 h-5" />,
                  iconBg: "bg-[#FDF2F8] text-[#EC4899] border-pink-100",
                  title: "Class & Exam Tracker",
                  description: "Never miss an assignment deadline or coaching session with synchronized syllabus countdowns.",
                  tag: "Milestone Alerts"
                },
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  iconBg: "bg-[#FFF7ED] text-[#F97316] border-orange-100",
                  title: "Notes & Resources",
                  description: "A centralized digital binder for all textbook chapters, coaching notes, formulas, and revision materials.",
                  tag: "Curated Hub"
                }
              ].map((feat, idx) => (
                <div 
                  key={idx}
                  className="studybloom-feature-card bg-white/90 backdrop-blur-xl rounded-[28px] p-7 border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(255,117,140,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${feat.iconBg}`}>
                        {feat.icon}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{feat.tag}</span>
                    </div>

                    <h3 className="font-bold text-xl text-[#1D1B20] mb-2.5 group-hover:text-[#FF758C] transition-colors">
                      {feat.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>

                  <Link 
                    href="/signup" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF758C] hover:text-[#ff5c77] mt-6 pt-4 border-t border-gray-100/80 transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION C — HOW IT WORKS (Uses /images/studybloom/how-it-works-bg.webp)   */}
        {/* ========================================================================= */}
        <section 
          id="study-plan"
          className="how-it-works-section relative z-10 w-full px-8 lg:px-14 py-28 bg-cover bg-center overflow-hidden border-t border-white/40"
          style={{ 
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.9)), url('/images/studybloom/how-it-works-bg.webp')" 
          }}
        >
          <div className="max-w-[1320px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#F5F1FF] text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-purple-100 shadow-xs uppercase tracking-wider gsap-reveal-up">
              Simple 3-Step Routine
            </div>

            <h2 className="text-3xl lg:text-5xl font-serif text-[#1D1B20] tracking-tight mb-4 gsap-reveal-up">
              How It Works
            </h2>

            <p className="text-gray-600 font-normal text-base lg:text-lg max-w-2xl mx-auto mb-16 leading-relaxed gsap-reveal-up">
              Get started in just a few simple steps and build your perfect study routine.
            </p>

            {/* Steps Container */}
            <div className="steps-container grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: "01",
                  title: "Set Your Goals",
                  subtitle: "Define exams & targets",
                  description: "Input your upcoming exam dates, target grades, subjects, and available hours per week.",
                  accent: "from-[#FF758C] to-[#FFA07A]",
                  badgeColor: "bg-[#FFF0F5] text-[#FF758C]"
                },
                {
                  step: "02",
                  title: "Build Your Plan",
                  subtitle: "Personalized smart schedule",
                  description: "Our algorithm crafts a balanced, gentle routine tailored around your coaching classes and breaks.",
                  accent: "from-[#B072D9] to-[#8B5CF6]",
                  badgeColor: "bg-[#F5F2FE] text-[#8B5CF6]"
                },
                {
                  step: "03",
                  title: "Track & Improve",
                  subtitle: "Bloom with daily consistency",
                  description: "Check off sessions, monitor your mastery percentage, and watch your confidence flourish every week.",
                  accent: "from-[#EC4899] to-[#FF758C]",
                  badgeColor: "bg-[#FDF2F8] text-[#EC4899]"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="step-card relative bg-white/95 backdrop-blur-xl rounded-[32px] p-8 border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.12)] hover:-translate-y-2 transition-all duration-300 text-left flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Step Number Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shadow-sm bg-gradient-to-br ${item.accent} text-white`}>
                        {item.step}
                      </div>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${item.badgeColor}`}>
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif text-[#1D1B20] font-bold mb-3 group-hover:text-[#FF758C] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400">
                    <span>Phase {item.step} of 03</span>
                    <span className="text-[#FF758C]">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION D — STUDY PROGRESS PREVIEW (Uses /images/studybloom/dashboard-atmosphere.webp) */}
        {/* ========================================================================= */}
        <section 
          id="progress-preview"
          className="dashboard-preview-section relative z-10 w-full px-8 lg:px-14 py-28 bg-cover bg-center overflow-hidden border-t border-white/40"
          style={{ 
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.88)), url('/images/studybloom/dashboard-atmosphere.webp')" 
          }}
        >
          <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-18 relative z-10">
            {/* Left Content Side */}
            <div className="w-full lg:w-5/12 flex flex-col items-start text-left gsap-reveal-up">
              <div className="inline-flex items-center gap-2 bg-[#FFF0F5] text-[#FF758C] px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-pink-100 shadow-xs uppercase tracking-wider">
                Comprehensive Dashboard
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-serif text-[#1D1B20] tracking-tight leading-[1.15] mb-5">
                Your Study Progress
              </h2>
              
              <p className="text-gray-600 font-normal text-base lg:text-lg leading-relaxed mb-8">
                See how you&apos;re doing with your study plan, track your subjects, and review your recent sessions — all in one beautiful dashboard.
              </p>

              <div className="space-y-4 mb-8 w-full">
                <div className="flex items-start gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/70 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#FF758C] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">Mastery by Subject</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Real-time percentage tracking for Math, Physics, Chemistry, and English.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/70 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#8B5CF6] flex items-center justify-center shrink-0 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">Consistency Streaks</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Celebrate daily milestones and maintain study momentum without burnout.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF758C] to-[#8B5CF6] text-white font-semibold text-sm shadow-md shadow-pink-200/50 hover:shadow-lg hover:scale-105 transition-all group"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Dashboard Mock Visual Presentation */}
            <div className="w-full lg:w-7/12 relative">
              <div className="dashboard-preview-card relative z-10 bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 lg:p-7 shadow-[0_25px_60px_rgba(139,92,246,0.12)] border border-white/80">
                {/* Header bar */}
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <Logo className="w-7 h-7" iconSize="w-4 h-4" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 leading-tight">StudyBloom Student Portal</h4>
                      <p className="text-[10px] text-gray-400">SSC Examination Preparation 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFF0F5] text-[#FF758C] px-3 py-1 rounded-full text-xs font-bold">
                    <span>🔥</span> 14 Day Streak
                  </div>
                </div>

                {/* Dashboard preview grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div className="bg-[#FFF3F5] rounded-2xl p-4 border border-pink-100">
                    <span className="text-[10px] font-bold text-[#FF758C] uppercase tracking-wider block mb-1">Weekly Target</span>
                    <span className="text-2xl font-bold text-gray-800">28.5 hrs</span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">85% of weekly goal</span>
                  </div>
                  <div className="bg-[#F5F2FE] rounded-2xl p-4 border border-purple-100">
                    <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider block mb-1">Top Subject</span>
                    <span className="text-2xl font-bold text-gray-800">Science</span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">90% mastery rate</span>
                  </div>
                  <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-orange-100">
                    <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider block mb-1">Focus Sessions</span>
                    <span className="text-2xl font-bold text-gray-800">42</span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">Pomodoros completed</span>
                  </div>
                </div>

                {/* Subject progress bars */}
                <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                      <span>Mathematics (Coaching Syllabus)</span>
                      <span className="text-[#FF758C]">80%</span>
                    </div>
                    <div className="w-full bg-gray-200/70 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF758C] h-full rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                      <span>Physics (Theory &amp; Practical)</span>
                      <span className="text-[#8B5CF6]">60%</span>
                    </div>
                    <div className="w-full bg-gray-200/70 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#8B5CF6] h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                      <span>English &amp; Literature</span>
                      <span className="text-blue-500">70%</span>
                    </div>
                    <div className="w-full bg-gray-200/70 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION E — STUDENT TESTIMONIALS (Uses /images/studybloom/testimonials-bg.webp) */}
        {/* ========================================================================= */}
        <section 
          id="testimonials"
          className="testimonials-section relative z-10 w-full px-8 lg:px-14 py-28 bg-cover bg-center overflow-hidden border-t border-white/40"
          style={{ 
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url('/images/studybloom/testimonials-bg.webp')" 
          }}
        >
          <div className="max-w-[1320px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FFF0F5] text-[#FF758C] px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-pink-100 shadow-xs uppercase tracking-wider gsap-reveal-up">
              Student Stories
            </div>

            <h2 className="text-3xl lg:text-5xl font-serif text-[#1D1B20] tracking-tight mb-4 gsap-reveal-up">
              What Our Students Say
            </h2>

            <p className="text-gray-600 font-normal text-base lg:text-lg max-w-2xl mx-auto mb-16 leading-relaxed gsap-reveal-up">
              Real people. Real goals. Real results.
            </p>

            <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  quote: "StudyBloom replaced my anxiety with a calm daily plan. Breaking down physics into 40-minute gentle sessions changed everything for me.",
                  name: "Sultana A.",
                  role: "Science Student, Class 10",
                  avatarBg: "bg-pink-100 text-pink-600",
                  rating: 5
                },
                {
                  quote: "The interface is so peaceful and encouraging. Seeing my weekly percentage climb keeps me excited to open my laptop every morning.",
                  name: "Tanjim H.",
                  role: "SSC Candidate 2026",
                  avatarBg: "bg-purple-100 text-purple-600",
                  rating: 5
                },
                {
                  quote: "I used to procrastinate on math coaching homework. With the Today's Plan card and focus timer, I finish on time and with zero stress.",
                  name: "Nabila R.",
                  role: "High School Scholar",
                  avatarBg: "bg-rose-100 text-rose-600",
                  rating: 5
                }
              ].map((t, idx) => (
                <div 
                  key={idx}
                  className="testimonial-card bg-white/95 backdrop-blur-xl rounded-[28px] p-7 border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(255,117,140,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed italic font-serif mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.avatarBg}`}>
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1D1B20] leading-tight">{t.name}</h4>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION F — FINAL CALL TO ACTION (Uses /images/studybloom/future-cta-bg.webp) */}
        {/* ========================================================================= */}
        <section 
          id="cta"
          className="final-cta-section relative z-10 w-full px-8 lg:px-14 py-32 bg-cover bg-center overflow-hidden border-t border-white/40"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.4)), url('/images/studybloom/future-cta-bg.webp')" 
          }}
        >
          <div className="max-w-[900px] mx-auto text-center relative z-10 text-white gsap-reveal-up">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 drop-shadow-sm uppercase tracking-widest">
              🌸 Begin Your Academic Bloom
            </div>

            <h2 className="text-4xl lg:text-6xl font-serif text-white tracking-tight drop-shadow-md mb-4 leading-tight">
              Start Your Study Journey Today
            </h2>

            <p className="text-white/90 font-medium text-base lg:text-xl max-w-xl mx-auto mb-10 drop-shadow-sm">
              Small steps today, big dreams tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white text-[#2D2A32] font-bold text-base shadow-xl shadow-black/20 hover:scale-105 transition-all group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 text-[#2D2A32] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white font-semibold text-base hover:bg-white/30 transition-all"
              >
                Sign In to Account
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION G — FOOTER                                                       */}
        {/* ========================================================================= */}
        <footer className="relative z-10 w-full bg-[#FAF9F6] border-t border-pink-100/60 pt-20 pb-12 px-8 lg:px-14">
          <div className="max-w-[1320px] mx-auto flex flex-col">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
              {/* Brand Column */}
              <div className="max-w-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="text-[#FF758C]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C12 2 8 8 8 13C8 17.5 12 20 12 20C12 20 16 17.5 16 13C16 8 12 2 12 2Z" />
                      <path d="M12 20C9.5 20 4 17.5 3 13C2 9.5 5 7 5 7C5 7 6.5 11 9 13.5" />
                      <path d="M12 20C14.5 20 20 17.5 21 13C22 9.5 19 7 19 7C19 7 17.5 11 15 13.5" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-[#1D1B20]">
                    Study<span className="text-[#FF758C] font-editorial italic font-normal">Bloom</span>
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 leading-relaxed font-normal mb-6">
                  Cultivating a gentle, empowering, and focused study routine for ambitious students everywhere. Small steps every day.
                </p>

                {/* Social icons */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-400 hover:bg-[#FFF0F5] hover:text-[#FF758C] hover:border-pink-200 transition-colors cursor-pointer" aria-label="X (Twitter)">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-400 hover:bg-[#FFF0F5] hover:text-[#FF758C] hover:border-pink-200 transition-colors cursor-pointer" aria-label="Instagram">
                    <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-400 hover:bg-[#FFF0F5] hover:text-[#FF758C] hover:border-pink-200 transition-colors cursor-pointer" aria-label="YouTube">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Navigation Columns */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-14">
                {/* Quick Links */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-[#1D1B20] mb-1">Quick Links</h4>
                  <a href="#" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Home</a>
                  <a href="#study-plan" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Study Plan</a>
                  <a href="#features" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Resources</a>
                  <a href="#about" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">About</a>
                </div>

                {/* Features Links */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-[#1D1B20] mb-1">Platform Tools</h4>
                  <a href="#features" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Smart Study Planner</a>
                  <a href="#features" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">AI Study Assistant</a>
                  <a href="#features" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Class &amp; Exam Tracker</a>
                  <a href="#features" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Notes &amp; Resources</a>
                </div>

                {/* Account & Support */}
                <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
                  <h4 className="font-bold text-sm text-[#1D1B20] mb-1">Account</h4>
                  <Link href="/login" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Log In</Link>
                  <Link href="/signup" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Sign Up</Link>
                  <a href="#testimonials" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Student Stories</a>
                  <a href="#cta" className="text-xs text-gray-500 hover:text-[#FF758C] transition-colors font-medium">Get Started</a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full pt-8 border-t border-gray-200/70 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
              <p>© 2026 StudyBloom Inc. All rights reserved.</p>
              <p className="flex items-center gap-1.5">
                <span>Designed with</span>
                <Heart className="w-3.5 h-3.5 text-[#FF758C]" fill="#FF758C" />
                <span>for students worldwide.</span>
              </p>
            </div>
          </div>
        </footer>

      </div>

      {/* ---------------- MOBILE DASHBOARD ---------------- */}
      <main className="md:hidden px-5 flex flex-col gap-5 max-w-lg mx-auto">

        {/* Daily Companion Card */}
        <section className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md p-5 rounded-[28px] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full" />
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#FF758C] mb-3">
                <span>🌸</span> Daily Companion
              </div>
              <h2 className="text-2xl font-bold text-[#1D1B20] tracking-tight">Good Morning, <span className="text-[#FF758C] font-editorial italic font-normal">{userName}</span> 🌸</h2>
              <p className="text-sm text-gray-500 mt-1">Let's make today a little more productive.</p>
            </div>
            
            {/* 72% Progress Ring */}
            <div className="relative w-16 h-16 flex-shrink-0 mt-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#purple-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={264 * (1 - 0.72)} />
                <defs>
                  <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#FF758C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold">72%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Goal: <span className="font-bold">4h 30m</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FFF8E7] px-3 py-1.5 rounded-full text-sm font-bold text-amber-600 border border-amber-100">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> 12 Day Streak
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 text-center text-sm font-semibold text-[#FF758C] relative z-10">
            "You're doing great. Keep going!"
          </div>
        </section>

        {/* Focus Session Card */}
        <section className="bg-white/60 backdrop-blur-md p-5 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/50 flex flex-col items-center">
          <div className="w-full flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center text-lg">⏱️</div>
              <div>
                <h3 className="font-bold text-lg text-[#1D1B20]">Focus Session</h3>
                <p className="text-xs text-gray-400 font-medium">Pomodoro Interval</p>
              </div>
            </div>
            <div className="bg-[#FFF0F5] text-[#FF758C] px-3 py-1 rounded-full text-xs font-bold border border-pink-100">
              Chapter 7
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full mb-8">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                <circle 
                  ref={timerRingRef}
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="url(#timer-ring-grad)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeDasharray="264" 
                  strokeDashoffset={dashoffset} 
                />
                <defs>
                  <linearGradient id="timer-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#FF758C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-[#FF758C] tracking-widest">MATH</span>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-[42px] font-bold tracking-tight text-[#1D1B20] leading-none mb-2" style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatTime(timeLeft)}
              </h1>
              <p className="text-sm font-semibold text-gray-700">Math — Chapter 7</p>
              <p className="text-xs text-gray-400 font-medium">Trigonometry CQ Practice</p>
            </div>
          </div>

          <div className="w-full flex gap-3">
            <button 
              onClick={toggleTimer}
              className="flex-1 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-white py-3.5 rounded-full font-bold shadow-lg shadow-pink-200/50 hover:opacity-90 transition-opacity"
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button className="px-6 py-3.5 rounded-full font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors">
              Finish
            </button>
          </div>
        </section>

        {/* Timeline / Routine */}
        <section className="bg-white/60 backdrop-blur-md p-5 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/50 md:col-span-2">
          <div className="relative pt-2 pl-2">
            <div className="absolute left-[13px] top-4 bottom-4 w-0.5 bg-gray-100 rounded-full" />
            
            <div className="flex items-center gap-4 relative z-10 mb-6">
              <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white" />
              <div className="flex flex-1 justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-16">4:00 PM</span>
                  <span className="text-sm font-medium">Homework</span>
                </div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-500 px-2.5 py-1 rounded-md">Study</span>
              </div>
            </div>

            <div className="flex items-center gap-4 relative z-10 mb-6">
              <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white" />
              <div className="flex flex-1 justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-16">5:00 PM</span>
                  <span className="text-sm font-medium">Sir Class</span>
                </div>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-500 px-2.5 py-1 rounded-md">Tuition</span>
              </div>
            </div>

            <div className="flex items-center gap-4 relative z-10 mb-6">
              <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white" />
              <div className="flex flex-1 justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-16">8:30 PM</span>
                  <span className="text-sm font-medium">Class Revision</span>
                </div>
                <span className="text-[10px] font-bold bg-fuchsia-50 text-fuchsia-500 px-2.5 py-1 rounded-md">Review</span>
              </div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white" />
              <div className="flex flex-1 justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-16">9:35 PM</span>
                  <span className="text-sm font-medium">CQ / MCQ Practice</span>
                </div>
                <span className="text-[10px] font-bold bg-pink-50 text-pink-500 px-2.5 py-1 rounded-md">Exam Prep</span>
              </div>
            </div>
          </div>
        </section>

        {/* Small Cards Row */}
        <section className="grid grid-cols-2 gap-4 md:col-span-2">
          <div className="bg-gradient-to-br from-[#FF758C] to-[#8B5CF6] p-5 rounded-[24px] text-white shadow-lg shadow-purple-200/50 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">SSC EXAM</span>
              <span className="text-xl">📅</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-1">143</h1>
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-90">Days</p>
            </div>
            <p className="text-xs font-medium opacity-80 mt-4">Every small effort counts.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-md p-5 rounded-[24px] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 mb-3">
              <span className="text-sm">💗</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF758C]">Reminder</span>
            </div>
            <p className="text-[13px] font-medium text-gray-700 leading-relaxed mb-4">
              Don't try to finish everything today. Just complete today's goals.
            </p>
            <div className="flex justify-between items-end mt-auto">
              <span className="text-xs font-medium text-gray-400">Patience</span>
              <span className="text-lg opacity-80">🌸</span>
            </div>
          </div>
        </section>

        {/* Subject Mastery */}
        <section className="bg-white/60 backdrop-blur-md p-6 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/50 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm tracking-widest uppercase text-[#1D1B20]">Subject Mastery</h3>
            <span className="text-xs font-medium text-gray-400">Average 79.4%</span>
          </div>

          <div className="flex flex-col gap-5 mb-8">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Math</span>
                <span className="text-[#FF758C]">82%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-[#FF758C] h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Science</span>
                <span className="text-[#8B5CF6]">90%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-[#8B5CF6] h-full rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>English</span>
                <span className="text-blue-500">70%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FFF0F5] p-3 rounded-xl flex flex-col items-center justify-center border border-pink-50">
              <span className="text-[10px] font-bold text-[#FF758C] uppercase tracking-wider mb-1">Strongest</span>
              <span className="text-sm font-bold">Science (90%)</span>
            </div>
            <div className="bg-[#F3F4F6] p-3 rounded-xl flex flex-col items-center justify-center border border-gray-100">
              <span className="text-[10px] font-bold text-[#FF758C] uppercase tracking-wider mb-1">Attention</span>
              <span className="text-sm font-bold">English (70%)</span>
            </div>
          </div>
        </section>

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/70 backdrop-blur-xl border-t border-white/40 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_rgb(0,0,0,0.05)] md:hidden">
        <button className="flex flex-col items-center gap-0.5 text-[#FF758C]">
          <Home className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-gray-600 transition-colors">
          <Calendar className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Routine</span>
        </button>
        
        {/* Floating Action Button */}
        <div className="relative -top-6">
          <button className="w-12 h-12 bg-[#FF758C] rounded-full text-white flex items-center justify-center shadow-lg shadow-pink-300/50 hover:scale-105 transition-transform border-[3px] border-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <button className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-gray-600 transition-colors">
          <CheckSquare className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Tasks</span>
        </button>
        
        <div className="relative">
          {/* Profile Popup Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-16 right-0 w-40 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-[#FFF0F5] hover:text-[#FF758C] rounded-xl transition-colors">
                <LogIn className="w-4 h-4" /> Log In
              </Link>
              <Link href="/signup" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-[#FFF0F5] hover:text-[#FF758C] rounded-xl transition-colors">
                <UserPlus className="w-4 h-4" /> Sign Up
              </Link>
            </div>
          )}

          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex flex-col items-center gap-0.5 transition-colors ${showProfileMenu ? 'text-[#FF758C]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <User className="w-5 h-5" strokeWidth={2.5} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
