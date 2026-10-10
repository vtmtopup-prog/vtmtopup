import React from "react";
import {
  ChevronRight,
  ChevronRightCircle,
  ChevronRightCircleIcon,
} from "lucide-react";
import {
  FaFacebookF,
  FaMessenger,
  FaYoutube,
  FaWhatsapp,
  FaWhatsappSquare,
  FaYoutubeSquare,
  FaFacebook,
  FaFacebookMessenger,
} from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaSignalMessenger, FaTelegram } from "react-icons/fa6";
import { IoIosMail, IoLogoYoutube } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-emerald-50/50 text-slate-800 py-8 px-4 font-sans mb-2 ">
      {/* Outer Container (Light Green Border & Background) */}
      <div className="max-w-md mx-auto bg-white border border-emerald-200/80 rounded-3xl p-4 space-y-4 shadow-xl shadow-emerald-500/5">
        {/* Card 1: Stay Connected */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 text-center shadow-sm">
          {/* Header with Light Green Dot Inline */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse"></span>{" "}
            <h3 className="text-base font-bold tracking-wider text-emerald-950 uppercase">
              STAY CONNECTED
            </h3>
          </div>

          <p className="text-slate-600 text-xs mb-5 leading-relaxed px-2">
            কোন সমস্যায় পড়লে হোয়াটসঅ্যাপ এ যোগাযোগ করবেন। তাহলে দ্রুত সমাধান
            পেয়ে যাবেন।
          </p>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 bg-white hover:bg-emerald-100/60 border border-emerald-200 rounded-xl flex items-center justify-center text-slate-700 hover:text-emerald-600 shadow-sm transition-all"
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://m.me/yourusername"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 bg-white hover:bg-emerald-100/60 border border-emerald-200 rounded-xl flex items-center justify-center text-slate-700 hover:text-emerald-600 shadow-sm transition-all"
            >
              <FaFacebookMessenger size={24} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 bg-white hover:bg-emerald-100/60 border border-emerald-200 rounded-xl flex items-center justify-center text-slate-700 hover:text-emerald-600 shadow-sm transition-all"
            >
              <IoLogoYoutube size={24} />
            </a>

            <a
              href="mailto:support@vtmtopup.com"
              className="w-11 h-11 bg-white hover:bg-emerald-100/60 border border-emerald-200 rounded-xl flex items-center justify-center text-slate-700 hover:text-emerald-600 shadow-sm transition-all"
            >
              <IoIosMail size={24} />
            </a>
          </div>
        </div>

        {/* Card 2: Direct Support */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 text-center shadow-sm">
          {/* Header with Light Green Dot Inline */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse"></span>
            <h3 className="text-base font-bold tracking-wider text-emerald-950 uppercase">
              DIRECT SUPPORT
            </h3>
          </div>

          <div className="space-y-3">
            {/* WhatsApp Item */}
            <a
              href="https://wa.me/8801826454847"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-white hover:bg-emerald-100/50 border border-emerald-200 p-3 rounded-xl shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#25d366] rounded-xl flex items-center justify-center text-white shadow-md">
                  <FaWhatsappSquare size={22} />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] text-emerald-700/80 font-bold tracking-wider uppercase">
                    AVG. REPLY 5 MIN
                  </span>
                  <span className="block text-sm font-bold text-slate-800">
                    WhatsApp
                  </span>
                </div>
              </div>
              <ChevronRightCircleIcon size={18} className="text-slate-400" />
            </a>

            {/* Telegram Item */}
            <a
              href="https://t.me/vtmtopup"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-white hover:bg-emerald-100/50 border border-emerald-200 p-3 rounded-xl shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0088cc] rounded-xl flex items-center justify-center text-white shadow-md">
                  <FaTelegram size={22} />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] text-emerald-700/80 font-bold tracking-wider uppercase">
                    OFFICIAL CHANNEL
                  </span>
                  <span className="block text-sm font-bold text-slate-800">
                    Telegram
                  </span>
                </div>
              </div>
              <ChevronRightCircle size={18} className="text-slate-400" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-slate-500 pt-1">
          © 2026 VTM TOP UP • All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
