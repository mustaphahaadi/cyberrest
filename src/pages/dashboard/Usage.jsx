import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Activity,
  Zap,
  Clock,
  Database,
  Cpu,
  HardDrive
} from "lucide-react"

export default function Usage() {
  const [timeRange, setTimeRange] = useState("30d")

  const usageStats = {
    current: {
      scans: 156,
      apiCalls: 2340,
      storage: 2.4, // GB
      bandwidth: 15.6 // GB
    },
    limits: {
      scans: 500,
      apiCalls: 10000,
      storage: 10, // GB
      bandwidth: 100 // GB
    },
    period: "This month"
  }

  const toolUsage = [
    { name: "Password Analyzer", usage: 45, limit: 100, unit: "scans" },
    { name: "Data Breach Scanner", usage: 32, limit: 50, unit: "scans" },
    { name: "Network Scanner", usage: 28, limit: 75, unit: "scans" },
    { name: "Phishing Detector", usage: 21, limit: 40, unit: "scans" },
    { name: "Vulnerability Assessment", usage: 18, limit: 25, unit: "scans" },
    { name: "Malware Scanner", usage: 12, limit: 30, unit: "scans" }
  ]

  const dailyUsage = [
    { date: "Jan 1", scans: 12, apiCalls: 145 },
    { date: "Jan 2", scans: 8, apiCalls: 98 },
    { date: "Jan 3", scans: 15, apiCalls: 203 },
    { date: "Jan 4", scans: 22, apiCalls: 287 },
    { date: "Jan 5", scans: 18, apiCalls: 234 },
    { date: "Jan 6", scans: 25, apiCalls: 312 },
    { date: "Jan 7", scans: 19, apiCalls: 256 }
  ]

  const getUsagePercentage = (current, limit) => {
    return Math.round((current / limit) * 100)
  }

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return "text-red-500"
    if (percentage >= 75) return "text-yellow-500"
    return "text-green-500"
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Usage Analytics</h2>
          <p className="text-muted-foreground">Monitor your resource usage and limits</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.current.scans}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  of {usageStats.limits.scans} limit
                </p>
                <span className={`text-xs font-medium ${getUsageColor(getUsagePercentage(usageStats.current.scans, usageStats.limits.scans))}`}>
                  {getUsagePercentage(usageStats.current.scans, usageStats.limits.scans)}%
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.current.scans, usageStats.limits.scans)} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.current.apiCalls.toLocaleString()}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  of {usageStats.limits.apiCalls.toLocaleString()} limit
                </p>
                <span className={`text-xs font-medium ${getUsageColor(getUsagePercentage(usageStats.current.apiCalls, usageStats.limits.apiCalls))}`}>
                  {getUsagePercentage(usageStats.current.apiCalls, usageStats.limits.apiCalls)}%
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.current.apiCalls, usageStats.limits.apiCalls)} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.current.storage} GB</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  of {usageStats.limits.storage} GB limit
                </p>
                <span className={`text-xs font-medium ${getUsageColor(getUsagePercentage(usageStats.current.storage, usageStats.limits.storage))}`}>
                  {getUsagePercentage(usageStats.current.storage, usageStats.limits.storage)}%
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.current.storage, usageStats.limits.storage)} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bandwidth</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.current.bandwidth} GB</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  of {usageStats.limits.bandwidth} GB limit
                </p>
                <span className={`text-xs font-medium ${getUsageColor(getUsagePercentage(usageStats.current.bandwidth, usageStats.limits.bandwidth))}`}>
                  {getUsagePercentage(usageStats.current.bandwidth, usageStats.limits.bandwidth)}%
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.current.bandwidth, usageStats.limits.bandwidth)} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">Tool Usage</TabsTrigger>
          <TabsTrigger value="timeline">Usage Timeline</TabsTrigger>
          <TabsTrigger value="reports">Usage Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Tool Usage</CardTitle>
              <CardDescription>Usage breakdown by security tool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {toolUsage.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{tool.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {tool.usage} / {tool.limit} {tool.unit}
                        </span>
                      </div>
                      <Progress 
                        value={getUsagePercentage(tool.usage, tool.limit)} 
                        className="h-2"
                      />
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs font-medium ${getUsageColor(getUsagePercentage(tool.usage, tool.limit))}`}>
                          {getUsagePercentage(tool.usage, tool.limit)}% used
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tool.limit - tool.usage} remaining
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Timeline</CardTitle>
              <CardDescription>Daily usage over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Usage Chart</h3>
                  <p className="text-muted-foreground">Interactive usage timeline would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage Summary</CardTitle>
                <CardDescription>Current billing period overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Period</span>
                    <span className="font-medium">{usageStats.period}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Scans</span>
                    <span className="font-medium">{usageStats.current.scans}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Calls</span>
                    <span className="font-medium">{usageStats.current.apiCalls.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <span className="font-medium">{usageStats.current.storage} GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bandwidth</span>
                    <span className="font-medium">{usageStats.current.bandwidth} GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Download detailed usage reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Monthly Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}