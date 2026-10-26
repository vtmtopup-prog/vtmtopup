"use client";
import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import { DismissibleAlert } from "@/components/dismissible-alert";
import TeamSection from "@/components/TeamSection";
import TopPerformers from "@/components/TopPerformers";
import LatestOrders from "@/components/LatestOrders";
import Footer from "@/components/ui/Footer";
import SpeedDial from "@/components/SpeedDial";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { specialOffers, freeFireProducts } = useApp();

  // Only show active products
  const activeOffers = (specialOffers || []).filter((o) => o.active !== false);
  const activeFFProducts = (freeFireProducts || []).filter((p) => p.active !== false);

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="flex-grow container mx-auto sm:p-6 lg:p-8 space-y-4 px-4">
        <DismissibleAlert />
        <div className="w-full max-w-4xl mx-auto">
          <HeroBanner />
        </div>

        {/* Top Performers Leaderboard */}
        <TopPerformers />

        {/* SPECIAL OFFER SECTION */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6 tracking-wide bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent uppercase">
            | Friday SPECIAL OFFER |
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            {activeOffers.map((option) => (
              <Link href={`/topup/${option.slug}`} key={option.id}>
                <div className="group rounded-xl border-2 border-emerald-400 hover:border-emerald-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer h-full">
                  <div className="aspect-square relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-white border-t border-emerald-400 py-2 px-1.5 text-center flex items-center justify-center min-h-[42px]">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-900 tracking-tight leading-tight line-clamp-2">
                      {option.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* GARENA FREE FIRE SECTION */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6 mt-8 tracking-wide bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent uppercase">
            | Garena FREE FIRE |
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            {activeFFProducts.map((option) => (
              <Link href={`/topup/${option.slug}`} key={option.id}>
                <div className="group rounded-xl border-2 border-emerald-400 hover:border-emerald-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer h-full">
                  <div className="aspect-square relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-white border-t border-emerald-400 py-2 px-1.5 text-center flex items-center justify-center min-h-[42px]">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-900 tracking-tight leading-tight line-clamp-2">
                      {option.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Orders */}
        <LatestOrders />

        {/* Meet Our Team Section */}
        <TeamSection />
      </main>
      <SpeedDial />
      <Footer />
    </div>
  );
}
