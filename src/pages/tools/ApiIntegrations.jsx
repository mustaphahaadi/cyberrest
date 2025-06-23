import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { motion } from "framer-motion"
import { 
  Plug, 
  Key, 
  CheckCircle, 
  AlertTriangle, 
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2
} from "lucide-react"

export default function ApiIntegrations() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Production API",
      key: "sk_live_1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2024-01-16",
      status: "active"
    },
    {
      id: 2,
      name: "Development API",
      key: "sk_test_abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "2024-01-14",
      status: "active"
    }
  ])

  const integrations = [
    {
      name: "Slack",
      description: "Get security alerts in Slack channels",
      status: "connected",
      icon: "💬"
    },
    {
      name: "Microsoft Teams",
      description: "Receive notifications in Teams",
      status: "available",
      icon: "👥"
    },
    {
      name: "Jira",
      description: "Create tickets for security issues",
      status: "connected",
      icon: "🎫"
    },
    {
      name: "PagerDuty",
      description: "Alert on-call teams for critical issues",
      status: "available",
      icon: "🚨"
    }
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "connected": return "bg-green-100 text-green-800"
      case "active": return "bg-blue-100 text-blue-800"
      case "available": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Integrations</h2>
        <p className="text-muted-foreground">Manage API keys and third-party integrations</p>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <motion.div
                    key={apiKey.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Key className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{apiKey.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {showApiKey ? apiKey.key : apiKey.key.replace(/./g, '•').slice(0, 20) + '...'}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(apiKey.status)}>
                        {apiKey.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      {integration.name}
                    </CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status === "connected" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Plug className="h-3 w-3 mr-1" />
                        )}
                        {integration.status}
                      </Badge>
                      <Button 
                        variant={integration.status === "connected" ? "outline" : "default"}
                        size="sm"
                      >
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Endpoints</CardTitle>
              <CardDescription>Configure webhook URLs to receive security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://your-app.com/webhooks/cyberrest"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Events to Subscribe</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Security alerts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Scan completed</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">New vulnerabilities</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Compliance changes</span>
                    </label>
                  </div>
                </div>

                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}