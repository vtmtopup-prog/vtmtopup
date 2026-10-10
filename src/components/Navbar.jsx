"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { name: "Topup", href: "/topup" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
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
        {/* 1. Left Section (Brand Logo & Text)                       */}
        {/* ========================================================= */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <div className="relative flex items-center justify-center">
            {/* Logo image placeholder */}
            <Image
              src="/vtmtopup.png"
              alt="TOPUPBUZZ Logo"
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
        {/* 2. Center Section (Pill-Shaped Navigation - Desktop Only) */}
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
                      ? "bg-white text-purple-700 font-semibold shadow-sm rounded-full px-6 py-2.5 transition-all duration-200"
                      : "text-slate-500 hover:text-slate-800 px-6 py-2.5 font-medium rounded-full transition-all duration-200"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ========================================================= */}
        {/* 3. Right Section (Auth Buttons - Desktop Only)            */}
        {/* ========================================================= */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            /* Logged-In State (Desktop): Circular Profile Icon & Dropdown */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-colors shadow-sm"
                aria-label="User Menu"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                  {user.avatar && user.avatar !== "/default-avatar.png" ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-purple-700" />
                  )}
                </div>
                <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                  {user.name || "Player1"}
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-Out State (Desktop): Login and Register buttons */
            <>
              <Link
                href="/login"
                className="bg-white border border-gray-200 text-gray-700 rounded-full px-6 py-2 font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-purple-600 text-white rounded-full px-6 py-2 font-medium hover:bg-purple-700 shadow-md shadow-purple-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* ========================================================= */}
        {/* 4. Mobile Right Section (Controlled by Global User State) */}
        {/* ========================================================= */}
        <div className="flex md:hidden items-center">
          {user ? (
            /* Logged-In State (Mobile): Circular Profile Icon button linking to /profile */
            <Link
              href="/profile"
              aria-label="User Profile"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors shadow-sm active:scale-95 overflow-hidden"
            >
              {user.avatar && user.avatar !== "/default-avatar.png" ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-purple-700" />
              )}
            </Link>
          ) : (
            /* Logged-Out State (Mobile): Sleek rounded Login button linking to /login */
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-sm shadow-purple-200 transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
