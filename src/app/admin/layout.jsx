"use client";
// src/app/admin/layout.jsx
// Protected Admin Layout with Firebase Auth Guard, Collapsible Sidebar & Topbar

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { AlertTriangle } from "lucide-react";

const PAGE_TITLES = {
  "/admin/dashboard":    "Dashboard",
  "/admin/orders":       "Orders",
  "/admin/add-money":    "Add Money Requests",
  "/admin/transactions": "Transactions",
  "/admin/users":        "Customers",
  "/admin/admins":       "Admin Staff",
  "/admin/catalog":      "Products & Offers",
  "/admin/vouchers":     "UniPin Vouchers",
  "/admin/settings":     "Site & Gateway Settings",
  "/admin/logs":         "Audit Logs",
};

function getTitle(pathname) {
  if (pathname?.startsWith("/admin/catalog/")) return "Product Recharge Options";
  return PAGE_TITLES[pathname] ?? "Admin";
}

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user && isFirebaseConfigured) {
      router.replace("/login?redirect=/admin/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Verifying Firebase session…</p>
        </div>
      </div>
    );
  }

  if (!user && isFirebaseConfigured) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} title={getTitle(pathname)} />

        {!isFirebaseConfigured && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Firebase Not Configured:</strong> Add your <code>NEXT_PUBLIC_FIREBASE_*</code> environment variables in <code>.env.local</code> to connect live Firestore data.
            </span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
