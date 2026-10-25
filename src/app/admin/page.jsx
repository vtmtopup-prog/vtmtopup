"use client";

import React, { useState, useMemo, useRef } from "react";

const MENUS = [
  { id: "dashboard", label: "Dashboard", subtitle: "Overview" },
  { id: "statements", label: "Statements", subtitle: "Financial statements" },
  { id: "orders", label: "Orders", subtitle: "Top-up orders" },
  { id: "users", label: "Users / Customers", subtitle: "Customer accounts" },
  { id: "categories", label: "Categories", subtitle: "Product categories" },
  { id: "products", label: "Products", subtitle: "Product catalog" },
  { id: "diamond-packages", label: "Diamond Packages", subtitle: "Diamond package pricing" },
  { id: "unipin-storage", label: "UniPin Code Storage", subtitle: "UniPin code inventory" },
  { id: "transactions", label: "Transactions", subtitle: "Payment transactions" },
  { id: "reports", label: "Reports & Analytics", subtitle: "Business analytics" },
  { id: "admins", label: "Admin Management", subtitle: "Staff and roles" },
];

const ICONS = {
  dashboard: "⌂",
  statements: "▤",
  orders: "◈",
  users: "♙",
  categories: "▦",
  products: "◇",
  "diamond-packages": "✦",
  "unipin-storage": "▤",
  transactions: "⇄",
  reports: "▥",
  admins: "♟",
};

export default function AdminPage() {
  const [current, setCurrent] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  // ─── State Data ────────────────────────────────────────────────────────
  const [orders, setOrders] = useState([
    { id: "FF-10842", customer: "Rafi Gaming", item: "520 Diamonds", amount: 390, status: "Completed", date: "2026-10-25" },
    { id: "FF-10841", customer: "Nabil X", item: "Weekly Membership", amount: 155, status: "Pending", date: "2026-10-25" },
    { id: "FF-10840", customer: "Shadow BD", item: "2180 Diamonds", amount: 1490, status: "Processing", date: "2026-10-24" },
    { id: "FF-10839", customer: "Toxic FF", item: "100 Diamonds", amount: 80, status: "Failed", date: "2026-10-24" },
    { id: "FF-10838", customer: "Sabbir Pro", item: "Level Up Pass", amount: 210, status: "Completed", date: "2026-10-23" },
  ]);

  const [packages, setPackages] = useState([
    { name: "100 Diamonds", price: 80, stock: "Unlimited", status: "Active" },
    { name: "520 Diamonds", price: 390, stock: "Unlimited", status: "Active" },
    { name: "1060 Diamonds", price: 775, stock: "Unlimited", status: "Active" },
    { name: "2180 Diamonds", price: 1490, stock: "Unlimited", status: "Active" },
    { name: "Weekly Membership", price: 155, stock: "Unlimited", status: "Active" },
    { name: "Monthly Membership", price: 745, stock: "Unlimited", status: "Active" },
  ]);

  const [products, setProducts] = useState([
    { id: "PRD-101", name: "Free Fire Diamonds (UID Top-Up)", category: "Diamonds", price: "৳80 - ৳1,490", status: "Active" },
    { id: "PRD-102", name: "Weekly Membership", category: "Memberships", price: "৳155", status: "Active" },
    { id: "PRD-103", name: "Monthly Membership", category: "Memberships", price: "৳745", status: "Active" },
    { id: "PRD-104", name: "Level Up Pass", category: "Special Passes", price: "৳210", status: "Active" },
    { id: "PRD-105", name: "UniPin Voucher Code", category: "Vouchers", price: "৳85 - ৳850", status: "Active" },
  ]);

  const [categories, setCategories] = useState([
    { name: "Diamonds", slug: "diamonds", count: 4, status: "Active" },
    { name: "Memberships", slug: "memberships", count: 2, status: "Active" },
    { name: "Special Passes", slug: "special-passes", count: 1, status: "Active" },
    { name: "Vouchers", slug: "vouchers", count: 3, status: "Active" },
  ]);

  const [vouchers, setVouchers] = useState([
    { code: "UPBD-8821-4920-1102", pin: "78219401", status: "Available" },
    { code: "UPBD-8821-4920-1103", pin: "45091238", status: "Available" },
    { code: "UPBD-8821-4920-1104", pin: "93120485", status: "Available" },
  ]);

  const [users] = useState([
    { name: "Rafi Gaming", email: "rafi@example.com", orders: 18, spent: 4270, status: "Active" },
    { name: "Nabil X", email: "nabil@example.com", orders: 9, spent: 1850, status: "Active" },
    { name: "Shadow BD", email: "shadow@example.com", orders: 24, spent: 7950, status: "VIP" },
    { name: "Toxic FF", email: "toxic@example.com", orders: 5, spent: 620, status: "Active" },
    { name: "Sabbir Pro", email: "sabbir@example.com", orders: 12, spent: 3150, status: "Active" },
  ]);

  const [transactions] = useState([
    { id: "TX-8101", customer: "Rafi Gaming", amount: 390, type: "Top-Up Payment", status: "Success" },
    { id: "TX-8100", customer: "Nabil X", amount: 155, type: "Membership Purchase", status: "Success" },
    { id: "TX-8099", customer: "Toxic FF", amount: 80, type: "Refund", status: "Pending" },
    { id: "TX-8098", customer: "Shadow BD", amount: 1490, type: "Top-Up Payment", status: "Success" },
    { id: "TX-8097", customer: "Sabbir Pro", amount: 210, type: "Level Up Pass", status: "Success" },
  ]);

  const [admins, setAdmins] = useState([
    { name: "Super Admin", email: "admin@ffnexus.test", role: "Super Admin", status: "Active" },
    { name: "Support Manager", email: "support@ffnexus.test", role: "Support Staff", status: "Active" },
    { name: "Finance Auditor", email: "finance@ffnexus.test", role: "Finance Manager", status: "Active" },
  ]);

  // Order Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("");

  // Form Inputs
  const [pkgName, setPkgName] = useState("");
  const [pkgPrice, setPkgPrice] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodCat, setProdCat] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [vCode, setVCode] = useState("");
  const [vPin, setVPin] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("");

  // ─── Helpers ───────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const money = (n) => "৳" + Number(n || 0).toLocaleString("en-US");

  const go = (id) => {
    setCurrent(id);
    setSidebarOpen(false);
  };

  const pill = (status) => {
    const s = String(status || "").toLowerCase();
    let cls = "pill";
    if (/completed|approved|success|active|resolved|vip/.test(s)) cls += " ok";
    else if (/pending|progress|demo/.test(s)) cls += " warn";
    else if (/failed|disabled|blocked/.test(s)) cls += " bad";
    return <span className={cls}>{status}</span>;
  };

  // ─── Order Actions ─────────────────────────────────────────────────────
  const changeOrder = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    showToast("Order status updated");
  };

  const addDemoOrder = () => {
    const newOrd = {
      id: "FF-" + Math.floor(11000 + Math.random() * 800),
      customer: "New Demo Customer",
      item: "100 Diamonds",
      amount: 80,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    };
    setOrders((prev) => [newOrd, ...prev]);
    showToast("Demo order added");
  };

  const filteredOrders = useMemo(() => {
    const q = orderSearch.toLowerCase();
    return orders.filter(
      (o) =>
        (!orderFilter || o.status === orderFilter) &&
        [o.id, o.customer, o.item].join(" ").toLowerCase().includes(q)
    );
  }, [orders, orderSearch, orderFilter]);

  // ─── Package Actions ───────────────────────────────────────────────────
  const addPackage = () => {
    const n = pkgName.trim();
    const p = Number(pkgPrice);
    if (!n || !Number.isFinite(p) || p < 0) {
      showToast("Enter a package name and valid price");
      return;
    }
    setPackages((prev) => [
      ...prev,
      { name: n, price: p, stock: "Unlimited", status: "Active" },
    ]);
    setPkgName("");
    setPkgPrice("");
    showToast("Diamond package added");
  };

  const deletePackage = (idx) => {
    setPackages((prev) => prev.filter((_, i) => i !== idx));
    showToast("Package deleted");
  };

  // ─── Product Actions ───────────────────────────────────────────────────
  const addProduct = () => {
    const name = prodName.trim();
    const cat = prodCat.trim() || "General";
    const price = prodPrice.trim();
    if (!name || !price) {
      showToast("Enter product name and price");
      return;
    }
    setProducts((prev) => [
      ...prev,
      {
        id: "PRD-" + (100 + prev.length + 1),
        name,
        category: cat,
        price: price.startsWith("৳") ? price : "৳" + price,
        status: "Active",
      },
    ]);
    setProdName("");
    setProdCat("");
    setProdPrice("");
    showToast("Product added to catalog");
  };

  const deleteProduct = (idx) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
    showToast("Product removed");
  };

  // ─── Category Actions ──────────────────────────────────────────────────
  const addCategory = () => {
    const name = catName.trim();
    const slug = catSlug.trim();
    if (!name || !slug) {
      showToast("Please enter category name and slug");
      return;
    }
    setCategories((prev) => [
      ...prev,
      {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, "-"),
        count: 0,
        status: "Active",
      },
    ]);
    setCatName("");
    setCatSlug("");
    showToast("Category added successfully");
  };

  const deleteCategory = (idx) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
    showToast("Category deleted");
  };

  // ─── Voucher Actions ───────────────────────────────────────────────────
  const addVoucher = () => {
    const code = vCode.trim();
    const pin = vPin.trim();
    if (!code || !pin) {
      showToast("Enter voucher code and PIN");
      return;
    }
    setVouchers((prev) => [
      ...prev,
      { code, pin, status: "Available" },
    ]);
    setVCode("");
    setVPin("");
    showToast("UniPin code stored");
  };

  const deleteVoucher = (idx) => {
    setVouchers((prev) => prev.filter((_, i) => i !== idx));
    showToast("Voucher removed from storage");
  };

  // ─── Admin Actions ─────────────────────────────────────────────────────
  const addAdmin = () => {
    const name = adminName.trim();
    const email = adminEmail.trim();
    const role = adminRole.trim() || "Staff";
    if (!name || !email) {
      showToast("Please enter staff name and email");
      return;
    }
    setAdmins((prev) => [
      ...prev,
      { name, email, role, status: "Active" },
    ]);
    setAdminName("");
    setAdminEmail("");
    setAdminRole("");
    showToast("Admin account added");
  };

  const deleteAdmin = (idx) => {
    setAdmins((prev) => prev.filter((_, i) => i !== idx));
    showToast("Admin account removed");
  };

  // ─── Export CSV ────────────────────────────────────────────────────────
  const exportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Item", "Amount", "Status", "Date"],
      ...orders.map((o) => [o.id, o.customer, o.item, o.amount, o.status, o.date]),
    ];
    const csv = rows
      .map((r) => r.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","))
      .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ff-nexus-orders-report.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("Orders CSV exported");
  };

  const activeMenu = MENUS.find((m) => m.id === current) || MENUS[0];
  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;

  return (
    <div className="ff-app-root">
      <style dangerouslySetInnerHTML={{ __html: `
        .ff-app-root {
          --bg: #0a0b12;
          --panel: #121421;
          --panel2: #171a2b;
          --line: #282b40;
          --text: #f3f4ff;
          --muted: #969bb8;
          --pink: #ff3d9a;
          --violet: #8b5cf6;
          --cyan: #46d9e8;
          --green: #45d6a0;
          --amber: #ffc46b;
          --red: #ff6c83;
          margin: 0;
          min-height: 100vh;
          background: radial-gradient(ellipse at 80% 0%, #221439 0, transparent 36%), var(--bg);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .ff-app-root * { box-sizing: border-box; }
        .ff-app {
          display: grid;
          grid-template-columns: 255px minmax(0, 1fr);
          min-height: 100vh;
        }
        .ff-sidebar {
          background: rgba(13, 14, 25, 0.96);
          border-right: 1px solid var(--line);
          padding: 20px 13px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          z-index: 50;
        }
        .ff-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 5px 8px 22px;
        }
        .ff-logo {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: linear-gradient(135deg, var(--pink), var(--violet));
          display: grid;
          place-items: center;
          font-weight: 900;
          font-size: 18px;
          box-shadow: 0 8px 30px #ff3d9a33;
          color: #fff;
          flex-shrink: 0;
        }
        .ff-brand strong { display: block; letter-spacing: 0.5px; font-size: 15px; }
        .ff-brand small { color: var(--muted); font-size: 11px; }
        .ff-nav-label {
          color: #6f7492;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
          padding: 12px 10px 7px;
        }
        .ff-nav { display: grid; gap: 4px; flex: 1; }
        .ff-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 10px;
          color: #b7bbd2;
          cursor: pointer;
          font: inherit;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .ff-nav-btn:hover {
          color: #fff;
          background: #171a2b;
        }
        .ff-nav-btn .ico {
          width: 24px;
          text-align: center;
          color: #9ca2c4;
          font-size: 15px;
        }
        .ff-nav-btn.active {
          background: linear-gradient(90deg, #ff3d9a25, #8b5cf61c);
          border-color: #ff3d9a40;
          color: #fff;
        }
        .ff-nav-btn.active .ico { color: var(--pink); }
        .ff-sidefoot {
          border-top: 1px solid var(--line);
          margin-top: 18px;
          padding: 15px 8px 5px;
          color: var(--muted);
          font-size: 12px;
        }
        .ff-main {
          min-width: 0;
          padding: 24px clamp(15px, 3vw, 38px) 40px;
        }
        .ff-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 25px;
        }
        .ff-crumb { color: var(--muted); font-size: 12px; }
        .ff-topbar h1 {
          font-size: 24px;
          margin: 3px 0 0;
          letter-spacing: -0.5px;
          font-weight: 700;
        }
        .ff-actions { display: flex; align-items: center; gap: 9px; }
        .ff-avatar {
          width: 37px;
          height: 37px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: #29213c;
          color: #ff8cc4;
          font-weight: 800;
          border: 1px solid #51345f;
          font-size: 12px;
        }
        .ff-btn {
          cursor: pointer;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 9px 13px;
          color: var(--text);
          background: #202338;
          font: inherit;
          transition: border-color 0.15s, transform 0.15s, background 0.15s;
        }
        .ff-btn:hover {
          border-color: var(--pink);
          transform: translateY(-1px);
        }
        .ff-btn.primary {
          background: linear-gradient(135deg, var(--pink), #a855f7);
          border: 0;
          font-weight: 750;
          color: #fff;
        }
        .ff-btn.primary:hover {
          filter: brightness(1.1);
        }
        .ff-btn.subtle { background: #161827; }
        .ff-input, .ff-select, .ff-textarea {
          background: #0d0f1a;
          color: var(--text);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 10px;
          min-width: 0;
          width: 100%;
          font: inherit;
          outline: none;
          transition: border-color 0.15s;
        }
        .ff-input:focus, .ff-select:focus, .ff-textarea:focus {
          border-color: var(--pink);
        }
        .ff-hero {
          border: 1px solid #3b2851;
          background: linear-gradient(110deg, #281532, #17172b 60%, #111a2b);
          padding: 22px;
          border-radius: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .ff-hero h2 { font-size: 21px; margin: 5px 0; font-weight: 700; }
        .ff-hero p { margin: 0; color: #b9b5d0; max-width: 600px; font-size: 13px; }
        .ff-eyebrow {
          font-size: 10px;
          letter-spacing: 1.8px;
          font-weight: 900;
          color: #ff87c3;
        }
        .ff-hero-mark {
          font-size: 50px;
          filter: drop-shadow(0 0 20px #ff3d9a55);
          color: #ff87c3;
          user-select: none;
        }
        .ff-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin: 15px 0 20px;
        }
        .ff-stat, .ff-panel {
          border: 1px solid var(--line);
          border-radius: 15px;
          background: linear-gradient(160deg, #151727, #10121e);
          padding: 17px;
          min-width: 0;
        }
        .ff-stathead {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: var(--muted);
          font-size: 12px;
        }
        .ff-staticon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: #282039;
          color: #ff8ac2;
          font-size: 14px;
        }
        .ff-stat strong.big {
          display: block;
          font-size: 25px;
          letter-spacing: -0.8px;
          margin: 12px 0 4px;
          font-weight: 800;
        }
        .ff-trend { color: var(--green); font-size: 11px; }
        .ff-panel { margin-bottom: 16px; }
        .ff-panelhead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 15px;
        }
        .ff-panelhead h3 { font-size: 15px; margin: 0; font-weight: 700; }
        .ff-tablewrap { overflow-x: auto; }
        .ff-table {
          width: 100%;
          border-collapse: collapse;
          white-space: nowrap;
        }
        .ff-table th, .ff-table td {
          text-align: left;
          padding: 12px 10px;
          border-bottom: 1px solid #25283a;
          font-size: 12px;
        }
        .ff-table th {
          color: #858ba9;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 700;
        }
        .ff-table td { color: #d9dbee; }
        .ff-table tr:last-child td { border-bottom: 0; }
        .ff-pill {
          font-size: 11px;
          border-radius: 99px;
          padding: 4px 8px;
          background: #202338;
          color: #c7cae0;
          white-space: nowrap;
          display: inline-block;
          font-weight: 600;
        }
        .ff-pill.ok { background: #15382f; color: #62e4b1; }
        .ff-pill.warn { background: #3d2d1a; color: #ffcc7e; }
        .ff-pill.bad { background: #3d202c; color: #ff8ca2; }
        .ff-toolbar {
          display: flex;
          gap: 9px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .ff-toolbar .ff-input { max-width: 260px; }
        .ff-toolbar .ff-select { width: auto; min-width: 130px; }
        .ff-two {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 16px;
        }
        .ff-quickgrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .ff-quick {
          background: #191b2b;
          border: 1px solid var(--line);
          padding: 14px;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          color: inherit;
          transition: border-color 0.15s, transform 0.15s;
        }
        .ff-quick:hover {
          border-color: var(--pink);
          transform: translateY(-2px);
        }
        .ff-quick span { display: block; font-size: 20px; margin-bottom: 9px; color: var(--pink); }
        .ff-quick b { display: block; font-size: 12px; }
        .ff-quick small { color: var(--muted); font-size: 11px; }
        .ff-bars { display: grid; gap: 14px; }
        .ff-barrow {
          display: grid;
          grid-template-columns: 100px 1fr 45px;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: #b7bbd2;
        }
        .ff-bar {
          height: 7px;
          background: #272a3c;
          border-radius: 99px;
          overflow: hidden;
        }
        .ff-bar i {
          display: block;
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--pink), var(--violet));
        }
        .ff-fieldgrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 13px;
        }
        .ff-field label {
          display: block;
          font-size: 12px;
          color: #aeb3cd;
          margin-bottom: 6px;
        }
        .ff-field.full { grid-column: 1 / -1; }
        .ff-notice {
          padding: 12px 14px;
          background: #171b2a;
          border: 1px solid #30334a;
          border-radius: 11px;
          color: #afb5d0;
          font-size: 12px;
          margin-bottom: 14px;
        }
        .ff-empty {
          padding: 28px;
          text-align: center;
          color: var(--muted);
        }
        .ff-toast {
          position: fixed;
          right: 20px;
          bottom: 20px;
          background: #1c2630;
          border: 1px solid #32614f;
          color: #a4f2d2;
          padding: 12px 16px;
          border-radius: 12px;
          z-index: 100;
          box-shadow: 0 12px 40px #0008;
          font-weight: 600;
          animation: ffFadeIn 0.2s ease-out;
        }
        @keyframes ffFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ff-footer {
          color: #707692;
          font-size: 11px;
          text-align: center;
          padding: 25px 15px 15px;
        }
        .ff-mobilemenu { display: none; }
        .ff-backdrop {
          display: none;
        }
        @media (max-width: 1050px) {
          .ff-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ff-two { grid-template-columns: 1fr; }
          .ff-app { grid-template-columns: 220px minmax(0, 1fr); }
        }
        @media (max-width: 700px) {
          .ff-app { display: block; }
          .ff-sidebar {
            position: fixed;
            z-index: 90;
            left: -275px;
            width: 255px;
            transition: left 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 20px 0 60px #0008;
          }
          .ff-sidebar.open { left: 0; }
          .ff-backdrop.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 80;
            backdrop-filter: blur(2px);
          }
          .ff-mobilemenu { display: inline-block; }
          .ff-topbar { align-items: flex-start; }
          .ff-topbar h1 { font-size: 20px; }
          .ff-hero-mark { display: none; }
          .ff-grid { gap: 9px; }
          .ff-stat { padding: 13px; }
          .ff-stat strong.big { font-size: 21px; }
          .ff-quickgrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ff-fieldgrid { grid-template-columns: 1fr; }
          .ff-field.full { grid-column: auto; }
          .ff-main { padding: 17px 13px 30px; }
        }
      `}} />

      {/* Mobile Drawer Backdrop */}
      <div
        className={`ff-backdrop ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="ff-app">
        {/* ─── SIDEBAR ───────────────────────────────────────────────────── */}
        <aside className={`ff-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="ff-brand">
            <div className="ff-logo">FF</div>
            <div>
              <strong>FF NEXUS</strong>
              <small>Admin Control Center</small>
            </div>
          </div>

          <div className="ff-nav-label">MAIN WORKSPACE</div>

          <nav className="ff-nav">
            {MENUS.map((m) => (
              <button
                key={m.id}
                className={`ff-nav-btn ${m.id === current ? "active" : ""}`}
                onClick={() => go(m.id)}
              >
                <span className="ico">{ICONS[m.id] || "•"}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </nav>

          <div className="ff-sidefoot">
            ● Demo mode <span style={{ float: "right", color: "#ff86bf" }}>v1.0</span>
            <br />
            <br />
            Frontend preview · No live payments
          </div>
        </aside>

        {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
        <main className="ff-main">
          {/* Topbar */}
          <div className="ff-topbar">
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                className="ff-btn ff-mobilemenu"
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label="Toggle Navigation"
              >
                ☰
              </button>
              <div>
                <div className="ff-crumb">
                  FF NEXUS / <span>{activeMenu.label}</span>
                </div>
                <h1>{activeMenu.label}</h1>
              </div>
            </div>

            <div className="ff-actions">
              <button
                className="ff-btn ff-subtle"
                onClick={() => showToast("Notifications are demo-only.")}
              >
                ♧ Notifications
              </button>
              <div className="ff-avatar">AD</div>
            </div>
          </div>

          {/* Module Views */}
          {current === "dashboard" && (
            <div>
              <div className="ff-hero">
                <div>
                  <div className="ff-eyebrow">WELCOME BACK, ADMIN</div>
                  <h2>Your gaming store at a glance</h2>
                  <p>
                    Manage top-ups, diamond packages, customers, transactions and
                    reports from one premium control center.
                  </p>
                </div>
                <div className="ff-hero-mark">✦</div>
              </div>

              <div className="ff-grid">
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Total Revenue</span>
                    <span className="ff-staticon">৳</span>
                  </div>
                  <strong className="big">৳84,250</strong>
                  <div className="ff-trend">+12.8% vs last period</div>
                </div>

                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Total Orders</span>
                    <span className="ff-staticon">◈</span>
                  </div>
                  <strong className="big">{orders.length}</strong>
                  <div className="ff-trend">All-time demo orders</div>
                </div>

                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Active Customers</span>
                    <span className="ff-staticon">♙</span>
                  </div>
                  <strong className="big">{users.length}</strong>
                  <div className="ff-trend">Active registered users</div>
                </div>

                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Pending Orders</span>
                    <span className="ff-staticon">◷</span>
                  </div>
                  <strong className="big">{pendingOrdersCount}</strong>
                  <div className="ff-trend">
                    {pendingOrdersCount > 0 ? "Needs attention" : "All clear"}
                  </div>
                </div>
              </div>

              <div className="ff-two">
                <div className="ff-panel">
                  <div className="ff-panelhead">
                    <h3>Recent Orders</h3>
                    <button className="ff-btn" onClick={() => go("orders")}>
                      View all →
                    </button>
                  </div>
                  <div className="ff-tablewrap">
                    <table className="ff-table">
                      <thead>
                        <tr>
                          <th>ORDER</th>
                          <th>CUSTOMER</th>
                          <th>ITEM</th>
                          <th>AMOUNT</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 4).map((o) => (
                          <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.customer}</td>
                            <td>{o.item}</td>
                            <td>{money(o.amount)}</td>
                            <td>{pill(o.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="ff-panel">
                  <div className="ff-panelhead">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="ff-quickgrid">
                    <button className="ff-quick" onClick={() => go("orders")}>
                      <span>◈</span>
                      <b>Manage Orders</b>
                      <small>Review top-ups</small>
                    </button>
                    <button className="ff-quick" onClick={() => go("diamond-packages")}>
                      <span>✦</span>
                      <b>Diamond Packages</b>
                      <small>Update pricing</small>
                    </button>
                    <button className="ff-quick" onClick={() => go("unipin-storage")}>
                      <span>▤</span>
                      <b>UniPin Storage</b>
                      <small>Manage codes</small>
                    </button>
                    <button className="ff-quick" onClick={() => go("transactions")}>
                      <span>⇄</span>
                      <b>Transactions</b>
                      <small>Payment ledger</small>
                    </button>
                    <button className="ff-quick" onClick={() => go("reports")}>
                      <span>▥</span>
                      <b>View Analytics</b>
                      <small>Store performance</small>
                    </button>
                    <button className="ff-quick" onClick={() => go("admins")}>
                      <span>♟</span>
                      <b>Admin Staff</b>
                      <small>Manage team</small>
                    </button>
                  </div>
                </div>
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Weekly Sales Snapshot</h3>
                </div>
                <div className="ff-bars">
                  {[
                    ["Mon", 42],
                    ["Tue", 68],
                    ["Wed", 54],
                    ["Thu", 82],
                    ["Fri", 63],
                    ["Sat", 95],
                    ["Sun", 73],
                  ].map(([day, pct]) => (
                    <div key={day} className="ff-barrow">
                      <span>{day}</span>
                      <div className="ff-bar">
                        <i style={{ width: `${pct}%` }}></i>
                      </div>
                      <span>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ff-notice">
                Demo preview: all figures and records are sample data. Connect a backend,
                database, payment provider and official top-up API before production use.
              </div>
            </div>
          )}

          {current === "statements" && (
            <div>
              <div className="ff-grid">
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Gross Sales</span>
                    <span className="ff-staticon">৳</span>
                  </div>
                  <strong className="big">৳84,250</strong>
                  <div className="ff-trend">+14.2% vs last month</div>
                </div>
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Refunds</span>
                    <span className="ff-staticon">↶</span>
                  </div>
                  <strong className="big">৳1,240</strong>
                  <div className="ff-trend">-0.4% this month</div>
                </div>
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Net Revenue</span>
                    <span className="ff-staticon">↗</span>
                  </div>
                  <strong className="big">৳83,010</strong>
                  <div className="ff-trend">Healthy margin</div>
                </div>
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Processing Fees</span>
                    <span className="ff-staticon">％</span>
                  </div>
                  <strong className="big">৳2,480</strong>
                  <div className="ff-trend">2.9% effective rate</div>
                </div>
              </div>

              <div className="ff-notice">
                Financial statements overview. Reconcile with verified bank and payment
                gateway statements before accounting close.
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Financial Statement Breakdown</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>PERIOD</th>
                        <th>GROSS SALES</th>
                        <th>REFUNDS</th>
                        <th>NET REVENUE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Today", "৳8,420", "৳0", "৳8,420"],
                        ["This Week", "৳32,800", "৳420", "৳32,380"],
                        ["This Month", "৳84,250", "৳1,240", "৳83,010"],
                        ["Previous Month", "৳73,600", "৳980", "৳72,620"],
                      ].map((row, i) => (
                        <tr key={i}>
                          {row.map((col, j) => (
                            <td key={j}>{col}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {current === "orders" && (
            <div>
              <div className="ff-toolbar">
                <input
                  className="ff-input"
                  placeholder="Search order, customer or item…"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
                <select
                  className="ff-select"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                >
                  <option value="">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
                <button className="ff-btn primary" onClick={addDemoOrder}>
                  ＋ Add demo order
                </button>
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Top-Up Orders ({filteredOrders.length})</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>PRODUCT</th>
                        <th>AMOUNT</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((o) => (
                          <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.customer}</td>
                            <td>{o.item}</td>
                            <td>{money(o.amount)}</td>
                            <td>{o.date}</td>
                            <td>{pill(o.status)}</td>
                            <td>
                              <select
                                className="ff-select"
                                style={{ padding: "4px 8px", fontSize: "12px", width: "auto" }}
                                value={o.status}
                                onChange={(e) => changeOrder(o.id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                                <option value="Failed">Failed</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="ff-empty">
                            No matching orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {current === "users" && (
            <div>
              <div className="ff-notice">
                Customer profiles and order histories. In production, ensure data privacy and
                GDPR/local compliance.
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Registered Customers</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>CUSTOMER</th>
                        <th>EMAIL</th>
                        <th>ORDERS</th>
                        <th>TOTAL SPENT</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => (
                        <tr key={i}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.orders}</td>
                          <td>{money(u.spent)}</td>
                          <td>{pill(u.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {current === "categories" && (
            <div>
              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Add New Category</h3>
                </div>
                <div className="ff-fieldgrid">
                  <div className="ff-field">
                    <label>Category name</label>
                    <input
                      className="ff-input"
                      placeholder="e.g. Special Passes"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                    />
                  </div>
                  <div className="ff-field">
                    <label>URL slug</label>
                    <input
                      className="ff-input"
                      placeholder="e.g. special-passes"
                      value={catSlug}
                      onChange={(e) => setCatSlug(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "14px" }}>
                  <button className="ff-btn primary" onClick={addCategory}>
                    ＋ Add category
                  </button>
                </div>
              </div>

              <div className="ff-notice">
                Organize your game top-up products into storefront categories.
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Product Categories ({categories.length})</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>CATEGORY NAME</th>
                        <th>SLUG</th>
                        <th>PRODUCTS</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c, i) => (
                        <tr key={i}>
                          <td>{c.name}</td>
                          <td>{c.slug}</td>
                          <td>{c.count ?? 0}</td>
                          <td>{pill(c.status)}</td>
                          <td>
                            <button className="ff-btn" onClick={() => deleteCategory(i)}>
                              Delete
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

          {current === "products" && (
            <div>
              <div className="ff-toolbar">
                <input
                  className="ff-input"
                  placeholder="Product title (e.g. Evo Gun Token Box)"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                />
                <input
                  className="ff-input"
                  placeholder="Category"
                  style={{ maxWidth: "180px" }}
                  value={prodCat}
                  onChange={(e) => setProdCat(e.target.value)}
                />
                <input
                  className="ff-input"
                  placeholder="Price / Range (৳)"
                  style={{ maxWidth: "150px" }}
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                />
                <button className="ff-btn primary" onClick={addProduct}>
                  ＋ Add product
                </button>
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Product Catalog ({products.length})</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>PRODUCT NAME</th>
                        <th>CATEGORY</th>
                        <th>PRICE / RANGE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.name}</td>
                          <td>{p.category}</td>
                          <td>{p.price}</td>
                          <td>{pill(p.status)}</td>
                          <td>
                            <button className="ff-btn" onClick={() => deleteProduct(i)}>
                              Delete
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

          {current === "diamond-packages" && (
            <div>
              <div className="ff-toolbar">
                <input
                  className="ff-input"
                  placeholder="Package name (e.g. 310 Diamonds)"
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                />
                <input
                  className="ff-input"
                  type="number"
                  min="0"
                  placeholder="Price (৳)"
                  style={{ maxWidth: "140px" }}
                  value={pkgPrice}
                  onChange={(e) => setPkgPrice(e.target.value)}
                />
                <button className="ff-btn primary" onClick={addPackage}>
                  ＋ Add package
                </button>
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Diamond Packages ({packages.length})</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>PACKAGE</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((p, i) => (
                        <tr key={i}>
                          <td>{p.name}</td>
                          <td>{money(p.price)}</td>
                          <td>{p.stock}</td>
                          <td>{pill(p.status)}</td>
                          <td>
                            <button className="ff-btn" onClick={() => deletePackage(i)}>
                              Delete
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

          {current === "unipin-storage" && (
            <div>
              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Add UniPin Code</h3>
                </div>
                <div className="ff-fieldgrid">
                  <div className="ff-field">
                    <label>Voucher code</label>
                    <input
                      className="ff-input"
                      placeholder="e.g. UPBD-8821-4920-1105"
                      value={vCode}
                      onChange={(e) => setVCode(e.target.value)}
                    />
                  </div>
                  <div className="ff-field">
                    <label>Voucher PIN</label>
                    <input
                      className="ff-input"
                      placeholder="e.g. 78219401"
                      value={vPin}
                      onChange={(e) => setVPin(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "14px" }}>
                  <button className="ff-btn primary" onClick={addVoucher}>
                    ＋ Store voucher
                  </button>
                </div>
              </div>

              <div className="ff-notice">
                UniPin codes stored in browser inventory memory. Connect server KMS/vault for
                production security.
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Stored UniPin Codes ({vouchers.length})</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>CODE</th>
                        <th>PIN</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vouchers.map((v, i) => (
                        <tr key={i}>
                          <td>{v.code}</td>
                          <td>••••••••</td>
                          <td>{pill(v.status)}</td>
                          <td>
                            <button className="ff-btn" onClick={() => deleteVoucher(i)}>
                              Delete
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

          {current === "transactions" && (
            <div>
              <div className="ff-notice">
                Real-time payment transaction ledger. Connect verified payment gateway webhooks
                for production.
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Transaction Ledger</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>TRANSACTION ID</th>
                        <th>CUSTOMER</th>
                        <th>AMOUNT</th>
                        <th>TYPE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => (
                        <tr key={t.id}>
                          <td>{t.id}</td>
                          <td>{t.customer}</td>
                          <td>{money(t.amount)}</td>
                          <td>{t.type}</td>
                          <td>{pill(t.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {current === "reports" && (
            <div>
              <div className="ff-grid">
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Total Revenue</span>
                    <span className="ff-staticon">৳</span>
                  </div>
                  <strong className="big">৳84,250</strong>
                  <div className="ff-trend">+12.8%</div>
                </div>
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Conversion Rate</span>
                    <span className="ff-staticon">↗</span>
                  </div>
                  <strong className="big">4.8%</strong>
                  <div className="ff-trend">+0.6%</div>
                </div>
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Avg. Order Value</span>
                    <span className="ff-staticon">◈</span>
                  </div>
                  <strong className="big">৳312</strong>
                  <div className="ff-trend">+3.2%</div>
                </div>
                <div className="ff-stat">
                  <div className="ff-stathead">
                    <span>Refund Rate</span>
                    <span className="ff-staticon">↶</span>
                  </div>
                  <strong className="big">1.4%</strong>
                  <div className="ff-trend">Below threshold</div>
                </div>
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Performance by Product Category</h3>
                </div>
                <div className="ff-bars">
                  {[
                    ["Diamonds", 88],
                    ["Memberships", 62],
                    ["Special Passes", 45],
                    ["Vouchers", 38],
                  ].map(([cat, pct]) => (
                    <div key={cat} className="ff-barrow">
                      <span>{cat}</span>
                      <div className="ff-bar">
                        <i style={{ width: `${pct}%` }}></i>
                      </div>
                      <span>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "14px" }}>
                <button className="ff-btn primary" onClick={exportCSV}>
                  ↓ Export orders CSV
                </button>
              </div>
            </div>
          )}

          {current === "admins" && (
            <div>
              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Add Admin Staff</h3>
                </div>
                <div className="ff-fieldgrid">
                  <div className="ff-field">
                    <label>Full Name</label>
                    <input
                      className="ff-input"
                      placeholder="Staff member name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </div>
                  <div className="ff-field">
                    <label>Email Address</label>
                    <input
                      className="ff-input"
                      placeholder="staff@example.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div className="ff-field full">
                    <label>Role</label>
                    <input
                      className="ff-input"
                      placeholder="Manager / Support Staff / Finance Manager"
                      value={adminRole}
                      onChange={(e) => setAdminRole(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "14px" }}>
                  <button className="ff-btn primary" onClick={addAdmin}>
                    ＋ Add admin
                  </button>
                </div>
              </div>

              <div className="ff-notice">
                Manage staff accounts and permissions. Production systems require role-based access
                control (RBAC) and MFA.
              </div>

              <div className="ff-panel">
                <div className="ff-panelhead">
                  <h3>Admin Management ({admins.length})</h3>
                </div>
                <div className="ff-tablewrap">
                  <table className="ff-table">
                    <thead>
                      <tr>
                        <th>STAFF NAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((a, i) => (
                        <tr key={i}>
                          <td>{a.name}</td>
                          <td>{a.email}</td>
                          <td>{a.role}</td>
                          <td>{pill(a.status)}</td>
                          <td>
                            {i === 0 ? (
                              <span style={{ color: "var(--muted)" }}>Owner</span>
                            ) : (
                              <button className="ff-btn" onClick={() => deleteAdmin(i)}>
                                Remove
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="ff-footer">
            FF NEXUS ADMIN · Premium dark gaming interface · Demo data only
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastVisible && <div className="ff-toast">{toastMessage}</div>}
    </div>
  );
}
