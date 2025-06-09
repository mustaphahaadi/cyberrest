"use client"

import { Shield, AlertTriangle, CheckCircle, Wifi, Lock, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [passwordVulnerability, setPasswordVulnerability] = useState(true)
  const [dataBreachDetected, setDataBreachDetected] = useState(true)
  const [networkSecure, setNetworkSecure] = useState(true)
  const [securityScore, setSecurityScore] = useState(78)

  useEffect(() => {
    // This is a placeholder for dynamic score calculation based on real data.
    // For now, we'll keep it static as per the image.
    // In a real application, you would fetch actual security statuses
    // and update the score accordingly.

    // Example: If password vulnerability is fixed, increase score
    // let calculatedScore = 100;
    // if (passwordVulnerability) calculatedScore -= 22; // Example deduction
    // if (dataBreachDetected) calculatedScore -= 25; // Example deduction
    // setSecurityScore(calculatedScore);

  }, [passwordVulnerability, dataBreachDetected, networkSecure])

  const handleFixPasswordVulnerability = () => {
    navigate("/dashboard/tools/password-analyzer")
  }

  const handleViewDataBreachDetails = () => {
    navigate("/dashboard/tools/data-breach-scanner")
  }

  const handleViewNetworkDetails = () => {
    // Navigate to Network Scanner tool or similar
    navigate("/dashboard/tools/network-scanner")
  }

  const getScoreColor = (score) => {
    if (score < 40) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    return "text-primary"
  }

  const getProgressColor = (score) => {
    if (score < 40) return "border-red-500"
    if (score < 70) return "border-yellow-500"
    return "border-primary"
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h2>
        <p className="text-muted-foreground">Here's an overview of your security status and recent activities.</p>
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Security Score</CardTitle>
          <CardDescription>Your overall security rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{securityScore}/100</p>
                <p className="text-xs text-muted-foreground">
                  {securityScore < 40 ? "Weak" : securityScore < 70 ? "Fair" : "Good"}
                </p>
              </div>
            </div>
            <div
              className={`h-16 w-16 rounded-full border-8 ${getProgressColor(securityScore)} flex items-center justify-center`}
            >
              <span className="text-xl font-bold">{securityScore}%</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Complete the recommended actions to improve your score.</p>
        </CardFooter>
      </Card>

      {/* Security Alerts */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Security Alerts</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {passwordVulnerability && (
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Password Vulnerability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Your password for "example@email.com" is weak and should be updated.</p>
              </CardContent>
              <CardFooter>
                <button onClick={handleFixPasswordVulnerability} className="text-xs text-primary hover:underline">
                  Fix Now
                </button>
              </CardFooter>
            </Card>
          )}

          {dataBreachDetected && (
            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Data Breach Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Your email was found in a recent data breach. Change your password immediately.</p>
              </CardContent>
              <CardFooter>
                <button onClick={handleViewDataBreachDetails} className="text-xs text-primary hover:underline">
                  View Details
                </button>
              </CardFooter>
            </Card>
          )}

          {networkSecure && (
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Network Secure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Your home network is properly secured with WPA2 encryption.</p>
              </CardContent>
              <CardFooter>
                <button onClick={handleViewNetworkDetails} className="text-xs text-primary hover:underline">
                  View Details
                </button>
              </CardFooter>
            </Card>
          )}
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
              <Lock className="h-8 w-8 mb-2" />
              <h4 className="font-medium">Password Check</h4>
              <p className="text-xs text-muted-foreground mt-1">Analyze your passwords</p>
            </CardContent>
          </Card>
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/data-breach-scanner")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Search className="h-8 w-8 mb-2" />
              <h4 className="font-medium">Data Breach Scan</h4>
              <p className="text-xs text-muted-foreground mt-1">Check for compromised accounts</p>
            </CardContent>
          </Card>
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/network-scanner")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Wifi className="h-8 w-8 mb-2" />
              <h4 className="font-medium">Network Scan</h4>
              <p className="text-xs text-muted-foreground mt-1">Scan your network for vulnerabilities</p>
            </CardContent>
          </Card>
          <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard/tools/security-audit")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-8 w-8 mb-2" />
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
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Password Changed</p>
                    <p className="text-xs text-muted-foreground">example@email.com</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Data Breach Scan</p>
                    <p className="text-xs text-muted-foreground">3 accounts checked</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wifi className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Network Scan</p>
                    <p className="text-xs text-muted-foreground">Home network</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
