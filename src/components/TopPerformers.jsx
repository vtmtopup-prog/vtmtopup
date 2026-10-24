"use client";

import React from "react";
import { Crown } from "lucide-react";
import { Avatar } from "@heroui/react";

// Taka (৳) currency icon component
function TakaIcon({ className = "" }) {
  return <span className={`font-bangla font-bold ${className}`}>৳</span>;
}

// Diamond separator icon
function DiamondIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="currentColor"
      className={`w-2.5 h-2.5 ${className}`}
    >
      <path d="M6 0L12 6L6 12L0 6Z" />
    </svg>
  );
}

// Podium card component
function PodiumCard({ rank, name, score, level, image, className = "" }) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;
  const isThird = rank === 3;

  // Border/ring colors per rank
  const avatarBorderColor = isFirst
    ? "border-amber-400"
    : isSecond
      ? "border-teal-500"
      : "border-amber-700";

  const avatarDashColor = isFirst
    ? "stroke-amber-400"
    : isSecond
      ? "stroke-teal-500"
      : "stroke-amber-700";

  // Badge colors
  const badgeBg = isFirst
    ? "bg-amber-400 text-amber-900"
    : isSecond
      ? "bg-teal-500 text-white"
      : "bg-amber-600 text-white";

  // Card glow for rank #1
  const cardGlow = isFirst
    ? "shadow-[0_0_40px_rgba(251,191,36,0.20),0_0_80px_rgba(251,191,36,0.08)]"
    : "shadow-lg shadow-black/5";

  // Card background
  const cardBg = isFirst
    ? "bg-gradient-to-b from-amber-50/80 via-yellow-50/60 to-white/90"
    : "bg-white/80";

  // Card size — rank 1 is taller
  const cardHeight = isFirst ? "min-h-[280px]" : "min-h-[250px]";
  const cardMarginTop = isFirst ? "mt-0" : "mt-8";

  // Avatar size
  const avatarSize = isFirst ? "w-[88px] h-[88px]" : "w-[72px] h-[72px]";
  const dashedCircleSize = isFirst ? 104 : 88;
  const dashedCircleStroke = isFirst ? 2.5 : 2;

  return (
    <div
      className={`relative flex flex-col items-center rounded-[22px] px-3 pt-5 pb-5 backdrop-blur-xl border border-white/60 transition-all duration-500 ${cardBg} ${cardGlow} ${cardHeight} ${cardMarginTop} ${className}`}
    >
      {/* Crown icon for rank 1 */}
      {isFirst && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-amber-100 border-2 border-amber-300 rounded-full p-1.5 shadow-md shadow-amber-200/50">
            <Crown className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
        </div>
      )}

      {/* Floating rank badge */}
      <div
        className={`absolute ${isFirst ? "top-2" : "-top-3"} left-1/2 -translate-x-1/2 z-10`}
      >
        <span
          className={`inline-flex items-center justify-center text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md ${badgeBg}`}
        >
          #{rank}
        </span>
      </div>

      {/* Avatar with dashed circular border */}
      <div className={`relative ${isFirst ? "mt-5" : "mt-3"} mb-2`}>
        {/* Dashed circle SVG ring */}
        <svg
          width={dashedCircleSize}
          height={dashedCircleSize}
          viewBox={`0 0 ${dashedCircleSize} ${dashedCircleSize}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        >
          <circle
            cx={dashedCircleSize / 2}
            cy={dashedCircleSize / 2}
            r={dashedCircleSize / 2 - 3}
            fill="none"
            className={avatarDashColor}
            strokeWidth={dashedCircleStroke}
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner solid ring + avatar */}
        <div
          className={`relative z-10 rounded-full p-[3px] border-2 ${avatarBorderColor} bg-white`}
        >
          <Avatar
            src={image}
            name={name}
            className={`${avatarSize} text-large object-cover`}
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-sm font-bold text-slate-800 text-center mt-1.5 leading-snug line-clamp-2 max-w-[120px]">
        {name}
      </h3>

      {/* Level pill */}
      <span className="mt-2 inline-flex items-center bg-emerald-100/80 text-emerald-700 text-[10px] font-bold px-3 py-0.5 rounded-full border border-emerald-200/60 tracking-wide uppercase">
        {level}
      </span>

      {/* Score */}
      <div className="flex items-center gap-1.5 mt-3">
        <span
          className={`font-extrabold tracking-tight ${
            isFirst ? "text-2xl text-amber-700" : "text-xl text-slate-700"
          }`}
        >
          {score}
        </span>
        <TakaIcon
          className={`${
            isFirst ? "text-2xl text-amber-600" : "text-xl text-slate-500"
          }`}
        />
      </div>

      {/* Subtitle name (smaller, below score) */}
      <p className="text-[10px] text-slate-400 font-medium mt-1 text-center line-clamp-1 max-w-[110px]">
        {name}
      </p>
    </div>
  );
}

import { useApp } from "@/context/AppContext";

export default function TopPerformers() {
  const { leaderboard } = useApp();

  // Extract top 3 leaders in podium order: Rank 2 (left), Rank 1 (center), Rank 3 (right)
  const rank1 = leaderboard.find((p) => p.rank === 1) || {
    rank: 1,
    name: "অপেক্ষমান",
    score: "0",
    level: "LEVEL 1",
    avatar: "https://i.ibb.co.com/ymYj65ML/passport-size.png",
  };
  const rank2 = leaderboard.find((p) => p.rank === 2) || {
    rank: 2,
    name: "অপেক্ষমান",
    score: "0",
    level: "LEVEL 1",
    avatar: "https://i.ibb.co.com/jpSSsfZ/IMG-4937.jpg",
  };
  const rank3 = leaderboard.find((p) => p.rank === 3) || {
    rank: 3,
    name: "অপেক্ষমান",
    score: "0",
    level: "LEVEL 1",
    avatar: "https://i.ibb.co.com/bDB67GX/image.png",
  };

  const performers = [
    {
      rank: 2,
      name: rank2.name,
      score: (rank2.diamonds || 0).toLocaleString(),
      level: rank2.level || "LEVEL 2",
      image: rank2.avatar && rank2.avatar.startsWith("http") ? rank2.avatar : "https://i.ibb.co.com/jpSSsfZ/IMG-4937.jpg",
    },
    {
      rank: 1,
      name: rank1.name,
      score: (rank1.diamonds || 0).toLocaleString(),
      level: rank1.level || "PREMIUM",
      image: rank1.avatar && rank1.avatar.startsWith("http") ? rank1.avatar : "https://i.ibb.co.com/ymYj65ML/passport-size.png",
    },
    {
      rank: 3,
      name: rank3.name,
      score: (rank3.diamonds || 0).toLocaleString(),
      level: rank3.level || "LEVEL 1",
      image: rank3.avatar && rank3.avatar.startsWith("http") ? rank3.avatar : "https://i.ibb.co.com/bDB67GX/image.png",
    },
  ];

  return (
    <section className="w-full py-10 px-3 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-white/90 -z-10" />

      {/* Decorative soft circles */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-teal-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-100/15 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-6 max-w-lg mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold font-orbitron tracking-[0.15em] text-emerald-800 uppercase">
          Top Performers
        </h2>
        <div className="mt-1.5 mx-auto w-16 h-0.5 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
        <p className="text-[11px] text-emerald-700/80 mt-1 font-medium">লাইভ ডায়মন্ড লিডারবোর্ড থেকে সংগৃহীত</p>
      </div>

      {/* Podium Container */}
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 items-end">
          {performers.map((performer) => (
            <PodiumCard
              key={performer.rank}
              rank={performer.rank}
              name={performer.name}
              score={performer.score}
              level={performer.level}
              image={performer.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
