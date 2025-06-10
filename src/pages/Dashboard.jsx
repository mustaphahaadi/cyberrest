"use client"

import { Shield, AlertTriangle, CheckCircle, Wifi, Lock, Search, Activity, TrendingUp, Users, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [securityScore, setSecurityScore] = useState(78)
  const [recentActivity] = useState([
    {
      id: 1,
      action: "Password Changed",
      target: "example@email.com",
      time: "2 hours ago",
      icon: Lock,
      type: "success"
    },
    {
      id: 2,
      action: "Data Breach Scan",
      target: "3 accounts checked",
      time: "Yesterday",
      icon: Search,
      type: "info"
    },
    {
      id: 3,
      action: "Network Scan",
      target: "Home network",
      time: "3 days ago",
      icon: Wifi,
      type: "info"
    },
    {
      id: 4,
      action: "Security Alert",
      target: "Suspicious login attempt",
      time: "1 week ago",
      icon: AlertTriangle,
      type: "warning"
    }
  ])

  const [securityAlerts] = useState([
    {
      id: 1,
      title: "Password Vulnerability",
      description: "Your password for 'example@email.com' is weak and should be updated.",
      severity: "medium",
      action: "Fix Now",
      actionPath: "/dashboard/tools/password-analyzer"
    },
    {
      id: 2,
      title: "Data Breach Detected",
      description: "Your email was found in a recent data breach. Change your password immediately.",
      severity: "high",
      action: "View Details",
      actionPath: "/dashboard/tools/data-breach-scanner"
    }
  ])

  const [stats] = useState([
    {
      title: "Security Score",
      value: "78/100",
      change: "+5",
      icon: Shield,
      color: "text-blue-500"
    },
    {
      title: "Threats Blocked",
      value: "247",
      change: "+12",
      icon: AlertTriangle,
      color: "text-red-500"
    },
    {
      title: "Scans Completed",
      value: "156",
      change: "+8",
      icon: Activity,
      color: "text-green-500"
    },
    {
      title: "Accounts Protected",
      value: "23",
      change: "+2",
      icon: Users,
      color: "text-purple-500"
    }
  ])

  const getScoreColor = (score) => {
    if (score < 40) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    return "text-green-500"
  }

  const getScoreStatus = (score) => {
    if (score < 40) return "Poor"
    if (score < 70) return "Good"
    return "Excellent"
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h2>
        <p className="text-muted-foreground">Here's an overview of your security status and recent activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader>
          <CardTitle>Security Score</CardTitle>
          <CardDescription>Your overall security rating based on current configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className={`text-3xl font-bold ${getScoreColor(securityScore)}`}>{securityScore}/100</p>
                <p className="text-sm text-muted-foreground">{getScoreStatus(securityScore)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium">2 hours ago</p>
            </div>
          </div>
          <Progress value={securityScore} className="h-2" />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Complete the recommended actions below to improve your score.
          </p>
        </CardFooter>
      </Card>

      {/* Security Alerts */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Security Alerts</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {securityAlerts.map((alert) => (
            <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                  {alert.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(alert.actionPath)}
                >
                  {alert.action}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/password-analyzer")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Password Check</h4>
              <p className="text-xs text-muted-foreground mt-1">Analyze your passwords</p>
            </CardContent>
          </Card>
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/data-breach-scanner")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Search className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Data Breach Scan</h4>
              <p className="text-xs text-muted-foreground mt-1">Check for compromised accounts</p>
            </CardContent>
          </Card>
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/network-scanner")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Wifi className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Network Scan</h4>
              <p className="text-xs text-muted-foreground mt-1">Scan your network for vulnerabilities</p>
            </CardContent>
          </Card>
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/security-audit")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Security Audit</h4>
              <p className="text-xs text-muted-foreground mt-1">Run a comprehensive security audit</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.target}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}