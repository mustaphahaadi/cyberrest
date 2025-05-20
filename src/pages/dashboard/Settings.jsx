"use client"

import Badge from "@/components/ui/badge"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Info, AlertTriangle, Trash2 } from "lucide-react"

export default function Settings() {
  const { user } = useAuth()
  const [formState, setFormState] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    saving: false,
    success: false,
    error: null,
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    securityAlerts: true,
    productUpdates: true,
    marketingEmails: false,
    autoScan: true,
    scanFrequency: "weekly",
    darkMode: false,
    language: "english",
    timezone: "UTC",
    twoFactorAuth: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value, success: false, error: null }))
  }

  const handlePreferenceChange = (name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setFormState((prev) => ({ ...prev, saving: true, success: false, error: null }))

    // Simulate API call
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        saving: false,
        success: true,
        error: null,
      }))
    }, 1500)
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()

    // Basic validation
    if (formState.newPassword !== formState.confirmPassword) {
      setFormState((prev) => ({
        ...prev,
        error: "New passwords do not match",
      }))
      return
    }

    if (formState.newPassword.length < 8) {
      setFormState((prev) => ({
        ...prev,
        error: "Password must be at least 8 characters long",
      }))
      return
    }

    setFormState((prev) => ({ ...prev, saving: true, success: false, error: null }))

    // Simulate API call
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        saving: false,
        success: true,
        error: null,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    }, 1500)
  }

  const handlePreferencesUpdate = (e) => {
    e.preventDefault()

    // Simulate API call
    setTimeout(() => {
      // Success notification would be shown here
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 md:inline-flex">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 pt-4">
          <Card>
            <form onSubmit={handleProfileUpdate}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formState.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formState.email} onChange={handleInputChange} />
                </div>

                {formState.success && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <Check className="h-4 w-4" />
                    <AlertDescription>Profile information updated successfully.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={formState.saving}>
                  {formState.saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <img src="/placeholder.svg?height=96&width=96" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">
                    Upload a new profile picture. The image should be square and at least 200x200 pixels.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Button size="sm" variant="outline">
                      Upload Image
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <form onSubmit={handlePasswordUpdate}>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formState.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formState.newPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formState.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                {formState.error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{formState.error}</AlertDescription>
                  </Alert>
                )}

                {formState.success && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <Check className="h-4 w-4" />
                    <AlertDescription>Password updated successfully.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={formState.saving}>
                  {formState.saving ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={preferences.twoFactorAuth}
                  onCheckedChange={(checked) => handlePreferenceChange("twoFactorAuth", checked)}
                />
              </div>

              {preferences.twoFactorAuth && (
                <div className="pt-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Two-factor authentication is enabled. You will need to enter a verification code when logging in.
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Manage 2FA Settings
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active sessions across devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="space-y-1">
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">Windows 11 • Chrome • New York, USA</p>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                  <Badge>Current</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="space-y-1">
                    <p className="font-medium">Mobile App</p>
                    <p className="text-sm text-muted-foreground">iOS 16 • CyberRest App • New York, USA</p>
                    <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Logout from All Devices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 pt-4">
          <Card>
            <form onSubmit={handlePreferencesUpdate}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="securityAlerts" className="flex flex-col gap-1">
                        <span>Security Alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications about security threats and vulnerabilities
                        </span>
                      </Label>
                      <Switch
                        id="securityAlerts"
                        checked={preferences.securityAlerts}
                        onCheckedChange={(checked) => handlePreferenceChange("securityAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="productUpdates" className="flex flex-col gap-1">
                        <span>Product Updates</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications about new features and improvements
                        </span>
                      </Label>
                      <Switch
                        id="productUpdates"
                        checked={preferences.productUpdates}
                        onCheckedChange={(checked) => handlePreferenceChange("productUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketingEmails" className="flex flex-col gap-1">
                        <span>Marketing Emails</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive promotional emails and special offers
                        </span>
                      </Label>
                      <Switch
                        id="marketingEmails"
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Scan Settings</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoScan" className="flex flex-col gap-1">
                        <span>Automatic Scanning</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Automatically scan your system for security threats
                        </span>
                      </Label>
                      <Switch
                        id="autoScan"
                        checked={preferences.autoScan}
                        onCheckedChange={(checked) => handlePreferenceChange("autoScan", checked)}
                      />
                    </div>
                    {preferences.autoScan && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="scanFrequency" className="flex flex-col gap-1">
                          <span>Scan Frequency</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            How often to automatically scan your system
                          </span>
                        </Label>
                        <Select
                          value={preferences.scanFrequency}
                          onValueChange={(value) => handlePreferenceChange("scanFrequency", value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Display Settings</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="language" className="flex flex-col gap-1">
                        <span>Language</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Select your preferred language
                        </span>
                      </Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => handlePreferenceChange("language", value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timezone" className="flex flex-col gap-1">
                        <span>Timezone</span>
                        <span className="font-normal text-xs text-muted-foreground">Select your timezone</span>
                      </Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => handlePreferenceChange("timezone", value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                          <SelectItem value="CST">Central Time (CST)</SelectItem>
                          <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Preferences</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Data Collection</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="usageData" className="flex flex-col gap-1">
                      <span>Usage Data</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Allow us to collect anonymous usage data to improve our services
                      </span>
                    </Label>
                    <Switch id="usageData" checked={true} onCheckedChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="crashReports" className="flex flex-col gap-1">
                      <span>Crash Reports</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Automatically send crash reports to help us fix issues
                      </span>
                    </Label>
                    <Switch id="crashReports" checked={true} onCheckedChange={() => {}} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Your Data</h3>
                <div className="grid gap-3">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Export Your Data</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download a copy of all the data we have stored for your account.
                    </p>
                    <Button variant="outline">Export Data</Button>
                  </div>
                  <div className="p-4 border rounded-md border-red-200 bg-red-50">
                    <h4 className="font-medium mb-2 text-red-600">Delete Your Account</h4>
                    <p className="text-sm text-red-600/80 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
