"use client";
// src/app/admin/add-money/page.jsx
// Live Deposit Verification Queue synced with user wallets and /add-money

import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check, X, Search } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

function fmt(n) {
  return "৳" + Number(n || 0).toLocaleString("en-US");
}

export default function AddMoneyPage() {
  const { addMoneyRequests, approveAddMoney, rejectAddMoney } = useApp();
  const [search, setSearch] = useState("");
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return (addMoneyRequests || []).filter((r) =>
      !q || [r.id, r.user, r.trxId, r.phone, r.method].join(" ").toLowerCase().includes(q)
    );
  }, [addMoneyRequests, search]);

  const pendingCount = (addMoneyRequests || []).filter((r) => r.status === "Pending").length;

  const handleApprove = (req) => {
    approveAddMoney(req.id);
  };

  const openReject = (req) => {
    setRejectTarget(req);
    setRejectReason("Invalid TrxID");
  };

  const confirmReject = () => {
    if (!rejectTarget) return;
    rejectAddMoney(rejectTarget.id, rejectReason || "Invalid TrxID");
    setRejectTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deposit & Add Money Verification"
        description={`${addMoneyRequests?.length || 0} total requests · ${pendingCount} awaiting approval`}
      />

      {/* Toolbar */}
      <div className="flex justify-end">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search customer, TrxID, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs w-64"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                {["Request ID", "Customer Details", "Amount", "Method", "TrxID", "Submitted At", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No deposit requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-foreground">{r.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-xs text-foreground">{r.user}</div>
                      {r.phone && <div className="text-[11px] text-muted-foreground font-mono">{r.phone}</div>}
                    </td>
                    <td className="px-4 py-3 font-extrabold text-xs text-emerald-600">{fmt(r.amount)}</td>
                    <td className="px-4 py-3 text-xs font-semibold">{r.method}</td>
                    <td className="px-4 py-3 font-mono text-xs font-bold tracking-wider text-foreground">{r.trxId}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {formatDateTime(r.createdAt || r.time)}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      {r.status === "Pending" ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                            onClick={() => handleApprove(r)}
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 px-2.5 text-xs gap-1"
                            onClick={() => openReject(r)}
                          >
                            <X className="w-3.5 h-3.5" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">{r.reason || "Processed"}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Reject Modal */}
      <Dialog open={!!rejectTarget} onOpenChange={(o) => !o && setRejectTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reject Deposit Request</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Rejecting <strong>{rejectTarget?.user}</strong>'s{" "}
            <strong>{fmt(rejectTarget?.amount)}</strong> deposit.
          </p>
          <div className="py-2">
            <Input
              placeholder="Reason (e.g. Invalid TrxID or Fake submission)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="text-sm h-9"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setRejectTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={confirmReject}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
