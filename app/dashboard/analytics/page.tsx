"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample analytics data
const trafficData = [
  { date: "Jan 1", pageViews: 1240, visitors: 480 },
  { date: "Jan 8", pageViews: 1800, visitors: 590 },
  { date: "Jan 15", pageViews: 2200, visitors: 750 },
  { date: "Jan 22", pageViews: 1900, visitors: 620 },
  { date: "Jan 29", pageViews: 2400, visitors: 810 },
  { date: "Feb 5", pageViews: 2700, visitors: 930 },
  { date: "Feb 12", pageViews: 3100, visitors: 1020 },
];

const conversionData = [
  { source: "Organic Search", rate: 3.2 },
  { source: "Direct", rate: 4.5 },
  { source: "Referral", rate: 6.8 },
  { source: "Social", rate: 2.7 },
  { source: "Email", rate: 7.9 },
  { source: "Paid Search", rate: 5.4 },
];

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select defaultValue="last7">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7">Last 7 days</SelectItem>
            <SelectItem value="last30">Last 30 days</SelectItem>
            <SelectItem value="last90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Page views and unique visitors over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pageViews" stroke="var(--color-chart-1)" name="Page Views" strokeWidth={2} />
                  <Line type="monotone" dataKey="visitors" stroke="var(--color-chart-2)" name="Visitors" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Top sources of traffic to your platform</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" />
                    <YAxis dataKey="source" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="var(--color-chart-1)" name="Conversion Rate %" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Behavior</CardTitle>
                <CardDescription>User engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Avg. Session Duration</span>
                      <span className="font-bold">3m 42s</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 w-[65%] rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pages Per Session</span>
                      <span className="font-bold">4.3</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 w-[72%] rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Bounce Rate</span>
                      <span className="font-bold">33.4%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 w-[33%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Analytics</CardTitle>
              <CardDescription>Track your conversion metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conversion data will display here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Track your sales metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sales data will display here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Track your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance data will display here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
