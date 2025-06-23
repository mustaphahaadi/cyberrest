import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { motion } from "framer-motion"
import { 
  Eye, 
  AlertTriangle, 
  Shield, 
  Search, 
  Clock,
  Globe,
  User,
  CreditCard,
  Mail,
  Phone,
  FileText
} from "lucide-react"

export default function DarkWebMonitor() {
  const [monitoredItems, setMonitoredItems] = useState([
    { id: 1, type: "email", value: "user@example.com", status: "monitoring", lastScan: "2024-01-15" },
    { id: 2, type: "domain", value: "company.com", status: "monitoring", lastScan: "2024-01-15" },
    { id: 3, type: "phone", value: "+1-555-0123", status: "monitoring", lastScan: "2024-01-14" }
  ])

  const [alerts] = useState([
    {
      id: 1,
      type: "email",
      value: "user@example.com",
      threat: "Credential leak",
      source: "Data breach forum",
      severity: "high",
      discovered: "2024-01-14",
      description: "Email and password found in recent data breach dump"
    },
    {
      id: 2,
      type: "domain",
      value: "company.com",
      threat: "Phishing site",
      source: "Dark web marketplace",
      severity: "medium",
      discovered: "2024-01-12",
      description: "Fake website mimicking your domain found for sale"
    }
  ])

  const [newItem, setNewItem] = useState({ type: "email", value: "" })
  const [isScanning, setIsScanning] = useState(false)

  const handleAddItem = (e) => {
    e.preventDefault()
    if (newItem.value.trim()) {
      const item = {
        id: Date.now(),
        type: newItem.type,
        value: newItem.value.trim(),
        status: "monitoring",
        lastScan: new Date().toISOString().split('T')[0]
      }
      setMonitoredItems([...monitoredItems, item])
      setNewItem({ type: "email", value: "" })
    }
  }

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />
      case "domain": return <Globe className="h-4 w-4" />
      case "phone": return <Phone className="h-4 w-4" />
      case "username": return <User className="h-4 w-4" />
      case "credit_card": return <CreditCard className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dark Web Monitor</h2>
        <p className="text-muted-foreground">Monitor the dark web for compromised data and threats</p>
      </div>

      <Tabs defaultValue="monitor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitor">Monitoring</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="scan">Manual Scan</TabsTrigger>
        </TabsList>

        <TabsContent value="monitor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Item to Monitor</CardTitle>
              <CardDescription>Add emails, domains, or other data to monitor on the dark web</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={newItem.type}
                      onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="email">Email</option>
                      <option value="domain">Domain</option>
                      <option value="phone">Phone</option>
                      <option value="username">Username</option>
                      <option value="credit_card">Credit Card</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      value={newItem.value}
                      onChange={(e) => setNewItem({...newItem, value: e.target.value})}
                      placeholder="Enter value to monitor"
                      required
                    />
                  </div>
                </div>
                <Button type="submit">
                  <Eye className="h-4 w-4 mr-2" />
                  Add to Monitoring
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monitored Items ({monitoredItems.length})</CardTitle>
              <CardDescription>Items currently being monitored on the dark web</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monitoredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <p className="font-medium">{item.value}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.type} • Last scan: {item.lastScan}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <Shield className="h-3 w-3 mr-1" />
                        {item.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dark Web Alerts ({alerts.length})</CardTitle>
              <CardDescription>Threats and compromised data found on the dark web</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border rounded-lg p-4 border-l-4 border-l-red-500"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(alert.type)}
                          <h4 className="font-medium">{alert.value}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{alert.discovered}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{alert.threat}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <p className="text-sm">
                          <span className="font-medium">Source:</span> {alert.source}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm">View Details</Button>
                        <Button size="sm" variant="outline">Mark as Resolved</Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No alerts found</h3>
                  <p className="text-muted-foreground">Your monitored items are secure on the dark web.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Dark Web Scan</CardTitle>
              <CardDescription>Perform an immediate scan of all monitored items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">About Dark Web Scanning</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our scanning technology searches through known dark web marketplaces, forums, and data dumps 
                      to identify compromised information. Scans are performed automatically every 24 hours, but you 
                      can trigger a manual scan at any time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="font-medium">Marketplaces</p>
                      <p className="text-sm text-muted-foreground">45+ monitored</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium">Data Dumps</p>
                      <p className="text-sm text-muted-foreground">1,200+ sources</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="font-medium">Last Scan</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="w-full"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning Dark Web...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Start Manual Scan
                  </>
                )}
              </Button>

              {isScanning && (
                <div className="text-center text-sm text-muted-foreground">
                  This may take a few minutes to complete...
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}