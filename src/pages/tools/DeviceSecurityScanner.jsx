import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { motion } from "framer-motion"
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Scan,
  Wifi,
  Lock
} from "lucide-react"

export default function DeviceSecurityScanner() {
  const [scanning, setScanning] = useState(false)
  const [devices] = useState([
    {
      id: 1,
      name: "MacBook Pro",
      type: "laptop",
      os: "macOS 14.0",
      status: "secure",
      lastScan: "2024-01-15",
      issues: 0
    },
    {
      id: 2,
      name: "iPhone 15",
      type: "mobile",
      os: "iOS 17.0",
      status: "warning",
      lastScan: "2024-01-14",
      issues: 2
    },
    {
      id: 3,
      name: "iPad Air",
      type: "tablet",
      os: "iPadOS 17.0",
      status: "secure",
      lastScan: "2024-01-13",
      issues: 0
    }
  ])

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 3000)
  }

  const getDeviceIcon = (type) => {
    switch (type) {
      case "laptop": return <Laptop className="h-6 w-6" />
      case "mobile": return <Smartphone className="h-6 w-6" />
      case "tablet": return <Tablet className="h-6 w-6" />
      default: return <Shield className="h-6 w-6" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "secure": return "bg-green-100 text-green-800"
      case "warning": return "bg-yellow-100 text-yellow-800"
      case "critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Device Security Scanner</h2>
        <p className="text-muted-foreground">Scan and monitor the security status of all your devices</p>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">My Devices</TabsTrigger>
          <TabsTrigger value="scan">Quick Scan</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(device.type)}
                    <div>
                      <h3 className="font-medium">{device.name}</h3>
                      <p className="text-sm text-muted-foreground">{device.os}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(device.status)}>
                    {device.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Last Scan:</span>
                    <span>{device.lastScan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issues Found:</span>
                    <span className={device.issues > 0 ? "text-yellow-600" : "text-green-600"}>
                      {device.issues}
                    </span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Device
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Security Scan</CardTitle>
              <CardDescription>Perform a quick security check on all connected devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <Wifi className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-medium">Network Security</h4>
                  <p className="text-sm text-muted-foreground">Check network connections</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Lock className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-medium">Encryption Status</h4>
                  <p className="text-sm text-muted-foreground">Verify device encryption</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-medium">Security Updates</h4>
                  <p className="text-sm text-muted-foreground">Check for updates</p>
                </div>
              </div>

              <Button 
                onClick={handleScan} 
                disabled={scanning}
                className="w-full"
              >
                {scanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning Devices...
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4 mr-2" />
                    Start Security Scan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scanner Settings</CardTitle>
              <CardDescription>Configure device scanning preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-scan devices</h4>
                    <p className="text-sm text-muted-foreground">Automatically scan devices daily</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Real-time monitoring</h4>
                    <p className="text-sm text-muted-foreground">Monitor device security in real-time</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified of security issues</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}