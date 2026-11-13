"use client";
// src/app/admin/orders/page.jsx
// Live Orders Management synced with storefront and customer accounts

import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Search } from "lucide-react";

const TABS = ["All", "Pending", "Completed", "Cancelled"];

function fmt(n) {
  return "৳" + Number(n || 0).toLocaleString("en-US");
}

export default function OrdersPage() {
  const { orders, approveOrder, cancelOrder } = useApp();
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return (orders || []).filter((o) => {
      const matchTab = tab === "All" || o.status === tab;
      const matchSearch =
        !q ||
        [o.id, o.user, o.customer, o.item, o.trxId, o.phone, o.uid].join(" ").toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [orders, tab, search]);

  const handleStatus = (orderId, newStatus) => {
    if (newStatus === "Completed") {
      approveOrder(orderId);
    } else if (newStatus === "Cancelled") {
      cancelOrder(orderId, "Cancelled by Admin");
    }
  };

  const pendingCount = (orders || []).filter((o) => o.status === "Pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Orders"
        description={`${orders?.length || 0} total orders · ${pendingCount} awaiting approval`}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-9">
            {TABS.map((t) => (
              <TabsTrigger key={t} value={t} className="text-xs px-3 h-7">
                {t}
                {t === "Pending" && pendingCount > 0 && (
                  <span className="ml-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search order ID, user, TrxID, UID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs w-64"
          />
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                {["Order ID", "Customer Details", "Product / Item", "Method", "TrxID", "Amount", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No orders matching your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-bold text-foreground">{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-xs text-foreground">{o.user || o.customer}</div>
                      {o.phone && <div className="text-[11px] text-muted-foreground font-mono">{o.phone}</div>}
                      {o.uid && <div className="text-[11px] text-emerald-600 font-mono font-medium">Player UID: {o.uid}</div>}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[160px] truncate font-medium">{o.item}</td>
                    <td className="px-4 py-3 text-xs font-semibold">{o.method || "Wallet"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{o.trxId || "—"}</td>
                    <td className="px-4 py-3 text-xs font-extrabold text-foreground">{fmt(o.amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3">
                      {o.status === "Pending" ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                            onClick={() => handleStatus(o.id, "Completed")}
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 px-2.5 text-xs gap-1"
                            onClick={() => handleStatus(o.id, "Cancelled")}
                          >
                            <X className="w-3.5 h-3.5" />
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Select
                          value={o.status}
                          onValueChange={(v) => handleStatus(o.id, v)}
                        >
                          <SelectTrigger className="h-7 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending" className="text-xs">Pending</SelectItem>
                            <SelectItem value="Completed" className="text-xs">Completed</SelectItem>
                            <SelectItem value="Cancelled" className="text-xs">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
