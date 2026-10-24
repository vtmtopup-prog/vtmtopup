"use client";

import React from "react";
import { CheckCircle2, Diamond, Box } from "lucide-react";

// Taka (৳) currency icon
function TakaIcon({ className = "" }) {
  return <span className={`font-bangla font-bold ${className}`}>৳</span>;
}

// Mock order data
const orders = [
  {
    id: "001",
    name: "Abid",
    item: "630 Diamond",
    itemIcon: "diamond",
    price: "388",
    status: "COMPLETE",
    avatarColor: "bg-teal-500",
  },
  {
    id: "002",
    name: "Yeamin",
    item: "400 Diamond",
    itemIcon: "diamond",
    price: "285",
    status: "COMPLETE",
    avatarColor: "bg-amber-500",
  },
  {
    id: "003",
    name: "Sohel Rana",
    item: "Weekly 2X",
    itemIcon: "box",
    price: "316",
    status: "COMPLETE",
    avatarColor: "bg-blue-500",
  },
  {
    id: "004",
    name: "MD YEAMIN",
    item: "Weekly Lite",
    itemIcon: "box",
    price: "45",
    status: "COMPLETE",
    avatarColor: "bg-purple-500",
  },
  {
    id: "005",
    name: "Akash Ahmed",
    item: "115 Diamond",
    itemIcon: "diamond",
    price: "76",
    status: "COMPLETE",
    avatarColor: "bg-green-500",
  },
  {
    id: "006",
    name: "Rifat Hasan",
    item: "610 Diamond",
    itemIcon: "diamond",
    price: "388",
    status: "COMPLETE",
    avatarColor: "bg-red-500",
  },
  {
    id: "007",
    name: "Badol Rana",
    item: "Weekly",
    itemIcon: "box",
    price: "151",
    status: "COMPLETE",
    avatarColor: "bg-indigo-500",
  },
  {
    id: "008",
    name: "Nayeem Islam",
    item: "250 Diamond",
    itemIcon: "diamond",
    price: "155",
    status: "COMPLETE",
    avatarColor: "bg-orange-500",
  },
  {
    id: "009",
    name: "Tr Rifat",
    item: "Weekly 2X",
    itemIcon: "box",
    price: "316",
    status: "COMPLETE",
    avatarColor: "bg-teal-600",
  },
  {
    id: "010",
    name: "Jahid Hasan",
    item: "1240 Diamond",
    itemIcon: "diamond",
    price: "765",
    status: "COMPLETE",
    avatarColor: "bg-emerald-600",
  },
];

function OrderCard({ order }) {
  const initial = order.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between bg-sky-100/30 backdrop-blur-xl rounded-2xl p-3 shadow-[0_8px_32px_0_rgba(0,120,255,0.1)] border border-white/80 hover:bg-sky-100/50 hover:shadow-[0_8px_32px_0_rgba(0,120,255,0.15)] transition-all duration-300">
      {/* Left: Avatar */}
      <div className="shrink-0 mr-3">
        <div
          className={`w-10 h-10 rounded-full ${order.avatarColor} flex items-center justify-center shadow-sm`}
        >
          <span className="text-white font-bold text-sm">{initial}</span>
        </div>
      </div>

      {/* Middle: Order details */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">
          Order #{order.id}
        </span>
        <span className="text-sm font-semibold text-gray-800 truncate leading-snug">
          {order.name}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          {order.itemIcon === "diamond" ? (
            <Diamond className="w-3 h-3 text-cyan-500 fill-cyan-200" />
          ) : (
            <Box className="w-3 h-3 text-amber-500 fill-amber-200" />
          )}
          <span className="text-xs text-gray-500 font-medium">
            {order.item}
          </span>
        </div>
      </div>

      {/* Right: Price & Status */}
      <div className="flex flex-col items-end shrink-0 ml-2">
        <div className="flex items-center gap-0.5">
          <span className="text-base font-bold text-gray-800">
            {order.price}
          </span>
          <TakaIcon className="text-base text-gray-700" />
        </div>
        <div className="flex items-center gap-1 bg-green-100 text-green-600 rounded-full px-2 py-0.5 mt-1">
          <CheckCircle2 className="w-3 h-3" />
          <span className="text-[10px] font-semibold tracking-wide">
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LatestOrders() {
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
          Latest Orders
          <span className="text-teal-400 ml-1">|</span>
        </h2>
      </div>

      {/* Orders list */}
      <div className="max-w-md mx-auto flex flex-col gap-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
