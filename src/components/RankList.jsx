"use client";

import React, { useState } from "react";
import {
  Shield,
  Medal,
  Award,
  Crown,
  Flame,
  Zap,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function RankList() {
  const [userTotalSpent, setUserTotalSpent] = useState(50);

  const ranks = [
    {
      name: "Bronze",
      min: 0,
      max: 100,
      range: "0 - 100 Tk",
      icon: Shield,
      color: "text-amber-500",
      activeBg: "bg-amber-500/20 border-amber-500/40",
    },
    {
      name: "Silver",
      min: 101,
      max: 1000,
      range: "101 - 1,000 Tk",
      icon: Medal,
      color: "text-slate-300",
      activeBg: "bg-slate-300/20 border-slate-300/40",
    },
    {
      name: "Gold",
      min: 1001,
      max: 5000,
      range: "1,001 - 5,000 Tk",
      icon: Award,
      color: "text-yellow-400",
      activeBg: "bg-yellow-400/20 border-yellow-400/40",
    },
    {
      name: "Platinum",
      min: 5001,
      max: 10000,
      range: "5,001 - 10,000 Tk",
      icon: Shield,
      color: "text-cyan-400",
      activeBg: "bg-cyan-400/20 border-cyan-400/40",
    },
    {
      name: "Diamond",
      min: 10001,
      max: 25000,
      range: "10,001 - 25,000 Tk",
      icon: Crown,
      color: "text-blue-400",
      activeBg: "bg-blue-400/20 border-blue-400/40",
    },
    {
      name: "Heroic",
      min: 25001,
      max: 50000,
      range: "25,001 - 50,000 Tk",
      icon: Flame,
      color: "text-rose-500",
      activeBg: "bg-rose-500/20 border-rose-500/40",
    },
    {
      name: "Master",
      min: 50001,
      max: 100000,
      range: "50,001 - 100,000 Tk",
      icon: Crown,
      color: "text-purple-400",
      activeBg: "bg-purple-400/20 border-purple-400/40",
    },
    {
      name: "Grand Master",
      min: 100001,
      max: Infinity,
      range: "100,000+ Tk",
      icon: Crown,
      color: "text-amber-300",
      activeBg: "bg-amber-300/20 border-amber-300/40",
    },
  ];

  const handleSimulateTopUp = () => {
    setUserTotalSpent((prev) => prev + 500);
  };

  const handleReset = () => {
    setUserTotalSpent(50);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md mt-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-sm font-bold tracking-widest text-emerald-500 font-orbitron">
          RANK PROGRESS
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Total Spent:{" "}
          <span className="text-emerald-400 font-semibold font-mono">
            ৳ {userTotalSpent.toLocaleString()}
          </span>
        </p>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col">
        {ranks.map((rank, index) => {
          const isLast = index === ranks.length - 1;
          const isCurrent =
            userTotalSpent >= rank.min && userTotalSpent <= rank.max;
          const isUnlocked = userTotalSpent >= rank.min;
          const IconComponent = rank.icon;

          return (
            <div key={rank.name} className="relative flex items-start gap-4 pb-6 last:pb-0">
              {/* Left Column: Icon + Connecting Line */}
              <div className="relative flex flex-col items-center">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`absolute top-12 bottom-0 w-0.5 border-l-2 transition-colors duration-300 ${
                      userTotalSpent > rank.max
                        ? "border-emerald-500/50"
                        : "border-white/10"
                    }`}
                  />
                )}

                {/* Rank Icon Bubble */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCurrent
                      ? `${rank.activeBg} ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105`
                      : isUnlocked
                      ? "bg-white/10 border-white/20 text-gray-300"
                      : "bg-black/40 border-white/5 text-gray-600"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isCurrent
                        ? rank.color
                        : isUnlocked
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  />
                </div>
              </div>

              {/* Right Column: Text Details & Status Badge */}
              <div
                className={`flex-1 flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? "bg-white/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-black/20 border-white/5"
                }`}
              >
                <div>
                  <h3
                    className={`text-sm font-semibold tracking-wide ${
                      isCurrent
                        ? "text-white font-orbitron"
                        : isUnlocked
                        ? "text-gray-200"
                        : "text-gray-400"
                    }`}
                  >
                    {rank.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{rank.range}</p>
                </div>

                {/* Status Badge */}
                {isCurrent ? (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-3 h-3" />
                    Current
                  </span>
                ) : (
                  <span className="bg-white/5 text-gray-500 border border-white/10 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Actions */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 transition"
        >
          Reset (50 Tk)
        </button>

        <button
          type="button"
          onClick={handleSimulateTopUp}
          className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.15)]"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Simulate Top Up +500 Tk</span>
        </button>
      </div>
    </div>
  );
}
