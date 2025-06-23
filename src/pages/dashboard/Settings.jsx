"use client"

import { Badge } from "../../components/ui/badge"
import { motion } from "framer-motion"
import { Settings as SettingsIcon, Bell, Shield, User, Key } from "lucide-react"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Switch } from "../../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Check, Info, AlertTriangle, Trash2 } from "lucide-react"

const Settings = () => {
  const settingsSections = [
    {
      title: "Account Settings",
      icon: User,
      description: "Manage your account preferences and personal information",
    },
    {
      title: "Security Settings",
      icon: Shield,
      description: "Configure security options and authentication methods",
    },
    {
      title: "Notification Settings",
      icon: Bell,
      description: "Customize your notification preferences",
    },
    {
      title: "API Keys",
      icon: Key,
      description: "Manage your API keys and access tokens",
    },
  ]

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="h-6 w-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800/70 transition-colors cursor-pointer"
            >
              <section.icon className="h-8 w-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
              <p className="text-slate-400">{section.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Settings
