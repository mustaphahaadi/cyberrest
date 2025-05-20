"use client"

import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import ProtectedRoute from "../components/ProtectedRoute"
import {
  Key,
  Lock,
  Search,
  Globe,
  FileText,
  ShieldCheck,
  Fingerprint,
  AlertTriangle,
  Newspaper,
  Smartphone,
  FileIcon,
  Wifi,
  ShieldAlert,
  Scan,
  ClipboardCheck,
  Eye,
  GraduationCap,
  FileCheck,
} from "lucide-react"

export default function DashboardLayout() {
  const { user, logout, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const tools = [
    { name: "Password Analyzer", path: "/dashboard/tools/password-analyzer", icon: Key },
    { name: "Password Generator", path: "/dashboard/tools/password-generator", icon: Lock },
    { name: "Data Breach Scanner", path: "/dashboard/tools/data-breach-scanner", icon: Search },
    { name: "Dark Web Monitor", path: "/dashboard/tools/dark-web-monitor", icon: Eye },
    { name: "Phishing Detector", path: "/dashboard/tools/phishing-detector", icon: Globe },
    { name: "Network Scanner", path: "/tools/network-scanner", icon: Wifi },
    { name: "Device Security Scanner", path: "/tools/device-security-scanner", icon: Scan },
    { name: "Encryption Tool", path: "/tools/encryption-tool", icon: FileText },
    { name: "File Integrity Checker", path: "/tools/file-integrity-checker", icon: Fingerprint },
    { name: "Vulnerability Assessment", path: "/tools/vulnerability-assessment", icon: AlertTriangle },
    { name: "Security Training", path: "/tools/security-training", icon: GraduationCap },
    { name: "Compliance Checker", path: "/tools/compliance-checker", icon: FileCheck },
    { name: "Security News", path: "/tools/security-news", icon: Newspaper },
    { name: "Two-Factor Manager", path: "/tools/two-factor-manager", icon: Smartphone },
    { name: "Secure Notes", path: "/tools/secure-notes", icon: FileIcon },
    { name: "VPN Manager", path: "/tools/vpn-manager", icon: ShieldCheck },
    { name: "Firewall Tool", path: "/tools/firewall-tool", icon: ShieldAlert },
    { name: "Malware Scanner", path: "/tools/malware-scanner", icon: Scan },
    { name: "Security Audit", path: "/tools/security-audit", icon: ClipboardCheck },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login (would use React Router in a real app)
    window.location.href = "/login"
    return null
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
