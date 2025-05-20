"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Badge from "@/components/ui/badge"
import { ClipboardCheck, Shield, AlertTriangle, CheckCircle, Info, ArrowRight, Download, Clock } from "lucide-react"

export default function SecurityAudit() {
  const [auditing, setAuditing] = useState(false)
  const [auditComplete, setAuditComplete] = useState(false)
  const [auditProgress, setAuditProgress] = useState(0)
  const [auditResults, setAuditResults] = useState(null)

  // Mock audit function
  const startAudit = () => {
    setAuditing(true)
    setAuditComplete(false)
    setAuditProgress(0)

    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAuditing(false)
          setAuditComplete(true)
          generateResults()
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  const generateResults = () => {
    // Generate mock audit results
    const categories = [
      {
        id: "passwords",
        name: "Password Security",
        items: [
          {
            id: 1,
            name: "Password Strength",
            status: Math.random() > 0.5 ? "pass" : "fail",
            severity: "high",
            recommendation: "Use stronger passwords with a mix of characters, numbers, and symbols",
          },
          {
            id: 2,
            name: "Password Reuse",
            status: Math.random() > 0.3 ? "pass" : "fail",
            severity: "high",
            recommendation: "Avoid using the same password across multiple accounts",
          },
          {
            id: 3,
            name: "Password Manager",
            status: Math.random() > 0.4 ? "pass" : "warning",
            severity: "medium",
            recommendation: "Consider using a password manager to store and generate strong passwords",
          },
          {
            id: 4,
            name: "Multi-Factor Authentication",
            status: Math.random() > 0.6 ? "pass" : "fail",
            severity: "high",
            recommendation: "Enable MFA on all critical accounts",
          },
        ],
      },
      {
        id: "software",
        name: "Software Security",
        items: [
          {
            id: 5,
            name: "Operating System Updates",
            status: Math.random() > 0.7 ? "pass" : "fail",
            severity: "high",
            recommendation: "Keep your operating system up to date with the latest security patches",
          },
          {
            id: 6,
            name: "Application Updates",
            status: Math.random() > 0.5 ? "pass" : "warning",
            severity: "medium",
            recommendation: "Update all applications to their latest versions",
          },
          {
            id: 7,
            name: "Antivirus Software",
            status: Math.random() > 0.8 ? "pass" : "fail",
            severity: "high",
            recommendation: "Install and maintain up-to-date antivirus software",
          },
          {
            id: 8,
            name: "Firewall Configuration",
            status: Math.random() > 0.6 ? "pass" : "warning",
            severity: "medium",
            recommendation: "Ensure your firewall is properly configured",
          },
        ],
      },
      {
        id: "network",
        name: "Network Security",
        items: [
          {
            id: 9,
            name: "Wi-Fi Encryption",
            status: Math.random() > 0.7 ? "pass" : "fail",
            severity: "high",
            recommendation: "Use WPA3 or WPA2 encryption for your Wi-Fi network",
          },
          {
            id: 10,
            name: "Default Router Password",
            status: Math.random() > 0.5 ? "pass" : "fail",
            severity: "high",
            recommendation: "Change default router passwords",
          },
          {
            id: 11,
            name: "Public Wi-Fi Usage",
            status: Math.random() > 0.3 ? "pass" : "warning",
            severity: "medium",
            recommendation: "Use a VPN when connecting to public Wi-Fi networks",
          },
          {
            id: 12,
            name: "Network Sharing",
            status: Math.random() > 0.6 ? "pass" : "warning",
            severity: "low",
            recommendation: "Disable unnecessary network sharing",
          },
        ],
      },
      {
        id: "data",
        name: "Data Protection",
        items: [
          {
            id: 13,
            name: "Data Encryption",
            status: Math.random() > 0.5 ? "pass" : "fail",
            severity: "high",
            recommendation: "Encrypt sensitive data on your devices",
          },
          {
            id: 14,
            name: "Backup Strategy",
            status: Math.random() > 0.4 ? "pass" : "warning",
            severity: "medium",
            recommendation: "Implement a regular backup strategy for important data",
          },
          {
            id: 15,
            name: "Secure Deletion",
            status: Math.random() > 0.6 ? "pass" : "warning",
            severity: "low",
            recommendation: "Use secure deletion methods for sensitive files",
          },
          {
            id: 16,
            name: "Cloud Storage Security",
            status: Math.random() > 0.5 ? "pass" : "warning",
            severity: "medium",
            recommendation: "Secure your cloud storage accounts with strong passwords and MFA",
          },
        ],
      },
    ]

    // Calculate overall score
    let totalItems = 0
    let passedItems = 0

    categories.forEach((category) => {
      category.items.forEach((item) => {
        totalItems++
        if (item.status === "pass") passedItems++
      })
    })

    const score = Math.round((passedItems / totalItems) * 100)

    setAuditResults({
      score,
      categories,
      timestamp: new Date().toISOString(),
      failCount: totalItems - passedItems,
      highSeverityIssues: categories.flatMap((c) => c.items).filter((i) => i.status !== "pass" && i.severity === "high")
        .length,
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pass":
        return "text-green-500"
      case "fail":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getScoreColor = (score) => {
    if (score < 50) return "text-red-500"
    if (score < 80) return "text-yellow-500"
    return "text-green-500"
  }

  const getProgressColor = (score) => {
    if (score < 50) return "bg-red-500"
    if (score < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Security Audit Tool</CardTitle>
          <CardDescription>Comprehensive assessment of your security posture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {auditing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Auditing security settings...</span>
                <span>{auditProgress}%</span>
              </div>
              <Progress value={auditProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">Analyzing system configuration and security settings</p>
            </div>
          )}

          <Button onClick={startAudit} disabled={auditing} className="w-full">
            {auditing ? (
              <>
                <ClipboardCheck className="mr-2 h-4 w-4 animate-pulse" />
                Auditing...
              </>
            ) : (
              <>
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Start Security Audit
              </>
            )}
          </Button>

          {auditComplete && auditResults && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-muted p-4">
                <div className={`text-2xl font-bold ${getScoreColor(auditResults.score)}`}>{auditResults.score}%</div>
              </div>
              <h3 className="mt-2 font-medium">Security Score</h3>
              <Progress
                value={auditResults.score}
                className="h-2 mt-2"
                indicatorClassName={getProgressColor(auditResults.score)}
              />

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="border rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Issues Found</p>
                  <p className="font-medium text-red-500">{auditResults.failCount}</p>
                </div>
                <div className="border rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">High Severity</p>
                  <p className="font-medium text-red-500">{auditResults.highSeverityIssues}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Regular security audits help identify vulnerabilities and ensure your system is protected against threats.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Results</CardTitle>
          <CardDescription>
            {auditComplete
              ? `Security assessment completed on ${new Date(auditResults.timestamp).toLocaleString()}`
              : "Run an audit to see detailed results"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!auditComplete ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <ClipboardCheck className="h-10 w-10 mb-2 opacity-50" />
              <p>No audit results available</p>
              <p className="text-sm">Run a security audit to get started</p>
            </div>
          ) : (
            <Tabs defaultValue={auditResults.categories[0].id}>
              <TabsList
                className="grid w-full"
                style={{ gridTemplateColumns: `repeat(${auditResults.categories.length}, 1fr)` }}
              >
                {auditResults.categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {auditResults.categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-4 pt-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <h3 className="font-medium ml-2">{item.name}</h3>
                        </div>
                        {item.status !== "pass" && getSeverityBadge(item.severity)}
                      </div>

                      {item.status !== "pass" && (
                        <div className="mt-2 pl-6">
                          <p className="text-sm">
                            <span className={`font-medium ${getStatusColor(item.status)}`}>
                              {item.status === "fail" ? "Failed: " : "Warning: "}
                            </span>
                            {item.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="w-full flex justify-between mb-4">
            <Button variant="outline" size="sm" disabled={!auditComplete}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" disabled={!auditComplete}>
              <Clock className="mr-2 h-4 w-4" />
              Schedule Regular Audits
            </Button>
          </div>

          {auditComplete && auditResults.failCount > 0 && (
            <Alert className="bg-blue-50 border-blue-200 mb-4">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-800">
                We recommend addressing high severity issues first to improve your security posture.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm space-y-2 w-full">
            <h3 className="font-medium">What's included in the security audit:</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              <li className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" />
                Password security
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" />
                Software updates
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" />
                Network configuration
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" />
                Data protection
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" />
                Authentication methods
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" />
                Security best practices
              </li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
