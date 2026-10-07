"use client";

import ProfileCard from "@/components/ProfileCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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
          <span className="text-xs text-slate-500 font-mono">ACCOUNT OVERVIEW</span>
        </div>

        {/* Member Profile Card Component */}
        <ProfileCard />
      </div>
    </ProtectedRoute>
  );
}
