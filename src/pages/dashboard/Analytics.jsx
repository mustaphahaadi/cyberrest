"use client";

import { AvatarFallback } from "@/components/ui/avatar";

import { Avatar } from "@/components/ui/avatar";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Badge from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Zap,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  Search,
} from "lucide-react";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for charts and analytics
  const securityScoreData = {
    current: 78,
    previous: 72,
    change: 6,
    history: [65, 68, 70, 69, 72, 74, 73, 75, 78],
  };

  const threatData = {
    total: 142,
    blocked: 138,
    critical: 4,
    byType: [
      { name: "Phishing", value: 68 },
      { name: "Malware", value: 42 },
      { name: "Data Breach", value: 18 },
      { name: "Unauthorized Access", value: 14 },
    ],
    byTime: [12, 8, 15, 22, 18, 10, 14, 20, 23],
  };

  const toolUsageData = {
    total: 856,
    mostUsed: [
      { name: "Password Analyzer", count: 210 },
      { name: "Data Breach Scanner", count: 185 },
      { name: "Dark Web Monitor", count: 142 },
      { name: "Phishing Detector", count: 98 },
      { name: "Security Training", count: 76 },
    ],
    byDay: [35, 42, 38, 30, 45, 48, 40, 36, 42],
  };

  const userActivityData = {
    activeUsers: 18,
    totalUsers: 25,
    newUsers: 3,
    byDevice: [
      { name: "Desktop", value: 62 },
      { name: "Mobile", value: 28 },
      { name: "Tablet", value: 10 },
    ],
    byLocation: [
      { name: "United States", value: 45 },
      { name: "United Kingdom", value: 20 },
      { name: "Canada", value: 15 },
      { name: "Germany", value: 10 },
      { name: "Other", value: 10 },
    ],
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const getDeviceIcon = (deviceName) => {
    switch (deviceName.toLowerCase()) {
      case "desktop":
        return <Laptop className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Security Analytics
          </h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights about your security posture.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityScoreData.current}/100
            </div>
            <div className="flex items-center mt-1">
              {securityScoreData.change > 0 ? (
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              ) : securityScoreData.change < 0 ? (
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <p
                className={`text-xs ${
                  securityScoreData.change > 0
                    ? "text-green-500"
                    : securityScoreData.change < 0
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {securityScoreData.change > 0 ? "+" : ""}
                {securityScoreData.change} pts since last period
              </p>
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
            <div className="text-2xl font-bold">{threatData.total}</div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">
                  {threatData.blocked}
                </span>{" "}
                blocked
              </p>
              <p className="text-xs text-red-500">
                {threatData.critical} critical
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tool Usage</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toolUsageData.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Most used: {toolUsageData.mostUsed[0].name}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userActivityData.activeUsers}/{userActivityData.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">
                +{userActivityData.newUsers}
              </span>{" "}
              new this period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="threats">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Threats
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Zap className="mr-2 h-4 w-4" />
            Tool Usage
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            User Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Score Trend</CardTitle>
                <CardDescription>Your security score over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Security Score Chart
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Threat Distribution</CardTitle>
                <CardDescription>
                  Types of security threats detected
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Threat Distribution Chart
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security Summary</CardTitle>
              <CardDescription>Key metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Top Security Concerns</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="text-sm">Weak Passwords</span>
                      </div>
                      <Badge className="bg-yellow-500">Medium</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-red-500" />
                        <span className="text-sm">Phishing Attempts</span>
                      </div>
                      <Badge className="bg-red-500">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="text-sm">Outdated Software</span>
                      </div>
                      <Badge className="bg-yellow-500">Medium</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Most Used Tools</h3>
                  <div className="space-y-2">
                    {toolUsageData.mostUsed.slice(0, 3).map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{tool.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {tool.count} uses
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">User Devices</h3>
                  <div className="space-y-2">
                    {userActivityData.byDevice.map((device, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          {getDeviceIcon(device.name)}
                          <span className="text-sm ml-2">{device.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {device.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Threat Types</CardTitle>
                <CardDescription>
                  Distribution of detected threats by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Threat Types Chart
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Threat Timeline</CardTitle>
                <CardDescription>Threats detected over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Threat Timeline Chart
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Threats</CardTitle>
                  <CardDescription>
                    Latest security threats detected
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="rounded-full p-1 bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Phishing Attempt</h4>
                      <Badge className="bg-red-500">Critical</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Suspicious email with malicious attachment blocked
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="rounded-full p-1 bg-yellow-100">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">
                        Suspicious Login Attempt
                      </h4>
                      <Badge className="bg-yellow-500">Medium</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Login attempt from unrecognized location (IP:
                      203.0.113.42)
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        Yesterday, 15:42
                      </p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-1 bg-yellow-100">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Outdated Software</h4>
                      <Badge className="bg-yellow-500">Medium</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      3 applications with known security vulnerabilities
                      detected
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        2 days ago
                      </p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Threats
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tool Usage Distribution</CardTitle>
                <CardDescription>
                  Most frequently used security tools
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Tool Usage Chart
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Usage Over Time</CardTitle>
                <CardDescription>Tool usage trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Usage Timeline Chart
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tool Performance</CardTitle>
              <CardDescription>
                Effectiveness and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {toolUsageData.mostUsed.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-4 last:pb-0 last:border-0 border-b"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full p-2 bg-muted">
                        {index === 0 ? (
                          <Lock className="h-5 w-5 text-blue-500" />
                        ) : index === 1 ? (
                          <Search className="h-5 w-5 text-purple-500" />
                        ) : index === 2 ? (
                          <Eye className="h-5 w-5 text-indigo-500" />
                        ) : index === 3 ? (
                          <Globe className="h-5 w-5 text-green-500" />
                        ) : (
                          <FileText className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{tool.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {tool.count} uses (
                          {Math.round((tool.count / toolUsageData.total) * 100)}
                          % of total)
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Locations</CardTitle>
                <CardDescription>
                  Geographic distribution of users
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    User Locations Map
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>
                  Types of devices used to access the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Device Distribution Chart
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Recent user actions and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <Avatar>
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Alex Johnson</h4>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ran a security scan on network devices
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b">
                  <Avatar>
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Jamie Smith</h4>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Completed "Phishing Prevention" training module
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>TW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Taylor Wilson</h4>
                      <p className="text-xs text-muted-foreground">
                        2 days ago
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Generated a compliance report for GDPR
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
