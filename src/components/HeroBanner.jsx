"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa"; // react-icons ব্যবহার করলে ভালো দেখাবে

// যদি react-icons না থাকে, তবে নিচের SVG গুলো ব্যবহার করতে পারেন
const WAIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm4.52 13.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29z" />
  </svg>
);

const TGIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const DiamondIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 3L2 9l10 12L22 9l-4-6H6z" fill="#00d4ff" opacity="0.9" />
    <path
      d="M2 9h20M6 3l6 18M18 3l-6 18M2 9l4-6M22 9l-4-6"
      fill="none"
      stroke="#7df9ff"
      strokeWidth="0.5"
    />
  </svg>
);

const slides = [
  {
    id: 1,
    bg: "/gaming-banner.jpg",
    title: "ডাইমন্ড পেতে",
    highlight: "টেলিগ্রাম গ্রুপে",
    sub: "চলে আসুন",
    hrefLeft: "https://wa.me/8801940863413",
    hrefRight: "https://t.me/amrakinbosupport",
  },
  {
    id: 2,
    bg: "/gaming-banner.jpg",
    title: "সেরা দামে পান",
    highlight: "ফ্রি ফায়ার ডাইমন্ড",
    sub: "ইনস্ট্যান্ট ডেলিভারি",
    hrefLeft: "/topup/free-fire-topup-bd",
    hrefRight: "/topup",
  },
  {
    id: 3,
    bg: "/gaming-banner.jpg",
    title: "সাশ্রয়ী মূল্যে",
    highlight: "50% বোনাস ডাইমন্ড",
    sub: "সীমিত সময়ের অফার",
    hrefLeft: "https://wa.me/8801940863413",
    hrefRight: "https://t.me/amrakinbosupport",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5000;

  const goTo = useCallback(
    (idx) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(idx);
        setIsTransitioning(false);
      }, 400);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
    }, 50);
    const timer = setTimeout(() => goNext(), INTERVAL);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [current, goNext]);

  const slide = slides[current];

  return (
    // Mobile: Aspect ratio 16/9 (Horizontal), Desktop: 21/9 (Wider)
    <div className="relative w-full overflow-hidden rounded-2xl select-none aspect-[16/9] sm:aspect-[21/9] shadow-[0_0_20px_rgba(113,50,199,0.3)]">
      {/* Background Image & Overlays */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image focuses on Left Side */}
          <Image
            src={s.bg}
            alt={`Banner ${i + 1}`}
            fill
            className="object-cover object-left"
            priority={i === 0}
          />

          {/* Modern Overlay: Transparent on left (to show character), Dark on right (for text) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a0533]/60 to-[#1a0533]/95" />

          {/* Subtle Dot Matrix Pattern */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Glowing Accents (Modern vibe) */}
          <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-[#7132c7] rounded-full blur-[80px] sm:blur-[120px] opacity-40" />
          <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-cyan-500 rounded-full blur-[80px] sm:blur-[120px] opacity-20" />
        </div>
      ))}

      {/* Main Content Area (Right Aligned) */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-end transition-all duration-500 z-20 px-4 sm:px-8 lg:px-12 ${
          isTransitioning
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex flex-col items-end text-right">
          {/* Top Label (Optional, like in amrakinbo) */}
          <div className="hidden xs:flex items-center gap-1.5 mb-1.5 bg-white/10 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10">
            <DiamondIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <p className="text-white/80 text-[8px] sm:text-[10px] font-semibold tracking-widest uppercase font-sans">
              VTM TopUp
            </p>
          </div>

          {/* Modern 3D Headline */}
          <h2 className="font-bangla font-black leading-tight drop-shadow-2xl">
            <span className="block text-white text-xs sm:text-base lg:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {slide.title}
            </span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 text-xl sm:text-3xl lg:text-4xl my-0.5 sm:my-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
              style={{ WebkitTextStroke: "0.5px rgba(255,200,0,0.3)" }}
            >
              {slide.highlight}
            </span>
            <span className="block text-white text-sm sm:text-xl lg:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {slide.sub}
            </span>
          </h2>
        </div>
      </div>

      {/* Floating Circular Buttons (Bottom Right, slightly overlapping) */}
      <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-center gap-2 sm:gap-3 z-30">
        <a
          href={slide.hrefLeft}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <WAIcon />
        </a>
        <a
          href={slide.hrefRight}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-12 sm:h-12 bg-[#0088cc] rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_rgba(0,136,204,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Telegram"
        >
          <TGIcon />
        </a>
      </div>

      {/* Bottom Controls (Slider Dots) - Left aligned to avoid clashing with buttons */}
      <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 flex items-center gap-1.5 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-5 h-1.5 sm:w-8 sm:h-2 bg-gradient-to-r from-[#7132c7] to-cyan-400 shadow-[0_0_10px_rgba(113,50,199,0.8)]"
                : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar (Very bottom edge) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-black/40 z-30">
        <div
          className="h-full bg-gradient-to-r from-[#7132c7] to-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
