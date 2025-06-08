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
import { ShieldAlert, Plus, Trash2, Info, Globe, Server, Wifi, AlertTriangle, Shield, Lock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

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

  const firewallStats = [
    {
      title: "Active Rules",
      value: "156",
      icon: Shield,
      color: "text-cyan-400",
    },
    {
      title: "Blocked Attempts",
      value: "2,847",
      icon: Lock,
      color: "text-green-400",
    },
    {
      title: "Suspicious IPs",
      value: "23",
      icon: AlertTriangle,
      color: "text-orange-400",
    },
    {
      title: "Protected Services",
      value: "12",
      icon: CheckCircle,
      color: "text-blue-400",
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
          <Shield className="h-6 w-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white">Firewall Management</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {firewallStats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm font-medium text-slate-400">Last 24h</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-800/50 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-white font-medium">Suspicious Connection Attempt</p>
                    <p className="text-sm text-slate-400">IP: 192.168.1.100</p>
                  </div>
                </div>
                <span className="text-sm text-slate-400">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Rule Update</p>
                    <p className="text-sm text-slate-400">Added new blocking rule</p>
                  </div>
                </div>
                <span className="text-sm text-slate-400">15 minutes ago</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Active Rules</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Block Suspicious IPs</h4>
                  <span className="text-sm text-green-400">Active</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">
                  Automatically blocks IPs with suspicious activity patterns
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Type: Automatic</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400">Priority: High</span>
                </div>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Port 22 Protection</h4>
                  <span className="text-sm text-green-400">Active</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">
                  Rate limiting and brute force protection for SSH access
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Type: Manual</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400">Priority: Critical</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
