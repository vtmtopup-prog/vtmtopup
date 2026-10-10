"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Crown,
  User,
  GraduationCap,
  Facebook,
  MessageCircle,
  X,
  Sparkles,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Abidujjaman",
      role: "FOUNDER & CEO",
      study: "Electrical Engineering",
      isFounder: true,
      image: "/abid.jpg",
      facebook: "https://facebook.com",
      whatsapp: "https://whatsapp.com",
    },
    {
      id: 2,
      name: "Sayed Hasan Dipto",
      role: "LEAD DEVELOPER",
      study: "Frontend AI Web Development",
      isFounder: false,
      image: "/sayed hasan dipto.png",
      facebook: "https://www.facebook.com/SayedHasanDipto25",
      whatsapp: "https://whatsapp.com",
    },
    {
      id: 3,
      name: "Fahim Faysal",
      role: "CEO & OPERATIONS HEAD",
      study: "Electrical Engineering",
      isFounder: false,
      image: "/alif.jpg",
      facebook: "https://facebook.com",
      whatsapp: "https://whatsapp.com",
    },
    {
      id: 4,
      name: "Sagor Ahmed",
      role: "Admin & Support",
      study: "Outsourcing",
      isFounder: false,
      image: "/sagor.png",
      facebook: "https://facebook.com",
      whatsapp: "https://whatsapp.com",
    },
  ];

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedMember(null);
  };

  return (
    <section className="w-full mt-10 mb-8 px-2 max-w-5xl mx-auto">
      {/* 1. Section Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black tracking-widest uppercase rounded-full border border-emerald-300 shadow-sm mb-1.5">
          VTM TEAM
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center font-orbitron tracking-tight text-slate-900">
          MEET{" "}
          <span className="text-emerald-600 bg-clip-text">
            OUR TEAM
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium text-center mt-1">
          The pros behind VTM TopUp
        </p>
      </div>

      {/* 2. Responsive Grid with Team Member Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => handleOpenModal(member)}
            className="group relative bg-white/95 backdrop-blur-md border-2 border-emerald-200/90 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 active:scale-[0.98]"
          >
            {/* Top Founder Badge or Dot indicator */}
            {member.isFounder && (
              <div className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-700 border border-amber-300 p-1 rounded-full shadow-xs">
                <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
              </div>
            )}

            {/* Avatar Container */}
            <div className="relative mb-3 mt-1">
              <div className="relative p-1 rounded-full ring-2 ring-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:ring-emerald-500 group-hover:scale-105 transition-all duration-300">
                <Avatar
                  src={member.image}
                  name={member.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 text-large border-2 border-white object-cover"
                />
              </div>
            </div>

            {/* Member Name */}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {member.name}
            </h3>

            {/* Member Role */}
            <span className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-wide uppercase mt-0.5 line-clamp-1">
              {member.role}
            </span>

            {/* View Details Button Tag */}
            <div className="mt-3 w-full pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-600 group-hover:text-emerald-700">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>View Details</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Team Member Details Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="center"
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/60 backdrop-blur-sm z-50",
          base: "bg-white border border-emerald-200 text-slate-900 rounded-3xl shadow-2xl mx-4 max-w-sm z-50",
          closeButton:
            "hover:bg-slate-100 active:bg-slate-200 text-slate-400 hover:text-slate-800 top-3 right-3",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {selectedMember && (
                <>
                  <ModalHeader className="flex flex-col items-center pt-6 pb-2">
                    {/* Crown badge if founder */}
                    {selectedMember.isFounder && (
                      <div className="mb-2 bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
                        <span>Founder & CEO</span>
                      </div>
                    )}

                    {/* Modal Avatar */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-emerald-500 p-0.5 bg-white shadow-[0_0_20px_rgba(16,185,129,0.3)] my-2">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        sizes="96px"
                        className="rounded-full object-cover"
                      />
                    </div>

                    <h3 className="text-xl font-bold font-orbitron text-slate-900 mt-1 text-center">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-0.5">
                      {selectedMember.role}
                    </p>
                  </ModalHeader>

                  <ModalBody className="py-3 px-6">
                    <div className="flex flex-col gap-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                      {/* Row 1: Position */}
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-slate-500 text-xs font-semibold shrink-0">
                          Position:
                        </span>
                        <span className="text-slate-800 text-xs font-bold truncate">
                          {selectedMember.role}
                        </span>
                      </div>

                      {/* Row 2: Study / Work */}
                      {selectedMember.study && (
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-slate-500 text-xs font-semibold shrink-0">
                            Study:
                          </span>
                          <span className="text-slate-800 text-xs font-bold truncate">
                            {selectedMember.study}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Social Connect */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                      {selectedMember.facebook && (
                        <a
                          href={selectedMember.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all text-xs font-bold active:scale-95 shadow-sm"
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                          <span>Facebook</span>
                        </a>
                      )}
                      {selectedMember.whatsapp && (
                        <a
                          href={selectedMember.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all text-xs font-bold active:scale-95 shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </ModalBody>

                  <ModalFooter className="justify-center pb-5 pt-2">
                    <Button
                      color="default"
                      variant="flat"
                      size="sm"
                      onPress={onClose}
                      className="font-semibold text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl px-5"
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
