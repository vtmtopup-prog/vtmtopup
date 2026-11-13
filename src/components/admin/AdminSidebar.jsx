"use client";
// src/components/admin/AdminSidebar.jsx
// Clean, grouped sidebar with collapse support

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Settings,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Activity,
  ArrowLeftRight,
  Ticket,
  ShieldCheck,
  X,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/logs", icon: Activity, label: "Activity Log" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
      { href: "/admin/add-money", icon: Wallet, label: "Add Money" },
      { href: "/admin/transactions", icon: ArrowLeftRight, label: "Transactions" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { href: "/admin/catalog", icon: Package, label: "Products & Offers" },
      { href: "/admin/vouchers", icon: Ticket, label: "UniPin Vouchers" },
    ],
  },
  {
    label: "Users",
    items: [
      { href: "/admin/users", icon: Users, label: "Customers" },
      { href: "/admin/admins", icon: ShieldCheck, label: "Admin Staff" },
    ],
  },
  {
    label: "Config",
    items: [
      { href: "/admin/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen flex flex-col border-r border-border bg-background transition-all duration-200",
          collapsed ? "w-16" : "w-56",
          // Mobile: slide in/out
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 h-14 border-b border-border shrink-0",
            collapsed && "justify-center px-0"
          )}
        >
          {!collapsed && (
            <span className="font-bold text-sm tracking-tight text-foreground">
              VTM Admin
            </span>
          )}
          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="ml-auto hidden lg:flex items-center justify-center w-6 h-6 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="ml-auto lg:hidden flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map(({ href, icon: Icon, label }) => {
                  const active = pathname === href || pathname.startsWith(href + "/");
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={onClose}
                        title={collapsed ? label : undefined}
                        className={cn(
                          "flex items-center gap-2.5 px-2 py-2 rounded-md text-sm font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          collapsed && "justify-center px-0"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>{label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="shrink-0 px-4 py-3 border-t border-border">
            <p className="text-[11px] text-muted-foreground">FF Nexus · Admin v2</p>
          </div>
        )}
      </aside>
    </>
  );
}

