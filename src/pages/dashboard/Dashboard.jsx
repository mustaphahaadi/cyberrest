"use client"

import { Shield, AlertTriangle, CheckCircle, Wifi, Lock, Search } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import Sidebar from "../../components/Sidebar"

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0 bg-purple-500 border-4 border-yellow-500">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 overflow-auto">
        {user ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h2>
              <p className="text-muted-foreground">Here's an overview of your security status and recent activities.</p>
            </div>

            {/* Security Score */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight">Security Score</h3>
                <p className="text-sm text-muted-foreground">Your overall security rating</p>
              </div>
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">78/100</p>
                      <p className="text-xs text-muted-foreground">Good</p>
                    </div>
                  </div>
                  <div className="h-16 w-16 rounded-full border-8 border-primary flex items-center justify-center">
                    <span className="text-xl font-bold">78%</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm text-muted-foreground">Complete the recommended actions to improve your score.</p>
              </div>
            </div>

            {/* Security Alerts */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Security Alerts</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-l-4 border-l-yellow-500">
                  <div className="p-6 pb-2">
                    <h4 className="text-base flex items-center gap-2 font-semibold">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Password Vulnerability
                    </h4>
                  </div>
                  <div className="p-6 pt-2">
                    <p className="text-sm">Your password for "example@email.com" is weak and should be updated.</p>
                  </div>
                  <div className="p-6 pt-0">
                    <button className="text-xs text-primary hover:underline">Fix Now</button>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-l-4 border-l-red-500">
                  <div className="p-6 pb-2">
                    <h4 className="text-base flex items-center gap-2 font-semibold">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Data Breach Detected
                    </h4>
                  </div>
                  <div className="p-6 pt-2">
                    <p className="text-sm">Your email was found in a recent data breach. Change your password immediately.</p>
                  </div>
                  <div className="p-6 pt-0">
                    <button className="text-xs text-primary hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent cursor-pointer transition-colors">
                  <div className="p-6 flex flex-col items-center text-center">
                    <Lock className="h-8 w-8 mb-2" />
                    <h4 className="font-medium">Password Check</h4>
                    <p className="text-xs text-muted-foreground mt-1">Analyze your passwords</p>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent cursor-pointer transition-colors">
                  <div className="p-6 flex flex-col items-center text-center">
                    <Search className="h-8 w-8 mb-2" />
                    <h4 className="font-medium">Data Breach Scan</h4>
                    <p className="text-xs text-muted-foreground mt-1">Check for compromised accounts</p>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent cursor-pointer transition-colors">
                  <div className="p-6 flex flex-col items-center text-center">
                    <Wifi className="h-8 w-8 mb-2" />
                    <h4 className="font-medium">Network Scan</h4>
                    <p className="text-xs text-muted-foreground mt-1">Scan your network for vulnerabilities</p>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent cursor-pointer transition-colors">
                  <div className="p-6 flex flex-col items-center text-center">
                    <Shield className="h-8 w-8 mb-2" />
                    <h4 className="font-medium">Security Audit</h4>
                    <p className="text-xs text-muted-foreground mt-1">Run a comprehensive security audit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
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
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 font-bold text-2xl">User not authenticated. Redirecting...</div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
