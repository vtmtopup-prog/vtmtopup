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
    </section>
  );
}
