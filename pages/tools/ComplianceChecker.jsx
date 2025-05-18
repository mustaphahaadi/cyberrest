"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ClipboardCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  FileText,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function ComplianceChecker() {
  const [selectedFramework, setSelectedFramework] = useState("gdpr")
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [complianceResults, setComplianceResults] = useState(null)
  const [expandedSection, setExpandedSection] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")

  const frameworks = [
    { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation" },
    { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
    { id: "pci", name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
    { id: "iso27001", name: "ISO 27001", description: "Information Security Management" },
    { id: "ccpa", name: "CCPA", description: "California Consumer Privacy Act" },
    { id: "nist", name: "NIST CSF", description: "Cybersecurity Framework" },
  ]

  // Mock compliance check function
  const checkCompliance = () => {
    setScanning(true)
    setScanComplete(false)
    setScanProgress(0)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          setScanComplete(true)
          generateResults()
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  const generateResults = () => {
    // Generate mock compliance results based on selected framework
    let mockResults

    switch (selectedFramework) {
      case "gdpr":
        mockResults = {
          framework: "GDPR",
          complianceScore: 72,
          lastScan: new Date().toLocaleString(),
          sections: [
            {
              id: 1,
              name: "Data Protection Principles",
              score: 80,
              requirements: [
                { id: 101, name: "Lawfulness, fairness and transparency", status: "compliant", severity: "high" },
                { id: 102, name: "Purpose limitation", status: "compliant", severity: "high" },
                {
                  id: 103,
                  name: "Data minimization",
                  status: "non-compliant",
                  severity: "medium",
                  remediation: "Review data collection practices to ensure only necessary data is collected",
                },
                { id: 104, name: "Accuracy", status: "compliant", severity: "medium" },
                {
                  id: 105,
                  name: "Storage limitation",
                  status: "warning",
                  severity: "medium",
                  remediation: "Implement data retention policies",
                },
              ],
            },
            {
              id: 2,
              name: "Data Subject Rights",
              score: 65,
              requirements: [
                { id: 201, name: "Right to be informed", status: "compliant", severity: "high" },
                { id: 202, name: "Right of access", status: "compliant", severity: "high" },
                { id: 203, name: "Right to rectification", status: "compliant", severity: "medium" },
                {
                  id: 204,
                  name: "Right to erasure",
                  status: "non-compliant",
                  severity: "high",
                  remediation: "Implement processes for handling erasure requests",
                },
                {
                  id: 205,
                  name: "Right to restrict processing",
                  status: "warning",
                  severity: "medium",
                  remediation: "Document procedures for processing restrictions",
                },
                {
                  id: 206,
                  name: "Right to data portability",
                  status: "non-compliant",
                  severity: "medium",
                  remediation: "Develop data export functionality",
                },
              ],
            },
            {
              id: 3,
              name: "Accountability and Governance",
              score: 70,
              requirements: [
                {
                  id: 301,
                  name: "Data protection by design",
                  status: "warning",
                  severity: "high",
                  remediation: "Implement privacy by design principles in development processes",
                },
                {
                  id: 302,
                  name: "Data protection impact assessments",
                  status: "non-compliant",
                  severity: "high",
                  remediation: "Conduct DPIAs for high-risk processing activities",
                },
                { id: 303, name: "Data protection officer appointment", status: "compliant", severity: "high" },
                { id: 304, name: "Records of processing activities", status: "compliant", severity: "medium" },
              ],
            },
          ],
        }
        break

      case "hipaa":
        mockResults = {
          framework: "HIPAA",
          complianceScore: 68,
          lastScan: new Date().toLocaleString(),
          sections: [
            {
              id: 1,
              name: "Privacy Rule",
              score: 75,
              requirements: [
                { id: 101, name: "Notice of Privacy Practices", status: "compliant", severity: "high" },
                {
                  id: 102,
                  name: "Minimum Necessary Standard",
                  status: "warning",
                  severity: "high",
                  remediation: "Review access controls to ensure minimum necessary access",
                },
                { id: 103, name: "Patient Rights", status: "compliant", severity: "high" },
                {
                  id: 104,
                  name: "Administrative Requirements",
                  status: "non-compliant",
                  severity: "medium",
                  remediation: "Designate privacy officer and implement privacy policies",
                },
              ],
            },
            {
              id: 2,
              name: "Security Rule",
              score: 60,
              requirements: [
                {
                  id: 201,
                  name: "Administrative Safeguards",
                  status: "warning",
                  severity: "high",
                  remediation: "Conduct risk analysis and implement security measures",
                },
                { id: 202, name: "Physical Safeguards", status: "compliant", severity: "medium" },
                {
                  id: 203,
                  name: "Technical Safeguards",
                  status: "non-compliant",
                  severity: "high",
                  remediation: "Implement access controls and encryption",
                },
                { id: 204, name: "Organizational Requirements", status: "compliant", severity: "medium" },
              ],
            },
            {
              id: 3,
              name: "Breach Notification Rule",
              score: 70,
              requirements: [
                { id: 301, name: "Breach Definition and Exceptions", status: "compliant", severity: "medium" },
                {
                  id: 302,
                  name: "Notification to Individuals",
                  status: "warning",
                  severity: "high",
                  remediation: "Develop breach notification procedures",
                },
                {
                  id: 303,
                  name: "Notification to Media",
                  status: "non-compliant",
                  severity: "medium",
                  remediation: "Create media notification templates",
                },
                { id: 304, name: "Notification to HHS", status: "compliant", severity: "high" },
              ],
            },
          ],
        }
        break

      default:
        mockResults = {
          framework: frameworks.find((f) => f.id === selectedFramework).name,
          complianceScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
          lastScan: new Date().toLocaleString(),
          sections: [
            {
              id: 1,
              name: "Section 1",
              score: Math.floor(Math.random() * 30) + 60,
              requirements: [
                { id: 101, name: "Requirement 1.1", status: "compliant", severity: "high" },
                {
                  id: 102,
                  name: "Requirement 1.2",
                  status: Math.random() > 0.5 ? "compliant" : "non-compliant",
                  severity: "medium",
                  remediation: "Implement required controls",
                },
                {
                  id: 103,
                  name: "Requirement 1.3",
                  status: Math.random() > 0.7 ? "compliant" : "warning",
                  severity: "low",
                  remediation: "Review and update policies",
                },
              ],
            },
            {
              id: 2,
              name: "Section 2",
              score: Math.floor(Math.random() * 30) + 60,
              requirements: [
                {
                  id: 201,
                  name: "Requirement 2.1",
                  status: Math.random() > 0.6 ? "compliant" : "non-compliant",
                  severity: "high",
                  remediation: "Implement required controls",
                },
                { id: 202, name: "Requirement 2.2", status: "compliant", severity: "medium" },
                {
                  id: 203,
                  name: "Requirement 2.3",
                  status: Math.random() > 0.5 ? "compliant" : "warning",
                  severity: "medium",
                  remediation: "Review and update procedures",
                },
              ],
            },
          ],
        }
    }

    setComplianceResults(mockResults)
  }

  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null)
    } else {
      setExpandedSection(sectionId)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "non-compliant":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-500">Compliant</Badge>
      case "non-compliant":
        return <Badge className="bg-red-500">Non-Compliant</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getScoreColor = (score) => {
    if (score < 50) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    if (score < 90) return "text-blue-500"
    return "text-green-500"
  }

  const getProgressColor = (score) => {
    if (score < 50) return "bg-red-500"
    if (score < 70) return "bg-yellow-500"
    if (score < 90) return "bg-blue-500"
    return "bg-green-500"
  }

  const filterRequirements = (requirements) => {
    if (filterStatus === "all" && filterSeverity === "all") return requirements

    return requirements.filter((req) => {
      const statusMatch = filterStatus === "all" || req.status === filterStatus
      const severityMatch = filterSeverity === "all" || req.severity === filterSeverity
      return statusMatch && severityMatch
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checker</CardTitle>
          <CardDescription>Assess your compliance with regulatory frameworks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Compliance Framework</Label>
            <Select value={selectedFramework} onValueChange={setSelectedFramework} disabled={scanning}>
              <SelectTrigger>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((framework) => (
                  <SelectItem key={framework.id} value={framework.id}>
                    <div className="flex flex-col">
                      <span>{framework.name}</span>
                      <span className="text-xs text-muted-foreground">{framework.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {scanning ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Checking compliance...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Analyzing your systems against {frameworks.find((f) => f.id === selectedFramework).name} requirements
              </p>
            </div>
          ) : (
            <Button onClick={checkCompliance} disabled={scanning} className="w-full">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Check Compliance
            </Button>
          )}

          {scanComplete && complianceResults && (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  <span className={getScoreColor(complianceResults.complianceScore)}>
                    {complianceResults.complianceScore}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Overall Compliance Score</div>
                <Progress
                  value={complianceResults.complianceScore}
                  className="h-2 mt-2"
                  indicatorClassName={getProgressColor(complianceResults.complianceScore)}
                />
              </div>

              <div className="text-xs text-muted-foreground text-center">Last scan: {complianceResults.lastScan}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Regular compliance checks help ensure your organization meets regulatory requirements and avoids
              penalties.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Framework Requirements</CardTitle>
          <CardDescription>
            {scanComplete
              ? `${complianceResults.framework} compliance requirements and status`
              : "Run a compliance check to see requirements"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!scanComplete ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mb-2 opacity-50" />
              <p>No compliance check results yet</p>
              <p className="text-sm mt-1">Select a framework and run a check to see requirements</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-8 w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="h-8 w-[130px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {complianceResults.sections.map((section) => (
                <div key={section.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-3 flex justify-between items-center cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div>
                      <h3 className="font-medium">{section.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Compliance Score: </span>
                        <span className={getScoreColor(section.score)}>{section.score}%</span>
                      </div>
                    </div>
                    <div>
                      {expandedSection === section.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {expandedSection === section.id && (
                    <div className="border-t p-3">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Requirement</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Severity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterRequirements(section.requirements).map((req) => (
                            <TableRow key={req.id}>
                              <TableCell>{req.name}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(req.status)}
                                  <span>
                                    {req.status === "compliant"
                                      ? "Compliant"
                                      : req.status === "non-compliant"
                                        ? "Non-Compliant"
                                        : "Warning"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{getSeverityBadge(req.severity)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {filterRequirements(section.requirements).length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">
                          <p>No requirements match the selected filters</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {scanComplete && complianceResults && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Remediation Plan</CardTitle>
            <CardDescription>
              Actions needed to achieve full compliance with {complianceResults.framework}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="non-compliant">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="non-compliant">
                  <XCircle className="mr-2 h-4 w-4" />
                  Non-Compliant
                </TabsTrigger>
                <TabsTrigger value="warnings">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Warnings
                </TabsTrigger>
                <TabsTrigger value="all">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  All Requirements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="non-compliant" className="space-y-4 pt-4">
                {complianceResults.sections.flatMap((section) =>
                  section.requirements.filter((req) => req.status === "non-compliant"),
                ).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-green-100 p-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="font-medium text-green-600">No non-compliant items found!</p>
                    <p className="text-sm text-muted-foreground mt-1">You're meeting all critical requirements</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {complianceResults.sections.map((section) => (
                      <div key={section.id}>
                        {section.requirements.filter((req) => req.status === "non-compliant").length > 0 && (
                          <>
                            <h3 className="font-medium mb-2">{section.name}</h3>
                            <div className="space-y-3">
                              {section.requirements
                                .filter((req) => req.status === "non-compliant")
                                .map((req) => (
                                  <div key={req.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                        <div>
                                          <p className="font-medium">{req.name}</p>
                                          <p className="text-sm text-muted-foreground mt-1">{req.remediation}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">{getSeverityBadge(req.severity)}</div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                      <Button size="sm">Resolve Issue</Button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="warnings" className="space-y-4 pt-4">
                {complianceResults.sections.flatMap((section) =>
                  section.requirements.filter((req) => req.status === "warning"),
                ).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-green-100 p-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="font-medium text-green-600">No warnings found!</p>
                    <p className="text-sm text-muted-foreground mt-1">You're meeting all recommended requirements</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {complianceResults.sections.map((section) => (
                      <div key={section.id}>
                        {section.requirements.filter((req) => req.status === "warning").length > 0 && (
                          <>
                            <h3 className="font-medium mb-2">{section.name}</h3>
                            <div className="space-y-3">
                              {section.requirements
                                .filter((req) => req.status === "warning")
                                .map((req) => (
                                  <div key={req.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-start gap-2">
                                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                                        <div>
                                          <p className="font-medium">{req.name}</p>
                                          <p className="text-sm text-muted-foreground mt-1">{req.remediation}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">{getSeverityBadge(req.severity)}</div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                      <Button size="sm" variant="outline">
                                        Address Warning
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Section</TableHead>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceResults.sections.flatMap((section) =>
                      section.requirements.map((req) => (
                        <TableRow key={`${section.id}-${req.id}`}>
                          <TableCell>{section.name}</TableCell>
                          <TableCell>{req.name}</TableCell>
                          <TableCell>{getStatusBadge(req.status)}</TableCell>
                          <TableCell>{getSeverityBadge(req.severity)}</TableCell>
                          <TableCell>
                            {req.status !== "compliant" && (
                              <Button size="sm" variant="outline">
                                {req.status === "non-compliant" ? "Resolve" : "Review"}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      )),
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-scan
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
