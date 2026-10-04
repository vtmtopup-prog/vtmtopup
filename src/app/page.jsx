"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Footer from "@/components/ui/Footer";
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-background/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-foreground">
                {/* <span className="text-blue-600">VTM </span>
                <span className="text-red-600">TopUp</span> */}
                <Image
                  src="/vtmtopup.png"
                  alt="VTM TopUp Logo"
                  width={150}
                  height={40}
                />
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
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 space-y-4">
        <DismissibleAlert />
        <Carousel
          className="w-full max-w-4xl mx-auto"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-0">
                    <CardContent className="flex aspect-[2/1] items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image
                        src="/banner.avif"
                        alt={`Slider image ${index + 1}`}
                        width={800}
                        height={400}
                        className="w-full h-full object-cover"
                        data-ai-hint="abstract background"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        {/* SPECIAL OFFER SECTION */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6 tracking-wide text-[#1c2e56] uppercase">
            SPECIAL OFFER
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

        {/* MORE GAMES SECTION
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6 mt-8 tracking-wide text-[#1c2e56] uppercase">
            MORE GAMES
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            {moreGames.map((game) => (
              <Link href={`/topup/${game.slug}`} key={game.id}>
                <div className="group rounded-xl border-2 border-blue-500 hover:border-blue-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer h-full">
                  <div className="aspect-square relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src={game.image || `https://placehold.co/200x200.png`}
                      alt={game.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-white border-t border-blue-500 py-2 px-1.5 text-center flex items-center justify-center min-h-[42px]">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-900 tracking-tight leading-tight line-clamp-2">
                      {game.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <a
            href="#"
            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <GooglePlayIcon />
            <div>
              <p className="font-bold">Download Our Mobile App</p>
              <p className="text-sm text-primary">Click Here →</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <TelegramIcon />
            <div>
              <p className="font-bold">Giveway & Offer Update</p>
              <p className="text-sm text-primary">Join Telegram</p>
            </div>
          </a>
        </div> */}
      </main>
      <div className="fixed bottom-24 right-4 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-red-600 hover:bg-red-700 w-14 h-14 relative animate-pulse"
              >
                <Phone className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>সাহায্য লাগবে ?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center h-16">
            <Link href="/" className="flex flex-col items-center text-primary">
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
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
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
