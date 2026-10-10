"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { TiClipboard } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { BsCartCheckFill } from "react-icons/bs";
import { TbHomeFilled } from "react-icons/tb";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: TbHomeFilled,
    match: (pathname) => pathname === "/",
  },
  {
    name: "My Orders",
    href: "/orders",
    icon: BsCartCheckFill,
    match: (pathname) => pathname.startsWith("/orders"),
  },
  {
    name: "Add Money",
    href: "/add-money",
    icon: IoMdAddCircle,
    match: (pathname) => pathname.startsWith("/add-money"),
  },
  {
    name: "My Code",
    href: "/my-codes",
    icon: TiClipboard,
    match: (pathname) => pathname.startsWith("/my-codes"),
  },
  {
    name: "Account",
    href: "/profile",
    icon: FaRegUser,
    match: (pathname) => pathname.startsWith("/profile"),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* iOS Frosted Glass Floating Bottom Navbar (Fixed Transparency) */}
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg">
          <div
            className="relative flex justify-around items-center h-[68px] px-2 rounded-[2rem] 
                bg-white/90 backdrop-blur-2xl 
                border border-white/50 
                shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.match(pathname);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 active:scale-90 ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500 hover:text-gray-900 font-medium"
                  }`}
                >
                  <Icon className="w-[22px] h-[22px]" />
                  <span
                    className={`text-[10px] tracking-tight ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
