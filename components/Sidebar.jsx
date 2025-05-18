"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Shield,
  Lock,
  Search,
  AlertTriangle,
  Wifi,
  FileText,
  CheckSquare,
  Bell,
  Key,
  FileDigit,
  Globe,
  ShieldAlert,
  Scan,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

function Sidebar() {
  const location = useLocation()
  const [openCategories, setOpenCategories] = useState({
    tools: true,
  })

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const sidebarItems = [
    {
      category: "Main",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <Shield className="h-5 w-5" />,
        },
        {
          name: "Profile",
          path: "/dashboard/profile",
          icon: <Settings className="h-5 w-5" />,
        },
      ],
    },
    {
      category: "Tools",
      id: "tools",
      icon: <ChevronDown className="h-4 w-4" />,
      collapsible: true,
      items: [
        {
          name: "Password Analyzer",
          path: "/dashboard/tools/password-analyzer",
          icon: <Lock className="h-5 w-5" />,
        },
        {
          name: "Password Generator",
          path: "/dashboard/tools/password-generator",
          icon: <Key className="h-5 w-5" />,
        },
        {
          name: "Data Breach Scanner",
          path: "/dashboard/tools/data-breach-scanner",
          icon: <Search className="h-5 w-5" />,
        },
        {
          name: "Phishing Detector",
          path: "/dashboard/tools/phishing-detector",
          icon: <AlertTriangle className="h-5 w-5" />,
        },
        {
          name: "Network Scanner",
          path: "/dashboard/tools/network-scanner",
          icon: <Wifi className="h-5 w-5" />,
        },
        {
          name: "Encryption Tool",
          path: "/dashboard/tools/encryption-tool",
          icon: <FileDigit className="h-5 w-5" />,
        },
        {
          name: "File Integrity Checker",
          path: "/dashboard/tools/file-integrity-checker",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          name: "Vulnerability Assessment",
          path: "/dashboard/tools/vulnerability-assessment",
          icon: <ShieldAlert className="h-5 w-5" />,
        },
        {
          name: "Security News",
          path: "/dashboard/tools/security-news",
          icon: <Bell className="h-5 w-5" />,
        },
        {
          name: "Two-Factor Manager",
          path: "/dashboard/tools/two-factor-manager",
          icon: <Key className="h-5 w-5" />,
        },
        {
          name: "Secure Notes",
          path: "/dashboard/tools/secure-notes",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          name: "VPN Manager",
          path: "/dashboard/tools/vpn-manager",
          icon: <Globe className="h-5 w-5" />,
        },
        {
          name: "Firewall Tool",
          path: "/dashboard/tools/firewall-tool",
          icon: <Shield className="h-5 w-5" />,
        },
        {
          name: "Malware Scanner",
          path: "/dashboard/tools/malware-scanner",
          icon: <Scan className="h-5 w-5" />,
        },
        {
          name: "Security Audit",
          path: "/dashboard/tools/security-audit",
          icon: <CheckSquare className="h-5 w-5" />,
        },
      ],
    },
  ]

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold">CyberRest</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {sidebarItems.map((section) => (
          <div key={section.category} className="mb-6">
            {section.collapsible ? (
              <button
                onClick={() => toggleCategory(section.id)}
                className="flex w-full items-center justify-between mb-2 text-sm font-medium text-muted-foreground"
              >
                {section.category}
                {openCategories[section.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="mb-2 text-sm font-medium text-muted-foreground">{section.category}</div>
            )}
            {(!section.collapsible || openCategories[section.id]) && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive(item.path)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
