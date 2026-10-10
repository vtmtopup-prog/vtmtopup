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
    <section className="w-full mt-14 mb-8 px-2">
      {/* 1. Section Header */}
      <div className="text-center">
        <p className="text-emerald-400 font-bold tracking-widest text-sm text-center uppercase">
          VTM
        </p>
        <h2 className="text-3xl font-extrabold text-center font-orbitron mt-1 text-white">
          MEET{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
            OUR TEAM
          </span>
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          The pros behind VTM TopUp
        </p>
      </div>

      {/* 2. Responsive Grid with HeroUI Avatars as Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 max-w-3xl mx-auto justify-items-center">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => handleOpenModal(member)}
          >
            {/* Avatar Button Container */}
            <div className="relative p-1 transition-all duration-300 transform group-hover:scale-105 active:scale-95">
              {member.isFounder ? (
                <Badge
                  content={<Crown className="w-3 h-3 text-amber-300" />}
                  color="warning"
                  placement="top-right"
                  size="sm"
                  className="border border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                >
                  <Avatar
                    src={member.image}
                    name={member.name}
                    isBordered
                    color="success"
                    className="w-20 h-20 text-large ring-2 ring-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                  />
                </Badge>
              ) : (
                <Avatar
                  src={member.image}
                  name={member.name}
                  isBordered
                  color="success"
                  className="w-20 h-20 text-large ring-2 ring-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                />
              )}
            </div>

            {/* Member Name */}
            <h3 className="text-sm font-semibold text-white mt-3 text-center group-hover:text-emerald-400 transition-colors">
              {member.name}
            </h3>

            {/* Member Role / Badge */}
            <span className="text-[11px] text-gray-400 font-medium text-center">
              {member.role}
            </span>

            {/* Click to view indicator */}
            <span className="text-[10px] text-emerald-500/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> View Details
            </span>
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
          backdrop: "bg-black/70 backdrop-blur-md z-50",
          base: "bg-[#0a1a13] border border-emerald-500/40 text-white rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)] mx-4 max-w-sm z-50",
          closeButton:
            "hover:bg-white/10 active:bg-white/20 text-gray-400 hover:text-white top-3 right-3",
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
                      <div className="mb-2 bg-emerald-950/80 border border-emerald-500 text-emerald-400 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>Founder & CEO</span>
                      </div>
                    )}

                    {/* Modal Avatar */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 p-1 bg-black shadow-[0_0_25px_rgba(16,185,129,0.5)] my-2">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        sizes="96px"
                        className="rounded-full object-cover p-0.5"
                      />
                    </div>

                    <h3 className="text-xl font-bold font-orbitron text-white mt-1 text-center">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                      {selectedMember.role}
                    </p>
                  </ModalHeader>

                  <ModalBody className="py-3 px-6">
                    <div className="flex flex-col gap-2.5 bg-black/40 border border-white/10 rounded-xl p-3.5">
                      {/* Row 1: Position */}
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 text-xs font-semibold shrink-0">
                          Position:
                        </span>
                        <span className="text-gray-200 text-xs font-medium truncate">
                          {selectedMember.role}
                        </span>
                      </div>

                      {/* Row 2: Study / Work */}
                      {selectedMember.study && (
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-emerald-400 text-xs font-semibold shrink-0">
                            Study:
                          </span>
                          <span className="text-gray-200 text-xs font-medium truncate">
                            {selectedMember.study}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Social Connect */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                      {selectedMember.facebook && (
                        <a
                          href={selectedMember.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:border-blue-500 transition-all text-xs font-semibold active:scale-95"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Facebook</span>
                        </a>
                      )}
                      {selectedMember.whatsapp && (
                        <a
                          href={selectedMember.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-500 transition-all text-xs font-semibold active:scale-95"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </ModalBody>

                  <ModalFooter className="justify-center pb-5 pt-2">
                    <Button
                      color="danger"
                      variant="light"
                      size="sm"
                      onPress={onClose}
                      className="font-medium text-xs text-gray-400 hover:text-white"
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
