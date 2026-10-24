"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, LogIn, LogOut, Gem, Banknote, Trophy, Shield, PlusCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";

const NAV_LINKS = [
  { name: "Topup", href: "/topup" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Orders", href: "/orders" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { currentUser } = useApp();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Close profile dropdown on route changes
  useEffect(() => {
    setProfileDropdownOpen(false);
  }, [pathname]);

  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-20">
        {/* ========================================================= */}
        {/* 1. Left Section (Brand Logo)                              */}
        {/* ========================================================= */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <div className="relative flex items-center justify-center">
            <Image
              src="/vtmtopup.png"
              alt="VTM TOPUP Logo"
              width={240}
              height={10}
              priority
              className="object-contain w-auto h-auto max-h-10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </Link>

        {/* ========================================================= */}
        {/* 2. Center Section (Pill-Shaped Navigation - Desktop)     */}
        {/* ========================================================= */}
        <nav className="hidden md:flex items-center">
          <div className="bg-slate-100 rounded-full px-2 py-1 flex items-center gap-1 shadow-inner">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    active
                      ? "bg-white text-emerald-700 font-semibold shadow-sm rounded-full px-5 py-2 transition-all duration-200"
                      : "text-slate-600 hover:text-slate-900 px-5 py-2 font-medium rounded-full transition-all duration-200"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ========================================================= */}
        {/* 3. Right Section: Dynamic Wallet & Diamonds Badge + Auth  */}
        {/* ========================================================= */}
        <div className="hidden md:flex items-center gap-3">
          {/* Live User Wallet & Diamonds Ticker */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5 shadow-sm text-xs">
            {/* Live Taka Balance */}
            <Link
              href="/add-money"
              className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 transition-colors pr-2 border-r border-slate-200"
              title="Add Money to Wallet"
            >
              <span>৳{(currentUser?.balance || 0).toLocaleString()}</span>
              <PlusCircle className="w-3.5 h-3.5 text-emerald-500" />
            </Link>

            {/* Live Diamonds Vault */}
            <div className="flex items-center gap-1 font-bold text-cyan-600 pr-2 border-r border-slate-200">
              <Gem className="w-3.5 h-3.5 text-cyan-500" />
              <span>{(currentUser?.diamonds || 0).toLocaleString()}</span>
            </div>

            {/* Tier Pill */}
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
              {currentUser?.rankTier || "Bronze"}
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors shadow-sm"
              aria-label="User Menu"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                {currentUser?.avatar && currentUser.avatar.startsWith("http") ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-emerald-700" />
                )}
              </div>
              <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                {currentUser?.name || user?.name || "Player1"}
              </span>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-slate-800">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
                    <span className="text-slate-500">ওয়ালেট:</span>
                    <span className="font-bold text-emerald-600">৳{currentUser?.balance}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-0.5">
                    <span className="text-slate-500">ডায়মন্ড:</span>
                    <span className="font-bold text-cyan-600">{currentUser?.diamonds} 💎</span>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <Banknote className="w-4 h-4 text-slate-500" />
                  <span>Order History</span>
                </Link>

                <Link
                  href="/leaderboard"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Leaderboard</span>
                </Link>

                <Link
                  href="/admin"
                  target="_blank"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 font-semibold border-t border-gray-100"
                >
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Admin Panel</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 font-medium border-t border-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. Mobile Right Section: Live Stats Pill & Profile Link   */}
        {/* ========================================================= */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Quick Balance & Diamond Pill */}
          <Link
            href="/add-money"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 shadow-sm"
          >
            <span>৳{(currentUser?.balance || 0).toLocaleString()}</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-0.5 text-cyan-600">
              <Gem className="w-3 h-3 text-cyan-500" />
              {currentUser?.diamonds || 0}
            </span>
          </Link>

          {/* Profile Icon */}
          <Link
            href="/profile"
            aria-label="User Profile"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors shadow-sm overflow-hidden"
          >
            {currentUser?.avatar && currentUser.avatar.startsWith("http") ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-emerald-700" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
