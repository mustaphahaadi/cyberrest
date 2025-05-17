"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircle,
  CheckCircle,
  Search,
  Shield,
  Clock,
  AlertTriangle,
  Eye,
  UserX,
  CreditCard,
  Mail,
  Key,
  Smartphone,
  Info,
} from "lucide-react"

export default function DarkWebMonitor() {
  const [email, setEmail] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [exposures, setExposures] = useState([])
  const [monitoredItems, setMonitoredItems] = useState([
    { id: 1, type: "email", value: "user@example.com", dateAdded: "2023-04-15", status: "monitored", exposures: 2 },
    { id: 2, type: "phone", value: "+1 (555) 123-4567", dateAdded: "2023-05-22", status: "monitored", exposures: 0 },
  ])

  // Mock dark web scan function
  const scanDarkWeb = (email) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock exposure data
        const mockExposures = [
          {
            id: 1,
            source: "BreachedSite.com",
            breachDate: "2022-07-18",
            exposedData: ["Email", "Password", "Username"],
            severity: "high",
            description: "A major data breach affecting over 5 million users",
            status: "active",
            darkWebListings: 3,
          },
          {
            id: 2,
            source: "HackedForum",
            breachDate: "2021-11-03",
            exposedData: ["Email", "IP Address", "Geographic Location"],
            severity: "medium",
            description: "User data leaked from a popular forum",
            status: "active",
            darkWebListings: 1,
          },
          {
            id: 3,
            source: "CompromisedApp",
            breachDate: "2020-09-22",
            exposedData: ["Email", "Phone Number", "Password Hash"],
            severity: "medium",
            description: "Mobile app data breach",
            status: "resolved",
            darkWebListings: 5,
          },
        ]

        // Randomly decide if the email was found in exposures
        const found = Math.random() > 0.3
        resolve(found ? mockExposures : [])
      }, 2000)
    })
  }

  const handleScan = async () => {
    if (!email || !email.includes("@")) return

    setScanning(true)
    setScanned(false)

    try {
      const results = await scanDarkWeb(email)
      setExposures(results)
      setScanned(true)

      // Add to monitored items if not already present
      if (results.length > 0 && !monitoredItems.some((item) => item.value === email)) {
        setMonitoredItems([
          ...monitoredItems,
          {
            id: monitoredItems.length + 1,
            type: "email",
            value: email,
            dateAdded: new Date().toISOString().split("T")[0],
            status: "monitored",
            exposures: results.length,
          },
        ])
      }
    } catch (error) {
      console.error("Error scanning dark web:", error)
    } finally {
      setScanning(false)
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Dark Web Monitor</CardTitle>
          <CardDescription>Check if your personal information is exposed on the dark web</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              We'll scan dark web forums, marketplaces, and data dumps for your information
            </p>
          </div>

          <Button onClick={handleScan} disabled={!email || !email.includes("@") || scanning} className="w-full">
            {scanning ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Scanning Dark Web...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Scan Dark Web
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              We continuously monitor the dark web for your personal information and alert you when new exposures are
              found.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scan Results</CardTitle>
          <CardDescription>
            {scanned
              ? exposures.length > 0
                ? `Found ${exposures.length} exposures for ${email}`
                : `No exposures found for ${email}`
              : "Enter your email and scan to see results"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scanning && (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 animate-pulse" />
              </div>
              <p className="font-medium">Scanning dark web...</p>
              <p className="text-sm text-muted-foreground mt-1">This may take a few moments</p>
            </div>
          )}

          {scanned && !scanning && exposures.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="font-medium text-green-600">Good news!</p>
              <p className="text-sm text-muted-foreground mt-1">No exposures found for {email}</p>
            </div>
          )}

          {scanned && !scanning && exposures.length > 0 && (
            <Tabs defaultValue="exposures">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="exposures">Exposures</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="exposures" className="space-y-4 pt-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Your information was found on the dark web</AlertTitle>
                  <AlertDescription>
                    We found your information in {exposures.length} dark web sources. Review the details below and take
                    action to secure your accounts.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {exposures.map((exposure) => (
                    <div key={exposure.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{exposure.source}</h3>
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(exposure.severity)}
                          {getStatusBadge(exposure.status)}
                        </div>
                      </div>
                      <p className="text-sm mb-2">{exposure.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Breach Date:</div>
                        <div>{exposure.breachDate}</div>

                        <div className="text-muted-foreground">Exposed Data:</div>
                        <div>{exposure.exposedData.join(", ")}</div>

                        <div className="text-muted-foreground">Dark Web Listings:</div>
                        <div>{exposure.darkWebListings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center">
                      <Key className="h-4 w-4 mr-2 text-red-500" />
                      Change Your Passwords
                    </h3>
                    <p className="text-sm mt-1">
                      Change your passwords for all affected accounts immediately. Use our Password Generator to create
                      strong, unique passwords.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-yellow-500" />
                      Enable Two-Factor Authentication
                    </h3>
                    <p className="text-sm mt-1">
                      Add an extra layer of security by enabling two-factor authentication on all your important
                      accounts.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center">
                      <Eye className="h-4 w-4 mr-2 text-blue-500" />
                      Monitor Your Accounts
                    </h3>
                    <p className="text-sm mt-1">
                      Keep an eye on your accounts for any suspicious activity and regularly check for new exposures.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                      Check Financial Accounts
                    </h3>
                    <p className="text-sm mt-1">
                      Review your financial accounts for unauthorized transactions and consider setting up fraud alerts.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {!scanning && !scanned && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <p>Enter your email and click Scan</p>
              <p className="text-sm mt-1">We'll check if your data has been exposed on the dark web</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Monitored Items</CardTitle>
          <CardDescription>Personal information being continuously monitored for dark web exposure</CardDescription>
        </CardHeader>
        <CardContent>
          {monitoredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <UserX className="h-10 w-10 mb-2 opacity-50" />
              <p>No items being monitored</p>
              <p className="text-sm mt-1">Add items to monitor by scanning them above</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Exposures</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitoredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.type === "email" ? (
                        <Mail className="h-4 w-4 inline mr-1" />
                      ) : item.type === "phone" ? (
                        <Smartphone className="h-4 w-4 inline mr-1" />
                      ) : (
                        <CreditCard className="h-4 w-4 inline mr-1" />
                      )}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.dateAdded}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.exposures > 0 ? (
                        <Badge variant="destructive">{item.exposures}</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          None
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              We scan the dark web 24/7 and will alert you immediately if any of your monitored items are found in new
              data breaches.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}
