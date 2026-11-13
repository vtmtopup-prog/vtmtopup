"use client";
// src/app/admin/catalog/[slug]/page.jsx
// Recharge options and diamond pricing editor for a specific product

import { useState } from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, ChevronLeft, Check, X, Pencil } from "lucide-react";
import Link from "next/link";

export default function ProductOptionsPage() {
  const params = useParams();
  const slug = params?.slug;

  const {
    topupProducts,
    addRechargeOption,
    updateRechargeOption,
    deleteRechargeOption,
  } = useApp();

  const product = (topupProducts || []).find((p) => p.slug === slug);
  const options = product?.rechargeOptions || [];

  const [form, setForm] = useState({ name: "", price: "" });
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", price: "" });

  const handleAdd = () => {
    if (!form.name.trim() || !form.price.trim() || !slug) return;
    addRechargeOption(slug, { name: form.name.trim(), price: form.price.trim() });
    setForm({ name: "", price: "" });
  };

  const handleStartEdit = (opt) => {
    setEditingId(opt.id);
    setEditValues({ name: opt.name, price: opt.price });
  };

  const handleSaveEdit = (optId) => {
    if (!slug) return;
    updateRechargeOption(slug, optId, editValues);
    setEditingId(null);
  };

  const handleDelete = () => {
    if (!deleteId || !slug) return;
    deleteRechargeOption(slug, deleteId);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/catalog">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Catalog
          </Button>
        </Link>
        <span className="text-muted-foreground text-xs">/</span>
        <span className="text-xs font-semibold">{product?.name || slug}</span>
      </div>

      <PageHeader
        title={`Recharge Packages: ${product?.name || slug}`}
        description={`Manage diamond options and pricing for /topup/${slug} (${options.length} options)`}
      />

      {/* Add New Package Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Add New Recharge Package</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap items-end">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs">Option / Package Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. 115 Diamond or Weekly Membership"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div className="w-40">
              <Label className="text-xs">Price</Label>
              <Input
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                placeholder="e.g. 80 TK"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.name.trim() || !form.price.trim()}
              size="sm"
              className="h-9 gap-1.5 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Option
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Options Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                {["Package / Option Name", "Price (TK)", "Option ID", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {options.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No recharge packages added yet. Add your first package above.
                  </td>
                </tr>
              ) : (
                options.map((opt) => (
                  <tr key={opt.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5">
                      {editingId === opt.id ? (
                        <Input
                          value={editValues.name}
                          onChange={(e) => setEditValues((p) => ({ ...p, name: e.target.value }))}
                          className="h-8 text-xs max-w-sm"
                          autoFocus
                        />
                      ) : (
                        <span className="text-xs font-medium">{opt.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {editingId === opt.id ? (
                        <Input
                          value={editValues.price}
                          onChange={(e) => setEditValues((p) => ({ ...p, price: e.target.value }))}
                          className="h-8 text-xs w-32"
                        />
                      ) : (
                        <span className="text-xs font-bold text-emerald-600">{opt.price}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{opt.id}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        {editingId === opt.id ? (
                          <>
                            <Button size="sm" className="h-7 px-2 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleSaveEdit(opt.id)}>
                              <Check className="w-3 h-3" /> Save
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setEditingId(null)}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
                              onClick={() => handleStartEdit(opt)}
                            >
                              <Pencil className="w-3 h-3" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                              onClick={() => setDeleteId(opt.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this recharge option?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
