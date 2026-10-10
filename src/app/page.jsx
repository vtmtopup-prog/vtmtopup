"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import { DismissibleAlert } from "@/components/dismissible-alert";
import {
  HomeIcon,
  Compass,
  Phone,
  Facebook,
  Youtube,
  User,
  PlayCircle,
  Blocks,
  Send,
  ShoppingCart,
  YoutubeIcon,
  LucideFacebook,
} from "lucide-react";

import Link from "next/link";
import TeamSection from "@/components/TeamSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Footer from "@/components/ui/Footer";
import SpeedDial from "@/components/SpeedDial";
import { IoMdAddCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbHomeFilled } from "react-icons/tb";
import { FaOpencart, FaRegUser } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
const specialOffers = [
  {
    id: "so-1",
    name: "WEEKLY OFFER",
    image: "/weeklylight.webp",
    slug: "weekly-monthly-offer",
  },
  {
    id: "so-2",
    name: "MONTHLY OFFER",
    image: "/monthly.webp",
    slug: "weekly-monthly-offer",
  },
  {
    id: "so-3",
    name: "FIRDAY OFFER",
    image: "/e-badge.webp",
    slug: "airdrop-id-code",
  },
];

const freeFireOptions = [
  {
    id: "ff-1",
    name: "UID TOP-UP [BD]",
    image: "/freefiretopup(bd).webp",
    slug: "free-fire-topup-bd",
  },
  {
    id: "ff-2",
    name: "UNIPIN VOUCHER",
    image: "/unipin.webp",
    slug: "unipin-voucher-bd",
  },
  {
    id: "ff-3",
    name: "WEEKLY/MONTHLY",
    image: "/monthly.webp",
    slug: "weekly-monthly-offer",
  },
  {
    id: "ff-4",
    name: "Weekly Lite",
    image: "/weeklylight.webp",
    slug: "weekly-lite-bd-server",
  },
  {
    id: "ff-5",
    name: "LEVEL UP PASS BD",
    image: "/leveluppass.webp",
    slug: "level-up-pass",
  },
  {
    id: "ff-6",
    name: "[INDONESIA] SERVER TOP-UP",
    image: "/indonatia.webp",
    slug: "indonesia-server-uid",
  },
  {
    id: "ff-7",
    name: "FREE FIRE LIKE",
    image: "/like.avif",
    slug: "ff-id-like",
  },
];
const moreGames = [
  {
    id: 1,
    name: "PUBG MOBILE",
    hint: "gaming pubg",
    image: "/pubg.webp",
    slug: "pubg-mobile",
  },
  {
    id: 2,
    name: "FC MOBILE (EA SPORTS)",
    hint: "gaming fifa",
    image: "/pc.webp",
    slug: "fc-mobile",
  },
];
const GooglePlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-foreground"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m10.4 12.6-2.8 4.2" />
    <path d="m14 12-3.4 5" />
    <path d="M12.6 10.4 8.4 7.6" />
    <path d="m14 17-3.4-5" />
    <path d="M8.4 16.8 12.3 14" />
  </svg>
);
const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-foreground"
  >
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </svg>
);
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="flex-grow container mx-auto sm:p-6 lg:p-8 space-y-4">
        <DismissibleAlert />
        <div className="w-full max-w-4xl mx-auto">
          <HeroBanner />
        </div>

        {/* SPECIAL OFFER SECTION */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6 tracking-wide text-[#1c2e56] uppercase">
            | SPECIAL OFFER |
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            {specialOffers.map((option) => (
              <Link href={`/topup/${option.slug}`} key={option.id}>
                <div className="group rounded-xl border-2 border-blue-500 hover:border-blue-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer h-full">
                  <div className="aspect-square relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-white border-t border-blue-500 py-2 px-1.5 text-center flex items-center justify-center min-h-[42px]">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-900 tracking-tight leading-tight line-clamp-2">
                      {option.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FREE FIRE SECTION */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6 mt-8 tracking-wide text-[#1c2e56] uppercase">
            FREE FIRE
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            {freeFireOptions.map((option) => (
              <Link href={`/topup/${option.slug}`} key={option.id}>
                <div className="group rounded-xl border-2 border-blue-500 hover:border-blue-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer h-full">
                  <div className="aspect-square relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-white border-t border-blue-500 py-2 px-1.5 text-center flex items-center justify-center min-h-[42px]">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-900 tracking-tight leading-tight line-clamp-2">
                      {option.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Meet Our Team Section */}
        <TeamSection />
      </main>
      <SpeedDial />
      <Footer />
    </div>
  );
}
