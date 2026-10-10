"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code, Gift, Copy, Check, RotateCcw } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { TiClipboard } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { BsCartCheckFill } from "react-icons/bs";
import { TbHomeFilled } from "react-icons/tb";

export default function MyCodesPage() {
  const [codes, setCodes] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const dummyCodes = [
    {
      id: "ORD-94812",
      date: "08 Oct 2026, 02:40 PM",
      title: "Free Fire 1000 + 100 Diamonds Voucher",
      price: "৳ 850",
      status: "Completed",
      codeString: "FFBD-9821-XKQ8-7712",
    },
    {
      id: "ORD-94750",
      date: "07 Oct 2026, 06:15 PM",
      title: "Weekly Membership Voucher",
      price: "৳ 190",
      status: "Completed",
      codeString: "FFWM-4491-TRQ5-1092",
    },
    {
      id: "ORD-94602",
      date: "06 Oct 2026, 11:20 AM",
      title: "Monthly Membership Voucher",
      price: "৳ 790",
      status: "Pending",
      codeString: "AWAITING-ADMIN-APPROVAL",
    },
  ];

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const toggleDummyCodes = () => {
    if (codes.length === 0) {
      setCodes(dummyCodes);
    } else {
      setCodes([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1a13] text-white pt-24 pb-32 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Code className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-orbitron tracking-wide text-white">
              My Codes
            </h1>
          </div>

          <button
            type="button"
            onClick={() => alert("Redeem code modal will open here")}
            className="bg-emerald-500 text-black font-semibold px-4 py-2 rounded-xl hover:bg-emerald-400 transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)] text-sm sm:text-base"
          >
            <Gift className="w-4 h-4 text-black" />
            <span>Redeem Code</span>
          </button>
        </div>

        {/* Dev / Test Controls */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleDummyCodes}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            {codes.length === 0
              ? "Load Dummy Codes"
              : "Clear Codes (Show Empty)"}
          </button>
        </div>

        {/* Conditional Rendering */}
        {codes.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md px-6 text-center">
            <Code className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg font-medium">No codes found</p>
            <Link
              href="/"
              className="bg-emerald-500 text-black font-semibold px-6 py-2 rounded-lg mt-6 hover:bg-emerald-400 transition active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] inline-block"
            >
              Order Now
            </Link>
          </div>
        ) : (
          /* Populated State */
          <div className="flex flex-col gap-4">
            {codes.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md transition hover:border-white/20"
              >
                {/* Top Row: Date/ID and Price */}
                <div className="flex items-center justify-between text-xs">
                  <div className="text-gray-500 font-mono">
                    <span>{item.id}</span>
                    <span className="mx-2">•</span>
                    <span>{item.date}</span>
                  </div>
                  <span className="text-lg font-bold text-white tracking-wide">
                    {item.price}
                  </span>
                </div>

                {/* Second Row: Title and Status Badge */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-md font-semibold text-gray-100">
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      item.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Code Box */}
                <div className="bg-black/40 rounded-lg p-3 text-center border border-white/5">
                  <span className="font-mono text-sm tracking-widest text-gray-300 select-all">
                    {item.codeString}
                  </span>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.codeString)}
                    disabled={item.status === "Pending"}
                    className={`text-xs px-4 py-2 rounded-lg transition flex items-center gap-2 w-fit ${
                      item.status === "Pending"
                        ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
                        : "bg-white/10 text-white hover:bg-white/20 active:scale-95 cursor-pointer"
                    }`}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-300" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-gray-500">
                    {item.status === "Pending"
                      ? "Verifying payment..."
                      : "Ready to redeem"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* iOS Frosted Glass Floating Bottom Navbar (Fixed Transparency) */}
          <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg">
            {/* ব্যাকগ্রাউন্ড এখন ৮০% সাদা (bg-white/80), যা পেছনের জিনিসপত্র ঢেকে দেবে কিন্তু কাচের ফিল দেবে */}
            <div
              className="relative flex justify-around items-center h-[68px] px-2 rounded-[2rem] 
                  bg-white/90 backdrop-blur-2xl 
                  border border-white/50 
                  shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              {/* Home Tab (Active) - একটিভ ট্যাবে নীল রঙ (iOS স্টাইল) */}
              <Link
                href="/"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-blue-600"
              >
                <TbHomeFilled className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-semibold tracking-tight">
                  Home
                </span>
              </Link>
              {/* My Orders Tab */}
              <Link
                href="/orders"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <BsCartCheckFill className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  My Orders
                </span>
              </Link>
              {/* Add Money Tab */}
              <Link
                href="/add-money"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <IoMdAddCircle className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  Add Money
                </span>
              </Link>{" "}
              {/* My Code Tab */}
              <Link
                href="/my-codes"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <TiClipboard className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  My Code
                </span>
              </Link>
              {/* My Account Tab */}
              <Link
                href="/profile"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <FaRegUser className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  Account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
