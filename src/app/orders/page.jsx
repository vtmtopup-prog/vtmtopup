"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Zap,
  Gem,
  Crown,
  Copy,
  Check,
} from "lucide-react";
import { TbHomeFilled } from "react-icons/tb";
import { BsCartCheckFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { TiClipboard } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [copiedUid, setCopiedUid] = useState(null);

  // Mock orders data
  const orders = [
    {
      id: "#ORD-8938",
      date: "10 Oct 2026, 2:45 PM",
      itemName: "Weekly Membership",
      playerUid: "123456789",
      amount: "240 Tk",
      status: "Completed",
      type: "membership",
    },
    {
      id: "#ORD-8939",
      date: "09 Oct 2026, 6:15 PM",
      itemName: "1080 Diamonds",
      playerUid: "987654321",
      amount: "800 Tk",
      status: "Pending",
      type: "diamonds",
    },
    {
      id: "#ORD-8940",
      date: "08 Oct 2026, 11:30 AM",
      itemName: "Monthly Membership",
      playerUid: "456789123",
      amount: "950 Tk",
      status: "Completed",
      type: "membership",
    },
    {
      id: "#ORD-8941",
      date: "07 Oct 2026, 04:20 PM",
      itemName: "520 Diamonds",
      playerUid: "321654987",
      amount: "410 Tk",
      status: "Failed",
      type: "diamonds",
    },
  ];

  const tabs = [
    { name: "All", count: orders.length },
    {
      name: "Pending",
      count: orders.filter((o) => o.status === "Pending").length,
    },
    {
      name: "Completed",
      count: orders.filter((o) => o.status === "Completed").length,
    },
    {
      name: "Failed",
      count: orders.filter((o) => o.status === "Failed").length,
    },
  ];

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter(
          (order) => order.status.toLowerCase() === activeTab.toLowerCase(),
        );

  const handleCopyUid = (uid, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(uid);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
          dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
        };
      case "Pending":
        return {
          bg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
          dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse",
          icon: <Clock className="w-3 h-3 text-amber-400" />,
        };
      case "Failed":
        return {
          bg: "bg-rose-500/10 border-rose-500/25 text-rose-400",
          dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
          icon: <XCircle className="w-3 h-3 text-rose-400" />,
        };
      default:
        return {
          bg: "bg-gray-500/10 border-gray-500/20 text-gray-400",
          dot: "bg-gray-400",
          icon: null,
        };
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b09] text-white pt-20 pb-28 px-3.5 sm:px-6 overflow-hidden selection:bg-emerald-500 selection:text-black font-sans">
      {/* ========================================================= */}
      {/* Diagonal Ambient Light Streaks (Matching ProfileCard)     */}
      {/* ========================================================= */}
      <div
        className="pointer-events-none fixed -top-32 -left-20 w-[240px] h-[600px] rotate-[25deg] bg-gradient-to-r from-emerald-600/15 via-emerald-500/20 to-transparent blur-2xl opacity-60"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        className="pointer-events-none fixed top-1/4 -right-24 w-[200px] h-[500px] -rotate-[20deg] bg-gradient-to-l from-emerald-500/15 via-teal-400/15 to-transparent blur-3xl opacity-50"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* ========================================================= */}
        {/* 1. Mobile-Optimized Header                                */}
        {/* ========================================================= */}
        <div className="text-center pt-2 pb-5 sm:pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono uppercase tracking-wider mb-2.5">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>Instant Topup History</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 tracking-wider">
            My Orders
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xs sm:max-w-md mx-auto">
            Track and verify your recent game top-up orders
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. Mobile-First Scrollable Segmented Filter Tabs          */}
        {/* ========================================================= */}
        <div className="mb-6 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 bg-[#0e1411]/90 sm:w-fit sm:mx-auto rounded-full border border-white/5 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#27c980] text-black shadow-[0_0_15px_rgba(39,201,128,0.45)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-black/20 text-black font-bold"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. Empty State                                            */}
        {/* ========================================================= */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-[1.8rem] bg-[#0c120f] border border-white/5 p-8 sm:p-12 text-center backdrop-blur-md max-w-sm mx-auto shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(39,201,128,0.2)]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mb-1 font-orbitron">
              No Orders Found
            </h2>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              {activeTab === "All"
                ? "You haven't placed any top-up orders yet. Get diamonds instantly!"
                : `You don't have any ${activeTab.toLowerCase()} orders at the moment.`}
            </p>
            <Link
              href="/topup"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#27c980] hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(39,201,128,0.35)] active:scale-95"
            >
              <span>Top Up Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <>
            {/* ========================================================= */}
            {/* 4. Mobile View (Gaming Spec Cards - < md)                */}
            {/* ========================================================= */}
            <div className="md:hidden flex flex-col gap-3.5">
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                const isDiamonds = order.type === "diamonds";

                return (
                  <div
                    key={order.id}
                    className="relative overflow-hidden rounded-[1.4rem] bg-[#0b110e] border border-emerald-950/70 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.7)] transition-all active:scale-[0.99]"
                  >
                    {/* Top ambient highlight on card */}
                    <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />

                    {/* Card Header: Order ID + Status Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-emerald-400 tracking-wide">
                          {order.id}
                        </span>
                      </div>
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.bg}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}
                        />
                        <span>{order.status}</span>
                      </div>
                    </div>

                    {/* Card Body: Item Icon + Item Name + Price */}
                    <div className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Gaming Item Thumbnail Icon */}
                        <div className="w-10 h-10 rounded-xl bg-[#141d18] border border-white/5 flex items-center justify-center shrink-0 shadow-inner">
                          {isDiamonds ? (
                            <Gem className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <Crown className="w-5 h-5 text-amber-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
                            {order.itemName}
                          </h3>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {order.date}
                          </p>
                        </div>
                      </div>

                      {/* Highlighted Price Badge */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-wider">
                          Amount
                        </span>
                        <span className="text-base font-extrabold text-[#27c980] tracking-tight">
                          {order.amount}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Player UID with 1-Tap Copy */}
                    <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between bg-black/25 -mx-4 -mb-4 px-4 py-2.5 rounded-b-[1.4rem]">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-gray-500 font-mono text-[11px]">
                          PLAYER UID:
                        </span>
                        <span className="font-mono font-bold text-gray-200 tracking-wider">
                          {order.playerUid}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleCopyUid(order.playerUid, e)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 active:scale-90 transition-transform bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 cursor-pointer"
                        title="Copy Player UID"
                      >
                        {copiedUid === order.playerUid ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-emerald-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================================= */}
            {/* 5. Desktop View (Glassmorphic Spec Table - md and up)     */}
            {/* ========================================================= */}
            <div className="hidden md:block rounded-[1.8rem] bg-[#0b110e] border border-emerald-950/70 overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-black/30 text-[11px] font-bold text-gray-400 uppercase font-mono tracking-wider">
                      <th className="py-4 px-6">Order ID</th>
                      <th className="py-4 px-6">Package</th>
                      <th className="py-4 px-6">Player UID</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05] text-sm">
                    {filteredOrders.map((order) => {
                      const badge = getStatusBadge(order.status);
                      const isDiamonds = order.type === "diamonds";

                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Order ID */}
                          <td className="py-4 px-6 font-mono font-bold text-emerald-400 text-xs whitespace-nowrap">
                            {order.id}
                          </td>

                          {/* Item Package */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#141d18] border border-white/5 flex items-center justify-center shrink-0">
                                {isDiamonds ? (
                                  <Gem className="w-4 h-4 text-cyan-400" />
                                ) : (
                                  <Crown className="w-4 h-4 text-amber-400" />
                                )}
                              </div>
                              <span className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                                {order.itemName}
                              </span>
                            </div>
                          </td>

                          {/* Player UID with Copy */}
                          <td className="py-4 px-6 font-mono text-xs text-gray-300 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={(e) => handleCopyUid(order.playerUid, e)}
                              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors group/uid cursor-pointer"
                              title="Click to copy UID"
                            >
                              <span>{order.playerUid}</span>
                              {copiedUid === order.playerUid ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3 opacity-40 group-hover/uid:opacity-100 transition-opacity" />
                              )}
                            </button>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-6 text-xs text-gray-400 whitespace-nowrap">
                            {order.date}
                          </td>

                          {/* Amount */}
                          <td className="py-4 px-6 font-extrabold text-[#27c980] whitespace-nowrap text-base">
                            {order.amount}
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}
                              />
                              <span>{order.status}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
