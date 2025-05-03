"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";

// Sample performance analytics data
const systemPerformanceData = [
  { date: "Jan 1", responseTime: 0.8, errorRate: 0.5 },
  { date: "Jan 8", responseTime: 0.9, errorRate: 0.7 },
  { date: "Jan 15", responseTime: 1.2, errorRate: 1.2 },
  { date: "Jan 22", responseTime: 0.7, errorRate: 0.4 },
  { date: "Jan 29", responseTime: 0.6, errorRate: 0.3 },
  { date: "Feb 5", responseTime: 0.8, errorRate: 0.6 },
  { date: "Feb 12", responseTime: 0.7, errorRate: 0.5 },
];

const performanceScoreData = [
  { subject: 'Availability', A: 95, fullMark: 100 },
  { subject: 'Speed', A: 87, fullMark: 100 },
  { subject: 'Reliability', A: 92, fullMark: 100 },
  { subject: 'Security', A: 94, fullMark: 100 },
  { subject: 'Scalability', A: 88, fullMark: 100 },
  { subject: 'Usability', A: 90, fullMark: 100 },
];

const serverLoadData = [
  { name: "Server 1", load: 72 },
  { name: "Server 2", load: 45 },
  { name: "Server 3", load: 83 },
  { name: "Server 4", load: 62 }
];

export default function PerformanceAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <div className="flex gap-4">
          <Select defaultValue="last30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.97%</div>
            <p className="text-xs text-muted-foreground">15m downtime this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">286ms</div>
            <p className="text-xs text-muted-foreground">-12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.42%</div>
            <p className="text-xs text-muted-foreground text-green-500">-0.08% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
          <CardDescription>Response time and error rates over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={systemPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="responseTime" stroke="var(--color-chart-1)" name="Avg. Response Time (s)" strokeWidth={2} />
              <Line type="monotone" dataKey="errorRate" stroke="var(--color-chart-2)" name="Error Rate %" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Score</CardTitle>
            <CardDescription>System performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceScoreData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Performance" dataKey="A" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server Load</CardTitle>
            <CardDescription>Current server utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {serverLoadData.map((server, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{server.name}</span>
                    <span className={`font-bold ${server.load > 80 ? 'text-red-500' : server.load > 65 ? 'text-amber-500' : 'text-green-500'}`}>
                      {server.load}%
                    </span>
                  </div>
                  <Progress value={server.load} className={server.load > 80 ? 'bg-red-200' : server.load > 65 ? 'bg-amber-200' : 'bg-green-200'} />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Metrics</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
