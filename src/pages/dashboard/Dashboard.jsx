"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  Activity,
  ArrowUpRight,
  Lock,
  Search,
  Globe,
  FileText,
  Fingerprint,
  Wifi,
} from "lucide-react"

export default function Dashboard() {
  const { user, subscription, hasAccess } = useAuth()
  const [securityScore, setSecurityScore] = useState(78)
  const [threatCount, setThreatCount] = useState(0)
  const [vulnerabilityCount, setVulnerabilityCount] = useState(3)
  const [deviceCount, setDeviceCount] = useState(1)
  const [lastScanDate, setLastScanDate] = useState(null)

  // Simulate loading security data
  useEffect(() => {
    // In a real app, this would be an API call
    const timer = setTimeout(() => {
      setSecurityScore(Math.floor(Math.random() * 30) + 70)
      setThreatCount(Math.floor(Math.random() * 5))
      setVulnerabilityCount(Math.floor(Math.random() * 5))
      setDeviceCount(subscription?.plan === "free" ? 1 : subscription?.plan === "premium" ? 3 : 5)
      setLastScanDate(new Date().toLocaleDateString())
    }, 1000)

    return () => clearTimeout(timer)
  }, [subscription])

  const tools = [
    {
      name: "Password Analyzer",
      path: "/tools/password-analyzer",
      icon: Lock,
      description: "Check password strength and security",
      access: hasAccess("passwordTools"),
    },
    {
      name: "Data Breach Scanner",
      path: "/tools/data-breach-scanner",
      icon: Search,
      description: "Check if your data has been compromised",
      access: hasAccess("dataBreachScanner"),
    },
    {
      name: "Phishing Detector",
      path: "/tools/phishing-detector",
      icon: Globe,
      description: "Identify potential phishing websites",
      access: hasAccess("phishingDetector"),
    },
    {
      name: "Network Scanner",
      path: "/tools/network-scanner",
      icon: Wifi,
      description: "Scan your network for vulnerabilities",
      access: hasAccess("networkScanner"),
    },
    {
      name: "Encryption Tool",
      path: "/tools/encryption-tool",
      icon: FileText,
      description: "Encrypt and decrypt sensitive information",
      access: hasAccess("encryptionTool"),
    },
    {
      name: "File Integrity Checker",
      path: "/tools/file-integrity-checker",
      icon: Fingerprint,
      description: "Verify file integrity with checksums",
      access: hasAccess("fileIntegrityChecker"),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
          <p className="text-muted-foreground">Here's an overview of your security status and available tools.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {subscription?.plan.charAt(0).toUpperCase() + subscription?.plan.slice(1)} Plan
          </Badge>
          {subscription?.plan !== "business" && (
            <Button asChild size="sm">
              <Link to="/dashboard/subscription">Upgrade</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScore}/100</div>
            <Progress value={securityScore} className="mt-2 dark:bg-gray-700" />
            <p className="text-xs text-muted-foreground mt-2">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {threatCount === 0 ? "No threats detected" : `${threatCount} threats blocked`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vulnerabilityCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {vulnerabilityCount === 0 ? "No vulnerabilities found" : `${vulnerabilityCount} vulnerabilities detected`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Devices</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {deviceCount === 1 ? "1 device active" : `${deviceCount} devices active`}
            </p>
          </CardContent>
        </Card>
      </div>

      {vulnerabilityCount > 0 && (
        <Alert
          variant="destructive"
          className="border-red-600 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Security Vulnerabilities Detected</AlertTitle>
          <AlertDescription>
            {vulnerabilityCount} {vulnerabilityCount === 1 ? "vulnerability" : "vulnerabilities"} found in your system.
            Run a security audit to identify and fix issues.
          </AlertDescription>
          <Button variant="destructive" size="sm" className="mt-2" asChild>
            <Link to="/tools/security-audit">Run Security Audit</Link>
          </Button>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>Your security status across all monitored areas</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="threats">Threats</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Password Security</span>
                    </div>
                    <span className="text-green-500 font-medium">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-yellow-500" />
                      <span>Data Protection</span>
                    </div>
                    <span className="text-yellow-500 font-medium">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Network Security</span>
                    </div>
                    <span className="text-green-500 font-medium">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <span className="text-red-500 font-medium">Not Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Malware Protection</span>
                    </div>
                    <span className="text-green-500 font-medium">Active</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="threats" className="space-y-4 pt-4">
                {threatCount === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ShieldCheck className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-medium">No Threats Detected</h3>
                    <p className="text-muted-foreground mt-2">Your system is currently secure.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span>Phishing Attempt</span>
                      </div>
                      <span className="text-gray-500 text-sm">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <span>Suspicious Login</span>
                      </div>
                      <span className="text-gray-500 text-sm">3 days ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <span>Weak Password</span>
                      </div>
                      <span className="text-gray-500 text-sm">Ongoing</span>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recommendations" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      <span>Enable Two-Factor Authentication</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/tools/two-factor-manager">Enable</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      <span>Update Password for Email Account</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/tools/password-generator">Update</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      <span>Run Full System Scan</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/tools/malware-scanner">Scan</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Your most used security tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {tools.map((tool) => (
                <Button
                  key={tool.path}
                  variant="outline"
                  className="justify-start h-auto py-3"
                  asChild
                  disabled={!tool.access}
                >
                  <Link to={tool.path}>
                    <tool.icon className="mr-2 h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>{tool.name}</span>
                      <span className="text-xs text-muted-foreground">{tool.description}</span>
                    </div>
                    {!tool.access && (
                      <Badge variant="outline" className="ml-auto">
                        Upgrade
                      </Badge>
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/dashboard/subscription">View All Tools</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Security events from the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 bg-green-100">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Login from New Device</p>
                  <p className="text-xs text-muted-foreground">New login from {user?.name}'s device</p>
                  <p className="text-xs text-muted-foreground">Today, 10:42 AM</p>
                </div>
              </div>
              {lastScanDate && (
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-1 bg-green-100">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Security Scan Completed</p>
                    <p className="text-xs text-muted-foreground">
                      Quick scan completed with {threatCount} threats found
                    </p>
                    <p className="text-xs text-muted-foreground">{lastScanDate}, 9:00 AM</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 bg-yellow-100">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Password Changed</p>
                  <p className="text-xs text-muted-foreground">Password updated for your account</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 8:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Your current plan and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Current Plan</p>
                  <p className="text-lg font-bold capitalize">{subscription?.plan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-lg font-bold capitalize">{subscription?.status}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Device Usage</p>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{deviceCount} devices connected</span>
                  <span>
                    {deviceCount}/
                    {subscription?.plan === "free" ? "1" : subscription?.plan === "premium" ? "5" : "Unlimited"}
                  </span>
                </div>
                <Progress
                  value={
                    subscription?.plan === "business"
                      ? 50
                      : (deviceCount / (subscription?.plan === "free" ? 1 : 5)) * 100
                  }
                />
              </div>

              <Button className="w-full" asChild>
                <Link to="/dashboard/subscription">
                  {subscription?.plan === "free" || subscription?.plan === "premium"
                    ? "Upgrade Plan"
                    : "Manage Subscription"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security News</CardTitle>
            <CardDescription>Latest cybersecurity updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="text-sm font-medium">Critical Vulnerability Found in Popular Software</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Researchers have discovered a severe vulnerability that could lead to remote code execution.
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                    <Link to="/tools/security-news">Read</Link>
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <h3 className="text-sm font-medium">New Ransomware Strain Targets Healthcare</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  A new ransomware variant has been observed targeting healthcare organizations worldwide.
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                    <Link to="/tools/security-news">Read</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/tools/security-news">View All News</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <p>Powered by CyberRest, a ReStartDigital product.</p>
    </div>
  )
}
