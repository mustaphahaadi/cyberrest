"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PlusCircle,
  Trash2,
  RefreshCw,
  LinkIcon,
  Copy,
  Key,
  Info,
  ChevronRight,
  Settings,
  Webhook,
  Code,
  Database,
  Cloud,
} from "lucide-react"

export default function ApiIntegrations() {
  const [activeTab, setActiveTab] = useState("api-keys")
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyPermissions, setNewKeyPermissions] = useState({
    read: true,
    write: false,
    delete: false,
  })
  const [apiKeys, setApiKeys] = useState([
    {
      id: "key_01HGXYZ123456789",
      name: "Dashboard Integration",
      prefix: "CRK_123abc",
      created: "2023-05-15T10:30:00Z",
      lastUsed: "2023-06-01T14:22:10Z",
      permissions: { read: true, write: true, delete: false },
      status: "active",
    },
    {
      id: "key_01HGXYZ987654321",
      name: "Monitoring Service",
      prefix: "CRK_456def",
      created: "2023-04-22T08:15:00Z",
      lastUsed: "2023-06-02T09:45:30Z",
      permissions: { read: true, write: false, delete: false },
      status: "active",
    },
  ])

  const [webhooks, setWebhooks] = useState([
    {
      id: "wh_01HGXYZ123456789",
      name: "Security Alert Notifications",
      url: "https://example.com/webhooks/security-alerts",
      events: ["security.alert.created", "security.breach.detected"],
      created: "2023-05-10T11:20:00Z",
      status: "active",
    },
    {
      id: "wh_01HGXYZ987654321",
      name: "User Activity Logging",
      url: "https://example.com/webhooks/user-activity",
      events: ["user.login", "user.logout", "user.created"],
      created: "2023-04-18T09:30:00Z",
      status: "inactive",
    },
  ])

  const [integrations, setIntegrations] = useState([
    {
      id: "int_01HGXYZ123456789",
      name: "Slack",
      description: "Send security alerts to Slack channels",
      status: "connected",
      connectedAt: "2023-05-20T14:30:00Z",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "int_01HGXYZ987654321",
      name: "Microsoft Teams",
      description: "Send notifications to Microsoft Teams channels",
      status: "disconnected",
      connectedAt: null,
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "int_01HGXYZ567891234",
      name: "Jira",
      description: "Create Jira tickets for security issues",
      status: "connected",
      connectedAt: "2023-06-01T10:15:00Z",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "int_01HGXYZ432156789",
      name: "ServiceNow",
      description: "Create incidents in ServiceNow",
      status: "disconnected",
      connectedAt: null,
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "int_01HGXYZ789123456",
      name: "Zapier",
      description: "Connect to thousands of apps via Zapier",
      status: "connected",
      connectedAt: "2023-05-25T16:45:00Z",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return

    const newKey = {
      id: `key_${Math.random().toString(36).substring(2, 15)}`,
      name: newKeyName,
      prefix: `CRK_${Math.random().toString(36).substring(2, 8)}`,
      created: new Date().toISOString(),
      lastUsed: null,
      permissions: { ...newKeyPermissions },
      status: "active",
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setNewKeyPermissions({ read: true, write: false, delete: false })
    setShowNewKeyForm(false)
  }

  const handleDeleteKey = (keyId) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId))
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getTimeSince = (dateString) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) return interval + " year" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) return interval + " month" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 60)
    if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s") + " ago"

    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API & Integrations</h2>
        <p className="text-muted-foreground">
          Manage API keys, webhooks, and third-party integrations for your CyberRest account.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api-keys">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="mr-2 h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <LinkIcon className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">API Keys</h3>
              <p className="text-sm text-muted-foreground">
                Create and manage API keys to authenticate your applications with CyberRest.
              </p>
            </div>
            <Button onClick={() => setShowNewKeyForm(true)} disabled={showNewKeyForm}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </div>

          {showNewKeyForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New API Key</CardTitle>
                <CardDescription>
                  API keys allow secure access to the CyberRest API. Keep your keys secure and never share them
                  publicly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Production Server"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Give your key a descriptive name to remember where it's being used.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span>Read (GET)</span>
                        <span className="text-xs text-muted-foreground">Access data from the API</span>
                      </div>
                      <Switch
                        checked={newKeyPermissions.read}
                        onCheckedChange={(checked) => setNewKeyPermissions({ ...newKeyPermissions, read: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span>Write (POST, PUT, PATCH)</span>
                        <span className="text-xs text-muted-foreground">Create and update data</span>
                      </div>
                      <Switch
                        checked={newKeyPermissions.write}
                        onCheckedChange={(checked) => setNewKeyPermissions({ ...newKeyPermissions, write: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span>Delete (DELETE)</span>
                        <span className="text-xs text-muted-foreground">Remove data from your account</span>
                      </div>
                      <Switch
                        checked={newKeyPermissions.delete}
                        onCheckedChange={(checked) => setNewKeyPermissions({ ...newKeyPermissions, delete: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                  Create API Key
                </Button>
              </CardFooter>
            </Card>
          )}

          {apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Key className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No API Keys</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You haven't created any API keys yet. Create one to get started.
              </p>
              <Button onClick={() => setShowNewKeyForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                          {key.prefix}••••••••••••
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {key.permissions.read && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Read
                            </Badge>
                          )}
                          {key.permissions.write && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Write
                            </Badge>
                          )}
                          {key.permissions.delete && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Delete
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(key.created)}</TableCell>
                      <TableCell>{key.lastUsed ? getTimeSince(key.lastUsed) : "Never"}</TableCell>
                      <TableCell>
                        {key.status === "active" ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="outline">Revoked</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteKey(key.id)}
                          aria-label="Delete API key"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              API keys grant access to your CyberRest account. Keep them secure and rotate them regularly. Never expose
              API keys in client-side code.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Webhooks</h3>
              <p className="text-sm text-muted-foreground">
                Configure webhooks to receive real-time notifications for events in your CyberRest account.
              </p>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
          </div>

          {webhooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Webhook className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No Webhooks</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You haven't created any webhooks yet. Create one to receive event notifications.
              </p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Webhook
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{webhook.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">{webhook.url}</code>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </CardDescription>
                      </div>
                      <Badge className={webhook.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                        {webhook.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Events:</div>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event) => (
                          <Badge key={event} variant="outline">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">Created: {formatDate(webhook.created)}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Webhooks allow your applications to receive real-time notifications when events occur in your CyberRest
              account. Ensure your endpoint is secure and can handle the expected volume of events.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 pt-4">
          <div>
            <h3 className="text-lg font-medium">Third-Party Integrations</h3>
            <p className="text-sm text-muted-foreground">
              Connect CyberRest with other services to enhance your security workflow.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <img
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    {integration.status === "connected"
                      ? `Connected: ${formatDate(integration.connectedAt)}`
                      : "Not connected"}
                  </div>
                  <Button size="sm" variant={integration.status === "connected" ? "outline" : "default"}>
                    {integration.status === "connected" ? (
                      <>
                        <Settings className="mr-2 h-3 w-3" />
                        Configure
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-3 w-3" />
                        Connect
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>
                Browse the marketplace for additional integrations to enhance your security workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto flex-col py-4 px-6">
                  <Database className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Data Storage</span>
                  <span className="text-xs text-muted-foreground mt-1">AWS S3, Google Cloud Storage</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-6">
                  <Cloud className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Cloud Providers</span>
                  <span className="text-xs text-muted-foreground mt-1">AWS, Azure, GCP</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-6">
                  <Code className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Development</span>
                  <span className="text-xs text-muted-foreground mt-1">GitHub, GitLab, Bitbucket</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">
                View All Integrations
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
