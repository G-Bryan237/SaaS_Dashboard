"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
import { Download, FileSpreadsheet, FilePieChart, Clock, CalendarIcon, Plus, ListFilter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Sample reports data
const recentReports = [
  { id: "RPT-001", name: "Monthly Sales Summary", type: "Sales", date: "2023-04-01", format: "Excel", status: "Completed" },
  { id: "RPT-002", name: "User Acquisition Q1", type: "Marketing", date: "2023-03-31", format: "PDF", status: "Completed" },
  { id: "RPT-003", name: "Product Performance", type: "Analytics", date: "2023-03-15", format: "Excel", status: "Completed" },
  { id: "RPT-004", name: "Customer Retention Analysis", type: "CRM", date: "2023-03-01", format: "PDF", status: "Completed" },
  { id: "RPT-005", name: "Annual Financial Report", type: "Finance", date: "2023-02-15", format: "Excel", status: "Completed" },
];

const scheduledReports = [
  { id: "SCH-001", name: "Weekly Performance Summary", frequency: "Weekly", nextRun: "2023-04-07", recipients: 3, format: "Excel" },
  { id: "SCH-002", name: "Monthly Financial Statement", frequency: "Monthly", nextRun: "2023-05-01", recipients: 5, format: "PDF" },
  { id: "SCH-003", name: "User Growth Report", frequency: "Weekly", nextRun: "2023-04-07", recipients: 2, format: "PDF" },
];

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              {/* Temporary replacement for Calendar component */}
              <div className="p-4">
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                />
              </div>
            </PopoverContent>
          </Popover>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View detailed revenue analytics and trends</p>
            <Button variant="outline" className="mt-4 w-full">View Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Track user engagement and activity metrics</p>
            <Button variant="outline" className="mt-4 w-full">View Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">System performance and optimization data</p>
            <Button variant="outline" className="mt-4 w-full">View Report</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Monthly Report #{item}</h3>
                  <p className="text-sm text-muted-foreground">Generated {item} day{item !== 1 ? 's' : ''} ago</p>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
