"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Badge from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Laptop,
  Smartphone,
  Tablet,
  Tv,
  Wifi,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  RefreshCw,
  Zap,
  HardDrive,
  Server,
} from "lucide-react"

export default function DeviceSecurityScanner() {
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResults, setScanResults] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [deviceDetails, setDeviceDetails] = useState(null)

  // Mock device scan function
  const scanDevices = () => {
    setScanning(true)
    setScanComplete(false)
    setScanProgress(0)
    setSelectedDevice(null)
    setDeviceDetails(null)

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
    // Generate mock scan results
    const mockDevices = [
      {
        id: 1,
        name: "Main Laptop",
        type: "laptop",
        ip: "192.168.1.5",
        mac: "A1:B2:C3:D4:E5:F6",
        os: "Windows 11",
        lastSeen: "Online now",
        securityScore: 85,
        issues: [
          { id: 1, severity: "medium", description: "Operating system update available", status: "open" },
          { id: 2, severity: "low", description: "Password hasn't been changed in 90 days", status: "open" },
        ],
      },
      {
        id: 2,
        name: "iPhone 13",
        type: "smartphone",
        ip: "192.168.1.10",
        mac: "G7:H8:I9:J0:K1:L2",
        os: "iOS 16.5",
        lastSeen: "Online now",
        securityScore: 92,
        issues: [{ id: 3, severity: "low", description: "App permissions need review", status: "open" }],
      },
      {
        id: 3,
        name: "Work Tablet",
        type: "tablet",
        ip: "192.168.1.15",
        mac: "M3:N4:O5:P6:Q7:R8",
        os: "Android 13",
        lastSeen: "2 hours ago",
        securityScore: 68,
        issues: [
          { id: 4, severity: "high", description: "Device not encrypted", status: "open" },
          { id: 5, severity: "medium", description: "Multiple security patches missing", status: "open" },
          { id: 6, severity: "medium", description: "Unknown apps from untrusted sources installed", status: "open" },
        ],
      },
      {
        id: 4,
        name: "Smart TV",
        type: "tv",
        ip: "192.168.1.20",
        mac: "S9:T0:U1:V2:W3:X4",
        os: "WebOS 6.0",
        lastSeen: "1 day ago",
        securityScore: 60,
        issues: [
          { id: 7, severity: "high", description: "Firmware severely outdated", status: "open" },
          { id: 8, severity: "medium", description: "Default credentials not changed", status: "open" },
        ],
      },
      {
        id: 5,
        name: "Home Router",
        type: "router",
        ip: "192.168.1.1",
        mac: "Y5:Z6:A7:B8:C9:D0",
        os: "RouterOS 6.49",
        lastSeen: "Online now",
        securityScore: 75,
        issues: [
          { id: 9, severity: "high", description: "WPA2 encryption - WPA3 recommended", status: "open" },
          { id: 10, severity: "medium", description: "UPnP enabled", status: "open" },
        ],
      },
    ]

    const overallScore = Math.round(
      mockDevices.reduce((sum, device) => sum + device.securityScore, 0) / mockDevices.length,
    )

    const totalIssues = mockDevices.reduce((sum, device) => sum + device.issues.length, 0)
    const highIssues = mockDevices.reduce(
      (sum, device) => sum + device.issues.filter((issue) => issue.severity === "high").length,
      0,
    )
    const mediumIssues = mockDevices.reduce(
      (sum, device) => sum + device.issues.filter((issue) => issue.severity === "medium").length,
      0,
    )
    const lowIssues = mockDevices.reduce(
      (sum, device) => sum + device.issues.filter((issue) => issue.severity === "low").length,
      0,
    )

    setScanResults({
      devices: mockDevices,
      overallScore,
      totalIssues,
      highIssues,
      mediumIssues,
      lowIssues,
      scanTime: new Date().toLocaleString(),
    })
  }

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device)

    // Generate detailed device info
    const mockDetails = {
      hardware: {
        processor: device.type === "laptop" ? "Intel Core i7-1165G7" : "ARM Cortex-A78",
        memory: device.type === "laptop" ? "16 GB DDR4" : "6 GB LPDDR5",
        storage: device.type === "laptop" ? "512 GB SSD" : "128 GB Flash",
        lastBoot: "2 days ago",
      },
      software: {
        osVersion: device.os,
        kernelVersion: device.type === "laptop" ? "10.0.22621" : "5.10.43",
        firmwareDate: "2023-03-15",
        updateStatus: device.issues.some((i) => i.description.includes("update")) ? "Updates available" : "Up to date",
      },
      security: {
        antivirusStatus: device.type === "laptop" ? "Active (Windows Defender)" : "Built-in protection active",
        firewallStatus: device.type === "laptop" ? "Enabled" : "Default settings",
        encryptionStatus: device.issues.some((i) => i.description.includes("encrypt")) ? "Not encrypted" : "Encrypted",
        passwordProtection: "Enabled",
        biometricAuth: device.type === "smartphone" || device.type === "tablet" ? "Enabled" : "Not available",
      },
      network: {
        ipAddress: device.ip,
        macAddress: device.mac,
        connectionType: Math.random() > 0.5 ? "Wi-Fi" : "Ethernet",
        openPorts: device.type === "router" ? "22, 80, 443" : "None detected",
      },
    }

    setDeviceDetails(mockDetails)
  }

  const getDeviceIcon = (type) => {
    switch (type) {
      case "laptop":
        return <Laptop className="h-5 w-5" />
      case "smartphone":
        return <Smartphone className="h-5 w-5" />
      case "tablet":
        return <Tablet className="h-5 w-5" />
      case "tv":
        return <Tv className="h-5 w-5" />
      case "router":
        return <Wifi className="h-5 w-5" />
      default:
        return <HardDrive className="h-5 w-5" />
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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Device Security Scanner</CardTitle>
          <CardDescription>Scan all devices on your network for security vulnerabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {scanning ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scanning network devices...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">Discovering and analyzing devices on your network</p>
            </div>
          ) : (
            <Button onClick={scanDevices} disabled={scanning} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Scan Network Devices
            </Button>
          )}

          {scanComplete && scanResults && (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  <span className={getScoreColor(scanResults.overallScore)}>{scanResults.overallScore}/100</span>
                </div>
                <div className="text-sm text-muted-foreground">Overall Security Score</div>
                <Progress
                  value={scanResults.overallScore}
                  className="h-2 mt-2"
                  indicatorClassName={getProgressColor(scanResults.overallScore)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border rounded-lg p-2">
                  <div className="text-red-500 font-bold">{scanResults.highIssues}</div>
                  <div className="text-xs text-muted-foreground">High Risk</div>
                </div>
                <div className="border rounded-lg p-2">
                  <div className="text-yellow-500 font-bold">{scanResults.mediumIssues}</div>
                  <div className="text-xs text-muted-foreground">Medium Risk</div>
                </div>
                <div className="border rounded-lg p-2">
                  <div className="text-blue-500 font-bold">{scanResults.lowIssues}</div>
                  <div className="text-xs text-muted-foreground">Low Risk</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center">Last scan: {scanResults.scanTime}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Regular device scanning helps identify security vulnerabilities before they can be exploited.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Network Devices</CardTitle>
          <CardDescription>
            {scanComplete
              ? `${scanResults.devices.length} devices found on your network`
              : "Scan your network to discover connected devices"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!scanComplete ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <Server className="h-10 w-10 mb-2 opacity-50" />
              <p>No devices scanned yet</p>
              <p className="text-sm mt-1">Run a scan to discover devices on your network</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scanResults.devices.map((device) => (
                    <TableRow
                      key={device.id}
                      className={selectedDevice?.id === device.id ? "bg-muted" : ""}
                      onClick={() => handleDeviceSelect(device)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getDeviceIcon(device.type)}
                          <span className="capitalize">{device.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={getScoreColor(device.securityScore)}>{device.securityScore}</span>
                      </TableCell>
                      <TableCell>
                        {device.issues.length > 0 ? (
                          <Badge variant="destructive">{device.issues.length}</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            None
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedDevice && deviceDetails && (
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {getDeviceIcon(selectedDevice.type)}
                  {selectedDevice.name}
                </CardTitle>
                <CardDescription>
                  {selectedDevice.os} • {selectedDevice.ip} • Last seen: {selectedDevice.lastSeen}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">
                  <span className={getScoreColor(selectedDevice.securityScore)}>
                    {selectedDevice.securityScore}/100
                  </span>
                </div>
                <CardDescription>Security Score</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="issues">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="issues">Security Issues</TabsTrigger>
                <TabsTrigger value="hardware">Hardware</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>

              <TabsContent value="issues" className="space-y-4 pt-4">
                {selectedDevice.issues.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-green-100 p-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="font-medium text-green-600">No security issues found!</p>
                    <p className="text-sm text-muted-foreground mt-1">This device appears to be secure</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDevice.issues.map((issue) => (
                      <div key={issue.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            {issue.severity === "high" ? (
                              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            ) : issue.severity === "medium" ? (
                              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                            ) : (
                              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium">{issue.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {issue.severity === "high"
                                  ? "Critical security risk - immediate action recommended"
                                  : issue.severity === "medium"
                                    ? "Moderate security risk - action recommended"
                                    : "Low security risk - action suggested"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(issue.severity)}
                            <Button size="sm" variant="outline">
                              Fix Issue
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="hardware" className="pt-4">
                <div className="border rounded-lg divide-y">
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Processor</div>
                    <div>{deviceDetails.hardware.processor}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Memory</div>
                    <div>{deviceDetails.hardware.memory}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Storage</div>
                    <div>{deviceDetails.hardware.storage}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Last Boot</div>
                    <div>{deviceDetails.hardware.lastBoot}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="software" className="pt-4">
                <div className="border rounded-lg divide-y">
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">OS Version</div>
                    <div>{deviceDetails.software.osVersion}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Kernel Version</div>
                    <div>{deviceDetails.software.kernelVersion}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Firmware Date</div>
                    <div>{deviceDetails.software.firmwareDate}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Update Status</div>
                    <div
                      className={
                        deviceDetails.software.updateStatus.includes("available") ? "text-yellow-500" : "text-green-500"
                      }
                    >
                      {deviceDetails.software.updateStatus}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="network" className="pt-4">
                <div className="border rounded-lg divide-y">
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">IP Address</div>
                    <div>{deviceDetails.network.ipAddress}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">MAC Address</div>
                    <div>{deviceDetails.network.macAddress}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Connection Type</div>
                    <div>{deviceDetails.network.connectionType}</div>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <div className="text-muted-foreground">Open Ports</div>
                    <div
                      className={
                        deviceDetails.network.openPorts !== "None detected" ? "text-yellow-500" : "text-green-500"
                      }
                    >
                      {deviceDetails.network.openPorts}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <Button className="flex-1" variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Run Deep Scan
              </Button>
              <Button className="flex-1">
                <Shield className="mr-2 h-4 w-4" />
                Secure Device
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
