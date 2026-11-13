"use client";
// src/app/admin/dashboard/page.jsx
// 100% Real-time Firebase Firestore Dashboard — Zero mock or hardcoded data.

import { useEffect, useState, useMemo } from "react";
import { subscribeToOrders, subscribeToUsers } from "@/lib/admin-firebase";
import { toSafeDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import KpiCard from "@/components/admin/KpiCard";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  Inbox,
  BarChart3,
} from "lucide-react";

function buildWeeklySalesData(orders) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toLocaleDateString("en-US", { weekday: "short" }),
      isoDate: d.toISOString().split("T")[0],
      revenue: 0,
      orders: 0,
    });
  }

  orders.forEach((o) => {
    if (o.status !== "Completed") return;
    if (!o.createdAt) return;
    const ts = toSafeDate(o.createdAt);
    const iso = ts.toISOString().split("T")[0];
    const slot = days.find((d) => d.isoDate === iso);
    if (slot) {
      slot.revenue += Number(o.amount) || 0;
      slot.orders += 1;
    }
  });

  return days;
}

function fmtMoney(n) {
  return "৳" + Number(n || 0).toLocaleString("en-US");
}

export default function DashboardPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const unsubOrders = subscribeToOrders(
      (data) => {
        setOrders(data);
        setOrdersLoading(false);
      },
      (err) => {
        setOrdersLoading(false);
        toast({
          variant: "destructive",
          title: "Failed to load orders",
          description: err.message,
        });
      }
    );

    const unsubUsers = subscribeToUsers(
      (data) => {
        setUsers(data);
        setUsersLoading(false);
      },
      (err) => {
        setUsersLoading(false);
        toast({
          variant: "destructive",
          title: "Failed to load users",
          description: err.message,
        });
      }
    );

    return () => {
      unsubOrders();
      unsubUsers();
    };
  }, [toast]);

  const isLoading = ordersLoading || usersLoading;

  const stats = useMemo(() => {
    const completedOrders = orders.filter((o) => o.status === "Completed");
    const totalRevenue = completedOrders.reduce(
      (sum, o) => sum + (Number(o.amount) || 0),
      0
    );
    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const activeCustomers = users.filter((u) => u.status !== "Banned").length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      pendingCount,
      activeCustomers,
      completedCount: completedOrders.length,
    };
  }, [orders, users]);

  const chartData = useMemo(() => buildWeeklySalesData(orders), [orders]);
  const hasSalesData = useMemo(
    () => chartData.some((d) => d.revenue > 0),
    [chartData]
  );
  const recentOrders = useMemo(() => orders.slice(0, 8), [orders]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Real-time metrics calculated directly from Firestore."
      />

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-2.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <KpiCard
              title="Total Revenue"
              value={fmtMoney(stats.totalRevenue)}
              icon={DollarSign}
              trendLabel={`${stats.completedCount} completed orders`}
            />
            <KpiCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={ShoppingCart}
              trendLabel="From Firestore orders"
            />
            <KpiCard
              title="Pending Orders"
              value={stats.pendingCount}
              icon={Clock}
              trendLabel={stats.pendingCount > 0 ? "Needs review" : "All clear"}
              trend={stats.pendingCount > 0 ? -1 : 1}
            />
            <KpiCard
              title="Active Customers"
              value={stats.activeCustomers}
              icon={Users}
              trendLabel={`${users.length} total accounts`}
              trend={1}
            />
          </>
        )}
      </div>

      {/* Weekly Sales Chart + Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <Card className="xl:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Weekly Sales (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <Skeleton className="w-full h-[220px]" />
            ) : !hasSalesData ? (
              <div className="h-[220px] flex flex-col items-center justify-center text-center text-muted-foreground">
                <BarChart3 className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm font-medium">No sales data yet</p>
                <p className="text-xs mt-0.5">
                  Completed orders from the last 7 days will appear here.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={chartData}
                  margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{
                      fontSize: 11,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `৳${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      background: "hsl(var(--card))",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(v) => [`৳${v}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#rev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 overflow-x-auto">
            {ordersLoading ? (
              <div className="space-y-3 py-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="h-[220px] flex flex-col items-center justify-center text-center text-muted-foreground">
                <Inbox className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm font-medium">No data found</p>
                <p className="text-xs mt-0.5">
                  No orders in Firestore yet.
                </p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left py-2 text-xs font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left py-2 text-xs font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30"
                    >
                      <td className="py-2">
                        <div className="font-medium text-xs truncate max-w-[120px]">
                          {o.customerName || "Unknown"}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                          {o.product || "—"}
                        </div>
                      </td>
                      <td className="py-2 text-xs font-semibold">
                        {fmtMoney(o.amount)}
                      </td>
                      <td className="py-2">
                        <StatusBadge status={o.status || "Pending"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
