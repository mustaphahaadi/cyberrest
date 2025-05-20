"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Badge from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  BarChart,
  Activity,
  Clock,
  AlertTriangle,
  Database,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Usage() {
  const { user, subscription } = useAuth();
  const [timeRange, setTimeRange] = useState("7d");
  const [date, setDate] = useState(new Date());
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching usage data
  useEffect(() => {
    setLoading(true);

    // Mock data generation based on time range
    setTimeout(() => {
      const generateMockData = () => {
        const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

        // Generate daily usage data
        const dailyData = Array.from({ length: days }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));

          return {
            date: format(date, "yyyy-MM-dd"),
            scans: Math.floor(Math.random() * 10) + 1,
            threats: Math.floor(Math.random() * 3),
            dataProcessed: Math.floor(Math.random() * 500) + 100, // in MB
          };
        });

        // Generate tool usage data
        const toolUsage = [
          {
            name: "Password Analyzer",
            count: Math.floor(Math.random() * 50) + 10,
          },
          {
            name: "Password Generator",
            count: Math.floor(Math.random() * 40) + 5,
          },
          {
            name: "Data Breach Scanner",
            count: Math.floor(Math.random() * 30) + 5,
          },
          {
            name: "Phishing Detector",
            count: Math.floor(Math.random() * 20) + 2,
          },
          {
            name: "Network Scanner",
            count: Math.floor(Math.random() * 15) + 1,
          },
          {
            name: "Encryption Tool",
            count: Math.floor(Math.random() * 25) + 3,
          },
        ];

        // Calculate totals
        const totalScans = dailyData.reduce((sum, day) => sum + day.scans, 0);
        const totalThreats = dailyData.reduce(
          (sum, day) => sum + day.threats,
          0
        );
        const totalDataProcessed = dailyData.reduce(
          (sum, day) => sum + day.dataProcessed,
          0
        );

        return {
          dailyData,
          toolUsage,
          totals: {
            scans: totalScans,
            threats: totalThreats,
            dataProcessed: totalDataProcessed,
          },
          limits: {
            scans:
              subscription?.plan === "free"
                ? 50
                : subscription?.plan === "premium"
                ? 500
                : 5000,
            dataProcessed:
              subscription?.plan === "free"
                ? 1000
                : subscription?.plan === "premium"
                ? 10000
                : 100000, // in MB
          },
        };
      };

      setUsageData(generateMockData());
      setLoading(false);
    }, 1000);
  }, [timeRange, subscription]);

  const formatDataSize = (sizeInMB) => {
    if (sizeInMB < 1000) {
      return `${sizeInMB} MB`;
    } else {
      return `${(sizeInMB / 1000).toFixed(2)} GB`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Usage Analytics</h2>
          <p className="text-muted-foreground">
            Monitor your security tool usage and activity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 w-24 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded mb-2"></div>
                <div className="h-2 w-full bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usageData?.totals.scans}
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Usage</span>
                  <span>
                    {usageData?.totals.scans}/{usageData?.limits.scans}
                  </span>
                </div>
                <Progress
                  value={
                    (usageData?.totals.scans / usageData?.limits.scans) * 100
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Threats Detected
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usageData?.totals.threats}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {usageData?.totals.threats === 0
                  ? "No threats detected"
                  : `${
                      usageData?.totals.threats
                    } threats detected in the last ${
                      timeRange === "7d"
                        ? "7 days"
                        : timeRange === "30d"
                        ? "30 days"
                        : "90 days"
                    }`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Data Processed
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDataSize(usageData?.totals.dataProcessed)}
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Usage</span>
                  <span>
                    {formatDataSize(usageData?.totals.dataProcessed)}/
                    {formatDataSize(usageData?.limits.dataProcessed)}
                  </span>
                </div>
                <Progress
                  value={
                    (usageData?.totals.dataProcessed /
                      usageData?.limits.dataProcessed) *
                    100
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Tool Usage
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Over Time</CardTitle>
              <CardDescription>
                Security scans and threats detected over the selected time
                period
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {loading ? (
                <div className="animate-pulse w-full h-full bg-muted rounded-md"></div>
              ) : (
                <div className="text-center text-muted-foreground">
                  Activity chart would be displayed here
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tool Usage Distribution</CardTitle>
              <CardDescription>
                Usage breakdown by security tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse w-full h-[300px] bg-muted rounded-md"></div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      Tool usage chart would be displayed here
                    </div>
                  </div>
                  <div className="space-y-4">
                    {usageData?.toolUsage.map((tool) => (
                      <div key={tool.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {tool.name}
                          </span>
                          <span className="text-sm">{tool.count} uses</span>
                        </div>
                        <Progress
                          value={
                            (tool.count /
                              Math.max(
                                ...usageData.toolUsage.map((t) => t.count)
                              )) *
                            100
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Detailed history of your security activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse flex items-center p-3 border rounded-md"
                    >
                      <div className="w-12 h-12 bg-muted rounded-full mr-4"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {usageData?.dailyData
                    .slice(-5)
                    .reverse()
                    .map((day, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 border rounded-md"
                      >
                        <div className="mr-4 rounded-full bg-primary/10 p-2">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <h4 className="font-medium">
                              {format(new Date(day.date), "MMMM d, yyyy")}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-1 sm:mt-0">
                              <Badge variant="outline">{day.scans} Scans</Badge>
                              <Badge
                                variant="outline"
                                className={
                                  day.threats > 0
                                    ? "bg-red-100 text-red-800"
                                    : ""
                                }
                              >
                                {day.threats} Threats
                              </Badge>
                              <Badge variant="outline">
                                {formatDataSize(day.dataProcessed)}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {day.scans} security scans performed, processing{" "}
                            {formatDataSize(day.dataProcessed)} of data
                            {day.threats > 0
                              ? `, detecting ${day.threats} security threats`
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Complete History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Usage Limits</CardTitle>
          <CardDescription>
            Your current usage limits based on your{" "}
            {subscription?.plan.charAt(0).toUpperCase() +
              subscription?.plan.slice(1)}{" "}
            plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Security Scans</span>
                <span className="font-medium">
                  {usageData?.totals.scans}/{usageData?.limits.scans} scans
                </span>
              </div>
              <Progress
                value={
                  (usageData?.totals.scans / usageData?.limits.scans) * 100
                }
              />
              <p className="text-xs text-muted-foreground">
                {Math.max(0, usageData?.limits.scans - usageData?.totals.scans)}{" "}
                scans remaining this month
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Processing</span>
                <span className="font-medium">
                  {formatDataSize(usageData?.totals.dataProcessed)}/
                  {formatDataSize(usageData?.limits.dataProcessed)}
                </span>
              </div>
              <Progress
                value={
                  (usageData?.totals.dataProcessed /
                    usageData?.limits.dataProcessed) *
                  100
                }
              />
              <p className="text-xs text-muted-foreground">
                {formatDataSize(
                  Math.max(
                    0,
                    usageData?.limits.dataProcessed -
                      usageData?.totals.dataProcessed
                  )
                )}{" "}
                remaining this month
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Protected Devices</span>
                <span className="font-medium">
                  {subscription?.plan === "free"
                    ? "1/1 device"
                    : subscription?.plan === "premium"
                    ? "3/5 devices"
                    : "5/Unlimited devices"}
                </span>
              </div>
              <Progress
                value={
                  subscription?.plan === "business"
                    ? 50
                    : subscription?.plan === "premium"
                    ? (3 / 5) * 100
                    : 100
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          {subscription?.plan !== "business" && (
            <Button className="w-full sm:w-auto">Upgrade Plan</Button>
          )}
          <Button variant="outline" className="w-full sm:w-auto">
            View Usage Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
