"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wallet, PlayCircle, History } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { TiClipboard } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { BsCartCheckFill } from "react-icons/bs";
import { TbHomeFilled } from "react-icons/tb";

export default function AddMoneyPage() {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    alert(`Processing top-up request for ৳${amount}`);
  };

  const mockHistory = [
    {
      id: 1,
      title: "Added via bKash",
      date: "07 Oct 2026, 04:15 PM",
      amount: "+ 500 Tk",
    },
    {
      id: 2,
      title: "Added via Nagad",
      date: "05 Oct 2026, 08:30 PM",
      amount: "+ 200 Tk",
    },
    {
      id: 3,
      title: "Added via bKash",
      date: "01 Oct 2026, 01:10 PM",
      amount: "+ 100 Tk",
    },
  ];

  return (
    <section>
      <div className="min-h-screen bg-[#0a1a13] text-white pt-24 pb-32 px-4">
        <div className="max-w-lg mx-auto flex flex-col gap-6">
          {/* Section 1: Add Money Form */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-white">Add Money</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <label
                htmlFor="amount-input"
                className="block text-sm text-gray-400 mb-2"
              >
                Enter the amount
              </label>
              <input
                id="amount-input"
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="25 - 25000"
                className="bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3 w-full focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                required
              />

              <button
                type="submit"
                className="bg-emerald-500 text-black font-bold w-full py-3 rounded-xl mt-4 hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                Add Money
              </button>
            </form>
          </section>

          {/* Section 2: How to add money (Video Tutorial) */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-white">
                How to add money
              </h2>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden mt-3">
              <iframe
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="How to add money tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>

          {/* Section 3: Balance History */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-white">
                Balance History
              </h2>
            </div>

            <div className="divide-y divide-white/10">
              {mockHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                >
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                  </div>
                  <span className="text-emerald-400 font-semibold text-sm">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
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
    </section>
  );
}
