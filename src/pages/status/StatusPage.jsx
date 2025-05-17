"use client"

import { useState } from "react"
import { CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const StatusPage = () => {
  const [expandedIncidents, setExpandedIncidents] = useState([])
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [slackNotifications, setSlackNotifications] = useState(false)

  // Mock data for system status
  const systemComponents = [
    {
      name: "API",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "32 days ago",
    },
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "14 days ago",
    },
    {
      name: "Authentication Services",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "45 days ago",
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "7 days ago",
    },
    {
      name: "Security Scanning Engine",
      status: "degraded",
      uptime: "99.87%",
      lastIncident: "Ongoing",
    },
    {
      name: "Dark Web Monitoring",
      status: "operational",
      uptime: "99.93%",
      lastIncident: "21 days ago",
    },
    {
      name: "Compliance Checker",
      status: "operational",
      uptime: "99.97%",
      lastIncident: "60 days ago",
    },
    {
      name: "Notification System",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "90 days ago",
    },
  ]

  // Mock data for incidents
  const incidents = [
    {
      id: "inc-001",
      title: "Security Scanning Engine Performance Degradation",
      status: "investigating",
      date: "May 16, 2025 - 08:30 UTC",
      updates: [
        {
          timestamp: "May 16, 2025 - 08:30 UTC",
          message: "We are investigating reports of slow response times in the Security Scanning Engine.",
        },
        {
          timestamp: "May 16, 2025 - 09:15 UTC",
          message:
            "We have identified the issue as increased load due to a recent feature deployment. Our engineering team is working on a fix.",
        },
        {
          timestamp: "May 16, 2025 - 10:00 UTC",
          message:
            "We have implemented a temporary solution to mitigate the performance issues. We are continuing to monitor the situation.",
        },
      ],
      affected: ["Security Scanning Engine"],
    },
    {
      id: "inc-002",
      title: "Database Connectivity Issues",
      status: "resolved",
      date: "May 9, 2025 - 14:45 UTC",
      resolved: "May 9, 2025 - 16:30 UTC",
      updates: [
        {
          timestamp: "May 9, 2025 - 14:45 UTC",
          message: "We are investigating reports of intermittent database connectivity issues.",
        },
        {
          timestamp: "May 9, 2025 - 15:20 UTC",
          message:
            "We have identified the issue as a network configuration problem. Our operations team is implementing a fix.",
        },
        {
          timestamp: "May 9, 2025 - 16:30 UTC",
          message:
            "The issue has been resolved. Database connectivity has been fully restored. We apologize for any inconvenience this may have caused.",
        },
      ],
      affected: ["Database", "API"],
    },
    {
      id: "inc-003",
      title: "Web Application Slowness",
      status: "resolved",
      date: "May 2, 2025 - 10:15 UTC",
      resolved: "May 2, 2025 - 11:45 UTC",
      updates: [
        {
          timestamp: "May 2, 2025 - 10:15 UTC",
          message: "We are investigating reports of slowness in the web application.",
        },
        {
          timestamp: "May 2, 2025 - 10:45 UTC",
          message: "We have identified the issue as a caching problem. Our engineering team is implementing a fix.",
        },
        {
          timestamp: "May 2, 2025 - 11:45 UTC",
          message:
            "The issue has been resolved. Web application performance has been restored to normal levels. We apologize for any inconvenience this may have caused.",
        },
      ],
      affected: ["Web Application"],
    },
  ]

  // Mock data for scheduled maintenance
  const scheduledMaintenance = [
    {
      id: "maint-001",
      title: "Database Optimization",
      status: "scheduled",
      date: "May 20, 2025 - 02:00 UTC",
      duration: "2 hours",
      description:
        "We will be performing database optimization to improve performance. During this time, the platform may experience brief periods of slowness.",
      affected: ["Database", "API"],
    },
    {
      id: "maint-002",
      title: "Security Scanning Engine Upgrade",
      status: "scheduled",
      date: "May 25, 2025 - 01:00 UTC",
      duration: "3 hours",
      description:
        "We will be upgrading our Security Scanning Engine to the latest version. This upgrade will improve scanning accuracy and performance.",
      affected: ["Security Scanning Engine"],
    },
  ]

  const toggleIncidentExpansion = (incidentId) => {
    setExpandedIncidents((prev) =>
      prev.includes(incidentId) ? prev.filter((id) => id !== incidentId) : [...prev, incidentId],
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
      case "outage":
        return <Badge className="bg-red-100 text-red-800">Outage</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "scheduled":
        return <Badge className="bg-purple-100 text-purple-800">Scheduled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getOverallStatus = () => {
    if (systemComponents.some((component) => component.status === "outage")) {
      return {
        status: "outage",
        message: "Major System Outage",
        description: "Some critical systems are currently experiencing outages.",
      }
    } else if (systemComponents.some((component) => component.status === "degraded")) {
      return {
        status: "degraded",
        message: "Partial System Degradation",
        description: "Some systems are currently experiencing performance issues.",
      }
    } else {
      return {
        status: "operational",
        message: "All Systems Operational",
        description: "All systems are running smoothly.",
      }
    }
  }

  const overallStatus = getOverallStatus()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Status</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Current status of CyberRest services and recent incidents
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(overallStatus.status)}
              <CardTitle className="ml-2">{overallStatus.message}</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          <CardDescription>{overallStatus.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemComponents.map((component) => (
              <Card key={component.name} className="border-l-4 border-l-primary">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{component.name}</CardTitle>
                    {getStatusIcon(component.status)}
                  </div>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="font-medium">{component.uptime}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Last incident:</span>
                    <span className="font-medium">{component.lastIncident}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="incidents" className="mb-8">
        <TabsList className="mx-auto flex justify-center mb-6">
          <TabsTrigger value="incidents">Current & Recent Incidents</TabsTrigger>
          <TabsTrigger value="maintenance">Scheduled Maintenance</TabsTrigger>
          <TabsTrigger value="history">Incident History</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <div className="space-y-4">
            {incidents.filter((incident) => incident.status !== "resolved").length === 0 && (
              <Card>
                <CardContent className="py-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Active Incidents</h3>
                  <p className="text-muted-foreground">
                    All systems are currently operational. No active incidents to report.
                  </p>
                </CardContent>
              </Card>
            )}

            {incidents
              .filter((incident) => incident.status !== "resolved")
              .map((incident) => (
                <Card key={incident.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                      </div>
                      {getStatusBadge(incident.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {incident.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Affected:</span>
                        {incident.affected.map((component) => (
                          <Badge key={component} variant="outline">
                            {component}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center p-0 h-auto"
                          onClick={() => toggleIncidentExpansion(incident.id)}
                        >
                          {expandedIncidents.includes(incident.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Hide updates
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Show updates ({incident.updates.length})
                            </>
                          )}
                        </Button>

                        {expandedIncidents.includes(incident.id) && (
                          <div className="mt-4 space-y-4 border-l-2 border-muted pl-4">
                            {incident.updates.map((update, index) => (
                              <div key={index} className="relative">
                                <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-background border-2 border-muted"></div>
                                <p className="text-sm text-muted-foreground mb-1">{update.timestamp}</p>
                                <p className="text-sm">{update.message}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            <h3 className="text-xl font-medium mt-8 mb-4">Recent Resolved Incidents</h3>

            {incidents
              .filter((incident) => incident.status === "resolved")
              .map((incident) => (
                <Card key={incident.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                      </div>
                      {getStatusBadge(incident.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {incident.date} to {incident.resolved}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Affected:</span>
                        {incident.affected.map((component) => (
                          <Badge key={component} variant="outline">
                            {component}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center p-0 h-auto"
                          onClick={() => toggleIncidentExpansion(incident.id)}
                        >
                          {expandedIncidents.includes(incident.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Hide updates
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Show updates ({incident.updates.length})
                            </>
                          )}
                        </Button>

                        {expandedIncidents.includes(incident.id) && (
                          <div className="mt-4 space-y-4 border-l-2 border-muted pl-4">
                            {incident.updates.map((update, index) => (
                              <div key={index} className="relative">
                                <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-background border-2 border-muted"></div>
                                <p className="text-sm text-muted-foreground mb-1">{update.timestamp}</p>
                                <p className="text-sm">{update.message}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="space-y-4">
            {scheduledMaintenance.length === 0 ? (
              <Card>
                <CardContent className="py-6 text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Scheduled Maintenance</h3>
                  <p className="text-muted-foreground">There is no scheduled maintenance at this time.</p>
                </CardContent>
              </Card>
            ) : (
              scheduledMaintenance.map((maintenance) => (
                <Card key={maintenance.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary mr-2" />
                        <CardTitle className="text-lg">{maintenance.title}</CardTitle>
                      </div>
                      {getStatusBadge(maintenance.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {maintenance.date} (Expected duration: {maintenance.duration})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">{maintenance.description}</p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-sm text-muted-foreground">Affected:</span>
                        {maintenance.affected.map((component) => (
                          <Badge key={component} variant="outline">
                            {component}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Incident History</CardTitle>
              <CardDescription>View past incidents and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {incidents
                  .filter((incident) => incident.status === "resolved")
                  .map((incident) => (
                    <div key={incident.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{incident.title}</h3>
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Started: {incident.date}</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Resolved: {incident.resolved}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-sm text-muted-foreground">Affected:</span>
                        {incident.affected.map((component) => (
                          <Badge key={component} variant="outline">
                            {component}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center p-0 h-auto"
                        onClick={() => toggleIncidentExpansion(incident.id)}
                      >
                        {expandedIncidents.includes(incident.id) ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Hide details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show details
                          </>
                        )}
                      </Button>

                      {expandedIncidents.includes(incident.id) && (
                        <div className="mt-4 space-y-4 border-l-2 border-muted pl-4">
                          {incident.updates.map((update, index) => (
                            <div key={index} className="relative">
                              <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-background border-2 border-muted"></div>
                              <p className="text-sm text-muted-foreground mb-1">{update.timestamp}</p>
                              <p className="text-sm">{update.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Subscribe to Status Updates</h2>
              <p className="mb-0">Get notified when CyberRest services experience issues</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={emailNotifications ? "secondary" : "outline"}
                className={!emailNotifications ? "bg-transparent hover:bg-primary-foreground/10" : ""}
                onClick={() => setEmailNotifications(!emailNotifications)}
              >
                {emailNotifications ? "Email Subscribed" : "Email Updates"}
              </Button>
              <Button
                variant={smsNotifications ? "secondary" : "outline"}
                className={!smsNotifications ? "bg-transparent hover:bg-primary-foreground/10" : ""}
                onClick={() => setSmsNotifications(!smsNotifications)}
              >
                {smsNotifications ? "SMS Subscribed" : "SMS Alerts"}
              </Button>
              <Button
                variant={slackNotifications ? "secondary" : "outline"}
                className={!slackNotifications ? "bg-transparent hover:bg-primary-foreground/10" : ""}
                onClick={() => setSlackNotifications(!slackNotifications)}
              >
                {slackNotifications ? "Slack Connected" : "Slack Notifications"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatusPage
