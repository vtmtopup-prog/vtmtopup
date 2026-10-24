"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Users,
  Trophy,
  Settings,
  LogOut,
  Bell,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Banknote,
  Gem,
  Plus,
  Minus,
  Copy,
  Check,
  Flame,
  Smartphone,
  Save,
  Trash2,
  Edit3,
  RefreshCw,
  Power,
  ChevronRight,
  Menu,
  X,
  Sliders,
  DollarSign,
  Activity,
  UserCheck,
  UserX,
  Award,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

// ─── Taka Currency Symbol ─────────────────────────────────────────────
function Taka({ className = "" }) {
  return <span className={`font-semibold ${className}`}>৳</span>;
}

// ─── Main Admin Panel Component (Fully Dynamic & Interconnected) ──────
export default function AdminPage() {
  // Pull Shared Live Global State & Action Handlers from AppContext
  const {
    users,
    orders,
    addMoneyRequests,
    gatewaySettings,
    siteSettings,
    leaderboard,
    autoCalculateLeaderboard,
    activities,
    approveOrder,
    cancelOrder,
    approveAddMoney,
    rejectAddMoney,
    adjustUserBalance,
    adjustUserDiamonds,
    updateUser,
    toggleUserBan,
    updateLeaderboardItem,
    resetLeaderboard,
    toggleAutoCalculateLeaderboard,
    updateGatewaySettings,
    updateSiteSettings,
  } = useApp();

  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'orders' | 'payments' | 'users' | 'leaderboard' | 'settings'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter States
  const [orderFilter, setOrderFilter] = useState("All"); // 'All' | 'Pending' | 'Completed' | 'Cancelled'
  const [orderSearch, setOrderSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState("All"); // 'All' | 'Active' | 'Banned'
  const [addMoneyFilter, setAddMoneyFilter] = useState("Pending"); // 'All' | 'Pending' | 'Approved' | 'Rejected'

  // Modals & Dialogs State
  const [activeModal, setActiveModal] = useState(null);
  const [cancelReasonInput, setCancelReasonInput] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Local Form Controls for Edits
  const [editingUser, setEditingUser] = useState(null);
  const [balanceAmountChange, setBalanceAmountChange] = useState("");
  const [diamondAmountChange, setDiamondAmountChange] = useState("");
  const [editingLeader, setEditingLeader] = useState(null);

  // Local Gateway Settings State (synced with global)
  const [localGateway, setLocalGateway] = useState(gatewaySettings);
  React.useEffect(() => {
    setLocalGateway(gatewaySettings);
  }, [gatewaySettings]);

  // Local Site Settings State
  const [localSite, setLocalSite] = useState(siteSettings);
  React.useEffect(() => {
    setLocalSite(siteSettings);
  }, [siteSettings]);

  // Toast Notification State
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleCopy = (text, id) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ─── Computed Statistics from Live Collections ─────────────────────
  const pendingOrdersCount = useMemo(() => orders.filter((o) => o.status === "Pending").length, [orders]);
  const pendingAddMoneyCount = useMemo(() => addMoneyRequests.filter((r) => r.status === "Pending").length, [addMoneyRequests]);
  const totalSalesToday = useMemo(() => {
    return orders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  }, [orders]);

  // ─── Navigation Tabs List ─────────────────────────────────────────
  const navTabs = [
    { id: "dashboard", labelBangla: "ড্যাশবোর্ড", labelEng: "Dashboard", icon: LayoutDashboard },
    { id: "orders", labelBangla: "অর্ডার তালিকা", labelEng: "Orders", icon: ShoppingBag, badge: pendingOrdersCount },
    { id: "payments", labelBangla: "পেমেন্ট গেটওয়ে", labelEng: "Payments", icon: CreditCard, badge: pendingAddMoneyCount },
    { id: "users", labelBangla: "ইউজার লিস্ট", labelEng: "Users", icon: Users },
    { id: "leaderboard", labelBangla: "লিডারবোর্ড", labelEng: "Leaderboard", icon: Trophy },
    { id: "settings", labelBangla: "সেটিংস", labelEng: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-emerald-500 selection:text-white font-sans">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-md text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-3">
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === "error" && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === "info" && <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0" />}
          <span className="text-slate-200">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SIDEBAR                                                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#0c1322] border-r border-slate-800/80 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-wide text-white font-mono flex items-center gap-1.5">
                  VTM TOPUP
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    LIVE
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">অ্যাডমিন কন্ট্রোল প্যানেল</p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick link to client site */}
          <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800/50 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>ক্লায়েন্ট সাইট দেখুন (Live Site)</span>
            </Link>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
              Synced
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 flex-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                    <div className="text-left flex flex-col">
                      <span className="leading-tight">{tab.labelBangla}</span>
                      <span className={`text-[10px] leading-tight opacity-75 font-normal ${isActive ? "text-slate-900 font-semibold" : "text-slate-500"}`}>
                        {tab.labelEng}
                      </span>
                    </div>
                  </div>

                  {tab.badge && tab.badge > 0 ? (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-slate-950 text-emerald-400" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 opacity-40 ${isActive ? "text-slate-950" : "text-slate-600"}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-400">
                TA
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">তানভীর আহমেদ</p>
                <p className="text-[10px] text-slate-400">সুপার অ্যাডমিন (Admin)</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveModal({ type: "logoutConfirm" })}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all active:scale-[0.98]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট করুন (Logout)</span>
          </button>
        </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MAIN CONTENT AREA                                             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header Bar */}
        <header className="sticky top-0 z-30 bg-[#0c1322]/95 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/70 border border-slate-700 md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  {navTabs.find((t) => t.id === activeTab)?.labelBangla}
                  <span className="text-xs text-slate-500 font-normal hidden sm:inline">
                    ({navTabs.find((t) => t.id === activeTab)?.labelEng})
                  </span>
                </h2>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-emerald-400">{users.filter((u) => u.status === "Active").length}</span>
                  <span className="text-slate-400">সক্রিয় ইউজার</span>
                </div>
                <div className="w-px h-3 bg-slate-700" />
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="font-semibold text-white">{orders.length}</span>
                  <span className="text-slate-400">মোট লাইভ অর্ডার</span>
                </div>
              </div>

              {pendingOrdersCount > 0 && (
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pendingOrdersCount} পেন্ডিং অর্ডার</span>
                </button>
              )}

              {/* Maintenance Toggle */}
              <button
                onClick={() => setActiveModal({ type: "siteToggle" })}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                  siteSettings.siteActive
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                    : "bg-rose-500/15 border-rose-500/30 text-rose-400 hover:bg-rose-500/25"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">সাইট স্ট্যাটাস:</span>
                <span>{siteSettings.siteActive ? "চালু (Active)" : "মেইনটেন্যান্স"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-6">
          {/* ─────────────────────────────────────────────────────────── */}
          {/* TAB 1: ড্যাশবোর্ড (DASHBOARD)                                */}
          {/* ─────────────────────────────────────────────────────────── */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. মোট অর্ডার */}
                <div
                  onClick={() => setActiveTab("orders")}
                  className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-2xl p-5 transition-all hover:border-slate-700 hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">মোট অর্ডার (Orders)</span>
                    <div className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 transition-colors">
                      <ShoppingBag className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">{orders.length}</span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" /> Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium">ডায়নামিক ডাটাবেজ রেকর্ড</p>
                </div>

                {/* 2. আজকের বিক্রি */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">আজকের বিক্রি (Today's Sale)</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                      <Banknote className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <Taka className="text-2xl text-emerald-400 font-bold" />
                    <span className="text-3xl font-extrabold text-white">{totalSalesToday.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium">সম্পন্ন অর্ডার থেকে স্বয়ংক্রিয় হিসেব</p>
                </div>

                {/* 3. পেন্ডিং অর্ডার */}
                <div
                  onClick={() => {
                    setOrderFilter("Pending");
                    setActiveTab("orders");
                  }}
                  className={`cursor-pointer border rounded-2xl p-5 transition-all group ${
                    pendingOrdersCount > 0
                      ? "bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/15 hover:border-rose-500/50"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">পেন্ডিং অর্ডার (Pending)</span>
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">{pendingOrdersCount}</span>
                    <span className="text-xs text-rose-300 font-medium">অপেক্ষমাণ</span>
                  </div>
                  <p className="text-xs text-rose-300/80 mt-1 font-medium flex items-center gap-1">
                    অ্যাপ্রুভ করতে ক্লিক করুন <ChevronRight className="w-3 h-3 inline" />
                  </p>
                </div>

                {/* 4. মোট ইউজার */}
                <div
                  onClick={() => setActiveTab("users")}
                  className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-2xl p-5 transition-all hover:border-slate-700 group"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">মোট ইউজার (Users)</span>
                    <div className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">{users.length}</span>
                    <span className="text-xs text-slate-400 font-medium">নিবন্ধিত গেমার</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium">ব্যালেন্স ও লেভেল কন্ট্রোল</p>
                </div>
              </div>

              {/* Live Pending Queue & Recent Activity Log */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4.5 h-4.5 text-amber-400" />
                      <h3 className="text-sm font-bold text-white">জরুরি পেন্ডিং অ্যাকশন (Urgent Queue)</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      সব অর্ডার দেখুন <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {orders.filter((o) => o.status === "Pending").length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-semibold text-slate-300">কোন পেন্ডিং অর্ডার নেই!</p>
                      <p className="text-xs text-slate-500 mt-0.5">সব অর্ডার সম্পন্ন করা হয়েছে।</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders
                        .filter((o) => o.status === "Pending")
                        .slice(0, 3)
                        .map((order) => (
                          <div
                            key={order.id}
                            className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-emerald-400">{order.id}</span>
                                <span className="text-xs font-semibold text-slate-200">{order.user}</span>
                                <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                                  UID: {order.uid}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-400">
                                <span className="text-cyan-300 font-semibold">{order.item}</span>
                                <span>•</span>
                                <span className="text-white font-bold">৳{order.amount} ({order.method})</span>
                                <span>•</span>
                                <span className="font-mono text-[11px] text-slate-400">Trx: {order.trxId}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveModal({ type: "orderApprove", data: order })}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                              >
                                অ্যাপ্রুভ করুন
                              </button>
                              <button
                                onClick={() => {
                                  setCancelReasonInput("");
                                  setActiveModal({ type: "orderCancel", data: order });
                                }}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all active:scale-95"
                              >
                                বাতিল
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Live Activities Log */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4.5 h-4.5 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white">রিয়েল-টাইম লগ (Live Activities)</h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">Auto-Sync</span>
                  </div>

                  <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                    {activities.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-8">কোন নতুন অ্যাক্টিভিটি লগ নেই</p>
                    ) : (
                      activities.map((act) => (
                        <div key={act.id} className="flex items-start gap-3 text-xs">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              act.type === "success"
                                ? "bg-emerald-400"
                                : act.type === "error"
                                ? "bg-rose-400"
                                : act.type === "warning"
                                ? "bg-amber-400"
                                : "bg-cyan-400"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-200">{act.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{act.desc}</p>
                            <span className="text-[10px] text-slate-500 mt-1 block">{act.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* TAB 2: অর্ডার ম্যানেজমেন্ট (LIVE ORDERS)                    */}
          {/* ─────────────────────────────────────────────────────────── */}
          {activeTab === "orders" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {["All", "Pending", "Completed", "Cancelled"].map((status) => {
                    const count =
                      status === "All" ? orders.length : orders.filter((o) => o.status === status).length;
                    const isActive = orderFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                            : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <span>
                          {status === "All"
                            ? "সকল অর্ডার"
                            : status === "Pending"
                            ? "পেন্ডিং"
                            : status === "Completed"
                            ? "সম্পন্ন"
                            : "বাতিল"}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isActive ? "bg-slate-950/20 text-slate-950 font-extrabold" : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="অর্ডার ID, UID বা নাম দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              {/* Dynamic Orders Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3.5 px-4">অর্ডার ID ও সময়</th>
                        <th className="py-3.5 px-4">ইউজার ও ফোন</th>
                        <th className="py-3.5 px-4">গেম ID / UID</th>
                        <th className="py-3.5 px-4">আইটেম প্যাকেজ</th>
                        <th className="py-3.5 px-4">মূল্য ও মেথড</th>
                        <th className="py-3.5 px-4">ট্রানজেকশন ID</th>
                        <th className="py-3.5 px-4 text-center">স্ট্যাটাস</th>
                        <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders
                        .filter((o) => {
                          if (orderFilter !== "All" && o.status !== orderFilter) return false;
                          if (orderSearch) {
                            const q = orderSearch.toLowerCase();
                            return (
                              o.id.toLowerCase().includes(q) ||
                              o.user.toLowerCase().includes(q) ||
                              o.uid.includes(q) ||
                              o.trxId.toLowerCase().includes(q)
                            );
                          }
                          return true;
                        })
                        .map((order) => {
                          const isPending = order.status === "Pending";
                          const isCompleted = order.status === "Completed";
                          const isCancelled = order.status === "Cancelled";

                          return (
                            <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="font-mono font-bold text-white block">{order.id}</span>
                                <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3 text-slate-500" /> {order.time}
                                </span>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="font-semibold text-slate-200 block">{order.user}</span>
                                <span className="text-[11px] text-slate-400">{order.phone}</span>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleCopy(order.uid, `uid-${order.id}`)}
                                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 font-mono text-emerald-400 font-bold group"
                                  title="UID কপি করতে ক্লিক করুন"
                                >
                                  <span>{order.uid}</span>
                                  {copiedId === `uid-${order.id}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                                  )}
                                </button>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="font-bold text-cyan-300 flex items-center gap-1">
                                  <Gem className="w-3.5 h-3.5 text-cyan-400" /> {order.item}
                                </span>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="font-bold text-white block">৳{order.amount}</span>
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded inline-block mt-0.5 ${
                                    order.method === "bKash"
                                      ? "bg-pink-500/15 text-pink-300 border border-pink-500/30"
                                      : order.method === "Nagad"
                                      ? "bg-orange-500/15 text-orange-300 border border-orange-500/30"
                                      : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                  }`}
                                >
                                  {order.method}
                                </span>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleCopy(order.trxId, `trx-${order.id}`)}
                                  className="flex items-center gap-1 font-mono text-xs text-slate-300 hover:text-white"
                                  title="TrxID কপি করুন"
                                >
                                  <span>{order.trxId}</span>
                                  {copiedId === `trx-${order.id}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                  )}
                                </button>
                              </td>

                              <td className="py-4 px-4 text-center whitespace-nowrap">
                                {isPending && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                    <Clock className="w-3 h-3" /> পেন্ডিং
                                  </span>
                                )}
                                {isCompleted && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                    <CheckCircle2 className="w-3 h-3" /> সম্পন্ন
                                  </span>
                                )}
                                {isCancelled && (
                                  <span
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30"
                                    title={order.cancelReason}
                                  >
                                    <XCircle className="w-3 h-3" /> বাতিল
                                  </span>
                                )}
                              </td>

                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                {isPending ? (
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => setActiveModal({ type: "orderApprove", data: order })}
                                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95"
                                    >
                                      অ্যাপ্রুভ করুন
                                    </button>
                                    <button
                                      onClick={() => {
                                        setCancelReasonInput("");
                                        setActiveModal({ type: "orderCancel", data: order });
                                      }}
                                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all active:scale-95"
                                    >
                                      বাতিল
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-slate-500 italic">লকড</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* TAB 3: পেমেন্ট ম্যানেজমেন্ট (PAYMENT & GATEWAY CONFIG)      */}
          {/* ─────────────────────────────────────────────────────────── */}
          {activeTab === "payments" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 7 Cols: পেন্ডিং অ্যাড মানি রিকোয়েস্ট */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Banknote className="w-4.5 h-4.5 text-emerald-400" />
                        পেন্ডিং অ্যাড মানি রিকোয়েস্ট (Add Money Queue)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">টাকা জমা দিয়ে ব্যালেন্স বৃদ্ধির আবেদনসমূহ</p>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                      {["Pending", "All", "Approved"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setAddMoneyFilter(filter)}
                          className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                            addMoneyFilter === filter
                              ? "bg-emerald-500 text-slate-950 font-bold"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {filter === "Pending" ? "পেন্ডিং" : filter === "All" ? "সব" : "অনুমোদিত"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {addMoneyRequests
                      .filter((r) => (addMoneyFilter === "All" ? true : r.status === addMoneyFilter))
                      .map((req) => (
                        <div
                          key={req.id}
                          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-emerald-400">{req.id}</span>
                              <span className="text-sm font-bold text-white">{req.user}</span>
                              <span className="text-xs text-slate-400">({req.phone})</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-300">
                              <span className="font-bold text-emerald-400 text-sm">৳{req.amount}</span>
                              <span>•</span>
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-semibold">
                                {req.method}
                              </span>
                              <span>•</span>
                              <button
                                onClick={() => handleCopy(req.trxId, req.id)}
                                className="font-mono text-slate-400 hover:text-white flex items-center gap-1"
                              >
                                <span>Trx: {req.trxId}</span>
                                {copiedId === req.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500 block">{req.time}</span>
                          </div>

                          {req.status === "Pending" ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveModal({ type: "addMoneyApprove", data: req })}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                              >
                                অ্যাপ্রুভ করুন
                              </button>
                              <button
                                onClick={() => {
                                  setCancelReasonInput("");
                                  setActiveModal({ type: "addMoneyReject", data: req });
                                }}
                                className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all active:scale-95"
                              >
                                বাতিল
                              </button>
                            </div>
                          ) : (
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                req.status === "Approved"
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                              }`}
                            >
                              {req.status === "Approved" ? "অনুমোদিত ✓" : "বাতিল ✕"}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right 5 Cols: পেমেন্ট সেটিংস কনফিগ */}
                <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4.5 h-4.5 text-cyan-400" />
                      পেমেন্ট গেটওয়ে সেটিংস (Payment Gateway Config)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">এখানে নাম্বার পরিবর্তন করলে সাথে সাথে ক্লায়েন্ট স্ক্রিনে আপডেট হবে</p>
                  </div>

                  {/* bKash */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> বিকাশ গেটওয়ে নম্বর (bKash)
                      </label>
                      <button
                        onClick={() =>
                          setLocalGateway((prev) => ({ ...prev, bkashActive: !prev.bkashActive }))
                        }
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                          localGateway.bkashActive
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-500 border-slate-700"
                        }`}
                      >
                        {localGateway.bkashActive ? "সক্রিয়" : "বন্ধ"}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={localGateway.bkashNumber}
                      onChange={(e) => setLocalGateway({ ...localGateway, bkashNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-pink-500/50"
                    />
                  </div>

                  {/* Nagad */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> নগদ গেটওয়ে নম্বর (Nagad)
                      </label>
                      <button
                        onClick={() =>
                          setLocalGateway((prev) => ({ ...prev, nagadActive: !prev.nagadActive }))
                        }
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                          localGateway.nagadActive
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-500 border-slate-700"
                        }`}
                      >
                        {localGateway.nagadActive ? "সক্রিয়" : "বন্ধ"}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={localGateway.nagadNumber}
                      onChange={(e) => setLocalGateway({ ...localGateway, nagadNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500/50"
                    />
                  </div>

                  {/* Rocket */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> রকেট গেটওয়ে নম্বর (Rocket)
                      </label>
                      <button
                        onClick={() =>
                          setLocalGateway((prev) => ({ ...prev, rocketActive: !prev.rocketActive }))
                        }
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                          localGateway.rocketActive
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-500 border-slate-700"
                        }`}
                      >
                        {localGateway.rocketActive ? "সক্রিয়" : "বন্ধ"}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={localGateway.rocketNumber}
                      onChange={(e) => setLocalGateway({ ...localGateway, rocketNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  {/* Diamond Rate */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Gem className="w-3.5 h-3.5 text-cyan-400" /> ডায়মন্ড প্রতি রেট (টাকা)
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">1💎 = ৳{localGateway.diamondRate}</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={localGateway.diamondRate}
                      onChange={(e) => setLocalGateway({ ...localGateway, diamondRate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  {/* Save Gateway Settings Button */}
                  <button
                    onClick={() => {
                      updateGatewaySettings(localGateway);
                      showToast("পেমেন্ট গেটওয়ে সেটিংস সফলভাবে আপডেট হয়েছে!", "success");
                    }}
                    className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>সেটিংস সংরক্ষণ করুন (Save Settings)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* TAB 4: ইউজার কন্ট্রোল (USER & WALLET MANAGEMENT)           */}
          {/* ─────────────────────────────────────────────────────────── */}
          {activeTab === "users" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {["All", "Active", "Banned"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setUserFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        userFilter === status
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {status === "All" ? "সকল ইউজার" : status === "Active" ? "সক্রিয়" : "ব্যানকৃত"}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="নাম, ইমেইল অথবা ফোন দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              {/* Dynamic User Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3.5 px-4">ইউজার আইডি ও নাম</th>
                        <th className="py-3.5 px-4">যোগাযোগ (ইমেইল / ফোন)</th>
                        <th className="py-3.5 px-4">ওয়ালেট ব্যালেন্স (Tk)</th>
                        <th className="py-3.5 px-4">ডায়মন্ড ভল্ট (💎)</th>
                        <th className="py-3.5 px-4">লেভেল / র‍্যাঙ্ক</th>
                        <th className="py-3.5 px-4 text-center">স্ট্যাটাস</th>
                        <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {users
                        .filter((u) => {
                          if (userFilter !== "All" && u.status !== userFilter) return false;
                          if (userSearch) {
                            const q = userSearch.toLowerCase();
                            return (
                              u.name.toLowerCase().includes(q) ||
                              u.email.toLowerCase().includes(q) ||
                              u.phone.includes(q) ||
                              u.id.toLowerCase().includes(q)
                            );
                          }
                          return true;
                        })
                        .map((user) => (
                          <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className="font-mono text-[11px] text-slate-500 block">{user.id}</span>
                              <span className="font-bold text-white text-sm">{user.name}</span>
                              <span className="text-[10px] text-slate-500 block">অর্ডার: {user.totalOrders || 0} টি</span>
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className="text-slate-300 block font-mono text-[11px]">{user.email}</span>
                              <span className="text-[11px] text-slate-400">{user.phone}</span>
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1 font-bold text-emerald-400 text-sm">
                                <Taka />
                                <span>{(user.balance || 0).toLocaleString()}</span>
                              </div>
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 font-bold text-cyan-300 text-sm">
                                <Gem className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{(user.diamonds || 0).toLocaleString()}</span>
                              </div>
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                  user.rankTier === "Grandmaster"
                                    ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                    : user.rankTier === "Master"
                                    ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                                    : user.rankTier === "Diamond"
                                    ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                                    : "bg-slate-800 text-slate-300 border-slate-700"
                                }`}
                              >
                                {user.rankTier || "Bronze"}
                              </span>
                            </td>

                            <td className="py-4 px-4 text-center whitespace-nowrap">
                              {user.status === "Active" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  <UserCheck className="w-3 h-3" /> সক্রিয়
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                                  <UserX className="w-3 h-3" /> নিষিদ্ধ (Banned)
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setEditingUser({ ...user });
                                  setBalanceAmountChange("");
                                  setDiamondAmountChange("");
                                  setActiveModal({ type: "editUser", data: user });
                                }}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition-all active:scale-95 flex items-center gap-1.5 ml-auto"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>এডিট ইউজার</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* TAB 5: লিডারবোর্ড অ্যাক্সেস (LEADERBOARD SYSTEM)             */}
          {/* ─────────────────────────────────────────────────────────── */}
          {activeTab === "leaderboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    টপ প্লেয়ার লিডারবোর্ড সিস্টেম (Dynamic Live Leaderboard)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ইউজারের ক্রয়কৃত ডায়মন্ড থেকে সরাসরি লাইভ হিসেব করা হয়
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">অটো-ক্যালকুলেশন</span>
                    <button
                      onClick={toggleAutoCalculateLeaderboard}
                      className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                        autoCalculateLeaderboard ? "bg-emerald-500 justify-end" : "bg-slate-700 justify-start"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md" />
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveModal({ type: "resetLeaderboard" })}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>রিসেট বোর্ড</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Leaderboard Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3.5 px-4 text-center w-16">র‍্যাঙ্ক</th>
                        <th className="py-3.5 px-4">প্লেয়ার ও অ্যাভাটার</th>
                        <th className="py-3.5 px-4">গেম UID</th>
                        <th className="py-3.5 px-4">ক্রয়কৃত ডায়মন্ড (💎)</th>
                        <th className="py-3.5 px-4">টিয়ার ব্যাজ</th>
                        <th className="py-3.5 px-4 text-right">পজিশন ওভাররাইড</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leaderboard.map((player) => (
                        <tr key={player.rank} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`w-7 h-7 rounded-full inline-flex items-center justify-center font-extrabold text-xs ${
                                player.rank === 1
                                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                                  : player.rank === 2
                                  ? "bg-slate-300 text-slate-950"
                                  : player.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "bg-slate-800 text-slate-400 font-mono"
                              }`}
                            >
                              #{player.rank}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              {player.avatar && player.avatar.startsWith("http") ? (
                                <img
                                  src={player.avatar}
                                  alt={player.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-700"
                                />
                              ) : (
                                <span className="text-xl">{player.avatar || "👑"}</span>
                              )}
                              <span className="font-bold text-white text-sm">{player.name}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap font-mono text-emerald-400 font-semibold">
                            {player.uid}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-extrabold text-cyan-300 text-sm flex items-center gap-1">
                              <Gem className="w-3.5 h-3.5 text-cyan-400" />
                              {(player.diamonds || 0).toLocaleString()} 💎
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                              {player.tier}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setEditingLeader({ ...player });
                                setActiveModal({ type: "editLeader", data: player });
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 ml-auto active:scale-95"
                            >
                              <Edit3 className="w-3 h-3 text-amber-400" />
                              <span>ম্যানুয়াল এডিট</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* TAB 6: সেটিংস (SETTINGS)                                     */}
          {/* ─────────────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bell className="w-4.5 h-4.5 text-amber-400" />
                    ওয়েবসাইট নোটিশ ও জরুরি বার্তা (Site Announcement)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">টপআপ পেজের উপরে এই নোটিশটি ব্যানারে দেখাবে</p>
                </div>

                <textarea
                  rows={3}
                  value={localSite.siteNotice}
                  onChange={(e) => setLocalSite({ ...localSite, siteNotice: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 leading-relaxed"
                />
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                    গ্রাহক সেবা ও অপারেশন কন্ট্রোল (Support & Operations)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">হোয়াটসঅ্যাপ সাপোর্ট নম্বর</label>
                    <input
                      type="text"
                      value={localSite.whatsappNumber}
                      onChange={(e) => setLocalSite({ ...localSite, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">টেলিগ্রাম চ্যানেল লিংক</label>
                    <input
                      type="text"
                      value={localSite.telegramChannel}
                      onChange={(e) => setLocalSite({ ...localSite, telegramChannel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-slate-300">মেইনটেন্যান্স বার্তা</label>
                  <input
                    type="text"
                    value={localSite.maintenanceMessage}
                    onChange={(e) => setLocalSite({ ...localSite, maintenanceMessage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      updateSiteSettings(localSite);
                      showToast("সকল সেটিংস সফলভাবে সংরক্ষিত হয়েছে!", "success");
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-2 active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>সংরক্ষণ করুন (Save Changes)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE MODALS & DIALOGS (WIRED TO LIVE APP CONTEXT)      */}
      {/* ───────────────────────────────────────────────────────────── */}

      {/* 1. Modal: অর্ডার অ্যাপ্রুভ */}
      {activeModal?.type === "orderApprove" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">অর্ডার অ্যাপ্রুভ নিশ্চিতকরণ</h4>
                <p className="text-xs text-slate-400">অর্ডার নম্বর: {activeModal.data.id}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">গ্রাহক:</span>
                <span className="font-semibold text-white">{activeModal.data.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Game UID:</span>
                <span className="font-mono text-emerald-400 font-bold">{activeModal.data.uid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">আইটেম:</span>
                <span className="font-bold text-cyan-300">{activeModal.data.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">টাকার পরিমাণ:</span>
                <span className="font-bold text-white">৳{activeModal.data.amount} ({activeModal.data.method})</span>
              </div>
            </div>

            <p className="text-xs text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
              💡 অ্যাপ্রুভ করলে গ্রাহকের অ্যাকাউন্টে সরাসরি ডায়মন্ড যুক্ত হবে এবং লাইভ অর্ডার হিস্টোরি ও লিডারবোর্ডে সাথে সাথে আপডেট হবে।
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                না, ফিরে যান
              </button>
              <button
                onClick={() => {
                  approveOrder(activeModal.data.id);
                  showToast(`অর্ডার ${activeModal.data.id} সফলভাবে অ্যাপ্রুভ হয়েছে!`, "success");
                  setActiveModal(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
              >
                হ্যাঁ, অ্যাপ্রুভ করুন ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: অর্ডার বাতিল */}
      {activeModal?.type === "orderCancel" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">অর্ডার বাতিল করুন</h4>
                <p className="text-xs text-slate-400">অর্ডার: {activeModal.data.id}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">বাতিলের কারণ:</label>
              <input
                type="text"
                placeholder="ভুল UID, পেমেন্ট পাওয়া যায়নি..."
                value={cancelReasonInput}
                onChange={(e) => setCancelReasonInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500/50"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                বাতিল করবেন না
              </button>
              <button
                onClick={() => {
                  cancelOrder(activeModal.data.id, cancelReasonInput || "অ্যাডমিন কর্তৃক বাতিল");
                  showToast(`অর্ডার ${activeModal.data.id} বাতিল করা হয়েছে`, "info");
                  setActiveModal(null);
                  setCancelReasonInput("");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all active:scale-95"
              >
                বাতিল নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: অ্যাড মানি অ্যাপ্রুভ */}
      {activeModal?.type === "addMoneyApprove" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">অ্যাড মানি অনুমোদন করুন</h4>
                <p className="text-xs text-slate-400">রিকোয়েস্ট ID: {activeModal.data.id}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">ইউজার নাম:</span>
                <span className="font-semibold text-white">{activeModal.data.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">জমা দেওয়ার পরিমাণ:</span>
                <span className="font-bold text-emerald-400 text-sm">৳{activeModal.data.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">পেমেন্ট মেথড:</span>
                <span className="font-semibold text-slate-200">{activeModal.data.method} ({activeModal.data.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TrxID:</span>
                <span className="font-mono text-white">{activeModal.data.trxId}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                ফিরে যান
              </button>
              <button
                onClick={() => {
                  approveAddMoney(activeModal.data.id);
                  showToast(`৳${activeModal.data.amount} ব্যালেন্স ইউজারের অ্যাকাউন্টে যোগ হয়েছে!`, "success");
                  setActiveModal(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95"
              >
                ব্যালেন্স ক্রেডিট করুন ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: অ্যাড মানি রিজেক্ট */}
      {activeModal?.type === "addMoneyReject" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">অ্যাড মানি বাতিল করুন</h4>
                <p className="text-xs text-slate-400">অনুরোধ: {activeModal.data.id}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">প্রত্যাখ্যানের কারণ:</label>
              <input
                type="text"
                placeholder="যেমন: টাকা জমা আসেনি, ফেক TrxID..."
                value={cancelReasonInput}
                onChange={(e) => setCancelReasonInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500/50"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                ফিরে যান
              </button>
              <button
                onClick={() => {
                  rejectAddMoney(activeModal.data.id, cancelReasonInput || "ইনভ্যালিড ট্রানজেকশন");
                  showToast(`অনুরোধ #${activeModal.data.id} বাতিল করা হয়েছে`, "info");
                  setActiveModal(null);
                  setCancelReasonInput("");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all active:scale-95"
              >
                প্রত্যাখ্যান নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: এডিট ইউজার ও ব্যালেন্স (Instant Dynamic Sync) */}
      {activeModal?.type === "editUser" && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
                  {editingUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{editingUser.name}</h4>
                  <p className="text-xs text-slate-400">{editingUser.email} • {editingUser.phone}</p>
                </div>
              </div>

              {/* 1-Click Ban/Unban */}
              <button
                onClick={() => {
                  toggleUserBan(editingUser.id);
                  setEditingUser((prev) => ({
                    ...prev,
                    status: prev.status === "Active" ? "Banned" : "Active",
                  }));
                  showToast(
                    `ইউজার স্ট্যাটাস পরিবর্তন হয়েছে (${editingUser.status === "Active" ? "ব্যান" : "সক্রিয়"})`,
                    "info"
                  );
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                  editingUser.status === "Active"
                    ? "bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                }`}
              >
                {editingUser.status === "Active" ? "🚫 ইউজার ব্যান করুন" : "✓ আনব্যান করুন"}
              </button>
            </div>

            {/* Current stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">বর্তমান টাকা ব্যালেন্স:</span>
                <span className="text-xl font-extrabold text-emerald-400">৳{editingUser.balance}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">বর্তমান ডায়মন্ড ভল্ট:</span>
                <span className="text-xl font-extrabold text-cyan-300">{editingUser.diamonds} 💎</span>
              </div>
            </div>

            {/* Adjust Taka */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-emerald-400" />
                টাকা ব্যালেন্স পরিবর্তন করুন (+ / -)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="টাকার পরিমাণ লিখুন (যেমন 100)"
                  value={balanceAmountChange}
                  onChange={(e) => setBalanceAmountChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
                />
                <button
                  onClick={() => {
                    if (!balanceAmountChange || Number(balanceAmountChange) <= 0) return;
                    adjustUserBalance(editingUser.id, balanceAmountChange, "add");
                    setEditingUser((prev) => ({
                      ...prev,
                      balance: (prev.balance || 0) + Number(balanceAmountChange),
                    }));
                    showToast(`+৳${balanceAmountChange} ব্যালেন্স যোগ হয়েছে`, "success");
                    setBalanceAmountChange("");
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> যোগ
                </button>
                <button
                  onClick={() => {
                    if (!balanceAmountChange || Number(balanceAmountChange) <= 0) return;
                    adjustUserBalance(editingUser.id, balanceAmountChange, "subtract");
                    setEditingUser((prev) => ({
                      ...prev,
                      balance: Math.max(0, (prev.balance || 0) - Number(balanceAmountChange)),
                    }));
                    showToast(`-৳${balanceAmountChange} ব্যালেন্স কাটা হয়েছে`, "info");
                    setBalanceAmountChange("");
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-all flex items-center gap-1"
                >
                  <Minus className="w-3.5 h-3.5" /> বিয়োগ
                </button>
              </div>
            </div>

            {/* Adjust Diamonds */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Gem className="w-4 h-4 text-cyan-400" />
                ডায়মন্ড স্কোর পরিবর্তন করুন (+ / -)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="ডায়মন্ড সংখ্যা লিখুন (যেমন 500)"
                  value={diamondAmountChange}
                  onChange={(e) => setDiamondAmountChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={() => {
                    if (!diamondAmountChange || Number(diamondAmountChange) <= 0) return;
                    adjustUserDiamonds(editingUser.id, diamondAmountChange, "add");
                    setEditingUser((prev) => ({
                      ...prev,
                      diamonds: (prev.diamonds || 0) + Number(diamondAmountChange),
                    }));
                    showToast(`+${diamondAmountChange}💎 যুক্ত হয়েছে`, "success");
                    setDiamondAmountChange("");
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> যোগ
                </button>
                <button
                  onClick={() => {
                    if (!diamondAmountChange || Number(diamondAmountChange) <= 0) return;
                    adjustUserDiamonds(editingUser.id, diamondAmountChange, "subtract");
                    setEditingUser((prev) => ({
                      ...prev,
                      diamonds: Math.max(0, (prev.diamonds || 0) - Number(diamondAmountChange)),
                    }));
                    showToast(`-${diamondAmountChange}💎 বাদ দেওয়া হয়েছে`, "info");
                    setDiamondAmountChange("");
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-all flex items-center gap-1"
                >
                  <Minus className="w-3.5 h-3.5" /> বিয়োগ
                </button>
              </div>
            </div>

            {/* Rank Tier Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                র‍্যাঙ্ক টিয়ার পরিবর্তন করুন
              </label>
              <select
                value={editingUser.rankTier}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingUser({ ...editingUser, rankTier: val });
                  updateUser(editingUser.id, { rankTier: val });
                  showToast(`টিয়ার আপডেট হয়েছে: ${val}`, "info");
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="Bronze">Bronze (ব্রোঞ্জ)</option>
                <option value="Silver">Silver (সিলভার)</option>
                <option value="Gold">Gold (গোল্ড)</option>
                <option value="Diamond">Diamond (ডায়মন্ড)</option>
                <option value="Master">Master (মাস্টার)</option>
                <option value="Grandmaster">Grandmaster (গ্র্যান্ডমাস্টার)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setActiveModal(null);
                  setEditingUser(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
              >
                সম্পন্ন করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal: লিডারবোর্ড প্লেয়ার ম্যানুয়াল ওভাররাইড */}
      {activeModal?.type === "editLeader" && editingLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">লিডারবোর্ড তথ্য এডিট করুন</h4>
                <p className="text-xs text-slate-400">র‍্যাঙ্ক ও স্কোর ম্যানুয়ালি ওভাররাইড করুন</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">র‍্যাঙ্ক পজিশন (#):</label>
                <input
                  type="number"
                  value={editingLeader.rank}
                  onChange={(e) => setEditingLeader({ ...editingLeader, rank: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">প্লেয়ারের নাম:</label>
                <input
                  type="text"
                  value={editingLeader.name}
                  onChange={(e) => setEditingLeader({ ...editingLeader, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Game UID:</label>
                <input
                  type="text"
                  value={editingLeader.uid}
                  onChange={(e) => setEditingLeader({ ...editingLeader, uid: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">ডায়মন্ড সংখ্যা (Diamonds):</label>
                <input
                  type="number"
                  value={editingLeader.diamonds}
                  onChange={(e) => setEditingLeader({ ...editingLeader, diamonds: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-cyan-300"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">টিয়ার ব্যাজ:</label>
                <select
                  value={editingLeader.tier}
                  onChange={(e) => setEditingLeader({ ...editingLeader, tier: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Master">Master</option>
                  <option value="Grandmaster">Grandmaster</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  updateLeaderboardItem(editingLeader.rank, editingLeader);
                  showToast("লিডারবোর্ড তথ্য সংরক্ষিত হয়েছে!", "success");
                  setActiveModal(null);
                  setEditingLeader(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal: রিসেট লিডারবোর্ড */}
      {activeModal?.type === "resetLeaderboard" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">লিডারবোর্ড রিসেট করতে চান?</h4>
                <p className="text-xs text-slate-400">এটি সকল প্লেয়ারের বর্তমান মাসের র‍্যাঙ্ক শূন্য করে দিবে</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                না
              </button>
              <button
                onClick={() => {
                  resetLeaderboard();
                  showToast("লিডারবোর্ড সফলভাবে রিসেট করা হয়েছে!", "info");
                  setActiveModal(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all active:scale-95"
              >
                হ্যাঁ, রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal: সাইট স্ট্যাটাস টগল */}
      {activeModal?.type === "siteToggle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${siteSettings.siteActive ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                <Power className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {siteSettings.siteActive ? "সাইট মেইনটেন্যান্সে নিতে চান?" : "সাইট চালু করতে চান?"}
                </h4>
                <p className="text-xs text-slate-400">
                  {siteSettings.siteActive ? "ইউজাররা সাময়িকভাবে টপআপ করতে পারবেন না" : "সকল ইউজার পুনরায় অর্ডার করতে পারবেন"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  const next = !siteSettings.siteActive;
                  updateSiteSettings({ siteActive: next });
                  showToast(next ? "সাইট সক্রিয় করা হয়েছে! (Active)" : "সাইট মেইনটেন্যান্সে নেওয়া হয়েছে!", "info");
                  setActiveModal(null);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  siteSettings.siteActive ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                }`}
              >
                {siteSettings.siteActive ? "মেইনটেন্যান্স মোড চালু করুন" : "সাইট চালু করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal: লগআউট */}
      {activeModal?.type === "logoutConfirm" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <LogOut className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">লগআউট নিশ্চিতকরণ</h4>
                <p className="text-xs text-slate-400">আপনি কি অ্যাডমিন সেশন শেষ করতে চান?</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                না
              </button>
              <button
                onClick={() => {
                  showToast("লগআউট হয়েছে", "info");
                  setActiveModal(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all active:scale-95"
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
