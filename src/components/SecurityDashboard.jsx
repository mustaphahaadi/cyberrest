"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, CheckCircle, Lock, Unlock, RefreshCw } from "lucide-react"

export default function SecurityDashboard() {
  const [securityScore, setSecurityScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [securityIssues, setSecurityIssues] = useState([])
  const [securedItems, setSecuredItems] = useState([])
  const [lastScan, setLastScan] = useState(null)

  useEffect(() => {
    // Simulate loading security data
    fetchSecurityData()
  }, [])

  const fetchSecurityData = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock data
      const score = Math.floor(Math.random() * 40) + 60 // Score between 60-100

      const issues = [
        {
          id: 1,
          severity: "high",
          title: "Weak password detected",
          description: "Your main account password is too weak",
        },
        {
          id: 2,
          severity: "medium",
          title: "2FA not enabled",
          description: "Two-factor authentication is not enabled on your account",
        },
        {
          id: 3,
          severity: "low",
          title: "Browser is outdated",
          description: "Your browser version may have security vulnerabilities",
        },
      ].filter(() => Math.random() > 0.3) // Randomly include issues

      const secured = [
        { id: 1, title: "Email security", description: "Your email has not been found in any data breaches" },
        { id: 2, title: "Device security", description: "Your device has up-to-date antivirus protection" },
        { id: 3, title: "Network security", description: "Your network connection is secure" },
        { id: 4, title: "Password manager", description: "You're using a password manager for secure storage" },
      ].filter(() => Math.random() > 0.3) // Randomly include secured items

      setSecurityScore(score)
      setSecurityIssues(issues)
      setSecuredItems(secured)
      setLastScan(new Date().toISOString())
      setLoading(false)
    }, 1500)
  }

  const getScoreColor = () => {
    if (securityScore >= 80) return "text-green-500"
    if (securityScore >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBackground = () => {
    if (securityScore >= 80) return "bg-green-100 dark:bg-green-900/30"
    if (securityScore >= 60) return "bg-yellow-100 dark:bg-yellow-900/30"
    return "bg-red-100 dark:bg-red-900/30"
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/30"
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30"
      case "low":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-800"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Security Dashboard</h2>
        <button
          onClick={fetchSecurityData}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Scanning...
            </>
          ) : (
            <>
              <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
              Scan Now
            </>
          )}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Security Score</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last scan: {formatDate(lastScan)}</span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className={`rounded-full ${getScoreBackground()} p-6 mb-4`}>
                  <span className={`text-4xl font-bold ${getScoreColor()}`}>{securityScore}</span>
                </div>
                <div className="text-center">
                  <p className="font-medium">
                    {securityScore >= 80
                      ? "Your security is good"
                      : securityScore >= 60
                        ? "Your security needs attention"
                        : "Your security is at risk"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {securityIssues.length} issues to resolve
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Security Issues</h3>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : securityIssues.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <p className="font-medium text-green-500">No security issues found!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your security is in good shape</p>
              </div>
            ) : (
              <div className="space-y-3">
                {securityIssues.map((issue) => (
                  <div key={issue.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertTriangle
                          className={`h-5 w-5 ${issue.severity === "high" ? "text-red-500" : issue.severity === "medium" ? "text-yellow-500" : "text-blue-500"}`}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium">{issue.title}</h4>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{issue.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 mt-2">
                  View All Issues
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Secured Items</h3>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : securedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3 mb-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="font-medium text-yellow-500">No secured items found</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Let's improve your security</p>
              </div>
            ) : (
              <div className="space-y-3">
                {securedItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 mt-2">
                  View All Secured Items
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Security Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Enable Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Add an extra layer of security to your account by enabling 2FA
                  </p>
                  <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Enable Now
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Run Malware Scan</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Scan your device for malware and viruses
                  </p>
                  <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Start Scan
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Unlock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Update Password</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Update your password to a stronger one
                  </p>
                  <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Update Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm font-medium">Password Changed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm font-medium">Security Scan Completed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-sm font-medium">New Login Detected</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">5 days ago</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm font-medium">Two-Factor Authentication Enabled</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
              </div>

              <div className="border-l-4 border-gray-500 pl-4">
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</p>
              </div>
            </div>
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 mt-4">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
