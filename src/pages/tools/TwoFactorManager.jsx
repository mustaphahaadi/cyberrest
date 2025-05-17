"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, QrCode, Plus, Trash2, RefreshCw, Info, Shield } from "lucide-react"

export default function TwoFactorManager() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Google Account", enabled: true, lastUsed: "2 days ago" },
    { id: 2, name: "GitHub", enabled: true, lastUsed: "1 week ago" },
    { id: 3, name: "Dropbox", enabled: false, lastUsed: "Never" },
  ])
  const [newAccountName, setNewAccountName] = useState("")
  const [showQRCode, setShowQRCode] = useState(false)

  const handleAddAccount = () => {
    if (newAccountName.trim()) {
      setAccounts([
        ...accounts,
        {
          id: accounts.length + 1,
          name: newAccountName,
          enabled: false,
          lastUsed: "Never",
        },
      ])
      setNewAccountName("")
    }
  }

  const handleToggleAccount = (id) => {
    setAccounts(accounts.map((account) => (account.id === id ? { ...account, enabled: !account.enabled } : account)))
  }

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id))
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication Manager</CardTitle>
          <CardDescription>Manage your 2FA accounts and security tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="accounts">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="accounts">My Accounts</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-4 pt-4">
              {accounts.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Smartphone className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No 2FA accounts configured</p>
                  <p className="text-sm">Add your first account to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{account.name}</h3>
                        <p className="text-xs text-muted-foreground">Last used: {account.lastUsed}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`account-${account.id}`}
                            checked={account.enabled}
                            onCheckedChange={() => handleToggleAccount(account.id)}
                          />
                          <Label htmlFor={`account-${account.id}`} className="sr-only">
                            Enable {account.name}
                          </Label>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteAccount(account.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <div className="flex space-x-2">
                  <Input
                    id="account-name"
                    placeholder="Enter account name"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                  />
                  <Button onClick={handleAddAccount}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full" onClick={() => setShowQRCode(!showQRCode)}>
                  <QrCode className="h-4 w-4 mr-2" />
                  {showQRCode ? "Hide QR Code" : "Scan QR Code"}
                </Button>

                {showQRCode && (
                  <div className="mt-4 flex flex-col items-center">
                    <div className="border p-4 rounded-lg bg-white">
                      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Scan this QR code with your authenticator app</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Two-factor authentication adds an extra layer of security to your accounts by requiring a second
              verification step.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication Codes</CardTitle>
          <CardDescription>View your current 2FA codes</CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.filter((a) => a.enabled).length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Shield className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No active 2FA accounts</p>
              <p className="text-sm">Enable an account to view authentication codes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts
                .filter((a) => a.enabled)
                .map((account) => (
                  <div key={account.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{account.name}</h3>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-3xl font-mono tracking-wider">
                        {/* Mock 6-digit code */}
                        {Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full w-1/3"></div>
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-1">Code refreshes in 20 seconds</p>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="text-sm space-y-2 w-full">
            <h3 className="font-medium">Security Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Never share your authentication codes with anyone</li>
              <li>Use a dedicated authenticator app for better security</li>
              <li>Back up your recovery codes in a secure location</li>
              <li>Enable 2FA on all your important accounts</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
