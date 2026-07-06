"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { getLocalAvatar } from "@/lib/avatar";
import { useNotificationStore } from "@/lib/stores/notification-store";
import { useUserStore } from "@/lib/stores/user-store";

const monthlyRevenue = [
  { name: "Jan", revenue: 8400, expense: 5200 },
  { name: "Feb", revenue: 9800, expense: 5600 },
  { name: "Mar", revenue: 8900, expense: 5400 },
  { name: "Apr", revenue: 12600, expense: 6900 },
  { name: "May", revenue: 14100, expense: 7700 },
  { name: "Jun", revenue: 15200, expense: 7900 },
  { name: "Jul", revenue: 16850, expense: 8300 },
];

const weeklySignups = [
  { day: "Mon", users: 18 },
  { day: "Tue", users: 26 },
  { day: "Wed", users: 34 },
  { day: "Thu", users: 29 },
  { day: "Fri", users: 42 },
  { day: "Sat", users: 22 },
  { day: "Sun", users: 31 },
];

const recentOrders = [
  { id: "#SO-2934", customer: "Acme Labs", amount: "$1,240", status: "Paid" },
  { id: "#SO-2933", customer: "Northline", amount: "$920", status: "Pending" },
  { id: "#SO-2932", customer: "Flick Studio", amount: "$560", status: "Paid" },
  { id: "#SO-2931", customer: "Octagon", amount: "$2,740", status: "Paid" },
];

const kpis = [
  {
    label: "Total Revenue",
    value: "$168.4K",
    delta: "+11.2%",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    value: "2,481",
    delta: "+8.6%",
    icon: CreditCard,
  },
  {
    label: "Active Users",
    value: "18,942",
    delta: "+4.4%",
    icon: Users,
  },
  {
    label: "New Signups",
    value: "302",
    delta: "+18.3%",
    icon: UserPlus,
  },
];

export default function DashboardPage() {
  const { fetchNotifications } = useNotificationStore();
  const { addUser } = useUserStore();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [quickUser, setQuickUser] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user" | "manager",
    status: "active" as "active" | "inactive" | "pending",
  });

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleQuickAddUser = async () => {
    if (!quickUser.name.trim() || !quickUser.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide name and email.",
        variant: "destructive",
      });
      return;
    }

    await addUser({
      ...quickUser,
      avatar: getLocalAvatar(quickUser.name),
    });

    toast({
      title: "User Added",
      description: `${quickUser.name} was added successfully.`,
    });

    setQuickUser({
      name: "",
      email: "",
      role: "user",
      status: "active",
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Overview</p>
            <h1 className="text-2xl font-semibold md:text-3xl">SaaS Operations Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Monitor revenue, engagement, and growth from one control surface.
            </p>
          </div>
          <Badge className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
            Live data snapshot
          </Badge>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="rounded-2xl border-border/60">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  </div>
                  <div className="rounded-xl bg-sky-500/10 p-2 text-sky-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-1 text-xs text-emerald-500 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {item.delta} vs last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <Card className="rounded-2xl border-border/60 lg:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue vs Expense</CardTitle>
            <p className="text-sm text-muted-foreground">Last 7 months performance trend</p>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 4" opacity={0.3} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0EA5E9"
                  fill="url(#revenueFill)"
                  strokeWidth={2.5}
                />
                <Area type="monotone" dataKey="expense" stroke="#A78BFA" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-4">
          <Card className="rounded-2xl border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Calendar</CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-4 pt-0">
              <Calendar selected={selectedDate} onSelect={setSelectedDate} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Add User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="quick-name">Full Name</Label>
                <Input
                  id="quick-name"
                  value={quickUser.name}
                  onChange={(e) => setQuickUser((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="quick-email">Email</Label>
                <Input
                  id="quick-email"
                  type="email"
                  value={quickUser.email}
                  onChange={(e) => setQuickUser((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="john@company.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={quickUser.role}
                  onValueChange={(value: "admin" | "user" | "manager") =>
                    setQuickUser((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={quickUser.status}
                  onValueChange={(value: "active" | "inactive" | "pending") =>
                    setQuickUser((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleQuickAddUser}>
                Add User
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border/70">
                  <AvatarImage src="/avatars/avatar-1.svg" alt="User profile" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">Product Lead</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-muted-foreground">Open Tasks</p>
                  <p className="mt-1 text-lg font-semibold">12</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-muted-foreground">Team</p>
                  <p className="mt-1 text-lg font-semibold">8 Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <Card className="rounded-2xl border-border/60 xl:col-span-5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Weekly Signups</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySignups}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" opacity={0.3} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="users" radius={[8, 8, 0, 0]} fill="#38BDF8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 xl:col-span-7">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{order.amount}</p>
                    <Badge
                      variant="outline"
                      className={order.status === "Paid" ? "border-emerald-600/40 text-emerald-500" : "border-amber-600/40 text-amber-500"}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
