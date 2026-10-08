"use client";

import React, { useState } from "react";
import { Shield, ArrowRight, Zap, Trophy } from "lucide-react";

export default function RankProgress() {
  const [currentSpent, setCurrentSpent] = useState(240);
  const nextRankTarget = 1000;

  // Calculate percentage dynamically, bounded between 0 and 100
  const progressPercent = Math.min(
    Math.max((currentSpent / nextRankTarget) * 100, 0),
    100
  );

  const remaining = Math.max(nextRankTarget - currentSpent, 0);

  const handleSimulateTopUp = () => {
    setCurrentSpent((prev) => prev + 100);
  };

  return (
    <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md mt-6">
      {/* Header */}
      <div className="flex row justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-bold tracking-widest text-emerald-500 font-orbitron">
            YOUR RANK
          </span>
        </div>
        <span className="text-xs text-gray-400 font-mono tracking-wider">
          VIP TIER
        </span>
      </div>

      {/* Current & Next Rank Display */}
      <div className="flex items-center justify-between bg-black/30 border border-white/5 rounded-xl px-4 py-3">
        {/* Current Rank */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
              Current Tier
            </span>
            <span className="text-sm font-bold text-amber-400 font-orbitron tracking-wide">
              BRONZE
            </span>
          </div>
        </div>

        {/* Central Arrow Divider */}
        <div className="flex items-center gap-1 text-gray-500 px-2">
          <div className="w-6 sm:w-10 h-px bg-white/10" />
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="w-6 sm:w-10 h-px bg-white/10" />
        </div>

        {/* Next Rank */}
        <div className="flex items-center gap-2.5 text-right">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
              Next Tier
            </span>
            <span className="text-sm font-bold text-cyan-300 font-orbitron tracking-wide">
              SILVER
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Shield className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/10 mt-4 relative">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Status Details & Text Below Bar */}
      <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
        <span>
          Spent: <span className="text-emerald-400 font-semibold">{currentSpent} Tk</span>
        </span>
        <span>
          Goal: <span className="text-gray-300 font-semibold">{nextRankTarget} Tk</span> ({Math.round(progressPercent)}%)
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        {remaining > 0 ? (
          <>
            Spend <span className="text-emerald-400 font-semibold">{remaining} Tk</span> more to reach Silver Rank!
          </>
        ) : (
          <span className="text-emerald-400 font-semibold">
            🎉 Silver Rank unlocked! Congratulations!
          </span>
        )}
      </p>

      {/* Simulation / Testing button */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
        <button
          type="button"
          onClick={handleSimulateTopUp}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Simulate Top Up +100 Tk</span>
        </button>
      </div>
    </div>
  );
}
