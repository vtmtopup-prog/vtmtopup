"use client";

import React from "react";
import Image from "next/image";
import { Facebook, MessageCircle } from "lucide-react";
import Footer from "./ui/Footer";

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Abidujjaman",
      role: "Founder & CEO",
      image: "abid.jpg",
      facebook: "https://facebook.com",
      whatsapp: "https://whatsapp.com",
    },
    {
      id: 2,
      name: "Sayed Hasan Dipto",
      role: "Lead Developer",
      image: "sayed hasan dipto.png",
      facebook: "https://www.facebook.com/SayedHasanDipto25",
      whatsapp: "https://whatsapp.com",
    },
    {
      id: 3,
      name: "Fahim Faysal",
      role: "Operations Head",
      image: "alif.jpg",
      facebook: "https://facebook.com",
      whatsapp: "https://whatsapp.com",
    },
    {
      id: 4,
      name: "Sagor Ahmed",
      role: "Support Admin",
      image: "sagor.png",
      facebook: "https://facebook.com",
      whatsapp: "https://whatsapp.com",
    },
  ];

  return (
    <section className="w-full max-w-xl mx-auto mt-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          MEET OUR TEAM
        </h2>
        <p className="text-xs text-gray-400 mt-1">The pros behind VTM TopUp</p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:-translate-y-0.5"
          >
            {/* Avatar with glowing ring */}
            <div className="relative w-20 h-20 rounded-full border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] p-1 bg-black shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Name */}
            <h3 className="text-sm font-bold text-white mt-3 text-center tracking-wide line-clamp-1">
              {member.name}
            </h3>

            {/* Role */}
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wider text-center mt-1 uppercase">
              {member.role}
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-3">
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s Facebook`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-300 border border-white/5 hover:border-emerald-500/30 flex items-center justify-center transition-all duration-200 active:scale-95"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s WhatsApp`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-300 border border-white/5 hover:border-emerald-500/30 flex items-center justify-center transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
