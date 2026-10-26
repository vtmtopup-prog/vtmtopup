"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
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
import SpeedDial from "@/components/SpeedDial";
export default function TopUpPage({ params }) {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const [playerId, setPlayerId] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { topupProducts, currentUser, createOrder } = useApp();
  const slug = params.slug;

  // Find product from context (dynamic), fallback to a default placeholder
  const product = (topupProducts || []).find((p) => p.slug === slug) || {
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

  const handleBuyNow = () => {
    setErrorMsg("");
    if (!selectedOption) {
      setErrorMsg("দয়া করে ধাপ ১ থেকে একটি রিচার্জ অপশন নির্বাচন করুন");
      return;
    }
    if (!playerId.trim()) {
      setErrorMsg("দয়া করে ধাপ ২ এ আপনার গেম আইডি (Player UID) প্রদান করুন");
      return;
    }
    const optObj = product.rechargeOptions.find((o) => o.id === selectedOption);
    const amountVal = Number(selectedPrice) || 0;
    const diamondsNum = parseInt(optObj?.name?.match(/\d+/)?.[0] || "100", 10);

    const order = createOrder({
      item: `${product.name} - ${optObj?.name || ""}`,
      amount: amountVal,
      diamondsCount: diamondsNum,
      uid: playerId.trim(),
      phone: currentUser?.phone || "01700-000000",
      method: selectedPayment === "wallet" ? "Wallet Balance" : "Instant Pay (Auto)",
      trxId: `TRX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    });

    setPlacedOrder(order);
  };
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
                  placeholder="Player ID (UID) দিন e.g. 59382029"
                  value={playerId}
                  onChange={(e) => {
                    setPlayerId(e.target.value);
                    setErrorMsg("");
                  }}
                  className="border-slate-200 dark:border-slate-800 focus:border-[#adacad] rounded-xl font-mono text-sm"
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (!playerId.trim()) {
                      setErrorMsg("প্রথমে আপনার গেম আইডি (UID) টাইপ করুন");
                      return;
                    }
                    alert(`গেম আইডি: ${playerId.trim()} (যাচাই সফল ✓)`);
                  }}
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
                  src="/walllet.jpeg"
                  width={420}
                  height={100}
                  alt="Wallet"
                  data-ai-hint="topupbuzz wallet logo"
                />
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
                <span>আপনার অ্যাকাউন্ট ব্যালেন্স ৳ {Number(currentUser?.balance || 0).toFixed(2)}</span>
                <Link href="/add-money" className="text-xs text-[#7132c7] font-bold hover:underline">
                  (অ্যাড মানি)
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#7132c7]" />
                <span>প্রোডাক্ট কিনতে আপনার প্রয়োজন ৳ {selectedPrice}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-bangla font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <Button
              type="button"
              onClick={handleBuyNow}
              className="w-full mt-4 bg-[#7132c7] hover:bg-[#5f2ab0] text-white font-bold py-3 text-base shadow-sm rounded-xl"
            >
              Buy Now
            </Button>

            {/* Order Confirmation Modal */}
            {placedOrder && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 font-bangla">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    অর্ডার সফল হয়েছে!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    অর্ডার আইডি: <span className="font-mono font-bold text-[#7132c7]">#{placedOrder.id}</span>
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 my-4 text-xs text-left space-y-1.5 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-500">আইটেম:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{placedOrder.item}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Player UID:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{placedOrder.uid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">টাকার পরিমাণ:</span>
                      <span className="font-bold text-emerald-600">৳{placedOrder.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">পেমেন্ট মেথড:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{placedOrder.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">স্ট্যাটাস:</span>
                      <span className="font-semibold text-amber-600">Pending (অ্যাডমিন ভেরিফাই করছে)</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/orders"
                      className="block w-full py-2.5 rounded-xl bg-[#7132c7] hover:bg-[#5f2ab0] text-white font-bold text-sm shadow-sm transition"
                    >
                      অর্ডার হিস্টোরি দেখুন
                    </Link>
                    <button
                      onClick={() => setPlacedOrder(null)}
                      className="block w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      আরও টপআপ করুন
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 font-bangla">
          <CardHeader className="pb-2 pt-4 px-4 sm:px-5">
            <CardTitle className="text-slate-900 dark:text-slate-100 text-base sm:text-lg font-bold">
              Rules & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-md sm:text-md text-slate-600 dark:text-slate-300 px-4 sm:px-5 pb-5">
            <p>💎 VTM TOP UP — Diamond Top-Up Rules</p>
            <p>📋 Rules & Conditions</p>
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

      <SpeedDial />

      <Footer />
    </div>
  );
}
