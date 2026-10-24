"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "./AuthContext";

// ─── Default Initial Mock State ───────────────────────────────────────
const DEFAULT_USERS = [
  {
    id: "USR-101",
    name: "Abidujjaman Haris",
    email: "player1@topupbuzz.com",
    phone: "01711-234567",
    balance: 850,
    diamonds: 4200,
    lifetimeSpend: 12500,
    lifetimeDiamonds: 4200,
    rankTier: "Master",
    level: "LEVEL 3",
    status: "Active",
    totalOrders: 38,
    avatar: "https://i.ibb.co.com/jpSSsfZ/IMG-4937.jpg",
    joinDate: "Member since 31 July, 2026",
  },
  {
    id: "USR-102",
    name: "রিফাত হাসান (Rifat)",
    email: "rifat.gamer@gmail.com",
    phone: "01822-345678",
    balance: 310,
    diamonds: 1850,
    lifetimeSpend: 8400,
    lifetimeDiamonds: 1850,
    rankTier: "Diamond",
    level: "LEVEL 2",
    status: "Active",
    totalOrders: 19,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
    joinDate: "Member since 12 Jan, 2026",
  },
  {
    id: "USR-103",
    name: "সাকিব আল হাসান (Sakib)",
    email: "sakib.pro@gmail.com",
    phone: "01712-998877",
    balance: 500,
    diamonds: 8900,
    lifetimeSpend: 24000,
    lifetimeDiamonds: 8900,
    rankTier: "Grandmaster",
    level: "PREMIUM",
    status: "Active",
    totalOrders: 64,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&h=120&fit=crop",
    joinDate: "Member since 08 Dec, 2025",
  },
  {
    id: "USR-104",
    name: "নাইমুল ইসলাম (Nayeem)",
    email: "nayeem.ff@gmail.com",
    phone: "01933-456789",
    balance: 45,
    diamonds: 610,
    lifetimeSpend: 3200,
    lifetimeDiamonds: 610,
    rankTier: "Gold",
    level: "LEVEL 2",
    status: "Active",
    totalOrders: 7,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop",
    joinDate: "Member since 03 Feb, 2026",
  },
  {
    id: "USR-105",
    name: "বাদল রানা (Badol)",
    email: "badol.gamer@gmail.com",
    phone: "01766-789012",
    balance: 200,
    diamonds: 520,
    lifetimeSpend: 2900,
    lifetimeDiamonds: 520,
    rankTier: "Silver",
    level: "LEVEL 1",
    status: "Active",
    totalOrders: 5,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop",
    joinDate: "Member since 14 Feb, 2026",
  },
  {
    id: "USR-106",
    name: "জাহিদুল ইসলাম (Zahid)",
    email: "zahid.bd@yahoo.com",
    phone: "01911-556677",
    balance: 0,
    diamonds: 320,
    lifetimeSpend: 800,
    lifetimeDiamonds: 320,
    rankTier: "Bronze",
    level: "LEVEL 1",
    status: "Banned",
    banReason: "সন্দেহজনক ফেক TrxID সাবমিট",
    totalOrders: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
    joinDate: "Member since 19 Mar, 2026",
  },
];

const DEFAULT_ORDERS = [
  {
    id: "ORD-9421",
    userId: "USR-101",
    user: "Abidujjaman Haris",
    phone: "01711-234567",
    uid: "59382029",
    item: "138💎 + 12 Bonus",
    diamondsCount: 150,
    amount: 150,
    method: "bKash",
    trxId: "BK9X7718A",
    time: "১০ মিনিট আগে",
    status: "Pending",
  },
  {
    id: "ORD-9420",
    userId: "USR-102",
    user: "রিফাত হাসান (Rifat)",
    phone: "01822-345678",
    uid: "84720183",
    item: "310💎 + 31 Bonus",
    diamondsCount: 341,
    amount: 310,
    method: "Nagad",
    trxId: "NG882194B",
    time: "২৫ মিনিট আগে",
    status: "Pending",
  },
  {
    id: "ORD-9419",
    userId: "USR-104",
    user: "নাইমুল ইসলাম (Nayeem)",
    phone: "01933-456789",
    uid: "10293847",
    item: "Weekly Lite Pass",
    diamondsCount: 50,
    amount: 45,
    method: "bKash",
    trxId: "BK729103C",
    time: "১ ঘন্টা আগে",
    status: "Completed",
  },
  {
    id: "ORD-9418",
    userId: "USR-103",
    user: "সাকিব আল হাসান (Sakib)",
    phone: "01712-998877",
    uid: "77382910",
    item: "520💎 + 52 Bonus",
    diamondsCount: 572,
    amount: 520,
    method: "Rocket",
    trxId: "RK663920D",
    time: "২ ঘন্টা আগে",
    status: "Completed",
  },
  {
    id: "ORD-9417",
    userId: "USR-105",
    user: "বাদল রানা (Badol)",
    phone: "01766-789012",
    uid: "62018374",
    item: "Level Up Pass",
    diamondsCount: 200,
    amount: 200,
    method: "Nagad",
    trxId: "NG994821F",
    time: "৪ ঘন্টা আগে",
    status: "Cancelled",
    cancelReason: "ভুল UID এবং ইনভ্যালিড TrxID",
  },
];

const DEFAULT_ADD_MONEY = [
  {
    id: "AM-501",
    userId: "USR-101",
    user: "Abidujjaman Haris",
    phone: "01711-234567",
    amount: 500,
    method: "bKash",
    trxId: "BK9928172X",
    time: "৫ মিনিট আগে",
    status: "Pending",
  },
  {
    id: "AM-500",
    userId: "USR-102",
    user: "রিফাত হাসান (Rifat)",
    phone: "01822-345678",
    amount: 1000,
    method: "Nagad",
    trxId: "NG7736281Y",
    time: "১৮ মিনিট আগে",
    status: "Pending",
  },
  {
    id: "AM-499",
    userId: "USR-104",
    user: "নাইমুল ইসলাম",
    phone: "01933-456789",
    amount: 250,
    method: "Rocket",
    trxId: "RK4433221Z",
    time: "১ ঘন্টা আগে",
    status: "Approved",
  },
];

const DEFAULT_GATEWAY_SETTINGS = {
  bkashNumber: "01755-123456",
  bkashType: "Personal",
  bkashActive: true,
  nagadNumber: "01855-654321",
  nagadType: "Merchant",
  nagadActive: true,
  rocketNumber: "01955-987654",
  rocketType: "Personal",
  rocketActive: false,
  diamondRate: "1.15",
  manualPaymentEnabled: true,
  minAddMoney: 25,
  maxAddMoney: 25000,
};

const DEFAULT_SITE_SETTINGS = {
  siteActive: true,
  siteNotice: "🚨 জরুরি নোটিশ: সার্ভার আপগ্রেডের কারণে রাত ২টা থেকে ৩টা পর্যন্ত ডায়মন্ড টপআপ সামান্য বিলম্ব হতে পারে।",
  whatsappNumber: "+880 1700-000000",
  telegramChannel: "https://t.me/vtmtopup",
  autoApproveUnder100: false,
  maintenanceMessage: "ওয়েবসাইট বর্তমানে মেইনটেন্যান্সে রয়েছে। খুব দ্রুত ফিরে আসছি!",
};

// ─── Storage Keys ────────────────────────────────────────────────────
const STORAGE_KEYS = {
  USERS: "vtm_users_db",
  ORDERS: "vtm_orders_db",
  ADD_MONEY: "vtm_add_money_db",
  GATEWAY: "vtm_gateway_settings",
  SITE: "vtm_site_settings",
  LEADERBOARD: "vtm_leaderboard_custom",
  AUTO_CALC: "vtm_leaderboard_auto_calc",
};

// ─── App Context Definition ──────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user: authUser } = useAuth();

  // 1. Live State Holders
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [addMoneyRequests, setAddMoneyRequests] = useState(DEFAULT_ADD_MONEY);
  const [gatewaySettings, setGatewaySettings] = useState(DEFAULT_GATEWAY_SETTINGS);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [customLeaderboard, setCustomLeaderboard] = useState(null);
  const [autoCalculateLeaderboard, setAutoCalculateLeaderboard] = useState(true);
  const [activities, setActivities] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage on mount (client-side persistence & cross-tab sync)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      const storedAddMoney = localStorage.getItem(STORAGE_KEYS.ADD_MONEY);
      const storedGateway = localStorage.getItem(STORAGE_KEYS.GATEWAY);
      const storedSite = localStorage.getItem(STORAGE_KEYS.SITE);
      const storedLeaderboard = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      const storedAutoCalc = localStorage.getItem(STORAGE_KEYS.AUTO_CALC);

      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedAddMoney) setAddMoneyRequests(JSON.parse(storedAddMoney));
      if (storedGateway) setGatewaySettings(JSON.parse(storedGateway));
      if (storedSite) setSiteSettings(JSON.parse(storedSite));
      if (storedLeaderboard) setCustomLeaderboard(JSON.parse(storedLeaderboard));
      if (storedAutoCalc !== null) setAutoCalculateLeaderboard(storedAutoCalc === "true");
    } catch (e) {
      console.warn("Error loading stored VTM state:", e);
    } finally {
      setIsInitialized(true);
    }

    // Cross-tab broadcast listener
    const handleStorageChange = (e) => {
      try {
        if (e.key === STORAGE_KEYS.USERS && e.newValue) setUsers(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.ORDERS && e.newValue) setOrders(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.ADD_MONEY && e.newValue) setAddMoneyRequests(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.GATEWAY && e.newValue) setGatewaySettings(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.SITE && e.newValue) setSiteSettings(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.LEADERBOARD && e.newValue) setCustomLeaderboard(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.AUTO_CALC && e.newValue !== null) setAutoCalculateLeaderboard(e.newValue === "true");
      } catch (err) {
        console.error("Storage sync error:", err);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.ADD_MONEY, JSON.stringify(addMoneyRequests));
      localStorage.setItem(STORAGE_KEYS.GATEWAY, JSON.stringify(gatewaySettings));
      localStorage.setItem(STORAGE_KEYS.SITE, JSON.stringify(siteSettings));
      if (customLeaderboard) {
        localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(customLeaderboard));
      } else {
        localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
      }
      localStorage.setItem(STORAGE_KEYS.AUTO_CALC, String(autoCalculateLeaderboard));
    } catch (e) {
      console.warn("Error saving VTM state to localStorage:", e);
    }
  }, [users, orders, addMoneyRequests, gatewaySettings, siteSettings, customLeaderboard, autoCalculateLeaderboard, isInitialized]);

  // Activity logger
  const logActivity = useCallback((title, desc, type = "info") => {
    setActivities((prev) => [
      { id: Date.now(), title, desc, time: "এইমাত্র", type },
      ...prev.slice(0, 20),
    ]);
  }, []);

  // ─── Active Logged-In User Sync ────────────────────────────────────
  // Resolves the currently authenticated user with the dynamic database record
  const currentUser = useMemo(() => {
    if (authUser?.email) {
      const match = users.find((u) => u.email?.toLowerCase() === authUser.email.toLowerCase());
      if (match) return match;
    }
    // Default to the prime test account (USR-101 Abidujjaman Haris)
    return users[0] || DEFAULT_USERS[0];
  }, [users, authUser]);

  // ─── Dynamic Live Leaderboard Calculation ──────────────────────────
  const leaderboard = useMemo(() => {
    if (!autoCalculateLeaderboard && customLeaderboard && customLeaderboard.length > 0) {
      return customLeaderboard;
    }

    // Auto-calculate from live users sorted by lifetimeDiamonds / diamonds
    const sorted = [...users]
      .filter((u) => u.status !== "Banned")
      .sort((a, b) => (b.lifetimeDiamonds || b.diamonds) - (a.lifetimeDiamonds || a.diamonds))
      .slice(0, 10)
      .map((user, idx) => ({
        rank: idx + 1,
        userId: user.id,
        name: user.name,
        uid: user.phone ? user.phone.replace(/\D/g, "").slice(-8) : "10982341",
        diamonds: user.lifetimeDiamonds || user.diamonds,
        tier: user.rankTier || "Bronze",
        level: user.level || "LEVEL 1",
        avatar: user.avatar || "👑",
        score: (user.lifetimeDiamonds || user.diamonds).toLocaleString(),
      }));

    return sorted;
  }, [users, autoCalculateLeaderboard, customLeaderboard]);

  // Helper: Determine rank tier from diamond count
  const calculateTierFromDiamonds = (diamonds) => {
    if (diamonds >= 7500) return { tier: "Grandmaster", level: "PREMIUM" };
    if (diamonds >= 3500) return { tier: "Master", level: "LEVEL 3" };
    if (diamonds >= 1500) return { tier: "Diamond", level: "LEVEL 2" };
    if (diamonds >= 500) return { tier: "Gold", level: "LEVEL 2" };
    if (diamonds >= 100) return { tier: "Silver", level: "LEVEL 1" };
    return { tier: "Bronze", level: "LEVEL 1" };
  };

  // ─── Order Operations (Admin & Client) ─────────────────────────────
  /**
   * Approve an order:
   * 1. Marks order as 'Completed'
   * 2. Adds diamonds to the specific user's account & recalculates lifetime totals
   * 3. Instantly logs activity
   */
  const approveOrder = useCallback((orderId) => {
    setOrders((prevOrders) => {
      const order = prevOrders.find((o) => o.id === orderId);
      if (!order) return prevOrders;

      // Extract diamond count (e.g., from diamondsCount or parse from "138💎 + 12 Bonus")
      let diamondsToAdd = order.diamondsCount || 0;
      if (!diamondsToAdd && order.item) {
        const match = order.item.match(/(\d+)\s*💎/);
        if (match) diamondsToAdd = parseInt(match[1], 10);
      }
      if (!diamondsToAdd && order.amount) {
        diamondsToAdd = Math.floor(order.amount * 0.9);
      }

      // Update User Balance & Diamonds
      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          const isTargetUser =
            u.id === order.userId ||
            u.phone === order.phone ||
            u.name.toLowerCase().includes(order.user.toLowerCase()) ||
            order.user.toLowerCase().includes(u.name.toLowerCase());

          if (isTargetUser) {
            const nextDiamonds = (u.diamonds || 0) + diamondsToAdd;
            const nextLifetimeDiamonds = (u.lifetimeDiamonds || u.diamonds || 0) + diamondsToAdd;
            const nextLifetimeSpend = (u.lifetimeSpend || 0) + (order.amount || 0);
            const nextOrderCount = (u.totalOrders || 0) + 1;
            const { tier, level } = calculateTierFromDiamonds(nextLifetimeDiamonds);

            return {
              ...u,
              diamonds: nextDiamonds,
              lifetimeDiamonds: nextLifetimeDiamonds,
              lifetimeSpend: nextLifetimeSpend,
              totalOrders: nextOrderCount,
              rankTier: tier,
              level: level,
            };
          }
          return u;
        })
      );

      logActivity(
        "অর্ডার অ্যাপ্রুভ",
        `অর্ডার #${order.id} (${order.item}) সম্পন্ন হয়েছে। গ্রাহকের অ্যাকাউন্টে +${diamondsToAdd}💎 জমা হয়েছে।`,
        "success"
      );

      return prevOrders.map((o) => (o.id === orderId ? { ...o, status: "Completed" } : o));
    });
  }, [logActivity]);

  /**
   * Cancel an order:
   * Marks order status as 'Cancelled' with optional reason
   */
  const cancelOrder = useCallback((orderId, reason = "অ্যাডমিন কর্তৃক বাতিল") => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled", cancelReason: reason } : o))
    );
    logActivity("অর্ডার বাতিল", `অর্ডার #${orderId} বাতিল করা হয়েছে (${reason})`, "error");
  }, [logActivity]);

  /**
   * Create a new top-up order from the Client Top-up screen
   */
  const createOrder = useCallback((orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser?.id || "USR-101",
      user: currentUser?.name || "Player1",
      phone: currentUser?.phone || "01711-234567",
      time: "এইমাত্র",
      status: "Pending",
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    logActivity("নতুন অর্ডার সাবমিট", `গ্রাহক ${newOrder.user} একটি নতুন অর্ডার সাবমিট করেছেন`, "info");
    return newOrder;
  }, [currentUser, logActivity]);

  // ─── Payment & Add Money Operations ────────────────────────────────
  /**
   * Approve Add Money Request:
   * 1. Marks request as 'Approved'
   * 2. Dynamically credits the user's wallet Balance (Tk)
   */
  const approveAddMoney = useCallback((requestId) => {
    setAddMoneyRequests((prevReqs) => {
      const req = prevReqs.find((r) => r.id === requestId);
      if (!req) return prevReqs;

      // Credit user's wallet balance
      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          const isTarget =
            u.id === req.userId ||
            u.phone === req.phone ||
            u.name.toLowerCase().includes(req.user.toLowerCase()) ||
            req.user.toLowerCase().includes(u.name.toLowerCase());

          if (isTarget) {
            return {
              ...u,
              balance: (u.balance || 0) + Number(req.amount),
            };
          }
          return u;
        })
      );

      logActivity(
        "অ্যাড মানি অনুমোদিত",
        `গ্রাহক ${req.user} এর ওয়ালেটে ৳${req.amount} ক্রেডিট করা হয়েছে।`,
        "success"
      );

      return prevReqs.map((r) => (r.id === requestId ? { ...r, status: "Approved" } : r));
    });
  }, [logActivity]);

  /**
   * Reject Add Money Request
   */
  const rejectAddMoney = useCallback((requestId, reason = "ইনভ্যালিড ট্রানজেকশন") => {
    setAddMoneyRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "Rejected", reason } : r))
    );
    logActivity("অ্যাড মানি প্রত্যাখ্যান", `অনুরোধ #${requestId} বাতিল: ${reason}`, "error");
  }, [logActivity]);

  /**
   * Submit an Add Money Request from Client `/add-money` page
   */
  const requestAddMoney = useCallback((data) => {
    const newRequest = {
      id: `AM-${Math.floor(500 + Math.random() * 500)}`,
      userId: currentUser?.id || "USR-101",
      user: currentUser?.name || "Player1",
      phone: currentUser?.phone || "01711-234567",
      time: "এইমাত্র",
      status: "Pending",
      ...data,
    };

    setAddMoneyRequests((prev) => [newRequest, ...prev]);
    logActivity("অ্যাড মানি রিকোয়েস্ট", `গ্রাহক ${newRequest.user} ৳${newRequest.amount} জমার আবেদন করেছেন`, "info");
    return newRequest;
  }, [currentUser, logActivity]);

  // ─── User Management Operations (Admin) ────────────────────────────
  /**
   * Manually add or subtract Taka balance from any user
   */
  const adjustUserBalance = useCallback((userId, amount, type = "add") => {
    const delta = Number(amount);
    if (!delta || delta <= 0) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextBal = type === "add" ? (u.balance || 0) + delta : Math.max(0, (u.balance || 0) - delta);
          logActivity(
            "ব্যালেন্স পরিমার্জন",
            `${u.name} এর ব্যালেন্স ${type === "add" ? "+" : "-"}৳${delta} করা হয়েছে (নতুন ব্যালেন্স: ৳${nextBal})`,
            "info"
          );
          return { ...u, balance: nextBal };
        }
        return u;
      })
    );
  }, [logActivity]);

  /**
   * Manually add or subtract Diamonds from any user & re-evaluate rank
   */
  const adjustUserDiamonds = useCallback((userId, amount, type = "add") => {
    const delta = Number(amount);
    if (!delta || delta <= 0) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextDia = type === "add" ? (u.diamonds || 0) + delta : Math.max(0, (u.diamonds || 0) - delta);
          const nextLifetime = type === "add" ? (u.lifetimeDiamonds || u.diamonds || 0) + delta : u.lifetimeDiamonds;
          const { tier, level } = calculateTierFromDiamonds(nextLifetime || nextDia);

          logActivity(
            "ডায়মন্ড পরিমার্জন",
            `${u.name} এর ডায়মন্ড ${type === "add" ? "+" : "-"}${delta}💎 করা হয়েছে (মোট: ${nextDia}💎)`,
            "info"
          );
          return {
            ...u,
            diamonds: nextDia,
            lifetimeDiamonds: nextLifetime,
            rankTier: tier,
            level: level,
          };
        }
        return u;
      })
    );
  }, [logActivity]);

  /**
   * Update full user details (Rank, tier, status, etc.)
   */
  const updateUser = useCallback((userId, updates) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
    logActivity("ইউজার ডাটা আপডেট", `ইউজার #${userId} এর প্রোফাইল হালনাগাদ করা হয়েছে`, "info");
  }, [logActivity]);

  /**
   * 1-Click Ban / Unban user
   */
  const toggleUserBan = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Banned" : "Active";
          logActivity(
            nextStatus === "Banned" ? "ইউজার নিষিদ্ধ" : "ইউজার সক্রিয়",
            `${u.name} অ্যাকাউন্ট ${nextStatus === "Banned" ? "ব্যান" : "আনব্যান"} করা হয়েছে`,
            nextStatus === "Banned" ? "warning" : "success"
          );
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  }, [logActivity]);

  // ─── Leaderboard Override Operations ───────────────────────────────
  const updateLeaderboardItem = useCallback((rank, updatedData) => {
    setAutoCalculateLeaderboard(false);
    setCustomLeaderboard((prev) => {
      const current = prev || leaderboard;
      const next = current.map((item) => (item.rank === rank ? { ...item, ...updatedData } : item));
      return next.sort((a, b) => a.rank - b.rank);
    });
    logActivity("লিডারবোর্ড ওভাররাইড", `র‍্যাঙ্ক #${rank} এর তথ্য ম্যানুয়ালি আপডেট করা হয়েছে`, "info");
  }, [leaderboard, logActivity]);

  const resetLeaderboard = useCallback(() => {
    setAutoCalculateLeaderboard(false);
    const blank = [
      { rank: 1, userId: "USR-0", name: "টপ প্লেয়ার ১ (অপেক্ষমান)", uid: "00000000", diamonds: 0, tier: "Bronze", level: "LEVEL 1", avatar: "👑", score: "0" },
      { rank: 2, userId: "USR-0", name: "টপ প্লেয়ার ২ (অপেক্ষমান)", uid: "00000000", diamonds: 0, tier: "Bronze", level: "LEVEL 1", avatar: "🔥", score: "0" },
      { rank: 3, userId: "USR-0", name: "টপ প্লেয়ার ৩ (অপেক্ষমান)", uid: "00000000", diamonds: 0, tier: "Bronze", level: "LEVEL 1", avatar: "⚡", score: "0" },
    ];
    setCustomLeaderboard(blank);
    logActivity("লিডারবোর্ড রিসেট", "নতুন মাসের জন্য লিডারবোর্ড শূন্য করা হয়েছে", "warning");
  }, [logActivity]);

  const toggleAutoCalculateLeaderboard = useCallback(() => {
    setAutoCalculateLeaderboard((prev) => {
      const next = !prev;
      if (next) {
        setCustomLeaderboard(null);
        logActivity("অটো-ক্যালকুলেশন সক্রিয়", "ডায়মন্ড হিসেব অনুযায়ী লিডারবোর্ড পুনর্নির্ধারণ করা হয়েছে", "info");
      } else {
        logActivity("ম্যানুয়াল মোড সক্রিয়", "লিডারবোর্ড অটো-সর্ট বন্ধ করা হয়েছে", "info");
      }
      return next;
    });
  }, [logActivity]);

  // ─── Settings Operations ───────────────────────────────────────────
  const updateGatewaySettings = useCallback((newSettings) => {
    setGatewaySettings((prev) => ({ ...prev, ...newSettings }));
    logActivity("পেমেন্ট গেটওয়ে সেটিংস", "বিকাশ/নগদ নম্বর ও কনভার্সন রেট হালনাগাদ করা হয়েছে", "success");
  }, [logActivity]);

  const updateSiteSettings = useCallback((newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    logActivity("সিস্টেম সেটিংস", "ওয়েবসাইট সেটিংস ও জরুরি বার্তা আপডেট করা হয়েছে", "info");
  }, [logActivity]);

  // Context value exposed to both Admin & Client components
  const value = {
    // Current User
    currentUser,
    // Live Collections
    users,
    orders,
    addMoneyRequests,
    gatewaySettings,
    siteSettings,
    leaderboard,
    autoCalculateLeaderboard,
    activities,
    // Order Actions
    approveOrder,
    cancelOrder,
    createOrder,
    // Add Money Actions
    approveAddMoney,
    rejectAddMoney,
    requestAddMoney,
    // User Actions
    adjustUserBalance,
    adjustUserDiamonds,
    updateUser,
    toggleUserBan,
    // Leaderboard Actions
    updateLeaderboardItem,
    resetLeaderboard,
    toggleAutoCalculateLeaderboard,
    // Settings Actions
    updateGatewaySettings,
    updateSiteSettings,
    logActivity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
