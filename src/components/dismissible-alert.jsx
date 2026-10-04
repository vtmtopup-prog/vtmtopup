"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function DismissibleAlert() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Keyframe animation for marquee text */}
      <style>{`
        @keyframes alertMarquee {
          0% { transform: translateX(20%); }
          100% { transform: translateX(-100%); }
        }
        .animate-alert-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: alertMarquee 35s linear infinite;
        }
        .animate-alert-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative font-sans w-[calc(100%-24px)] md:w-full max-w-4xl mx-auto my-3">
        <Alert className="bg-[#d8f5eb] border border-[#bcecdb] text-slate-800 rounded-[18px] h-[60px] md:h-[56px] p-0 flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.04)] relative overflow-hidden pr-10">
          {/* Left accent indicator strip */}
          <div className="absolute left-0 top-[7px] md:top-[8px] bottom-[7px] md:bottom-[8px] w-[5px] bg-[#10b981] rounded-[7px]" />

          {/* Blue Circle F Icon */}
          <div className="w-8 h-8 md:w-9 md:h-9 min-w-[32px] md:min-w-[36px] ml-4 md:ml-6 mr-2 md:mr-3 bg-[#beeedf] rounded-full flex items-center justify-center shrink-0">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-[#10b981] rounded-full flex items-center justify-center text-white text-[11px] md:text-xs font-black">
              F
            </div>
          </div>

          {/* Marquee Text Content */}
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <div className="animate-alert-marquee text-xs md:text-sm font-medium text-slate-800">
              Notice : VTM TOP UP ০৫ সেকেন্ডে টপআপ কমপ্লিট করা হয় AI বট
              দিয়ে...!! আমাদের সাইট দিন রাত ২৪ ঘন্টা চালু থাকে..! টপ আপ করতে
              সমস্যা হলে Website এর নিচে WhatsApp নাম্বারে ম্যাসেজ করুন ! ⚠
              সতর্কবার্তা - ১৮ বছরের নিচে কেউ বাবা মার পকেট মেরে টপ আপ করলে
              কর্তৃপক্ষ দায়ী নয় |
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-2.5 h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-emerald-200/50 rounded-full transition-colors shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      </div>
    </>
  );
}
