"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wallet, History, Copy, Check, Smartphone, CheckCircle2, AlertCircle, ArrowLeft, Gem } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AddMoneyPage() {
  const { gatewaySettings, currentUser, addMoneyRequests, requestAddMoney } = useApp();

  const [selectedMethod, setSelectedMethod] = useState("bKash");
  const [amount, setAmount] = useState("");
  const [senderPhone, setSenderPhone] = useState(currentUser?.phone || "");
  const [trxId, setTrxId] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Get active gateway number based on selected method
  const activeNumber =
    selectedMethod === "bKash"
      ? gatewaySettings.bkashNumber
      : selectedMethod === "Nagad"
      ? gatewaySettings.nagadNumber
      : gatewaySettings.rocketNumber;

  const handleCopy = () => {
    if (activeNumber && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(activeNumber);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < (gatewaySettings.minAddMoney || 25)) {
      setErrorMsg(`সর্বনিম্ন ৳${gatewaySettings.minAddMoney || 25} জমা করতে পারবেন`);
      return;
    }
    if (numericAmount > (gatewaySettings.maxAddMoney || 25000)) {
      setErrorMsg(`সর্বোচ্চ ৳${gatewaySettings.maxAddMoney || 25000} জমা করতে পারবেন`);
      return;
    }
    if (!trxId.trim()) {
      setErrorMsg("অনুগ্রহ করে সঠিক Transaction ID (TrxID) প্রদান করুন");
      return;
    }

    // Submit live request into global dynamic AppContext
    requestAddMoney({
      amount: numericAmount,
      method: selectedMethod,
      trxId: trxId.trim().toUpperCase(),
      phone: senderPhone || currentUser?.phone || "01711-000000",
    });

    setSubmittedSuccess(true);
    setAmount("");
    setTrxId("");
    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  // User's own add money request history from live AppContext
  const myRequests = addMoneyRequests.filter(
    (r) =>
      r.userId === currentUser?.id ||
      r.phone === currentUser?.phone ||
      (currentUser?.name && r.user.includes(currentUser.name))
  );

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 pt-8 pb-32 px-4 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        {/* Top Back Nav & User Balance Card */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
            <span className="text-slate-400">বর্তমান ব্যালেন্স:</span>
            <span className="font-extrabold text-emerald-400">৳{(currentUser?.balance || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Section 1: Dynamic Add Money Form */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white">অ্যাড মানি (Add Money)</h1>
                <p className="text-[11px] text-slate-400">টাকা জমা দিয়ে তাৎক্ষণিক ডায়মন্ড টপআপ করুন</p>
              </div>
            </div>

            <span className="text-[10px] font-mono bg-cyan-500/15 text-cyan-300 px-2 py-1 rounded-lg border border-cyan-500/30">
              1💎 = ৳{gatewaySettings.diamondRate}
            </span>
          </div>

          {/* Success Banner */}
          {submittedSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-2 text-xs font-semibold text-emerald-300 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>আপনার অ্যাড মানি রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে! অ্যাডমিন অনুমোদনের পর ব্যালেন্স যোগ হবে।</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center gap-2 text-xs font-semibold text-rose-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Select Payment Method */}
          <div className="space-y-2 mb-5">
            <label className="text-xs font-semibold text-slate-300">১. পেমেন্ট মেথড সিলেক্ট করুন:</label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "bKash", name: "বিকাশ", color: "pink", active: gatewaySettings.bkashActive },
                { id: "Nagad", name: "নগদ", color: "orange", active: gatewaySettings.nagadActive },
                { id: "Rocket", name: "রকেট", color: "purple", active: gatewaySettings.rocketActive },
              ].map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/10"
                        : "bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs block">{method.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">{method.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Show Live Gateway Number from Admin Config */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                আমাদের {selectedMethod} নম্বর (Send Money):
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Live Admin Config
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5">
              <span className="font-mono font-bold text-sm text-white tracking-wider">{activeNumber}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 px-3 py-1 rounded-lg transition-all active:scale-95"
              >
                {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNumber ? "কপি হয়েছে!" : "কপি নম্বর"}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 italic">
              * উপরের নম্বরে সেন্ড মানি করে নিচে ফর্ম পূরণ করুন।
            </p>
          </div>

          {/* Step 3: Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="amount-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                ২. জমার পরিমাণ (টাকা):
              </label>
              <input
                id="amount-input"
                type="number"
                min={gatewaySettings.minAddMoney || 25}
                max={gatewaySettings.maxAddMoney || 25000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`${gatewaySettings.minAddMoney || 25} - ${gatewaySettings.maxAddMoney || 25000} টাকা`}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-600 font-mono"
                required
              />
            </div>

            <div>
              <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                ৩. যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Phone):
              </label>
              <input
                id="phone-input"
                type="text"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="017xxxxxxxx"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-600 font-mono"
                required
              />
            </div>

            <div>
              <label htmlFor="trx-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                ৪. ট্রানজেকশন আইডি (TrxID):
              </label>
              <input
                id="trx-input"
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="যেমন: BK9X7718A বা NG882194B"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-600 font-mono uppercase"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 text-sm mt-2"
            >
              রিকোয়েস্ট সাবমিট করুন (Add Money)
            </button>
          </form>
        </section>

        {/* Section 2: My Add Money Requests History (Live Dynamic Sync) */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <History className="w-4.5 h-4.5 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">আমার ডিপোজিট হিস্টোরি (My Requests)</h2>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Live Sync</span>
          </div>

          <div className="space-y-3">
            {myRequests.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">আপনার কোন পূর্ববর্তী রিকোয়েস্ট নেই</p>
            ) : (
              myRequests.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">+{item.amount} টাকা</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {item.method}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">Trx: {item.trxId}</p>
                    <p className="text-[10px] text-slate-500">{item.time}</p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === "Approved"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : item.status === "Rejected"
                        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                        : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {item.status === "Approved" ? "অনুমোদিত ✓" : item.status === "Rejected" ? "বাতিল ✕" : "পেন্ডিং..."}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
