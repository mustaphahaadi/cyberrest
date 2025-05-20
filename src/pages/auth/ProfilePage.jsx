"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { useAuth } from "../../contexts/AuthContext"
import { User, Shield, Bell, CreditCard, CheckCircle } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [profileUpdated, setProfileUpdated] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const [error, setError] = useState("")
  
  const [profile, setProfile] = useState({
    name: user?.name || "Demo User",
    email: user?.email || "demo@example.com",
    phone: "",
    company: "",
  })
  
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  
  const [notifications, setNotifications] = useState({
    securityAlerts: true,
    newFeatures: true,
    tips: true,
    marketing: false,
  })

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setProfileUpdated(true)
      setTimeout(() => setProfileUpdated(false), 3000)
    }, 1000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    
    if (password.new !== password.confirm) {
      setError("New passwords do not match")
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setPasswordUpdated(true)
      setPassword({
        current: "",
        new: "",
        confirm: "",
      })
      setError("")
      setTimeout(() => setPasswordUpdated(false), 3000)
    }, 1000)
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPassword({ ...password, [name]: value })
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Manage your profile, security, and notification preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profileUpdated && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Profile updated successfully!
                </Alert>
              )}
            </CardContent>
          </Card>\
        </TabsContent>
