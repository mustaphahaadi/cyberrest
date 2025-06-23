"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

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

  const stats = [
    {
      title: "Total Scans",
      value: "1,234",
      change: "+12.5%",
      icon: Activity,
    },
    {
      title: "Threats Detected",
      value: "23",
      change: "-5.2%",
      icon: AlertTriangle,
    },
    {
      title: "Security Score",
      value: "92%",
      change: "+2.1%",
      icon: Shield,
    },
  ]

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart className="h-6 w-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-cyan-400" />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-800/50 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Scan Activity</h3>
            <div className="h-[300px] flex items-center justify-center">
              <LineChart className="h-32 w-32 text-slate-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Threat Distribution</h3>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart className="h-32 w-32 text-slate-600" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
