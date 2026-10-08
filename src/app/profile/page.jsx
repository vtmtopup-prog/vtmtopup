"use client";

import ProfileCard from "@/components/ProfileCard";
import RankingSection from "@/components/RankingSection";
import TeamSection from "@/components/TeamSection";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TbHomeFilled } from "react-icons/tb";
import { BsCartCheckFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { TiClipboard } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-10 px-4 sm:px-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-xl mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs text-slate-500 font-mono">
            ACCOUNT OVERVIEW
          </span>
        </div>

        {/* Member Profile Card Component */}
        <ProfileCard />

        {/* New Redesigned Ranking Section */}
        <RankingSection />

        {/* Meet Our Team Section */}
        <TeamSection />
        <div className="container px-auto px-4 sm:px-6 lg:px-8 mt-20">
          {/* iOS Frosted Glass Floating Bottom Navbar (Fixed Transparency) */}
          <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg">
            {/* ব্যাকগ্রাউন্ড এখন ৮০% সাদা (bg-white/80), যা পেছনের জিনিসপত্র ঢেকে দেবে কিন্তু কাচের ফিল দেবে */}
            <div
              className="relative flex justify-around items-center h-[68px] px-2 rounded-[2rem] 
                  bg-white/80 backdrop-blur-2xl 
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
    </ProtectedRoute>
  );
}
