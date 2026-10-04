"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, X, Headphones, MessageCircle } from "lucide-react";

export default function SpeedDial({
  phoneNumber = "+8801940863413",
  whatsappNumber = "8801940863413",
  telegramUsername = "amrakinbosupport",
  facebookUrl = "https://www.facebook.com/SayedHasanDipto25",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Actions fanning out in a quarter-circle arc (Top-Left quadrant)
  // Distance R ~ 88px
  const actions = [
    {
      id: "a-whatsapp",
      label: "WhatsApp",
      x: -88,
      y: 0,
      href: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,
      delay: "120ms",
      bgColor: "hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29z" />
        </svg>
      ),
    },
    {
      id: "b-telegram",
      label: "Telegram",
      x: -76,
      y: -44,
      href: telegramUsername.startsWith("http")
        ? telegramUsername
        : `https://t.me/${telegramUsername}`,
      delay: "80ms",
      bgColor: "hover:bg-sky-50 dark:hover:bg-sky-950/40",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0088cc]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
    {
      id: "c-facebook",
      label: "Facebook",
      x: -44,
      y: -76,
      href: facebookUrl,
      delay: "40ms",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-950/40",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0084FF]">
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.12 7.15.16.14.26.35.27.57l.08 1.78c.04.81.88 1.34 1.62.99l1.98-.94c.18-.08.38-.1.57-.05.74.2 1.54.31 2.36.31 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.09 13.06l-2.54-2.71-4.96 2.71c-.55.3-1.17-.26-.95-.83l5.22-8.32c.3-.48.97-.53 1.35-.11l2.54 2.71 4.96-2.71c.55-.3 1.17.26.95.83l-5.22 8.32c-.3.48-.97.53-1.35.11z" />
        </svg>
      ),
    },
    {
      id: "d-phone",
      label: "Helpline",
      x: 0,
      y: -88,
      href: `tel:${phoneNumber}`,
      delay: "0ms",
      bgColor: "hover:bg-purple-50 dark:hover:bg-purple-950/40",
      icon: (
        <Phone className="w-5 h-5 text-[#7132c7] dark:text-purple-400" />
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-24 right-4 z-50 flex items-center select-none"
    >
      {/* "সাহায্য লাগবে ?" Text Pill (Visible when closed) */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`mr-3 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "opacity-0 pointer-events-none translate-x-3 scale-90"
            : "opacity-100 animate-pulse hover:animate-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <p>সাহায্য লাগবে ?</p>
      </div>

      {/* Relative container holding FAB and Radial Buttons */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Arc Action Buttons (A, B, C, D) */}
        {actions.map((act) => {
          return (
            <a
              key={act.id}
              href={act.href}
              target="_blank"
              rel="noopener noreferrer"
              title={act.label}
              aria-label={act.label}
              style={{
                transform: isOpen
                  ? `translate(${act.x}px, ${act.y}px) scale(1)`
                  : "translate(0px, 0px) scale(0.2)",
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
                transitionDuration: "280ms",
                transitionDelay: isOpen ? act.delay : "0ms",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className={`absolute group flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-lg ${act.bgColor} transition-transform hover:scale-115 active:scale-95`}
            >
              {act.icon}

              {/* Hover Tooltip Label */}
              <span className="absolute -top-7 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
                {act.label}
              </span>
            </a>
          );
        })}

        {/* Animated Radar Blink / Ping Wave when closed */}
        {!isOpen && (
          <>
            <span className="absolute w-full h-full rounded-full bg-[#7132c7] opacity-50 animate-ping pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-purple-400/40 opacity-40 animate-pulse pointer-events-none" />
          </>
        )}

        {/* Main Trigger Button "F" */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Customer Support Speed Dial"
          aria-expanded={isOpen}
          className={`w-14 h-14 rounded-full bg-[#7132c7] hover:bg-[#5f2ab0] text-white flex items-center justify-center shadow-xl transition-all duration-300 ring-2 ring-[#7132c7] ring-offset-2 ring-offset-white dark:ring-offset-slate-900 active:scale-95 z-10 ${
            isOpen
              ? "rotate-90 bg-slate-800 hover:bg-slate-900 ring-slate-800"
              : "animate-pulse"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Headphones className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>
      </div>
    </div>
  );
}
