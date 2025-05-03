"use client";

import { useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotificationStore } from "@/lib/stores/notification-store";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { CreditCard, Users, TrendingUp, PieChart as PieChartIcon } from "lucide-react";

// Sample data for charts
const performanceData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 27 },
  { name: "May", value: 29 },
  { name: "Jun", value: 35 },
  { name: "Jul", value: 40 },
  { name: "Aug", value: 41 },
  { name: "Sep", value: 45 },
];

const salesData = [
  { name: "Mon", sales: 2400, returns: 400 },
  { name: "Tue", sales: 1398, returns: 300 },
  { name: "Wed", sales: 9800, returns: 700 },
  { name: "Thu", sales: 3908, returns: 200 },
  { name: "Fri", sales: 4800, returns: 450 },
  { name: "Sat", sales: 3800, returns: 500 },
  { name: "Sun", sales: 5000, returns: 300 },
];

const revenueBreakdown = [
  { name: "Subscriptions", value: 65 },
  { name: "One-time Sales", value: 15 },
  { name: "Services", value: 10 },
  { name: "Other", value: 10 },
];

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

export default function DashboardPage() {
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    // Load notifications when dashboard mounts
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your SaaS dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl font-bold">$24,345</CardTitle>
              <p className="text-xs flex items-center text-green-600 dark:text-green-400">
                <ArrowUpIcon className="mr-1 h-3 w-3" /> +12.5% from last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-3xl font-bold">1,294</CardTitle>
              <p className="text-xs flex items-center text-green-600 dark:text-green-400">
                <ArrowUpIcon className="mr-1 h-3 w-3" /> +2.4% from last week
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <CardDescription>Conversion Rate</CardDescription>
              <CardTitle className="text-3xl font-bold">28.6%</CardTitle>
              <p className="text-xs flex items-center text-green-600 dark:text-green-400">
                <ArrowUpIcon className="mr-1 h-3 w-3" /> +4.3% from last week
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <CardDescription>Avg. Session</CardDescription>
              <CardTitle className="text-3xl font-bold">4m 12s</CardTitle>
              <p className="text-xs flex items-center text-green-600 dark:text-green-400">
                <ArrowUpIcon className="mr-1 h-3 w-3" /> +0.8% from last week
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <PieChartIcon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="col-span-2 sm:col-span-1">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Monthly system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 sm:col-span-1">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Distribution of revenue sources</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Weekly Sales Overview</CardTitle>
            <CardDescription>Comparison of sales and returns</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="var(--color-chart-1)" name="Sales" />
                <Bar dataKey="returns" fill="var(--color-chart-2)" name="Returns" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
