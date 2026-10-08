"use client";

import React, { useState } from "react";
import {
  Star,
  Hexagon,
  ChevronLeft,
  ChevronRight,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react";

export default function RankingPage() {
  // Mock current user ranking data
  const [currentSpent, setCurrentSpent] = useState(0);
  const nextTarget = 10000;
  const progressPercent = Math.min(
    Math.max((currentSpent / nextTarget) * 100, 0),
    100
  );
  const remaining = Math.max(nextTarget - currentSpent, 0);

  // Rank journey steps
  const journeyRanks = [
    {
      id: 1,
      name: "LEVEL 1",
      req: "0 - 9,999 Tk",
      isCurrent: true,
      icon: Shield,
    },
    {
      id: 2,
      name: "LEVEL 2",
      req: "10,000+ Tk",
      isCurrent: false,
      icon: Star,
    },
    {
      id: 3,
      name: "LEVEL 3",
      req: "25,000+ Tk",
      isCurrent: false,
      icon: Sparkles,
    },
    {
      id: 4,
      name: "PREMIUM",
      req: "50,000+ Tk",
      isCurrent: false,
      icon: Crown,
    },
  ];

  // Mock transactions
  const transactions = [
    {
      id: 1,
      createdAt: "7 Oct 2026, 10:58 PM",
      trxId: "-",
      amount: "50 Tk",
      status: "pending",
    },
    {
      id: 2,
      createdAt: "5 Oct 2026, 04:12 PM",
      trxId: "TRX99281",
      amount: "100 Tk",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a1a13] text-white pt-24 pb-32 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        {/* Section 1: Your Rank Summary Card (Top) */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center">
          {/* Top Row: Large Rank Icon & Text */}
          <div className="flex items-center gap-5 w-full justify-center">
            {/* Hexagon Rank Badge with Star */}
            <div className="relative flex items-center justify-center shrink-0 w-20 h-20">
              <Hexagon
                className="w-20 h-20 text-emerald-500 fill-emerald-500/20 stroke-[1.5]"
              />
              <Star className="w-8 h-8 text-emerald-400 fill-emerald-400 absolute" />
            </div>

            {/* Rank Details */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 tracking-widest font-mono">
                YOUR RANK
              </span>
              <h1 className="text-3xl font-bold font-orbitron tracking-wide text-white leading-tight">
                LEVEL 1
              </h1>
              <span className="text-sm text-emerald-400 font-semibold mt-0.5">
                This month: {currentSpent.toLocaleString()} Tk
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/10 mt-5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Text Below Bar */}
          <span className="text-xs text-gray-400 mt-2 font-medium">
            {Math.round(progressPercent)}% to Level 2
          </span>
          <span className="text-xs text-gray-500 mt-1">
            Spend {remaining.toLocaleString()} Tk more to reach Level 2
          </span>
        </section>

        {/* Section 2: Rank Journey (Horizontal Stepper) */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <h2 className="text-lg font-bold mb-5 font-orbitron tracking-wide text-white">
            Rank Journey
          </h2>

          {/* Stepper with connecting line behind */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-white/10 z-0" />

            <div
              className="flex overflow-x-auto gap-6 pb-4 pt-1 snap-x scroll-smooth z-10 relative"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {journeyRanks.map((rank) => {
                const IconComponent = rank.icon;
                return (
                  <div
                    key={rank.id}
                    className="flex flex-col items-center min-w-[90px] snap-center relative shrink-0"
                  >
                    {/* Icon Container */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center relative transition-all duration-300 ${
                        rank.isCurrent
                          ? "bg-black/80 border-2 border-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500/20"
                          : "bg-black/60 border-2 border-white/10"
                      }`}
                    >
                      <IconComponent
                        className={`w-7 h-7 ${
                          rank.isCurrent ? "text-emerald-400" : "text-gray-500"
                        }`}
                      />

                      {/* NOW badge for current rank */}
                      {rank.isCurrent && (
                        <span className="bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full absolute -bottom-2 shadow-[0_0_10px_rgba(16,185,129,0.4)] uppercase tracking-wider">
                          NOW
                        </span>
                      )}
                    </div>

                    {/* Rank Label & Spend Req */}
                    <span
                      className={`text-sm font-semibold mt-3 ${
                        rank.isCurrent
                          ? "text-white font-orbitron"
                          : "text-gray-400"
                      }`}
                    >
                      {rank.name}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-0.5 font-medium">
                      {rank.req}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Recent Transactions (Table) */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4 font-orbitron tracking-wide text-white">
            Recent Transactions
          </h2>

          {/* Table Header */}
          <div className="grid grid-cols-4 text-xs text-gray-400 font-semibold pb-2 border-b border-white/10 px-1">
            <span>Created At</span>
            <span className="text-center">TrxId</span>
            <span className="text-center">Amount</span>
            <span className="text-right">Status</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/10">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-4 items-center text-xs sm:text-sm py-3.5 px-1"
              >
                <span className="text-gray-300 font-medium text-[11px] sm:text-xs">
                  {tx.createdAt}
                </span>
                <span className="text-center text-gray-400 font-mono text-xs">
                  {tx.trxId}
                </span>
                <span className="text-center text-emerald-400 font-semibold text-xs sm:text-sm">
                  {tx.amount}
                </span>
                <div className="flex justify-end">
                  <span
                    className={`capitalize font-semibold text-xs px-2.5 py-0.5 rounded-full ${
                      tx.status === "completed"
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <button
              type="button"
              disabled
              className="bg-white/5 text-gray-500 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-xs flex items-center gap-1 cursor-not-allowed opacity-60"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-gray-400 font-medium">Page 1 of 1</span>

            <button
              type="button"
              disabled
              className="bg-white/5 text-gray-500 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-xs flex items-center gap-1 cursor-not-allowed opacity-60"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
