"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Crown, Gem, ArrowLeft, Shield, Sparkles, Flame, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LeaderboardPage() {
  const { leaderboard, currentUser } = useApp();

  const rank1 = leaderboard.find((p) => p.rank === 1);
  const rank2 = leaderboard.find((p) => p.rank === 2);
  const rank3 = leaderboard.find((p) => p.rank === 3);
  const rest = leaderboard.filter((p) => p.rank > 3);

  // Check current user's rank
  const myRank = leaderboard.find(
    (p) => p.userId === currentUser?.id || p.name.includes(currentUser?.name || "")
  );

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 pt-8 pb-32 px-4 selection:bg-emerald-500 selection:text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation & Live Badge */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>লাইভ লিডারবোর্ড</span>
          </span>
        </div>

        {/* Header Title Banner */}
        <div className="text-center pt-2 pb-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-3 shadow-lg shadow-amber-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white uppercase font-orbitron">
            VTM TOP GAMERS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            শীর্ষ ১০ ডায়মন্ড ক্রেতা ও প্লেয়ারদের অফিসিয়াল লিডারবোর্ড
          </p>
        </div>

        {/* My Position Card */}
        {currentUser && (
          <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                #{myRank ? myRank.rank : "10+"}
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold tracking-wider">
                  আমার বর্তমান র‍্যাঙ্ক
                </span>
                <p className="text-sm font-bold text-white">{currentUser.name}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">মোট ডায়মন্ড</span>
              <span className="text-base font-extrabold text-cyan-300 flex items-center gap-1 justify-end">
                <Gem className="w-4 h-4 text-cyan-400" />
                {(currentUser.diamonds || 0).toLocaleString()} 💎
              </span>
            </div>
          </div>
        )}

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-4 pb-2">
          {/* Rank 2 (Silver) */}
          {rank2 && (
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center shadow-md relative min-h-[190px] justify-between">
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-300 text-slate-950 mb-2">
                #2 Silver
              </span>
              <div className="w-12 h-12 rounded-full border-2 border-slate-300 overflow-hidden bg-slate-800 flex items-center justify-center mb-1">
                {rank2.avatar && rank2.avatar.startsWith("http") ? (
                  <img src={rank2.avatar} alt={rank2.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{rank2.avatar || "🔥"}</span>
                )}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white line-clamp-1">{rank2.name}</h3>
                <span className="text-[10px] font-mono text-slate-400 block">UID: {rank2.uid}</span>
              </div>
              <span className="text-xs font-extrabold text-cyan-300 mt-2 block">
                {(rank2.diamonds || 0).toLocaleString()} 💎
              </span>
            </div>
          )}

          {/* Rank 1 (Gold - Center & Taller) */}
          {rank1 && (
            <div className="bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-400/70 rounded-2xl p-4 flex flex-col items-center text-center shadow-xl shadow-amber-500/10 relative min-h-[220px] justify-between -translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-black uppercase flex items-center gap-1 shadow-md">
                <Crown className="w-3.5 h-3.5 fill-slate-950" />
                <span>#1 Champion</span>
              </div>

              <div className="w-16 h-16 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center mt-3 mb-1 shadow-lg shadow-amber-400/20">
                {rank1.avatar && rank1.avatar.startsWith("http") ? (
                  <img src={rank1.avatar} alt={rank1.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">{rank1.avatar || "👑"}</span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white line-clamp-1">{rank1.name}</h3>
                <span className="text-[11px] font-mono text-amber-300 font-semibold block">UID: {rank1.uid}</span>
              </div>

              <span className="text-sm font-black text-amber-300 mt-2 block">
                {(rank1.diamonds || 0).toLocaleString()} 💎
              </span>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {rank3 && (
            <div className="bg-slate-900/90 border border-amber-700/60 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center shadow-md relative min-h-[190px] justify-between">
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-600 text-white mb-2">
                #3 Bronze
              </span>
              <div className="w-12 h-12 rounded-full border-2 border-amber-600 overflow-hidden bg-slate-800 flex items-center justify-center mb-1">
                {rank3.avatar && rank3.avatar.startsWith("http") ? (
                  <img src={rank3.avatar} alt={rank3.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{rank3.avatar || "⚡"}</span>
                )}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white line-clamp-1">{rank3.name}</h3>
                <span className="text-[10px] font-mono text-slate-400 block">UID: {rank3.uid}</span>
              </div>
              <span className="text-xs font-extrabold text-cyan-300 mt-2 block">
                {(rank3.diamonds || 0).toLocaleString()} 💎
              </span>
            </div>
          )}
        </div>

        {/* Rest of the Top 10 Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800 text-xs text-slate-400 font-semibold uppercase">
            <span>র‍্যাঙ্ক ও প্লেয়ার</span>
            <span>ক্রয়কৃত স্কোর</span>
          </div>

          <div className="space-y-2">
            {rest.map((player) => (
              <div
                key={player.rank}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 font-mono">
                    #{player.rank}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{player.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500">UID: {player.uid}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    {player.tier}
                  </span>
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 font-mono">
                    <Gem className="w-3.5 h-3.5 text-cyan-400" />
                    {(player.diamonds || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
