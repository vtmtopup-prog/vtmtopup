"use client";

import React from "react";
import { CheckCircle2, Diamond, Box, Clock, XCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";

// Taka (৳) currency icon
function TakaIcon({ className = "" }) {
  return <span className={`font-bangla font-bold ${className}`}>৳</span>;
}

function OrderCard({ order }) {
  const initial = (order.user || "Player").charAt(0).toUpperCase();
  const isCompleted = order.status === "Completed";
  const isCancelled = order.status === "Cancelled";
  const isPending = order.status === "Pending";

  return (
    <div className="flex items-center justify-between bg-sky-100/30 backdrop-blur-xl rounded-2xl p-3 shadow-[0_8px_32px_0_rgba(0,120,255,0.1)] border border-white/80 hover:bg-sky-100/50 hover:shadow-[0_8px_32px_0_rgba(0,120,255,0.15)] transition-all duration-300">
      {/* Left: Avatar */}
      <div className="shrink-0 mr-3">
        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">{initial}</span>
        </div>
      </div>

      {/* Middle: Order details */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[10px] text-gray-400 font-mono leading-none mb-0.5">
          Order #{order.id}
        </span>
        <span className="text-sm font-semibold text-gray-800 truncate leading-snug">
          {order.user}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <Diamond className="w-3 h-3 text-cyan-500 fill-cyan-200" />
          <span className="text-xs text-gray-600 font-medium truncate">
            {order.item}
          </span>
        </div>
      </div>

      {/* Right: Price & Status */}
      <div className="flex flex-col items-end shrink-0 ml-2">
        <div className="flex items-center gap-0.5">
          <span className="text-base font-bold text-gray-800">
            {order.amount}
          </span>
          <TakaIcon className="text-base text-gray-700" />
        </div>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 mt-1 font-semibold text-[10px] tracking-wide ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : isCancelled
              ? "bg-rose-100 text-rose-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isCompleted && <CheckCircle2 className="w-3 h-3 text-green-600" />}
          {isCancelled && <XCircle className="w-3 h-3 text-rose-600" />}
          {isPending && <Clock className="w-3 h-3 text-amber-600" />}
          <span>{isCompleted ? "COMPLETE" : isCancelled ? "CANCELLED" : "PENDING"}</span>
        </div>
      </div>
    </div>
  );
}

export default function LatestOrders() {
  const { orders } = useApp();

  return (
    <section className="w-full py-8 px-3 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/60 via-emerald-50/30 to-white/90 -z-10" />

      {/* Decorative blurred orbs */}
      <div className="absolute top-16 right-1/4 w-56 h-56 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-16 left-1/4 w-48 h-48 bg-teal-100/25 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold font-orbitron tracking-wide text-teal-700">
          <span className="text-teal-400 mr-1">|</span>
          Live Recent Orders
          <span className="text-teal-400 ml-1">|</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-medium">সরাসরি লাইভ ডাটাবেজ থেকে আপডেট হচ্ছে</p>
      </div>

      {/* Orders list */}
      <div className="max-w-md mx-auto flex flex-col gap-3">
        {orders.slice(0, 8).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
