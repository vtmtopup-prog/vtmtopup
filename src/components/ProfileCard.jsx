"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function ProfileCard() {
  const { user, logout } = useAuth();

  // Dynamic values with exact fallback matching image
  const name = user?.name || user?.displayName || "ABIDUJJAMAN HARIS";
  const email = user?.email || "abidujjamanharis@gmail.com";
  const avatarUrl = user?.avatar || user?.photoURL || null;
  const joinDate = user?.joinDate || "Member since 31 July, 2026";
  const userId = user?.userId || (user?.uid ? user.uid.slice(0, 4) : "8938");
  const lifetimeSpend = user?.lifetimeSpend ?? "240 Tk";
  const balance = user?.balance ?? "0 Tk";
  const earnBalance = user?.earnBalance ?? "0 Tk";
  const coins = user?.coins ?? "40";

  return (
    <div className="relative w-full max-w-[390px] mx-auto rounded-[2.2rem] bg-[#070b09] border border-emerald-950/60 p-6 pt-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden select-none font-sans text-white">
      {/* ========================================================= */}
      {/* Diagonal Glowing Green Racing Stripes (Exact to reference) */}
      {/* ========================================================= */}
      <div
        className="pointer-events-none absolute -inset-y-20 -left-10 w-[140px] rotate-[22deg] bg-gradient-to-r from-emerald-600/25 via-emerald-500/30 to-transparent blur-md opacity-70"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        className="pointer-events-none absolute -inset-y-20 left-28 w-[80px] rotate-[22deg] bg-gradient-to-r from-emerald-500/20 via-emerald-400/25 to-transparent blur-lg opacity-60"
        style={{ mixBlendMode: "screen" }}
      />

      {/* ========================================================= */}
      {/* Top Right: Gold & Ruby Hexagon Gaming Star Rank Badge     */}
      {/* ========================================================= */}
      <div className="absolute -top-3 -right-3 w-40 h-44 pointer-events-none z-10 flex items-center justify-center">
        {/* SVG Recreation of the 3D Golden Hexagon with Ruby Inlay & Golden Star */}
        <svg
          viewBox="0 0 200 220"
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
        >
          <defs>
            {/* Outer Golden Metallic Bevel */}
            <linearGradient id="goldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D462" />
              <stop offset="25%" stopColor="#C99424" />
              <stop offset="50%" stopColor="#FFECA1" />
              <stop offset="75%" stopColor="#A87315" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            {/* Inner Ruby Gem Radial Gradient */}
            <radialGradient id="rubyInner" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="40%" stopColor="#9F1239" />
              <stop offset="85%" stopColor="#4C0519" />
              <stop offset="100%" stopColor="#1E010A" />
            </radialGradient>

            {/* 3D Star Golden Facets */}
            <linearGradient
              id="starFacetLight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFF1AA" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient
              id="starFacetDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>
          </defs>

          {/* Outer Hexagon Gold Frame */}
          <polygon
            points="100,10 180,55 180,150 100,195 20,150 20,55"
            fill="url(#goldOuter)"
            stroke="#854D0E"
            strokeWidth="3"
          />

          {/* Inner Hexagon Ruby Center */}
          <polygon
            points="100,24 167,62 167,143 100,181 33,143 33,62"
            fill="url(#rubyInner)"
            stroke="#FFEBA3"
            strokeWidth="1.5"
          />

          {/* "NO 8938" Serial on top of badge */}
          <text
            x="110"
            y="52"
            fill="#E2E8F0"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="2.5"
            opacity="0.65"
          >
            NO {userId}
          </text>

          {/* 3D Golden Star with facets */}
          <g transform="translate(100, 102)">
            {/* Center Star Outline / Glow */}
            <polygon
              points="0,-48 14,-15 48,-15 21,5 31,38 0,18 -31,38 -21,5 -48,-15 -14,-15"
              fill="url(#starFacetLight)"
              stroke="#FDE047"
              strokeWidth="1"
            />
            {/* Shaded facets for 3D realism */}
            <polygon
              points="0,-48 0,0 14,-15"
              fill="url(#starFacetDark)"
              opacity="0.65"
            />
            <polygon
              points="48,-15 0,0 21,5"
              fill="url(#starFacetDark)"
              opacity="0.75"
            />
            <polygon
              points="31,38 0,0 0,18"
              fill="url(#starFacetDark)"
              opacity="0.6"
            />
            <polygon
              points="-31,38 0,0 -21,5"
              fill="url(#starFacetDark)"
              opacity="0.8"
            />
            <polygon
              points="-48,-15 0,0 -14,-15"
              fill="url(#starFacetDark)"
              opacity="0.6"
            />
          </g>

          {/* Small Mini-Badge at the bottom corner of the hexagon */}
          <g transform="translate(162, 168) scale(0.7)">
            <polygon
              points="20,0 40,11 40,35 20,46 0,35 0,11"
              fill="url(#goldOuter)"
              stroke="#78350F"
              strokeWidth="2"
            />
            <polygon points="20,5 35,13 35,32 20,40 5,32 5,13" fill="#BE123C" />
            <polygon
              points="20,11 23,17 29,17 24,21 26,27 20,23 14,27 16,21 11,17 17,17"
              fill="#FDE047"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-20">
        {/* ========================================================= */}
        {/* 1. Header: MEMBER CARD Text                               */}
        {/* ========================================================= */}
        <div className="tracking-[0.25em] text-[11px] font-bold text-gray-400/90 uppercase font-mono">
          MEMBER CARD
        </div>

        {/* ========================================================= */}
        {/* 2. Avatar with Mint-Neon Double Ring                      */}
        {/* ========================================================= */}
        <div className="mt-4 inline-block">
          <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-[2.5px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {avatarUrl && avatarUrl !== "/default-avatar.png" ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    className="w-12 h-12 text-[#2d3748]"
                    strokeWidth={2.2}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. Badges: [V] Verified & LEVEL 1                          */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 mt-4">
          {/* Verified Badge with Orange-Gold V icon */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181c19] border border-white/10 shadow-sm">
            <span className="flex items-center justify-center w-4 h-4 rounded-[4px] bg-[#291804] border border-[#f59e0b] text-[#f59e0b] text-[9px] font-black leading-none">
              V
            </span>
            <span className="text-[11px] font-medium text-gray-200">
              Verified
            </span>
          </div>

          {/* LEVEL 1 Pill Badge */}
          <div className="px-3.5 py-1 rounded-lg bg-[#27c980] text-black text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_12px_rgba(39,201,128,0.35)]">
            LEVEL 1
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. User Name & Info                                       */}
        {/* ========================================================= */}
        <div className="mt-3.5">
          <h1 className="text-xl sm:text-[22px] font-black tracking-wide uppercase text-white font-sans drop-shadow-sm">
            {name}
          </h1>
          <p className="text-gray-400 text-xs mt-0.5 font-normal tracking-normal">
            {email}
          </p>
          <p className="text-gray-500 text-[11px] mt-1 font-normal">
            {joinDate}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 5. Stats Matrix (Rounded Box with Inner Borders)          */}
        {/* ========================================================= */}
        <div className="mt-5 rounded-2xl bg-[#0e1411]/90 border border-white/5 divide-y divide-white/5 overflow-hidden backdrop-blur-md">
          {/* Row 1: Lifetime Spend | Balance */}
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="p-3.5 sm:p-4">
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase block">
                LIFETIME SPEND
              </span>
              <span className="text-lg font-extrabold text-[#24c77c] mt-1 block tracking-tight">
                {lifetimeSpend}
              </span>
            </div>
            <div className="p-3.5 sm:p-4">
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase block">
                BALANCE
              </span>
              <span className="text-lg font-extrabold text-white mt-1 block tracking-tight">
                {balance}
              </span>
            </div>
          </div>

          {/* Row 2: Earn Balance | Coins */}
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="p-3.5 sm:p-4">
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase block">
                EARN BALANCE
              </span>
              <span className="text-lg font-extrabold text-white mt-1 block tracking-tight">
                {earnBalance}
              </span>
            </div>
            <div className="p-3.5 sm:p-4">
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase block">
                COINS
              </span>
              <span className="text-lg font-extrabold text-white mt-1 flex items-center gap-1.5 tracking-tight">
                <span>{coins}</span>
                {/* 3D Golden Coins Pile emoji / graphic */}
                <span className="text-base leading-none">🪙</span>
              </span>
            </div>
          </div>

          {/* Row 3: User ID | Empty cell for layout */}
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="p-3.5 sm:p-4">
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase block">
                USER ID
              </span>
              <span className="text-lg font-extrabold text-white mt-1 block tracking-tight font-mono">
                {userId}
              </span>
            </div>
            <div className="p-3.5 sm:p-4 bg-transparent" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 6. Bottom Action Buttons: Add Money & Logout              */}
        {/* ========================================================= */}
        <div className="flex items-center justify-end gap-2.5 mt-5">
          <Link
            href="/add-money"
            className="px-5 py-2.5 rounded-xl bg-[#24c77c] hover:bg-[#20b26e] text-black text-xs font-bold tracking-wide transition-all shadow-[0_4px_14px_rgba(36,199,124,0.35)] active:scale-95"
          >
            Add Money
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#151a17] hover:bg-[#1f2521] border border-white/5 text-gray-300 text-xs font-semibold transition-all active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5 text-gray-400 rotate-180" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
