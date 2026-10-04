"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  ChevronLeft,
  HomeIcon,
  Phone,
  Wallet,
  Info,
  RefreshCw,
  Facebook,
  Youtube,
  Check,
  Send,
  Compass,
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
import Footer from "@/components/ui/Footer";
const productData = {
  "free-fire-topup-bd": {
    name: "Free Fire TopUp (BD)",
    image: "/freefiretopup(bd).webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "weekly", name: "Weekly", price: "155 TK" },
      { id: "monthly", name: "Monthly", price: "770 TK" },
      { id: "25-diamond", name: "25 Diamond", price: "22 TK" },
      { id: "50-diamond", name: "50 Diamond", price: "38 TK" },
      { id: "115-diamond", name: "115 Diamond", price: "80 TK" },
      { id: "240-diamond", name: "240 Diamond", price: "160 TK" },
      { id: "355-diamond", name: "355 Diamond", price: "240 TK" },
      { id: "505-diamond", name: "505 Diamond", price: "340 TK" },
      { id: "610-diamond", name: "610 Diamond", price: "400 TK" },
      { id: "850-diamond", name: "850 Diamond", price: "560 TK" },
      { id: "1090-diamond", name: "1090 Diamond", price: "720 TK" },
      { id: "1240-diamond", name: "1240 Diamond", price: "800 TK" },
      { id: "2530-diamond", name: "2530 Diamond", price: "1620 TK" },
      { id: "5060-diamond", name: "5060 Diamond", price: "3240 TK" },
      { id: "7590-diamond", name: "7590 Diamond", price: "4850 TK" },
      { id: "10120-diamond", name: "10120 Diamond", price: "6450 TK" },
    ],
  },
  "level-up-pass": {
    name: "Level Up Pass",
    image: "/leveluppass.webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "level-6", name: "Level Up Package - Level 6", price: "40 TK" },
      { id: "level-10", name: "Level Up Package - Level 10", price: "70 TK" },
      { id: "level-15", name: "Level Up Package - Level 15", price: "70 TK" },
      { id: "level-20", name: "Level Up Package - Level 20", price: "70 TK" },
      { id: "level-25", name: "Level Up Package - Level 25", price: "70 TK" },
      { id: "level-30", name: "Level Up Package - Level 30", price: "100 TK" },
      {
        id: "full-level-up",
        name: "Full Level Up (1270 Diamond)",
        price: "400 TK",
      },
    ],
  },
  "e-badge-evo-access-bd": {
    name: "E-Badge/Evo Access (BD)",
    image: "/e-badge.webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "3-days-evo", name: "3 Days Evo Access", price: "70 TK" },
      { id: "7-days-evo", name: "7 Days Evo Access", price: "110 TK" },
      { id: "14-days-evo", name: "14 Days Evo Access", price: "210 TK" },
      { id: "30-days-evo", name: "30 Days Evo Access", price: "300 TK" },
    ],
  },
  "unipin-voucher-bd": {
    name: "UNIPIN VOUCHER",
    image: "/unipin.webp",
    category: "GAME / VOUCHER",
    rechargeOptions: [
      { id: "25-diamond-code", name: "25 Diamond Code", price: "23 TK" },
      { id: "50-diamond-code", name: "50 Diamond Code", price: "36 TK" },
      { id: "115-diamond-code", name: "115 Diamond Code", price: "76 TK" },
      { id: "240-diamond-code", name: "240 Diamond Code", price: "152 TK" },
      { id: "610-diamond-code", name: "610 Diamond Code", price: "382 TK" },
      { id: "1240-diamond-code", name: "1240 Diamond Code", price: "756 TK" },
      { id: "2530-diamond-code", name: "2530 Diamond Code", price: "1540 TK" },
      { id: "weekly-code", name: "Weekly Code", price: "151 TK" },
      { id: "monthly-code", name: "Monthly Code", price: "753 TK" },
    ],
  },
  "airdrop-id-code": {
    name: "Airdrop (ID Code)",
    image: "/freefiretopup(bd).webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "airdrop-90", name: "0.99$ (90 BDT) Airdrop", price: "140 TK" },
      { id: "airdrop-190", name: "1.99$ (190 BDT) Airdrop", price: "280 TK" },
    ],
  },
  "weekly-lite-bd-server": {
    name: "Weekly Lite (BD Server)",
    image: "/weeklylight.webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "1x-weekly-lite", name: "1x Weekly Lite", price: "40 TK" },
      { id: "2x-weekly-lite", name: "2x Weekly Lite", price: "80 TK" },
      { id: "3x-weekly-lite", name: "3x Weekly Lite", price: "120 TK" },
      { id: "5x-weekly-lite", name: "5x Weekly Lite", price: "200 TK" },
    ],
  },
  "weekly-monthly-offer": {
    name: "Weekly/Monthly Offer",
    image: "/monthly.webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "weekly", name: "Weekly", price: "155 TK" },
      { id: "2x-weekly", name: "2X Weekly", price: "310 TK" },
      { id: "3x-weekly", name: "3X Weekly", price: "465 TK" },
      { id: "5x-weekly", name: "5X Weekly", price: "775 TK" },
      { id: "monthly", name: "Monthly", price: "770 TK" },
      { id: "2x-monthly", name: "2X Monthly", price: "1540 TK" },
      { id: "1-weekly-1-monthly", name: "1Weekly + 1Monthly", price: "925 TK" },
      {
        id: "4-weekly-1-monthly",
        name: "4Weekly + 1Monthly",
        price: "1390 TK",
      },
    ],
  },
  "indonesia-server-uid": {
    name: "Indonesia Server (UID)",
    image: "/indonatia.webp",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "5-diamond-indo", name: "5 Diamond (Indo)", price: "12 TK" },
      { id: "50-diamond-indo", name: "50 Diamond (Indo)", price: "70 TK" },
      { id: "70-diamond-indo", name: "70 Diamond (Indo)", price: "90 TK" },
      { id: "100-diamond-indo", name: "100 Diamond (Indo)", price: "140 TK" },
      { id: "140-diamond-indo", name: "140 Diamond (Indo)", price: "180 TK" },
      { id: "355-diamond-indo", name: "355 Diamond (Indo)", price: "440 TK" },
      { id: "720-diamond-indo", name: "720 Diamond (Indo)", price: "880 TK" },
      { id: "7290-diamond-indo", name: "7290Diamond (Indo)", price: "8800 TK" },
      { id: "weekly-indo", name: "Weekly (Indo)", price: "270 TK" },
      { id: "monthly-indo", name: "Monthly (Indo)", price: "820 TK" },
    ],
  },
  "ff-id-like": {
    name: "FF ID Like (Daily 100 Max)",
    image: "/like.avif",
    category: "Game / Top up",
    rechargeOptions: [
      { id: "100-ff-like", name: "100 FF Like", price: "20 TK" },
    ],
  },
  "pubg-mobile": {
    name: "PUBG MOBILE",
    image: "/pubg.webp",
    category: "Game / Top up",
    rechargeOptions: [],
  },
  "fc-mobile": {
    name: "FC MOBILE (EA SPORTS)",
    image: "/pc.webp",
    category: "Game / Top up",
    rechargeOptions: [],
  },
};
export default function TopUpPage({ params }) {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const slug = params.slug;
  const product = productData[slug] || {
    name: decodeURIComponent(slug).replace(/-/g, " "),
    image: "https://placehold.co/80x80.png",
    category: "Game / Top up",
    rechargeOptions: [],
  };
  const formatPriceDisplay = (priceStr) => {
    if (!priceStr) return "";
    const num = priceStr.replace(/[^0-9.]/g, "");
    return `৳${num}`;
  };

  const getNumericPrice = (priceStr) => {
    if (!priceStr) return "0";
    return priceStr.replace(/[^0-9.]/g, "") || "0";
  };

  const selectedPrice = getNumericPrice(
    product.rechargeOptions.find((opt) => opt.id === selectedOption)?.price,
  );
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <header className="bg-background/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-foreground">
                <span className="text-blue-600">VTM</span>
                <span className="text-red-600">TopUp</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Wallet className="mr-2 h-4 w-4" /> 0৳
              </Button>
              <Image
                src="https://placehold.co/32x32.png"
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
                data-ai-hint="user avatar"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-2 space-y-4 pb-32">
        <Card className="overflow-hidden bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <CardContent className="p-2 flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 dark:text-white uppercase">
                {product.name}
              </h2>
              <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-[#7132c7] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                {product.category}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <CardHeader className="pb-3 pt-4 sm:pt-5 px-4 sm:px-5">
            <CardTitle className="flex items-center">
              <span className="bg-[#7132c7] text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm mr-2.5 shadow-sm shrink-0">
                1
              </span>
              <span className="text-slate-900 dark:text-slate-100 text-base sm:text-lg font-bold">
                Select Recharge
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-2 pb-5 pt-0">
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="grid grid-cols-2 gap-2.5 sm:gap-3"
            >
              {product.rechargeOptions.map((option) => {
                const isSelected = selectedOption === option.id;
                return (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className={`relative flex items-center justify-between py-2.5 px-2.5 sm:px-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "border-[#7132c7] ring-1 ring-[#7132c7] bg-purple-50/30 dark:bg-purple-950/20 shadow-sm"
                        : "border-slate-200/90 dark:border-slate-800 bg-white dark:bg-card hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {/* Left circular radio indicator */}
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#7132c7] ring-2 ring-purple-200 dark:ring-purple-900"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                      {/* Middle Option name */}
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">
                        {option.name}
                      </span>
                    </div>

                    {/* Right Purple Price */}
                    <span className="font-bold text-[#7132c7] dark:text-purple-400 text-xs sm:text-sm shrink-0 ml-1.5">
                      {formatPriceDisplay(option.price)}
                    </span>

                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="sr-only"
                    />
                  </Label>
                );
              })}
            </RadioGroup>
            <div className="text-left mt-4">
              <a
                href="https://www.facebook.com/SayedHasanDipto25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-red-500 font-bangla hover:underline inline-flex items-center"
              >
                কিভাবে টপআপ করবেন ?
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <CardHeader className="pb-3 pt-4 sm:pt-5 px-4 sm:px-5">
            <CardTitle className="flex items-center">
              <span className="bg-[#7132c7] text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm mr-2.5 shadow-sm shrink-0">
                2
              </span>
              <span className="text-slate-900 dark:text-slate-100 text-base sm:text-lg font-bold">
                Account Info
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="font-bangla space-y-4 px-4 sm:px-5 pb-5 pt-0">
            <div>
              <Label
                htmlFor="game-id"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                এখানে গেমের আইডি কোড দিন
              </Label>
              <div className="flex flex-col gap-2 mt-1.5">
                <Input
                  type="text"
                  id="game-id"
                  placeholder="Player ID (UID)"
                  className="border-slate-200 dark:border-slate-800 focus:border-[#adacad] rounded-xl"
                />
                <Button
                  // variant="outline"
                  className="shrink-0 rounded-xl border-pink-500 hover:border-[#c732c7] hover:text-[#afaeaf]"
                >
                  আপনার গেম আইডির নাম চেক করুন
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <CardHeader className="pb-3 pt-4 sm:pt-5 px-4 sm:px-5">
            <CardTitle className="flex items-center">
              <span className="bg-[#7132c7] text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm mr-2.5 shadow-sm shrink-0">
                3
              </span>
              <span className="text-slate-900 dark:text-slate-100 text-base sm:text-lg font-bold">
                Select one option
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-5 pb-5 pt-0">
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="wallet"
                className={`flex flex-col items-center justify-center rounded-xl border-2 p-3 sm:p-4 cursor-pointer relative transition-all ${
                  selectedPayment === "wallet"
                    ? "border-[#7132c7] bg-purple-50/20 dark:bg-purple-950/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <RadioGroupItem
                  value="wallet"
                  id="wallet"
                  className="peer sr-only"
                />
                {selectedPayment === "wallet" && (
                  <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#7132c7]">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <Image
                  src="https://admin.topupbuzz.com/notices/1751691539_walletlogo.png"
                  width={120}
                  height={40}
                  alt="Wallet"
                  data-ai-hint="topupbuzz wallet logo"
                />
                <span className="block w-full p-1.5 text-center bg-slate-100 dark:bg-slate-800 mt-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Wallet Pay
                </span>
              </Label>

              <Label
                htmlFor="instant"
                className={`flex flex-col items-center justify-center rounded-xl border-2 p-3 sm:p-4 cursor-pointer relative transition-all ${
                  selectedPayment === "instant"
                    ? "border-[#7132c7] bg-purple-50/20 dark:bg-purple-950/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <RadioGroupItem
                  value="instant"
                  id="instant"
                  className="peer sr-only"
                />
                {selectedPayment === "instant" && (
                  <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#7132c7]">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <Image
                  src="https://admin.topupbuzz.com/notices/1751691539_autopay.png"
                  width={120}
                  height={40}
                  alt="Instant Pay"
                  data-ai-hint="instant payment methods"
                />

                <span className="block w-full p-1.5 text-center bg-slate-100 dark:bg-slate-800 mt-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Instant Pay
                </span>
              </Label>
            </RadioGroup>
            <div className="font-bangla space-y-2 mt-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#7132c7]" />
                <span>আপনার অ্যাকাউন্ট ব্যালেন্স ৳ 0.00</span>
                <RefreshCw className="w-4 h-4 cursor-pointer text-slate-500 hover:rotate-180 transition-transform" />
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#7132c7]" />
                <span>প্রোডাক্ট কিনতে আপনার প্রয়োজন ৳ {selectedPrice}</span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-[#7132c7] hover:bg-[#5f2ab0] text-white font-bold py-3 text-base shadow-sm rounded-xl">
              Buy Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 font-bangla">
          <CardHeader className="pb-2 pt-4 px-4 sm:px-5">
            <CardTitle className="text-slate-900 dark:text-slate-100 text-base sm:text-lg font-bold">
              Rules & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-md sm:text-md text-slate-600 dark:text-slate-300 px-4 sm:px-5 pb-5">
            <p>⦿ শুধুমাত্র Bangladesh সার্ভারে ID Code দিয়ে টপ আপ হবে</p>
            <p>
              ⦿ Player ID ভুল দিয়ে Diamond না পেলে TopUp Buzz কর্তৃপক্ষ দায়ী
              নয়
            </p>
            <p>
              ⦿ Order কমপ্লিট হওয়ার পরেও আইডিতে ডাইমন্ড না গেলে চেক করার জন্য ID
              Pass দিতে হবে
            </p>
            <p>
              ⦿ অর্ডার Cancel হলে কি কারণে তা Cancel হয়েছে তা অর্ডার হিস্টোরিতে
              দেওয়া থাকে অনুগ্রহ পূর্বক দেখে পুনরায় সঠিক তথ্য দিয়ে অর্ডার
              করবেন।
            </p>
          </CardContent>
        </Card>
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
        <div className="container mx-auto px-4 sm:px-4 lg:px-8">
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
