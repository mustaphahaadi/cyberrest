"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Badge from "@/components/ui/badge"
import { ShieldAlert, Plus, Trash2, Info, Globe, Server, Wifi, AlertTriangle } from "lucide-react"

export default function FirewallTool() {
  const [firewallEnabled, setFirewallEnabled] = useState(true)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    direction: "inbound",
    action: "block",
    protocol: "tcp",
    port: "",
    source: "",
  })

  const [rules, setRules] = useState([
    {
      id: 1,
      name: "Block Telnet",
      direction: "inbound",
      action: "block",
      protocol: "tcp",
      port: "23",
      source: "Any",
      enabled: true,
    },
    {
      id: 2,
      name: "Allow HTTPS",
      direction: "inbound",
      action: "allow",
      protocol: "tcp",
      port: "443",
      source: "Any",
      enabled: true,
    },
    {
      id: 3,
      name: "Block FTP",
      direction: "inbound",
      action: "block",
      protocol: "tcp",
      port: "21",
      source: "Any",
      enabled: true,
    },
    {
      id: 4,
      name: "Allow SSH",
      direction: "inbound",
      action: "allow",
      protocol: "tcp",
      port: "22",
      source: "192.168.1.0/24",
      enabled: true,
    },
  ])

  const handleAddRule = () => {
    if (newRule.name && newRule.port) {
      setRules([
        ...rules,
        {
          id: Date.now(),
          ...newRule,
          source: newRule.source || "Any",
          enabled: true,
        },
      ])
      setNewRule({
        name: "",
        direction: "inbound",
        action: "block",
        protocol: "tcp",
        port: "",
        source: "",
      })
    }
  }

  const handleDeleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const handleToggleRule = (id) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const getActionColor = (action) => {
    return action === "allow" ? "bg-green-500" : "bg-red-500"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Firewall Configuration Tool</CardTitle>
              <CardDescription>Configure and manage your firewall rules</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="firewall-toggle" className="font-medium">
                Firewall
              </Label>
              <Switch id="firewall-toggle" checked={firewallEnabled} onCheckedChange={setFirewallEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rules">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rules">Firewall Rules</TabsTrigger>
              <TabsTrigger value="add">Add Rule</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-4 pt-4">
              {!firewallEnabled && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Firewall is currently disabled. Your system may be vulnerable to unauthorized access.
                  </AlertDescription>
                </Alert>
              )}

              {rules.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <ShieldAlert className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No firewall rules configured</p>
                  <p className="text-sm">Add rules to control network traffic</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rules.map((rule) => (
                    <div key={rule.id} className={`border rounded-lg p-3 ${!rule.enabled ? "opacity-60" : ""}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Badge className={getActionColor(rule.action)}>{rule.action.toUpperCase()}</Badge>
                            <h3 className="font-medium ml-2">{rule.name}</h3>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 space-x-2">
                            <span>{rule.direction === "inbound" ? "Inbound" : "Outbound"}</span>
                            <span>•</span>
                            <span>{rule.protocol.toUpperCase()}</span>
                            <span>•</span>
                            <span>Port: {rule.port}</span>
                            {rule.source !== "Any" && (
                              <>
                                <span>•</span>
                                <span>Source: {rule.source}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`rule-${rule.id}`}
                            checked={rule.enabled}
                            onCheckedChange={() => handleToggleRule(rule.id)}
                            aria-label={`Toggle ${rule.name}`}
                          />
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    placeholder="e.g., Block Telnet"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-direction">Direction</Label>
                  <Select
                    value={newRule.direction}
                    onValueChange={(value) => setNewRule({ ...newRule, direction: value })}
                  >
                    <SelectTrigger id="rule-direction">
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-action">Action</Label>
                  <Select value={newRule.action} onValueChange={(value) => setNewRule({ ...newRule, action: value })}>
                    <SelectTrigger id="rule-action">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allow">Allow</SelectItem>
                      <SelectItem value="block">Block</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-protocol">Protocol</Label>
                  <Select
                    value={newRule.protocol}
                    onValueChange={(value) => setNewRule({ ...newRule, protocol: value })}
                  >
                    <SelectTrigger id="rule-protocol">
                      <SelectValue placeholder="Select protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tcp">TCP</SelectItem>
                      <SelectItem value="udp">UDP</SelectItem>
                      <SelectItem value="icmp">ICMP</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-port">Port</Label>
                  <Input
                    id="rule-port"
                    placeholder="e.g., 80, 443, or 1000-2000"
                    value={newRule.port}
                    onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-source">Source (Optional)</Label>
                  <Input
                    id="rule-source"
                    placeholder="e.g., 192.168.1.0/24 or leave empty for Any"
                    value={newRule.source}
                    onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleAddRule} className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Firewall Rule
              </Button>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="advanced-mode">Advanced Mode</Label>
                    <p className="text-xs text-muted-foreground">Enable advanced firewall configuration options</p>
                  </div>
                  <Switch id="advanced-mode" checked={advancedMode} onCheckedChange={setAdvancedMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stealth-mode">Stealth Mode</Label>
                    <p className="text-xs text-muted-foreground">Don't respond to ping requests</p>
                  </div>
                  <Switch id="stealth-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-block">Auto-Block Suspicious IPs</Label>
                    <p className="text-xs text-muted-foreground">Automatically block IPs with suspicious activity</p>
                  </div>
                  <Switch id="auto-block" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="logging">Enable Logging</Label>
                    <p className="text-xs text-muted-foreground">Log all blocked connection attempts</p>
                  </div>
                  <Switch id="logging" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-outbound">Default Outbound Policy</Label>
                  <Select defaultValue="allow">
                    <SelectTrigger id="default-outbound">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allow">Allow (Recommended)</SelectItem>
                      <SelectItem value="block">Block</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls what happens to outbound connections that don't match any rules
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-inbound">Default Inbound Policy</Label>
                  <Select defaultValue="block">
                    <SelectTrigger id="default-inbound">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allow">Allow</SelectItem>
                      <SelectItem value="block">Block (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls what happens to inbound connections that don't match any rules
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4">
            <div className="border rounded-lg p-3 flex items-center">
              <Globe className="h-5 w-5 mr-3 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium">Internet Zone</h3>
                <p className="text-xs text-muted-foreground">{firewallEnabled ? "Protected" : "Unprotected"}</p>
              </div>
            </div>

            <div className="border rounded-lg p-3 flex items-center">
              <Server className="h-5 w-5 mr-3 text-purple-500" />
              <div>
                <h3 className="text-sm font-medium">Public Services</h3>
                <p className="text-xs text-muted-foreground">
                  {rules.filter((r) => r.action === "allow" && r.enabled).length} Allowed
                </p>
              </div>
            </div>

            <div className="border rounded-lg p-3 flex items-center">
              <Wifi className="h-5 w-5 mr-3 text-green-500" />
              <div>
                <h3 className="text-sm font-medium">Local Network</h3>
                <p className="text-xs text-muted-foreground">Trusted Zone</p>
              </div>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              A properly configured firewall is essential for protecting your system from unauthorized access and
              network threats.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}
