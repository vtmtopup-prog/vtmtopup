"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  HomeIcon,
  Compass,
  Send,
  Phone,
  Facebook,
  Youtube,
  User,
  PlayCircle,
  Blocks,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SpeedDial from "@/components/SpeedDial";
const topUpOptions = [
  {
    id: 1,
    name: "Free Fire TopUp (BD)",
    hint: "gaming character",
    image: "/freefiretoptup(bd).webp",
    slug: "free-fire-topup-bd",
  },
  {
    id: 2,
    name: "E-Badge/Evo Access (BD)",
    hint: "gaming badge",
    image: "/e-badge.webp",
    slug: "e-badge-evo-access-bd",
  },
  {
    id: 3,
    name: "Airdrop (ID Code)",
    hint: "gaming loot",
    image: "/freefiretopup(bd).webp",
    slug: "airdrop-id-code",
  },
  {
    id: 4,
    name: "Weekly Lite (BD Server)",
    hint: "gaming currency",
    image: "/weeklylight.webp",
    slug: "weekly-lite-bd-server",
  },
  {
    id: 5,
    name: "Weekly/Monthly Offer",
    hint: "gaming offer",
    image: "/monthly.webp",
    slug: "weekly-monthly-offer",
  },
  {
    id: 6,
    name: "Indonesia Server (UID)",
    hint: "gaming character",
    image: "/indonatia.webp",
    slug: "indonesia-server-uid",
  },
  {
    id: 7,
    name: "FF ID Like (Daily 100 Max)",
    hint: "gaming social",
    image: "/like.avif",
    slug: "ff-id-like",
  },
  {
    id: 8,
    name: "Level Up Pass",
    hint: "gaming pass",
    image: "/leveluppass.webp",
    slug: "level-up-pass",
  },
  {
    id: 9,
    name: "Unipin Voucher (BD)",
    hint: "gaming voucher",
    image: "/unipin.webp",
    slug: "unipin-voucher-bd",
  },
];
export default function TopUpOnlyPage() {
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <header className="bg-background/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-foreground">
                <span className="text-blue-600">VTM</span>
                <span className="text-red-600">TOPUP</span>
              </h1>
            </div>
            <Link href="/login">
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
            Free Fire
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            {topUpOptions.map((option) => (
              <Link href={`/topup/${option.slug}`} key={option.id}>
                <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group items-center text-center cursor-pointer h-full bg-card">
                  <CardContent className="p-4 flex-grow flex flex-col items-center justify-center">
                    <div className="w-[100px] h-[100px] mb-2 overflow-hidden rounded-lg">
                      <Image
                        src={option.image}
                        alt={option.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={option.hint}
                      />
                    </div>
                    <p className="text-sm font-medium text-card-foreground">
                      {option.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SpeedDial />

      <footer
        style={{ background: "#1c2538", color: "white" }}
        className="pt-12 pb-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SUPPORT</h3>
              <a
                href="#"
                className="flex items-center gap-4 p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Send className="w-6 h-6" />
                <div>
                  <p className="text-sm">8AM - 12.00PM</p>
                  <p className="font-semibold">Telegram HelpLine</p>
                </div>
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">STAY CONNECTED</h3>
              <p className="font-bold">TopUp Buzz</p>
              <p className="text-sm">
                House #80 (13rd Floor) Road # 17, Nikanjia-5 Dhaka
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="p-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
            <p>
              &copy; Copyright 2022. All Rights Reserved. Developed by Shozon
              Roy
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center h-16">
            <Link
              href="/"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </Link>
            <a
              href="https://youtu.be/OSE4qFSRqgs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <PlayCircle className="w-6 h-6" />
              <span className="text-xs">Tutorial</span>
            </a>
            <Link
              href="/topup"
              className="flex flex-col items-center text-primary"
            >
              <Compass className="w-6 h-6" />
              <span className="text-xs">TopUp</span>
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs">My Orders</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <Blocks className="w-6 h-6" />
              <span className="text-xs">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
