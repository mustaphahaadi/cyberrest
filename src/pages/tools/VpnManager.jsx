"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Globe, Shield, Power, Info, Activity, Map, Clock, Zap } from "lucide-react"

export default function VpnManager() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [selectedServer, setSelectedServer] = useState("auto")
  const [killSwitch, setKillSwitch] = useState(true)
  const [splitTunneling, setSplitTunneling] = useState(false)
  const [protocol, setProtocol] = useState("auto")

  const servers = [
    { id: "auto", name: "Auto Select (Fastest)", location: "Nearest Location", ping: "Auto" },
    { id: "us-east", name: "US East", location: "New York", ping: "45ms" },
    { id: "us-west", name: "US West", location: "Los Angeles", ping: "78ms" },
    { id: "eu-west", name: "Europe West", location: "London", ping: "110ms" },
    { id: "eu-central", name: "Europe Central", location: "Frankfurt", ping: "125ms" },
    { id: "asia-east", name: "Asia East", location: "Tokyo", ping: "180ms" },
    { id: "asia-south", name: "Asia South", location: "Singapore", ping: "160ms" },
  ]

  const handleConnect = () => {
    if (connected) {
      // Disconnect
      setConnected(false)
    } else {
      // Connect
      setConnecting(true)
      setTimeout(() => {
        setConnecting(false)
        setConnected(true)
      }, 2000)
    }
  }

  const getConnectionStatus = () => {
    if (connected) return { text: "Connected", color: "text-green-500" }
    if (connecting) return { text: "Connecting...", color: "text-yellow-500" }
    return { text: "Disconnected", color: "text-red-500" }
  }

  const status = getConnectionStatus()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>VPN Connection Manager</CardTitle>
          <CardDescription>Secure your internet connection with a virtual private network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className={`rounded-full p-6 mb-4 ${connected ? "bg-green-100" : "bg-gray-100"}`}>
              <Power className={`h-12 w-12 ${connected ? "text-green-500" : "text-gray-400"}`} />
            </div>
            <h2 className={`text-xl font-bold ${status.color}`}>{status.text}</h2>
            {connected && (
              <p className="text-sm text-muted-foreground mt-1">
                Connected to {servers.find((s) => s.id === selectedServer)?.name || "VPN Server"}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>VPN Server</Label>
              <Select value={selectedServer} onValueChange={setSelectedServer} disabled={connected}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a server" />
                </SelectTrigger>
                <SelectContent>
                  {servers.map((server) => (
                    <SelectItem key={server.id} value={server.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{server.name}</span>
                        <span className="text-xs text-muted-foreground">{server.ping}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Protocol</Label>
              <Select value={protocol} onValueChange={setProtocol} disabled={connected}>
                <SelectTrigger>
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automatic</SelectItem>
                  <SelectItem value="openvpn-udp">OpenVPN (UDP)</SelectItem>
                  <SelectItem value="openvpn-tcp">OpenVPN (TCP)</SelectItem>
                  <SelectItem value="wireguard">WireGuard</SelectItem>
                  <SelectItem value="ikev2">IKEv2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="kill-switch">Kill Switch</Label>
                <p className="text-xs text-muted-foreground">Block internet if VPN disconnects</p>
              </div>
              <Switch id="kill-switch" checked={killSwitch} onCheckedChange={setKillSwitch} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="split-tunneling">Split Tunneling</Label>
                <p className="text-xs text-muted-foreground">Allow some apps to bypass VPN</p>
              </div>
              <Switch id="split-tunneling" checked={splitTunneling} onCheckedChange={setSplitTunneling} />
            </div>
          </div>

          <Button
            onClick={handleConnect}
            className="w-full"
            disabled={connecting}
            variant={connected ? "destructive" : "default"}
          >
            {connecting ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-pulse" />
                Connecting...
              </>
            ) : connected ? (
              <>
                <Power className="mr-2 h-4 w-4" />
                Disconnect
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Using a VPN encrypts your internet traffic and masks your IP address for enhanced privacy.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connection Statistics</CardTitle>
          <CardDescription>
            {connected ? "Current VPN connection details" : "Connect to view statistics"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <Globe className="h-10 w-10 mb-2 opacity-50" />
              <p>Not connected to VPN</p>
              <p className="text-sm">Connect to view connection statistics</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Download Speed</span>
                  <span className="font-medium">24.5 Mbps</span>
                </div>
                <Progress value={65} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Upload Speed</span>
                  <span className="font-medium">12.8 Mbps</span>
                </div>
                <Progress value={45} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ping</span>
                  <span className="font-medium">48 ms</span>
                </div>
                <Progress value={30} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Map className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">IP Location</span>
                  </div>
                  <p className="text-sm">New York, US</p>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Connected Time</span>
                  </div>
                  <p className="text-sm">00:45:12</p>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Zap className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Data Used</span>
                  </div>
                  <p className="text-sm">256.4 MB</p>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Encryption</span>
                  </div>
                  <p className="text-sm">AES-256-GCM</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="text-sm space-y-2 w-full">
            <h3 className="font-medium">VPN Security Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Always enable the kill switch for maximum protection</li>
              <li>Use secure protocols like WireGuard or OpenVPN</li>
              <li>Check for DNS and WebRTC leaks regularly</li>
              <li>Avoid free VPN services that may log your activity</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
