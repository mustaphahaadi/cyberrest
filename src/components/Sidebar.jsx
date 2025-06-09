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
  Menu,
  X,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator
} from "./ui/sidebar"

function Sidebar() {
  const location = useLocation()
  const [openCategories, setOpenCategories] = useState({
    tools: true,
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      items: [
        {
          name: "Password Analyzer",
          path: "/dashboard/tools/password-analyzer",
          icon: <Key className="h-5 w-5" />,
        },
        {
          name: "Password Generator",
          path: "/dashboard/tools/password-generator",
          icon: <FileDigit className="h-5 w-5" />,
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
          icon: <Lock className="h-5 w-5" />,
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
          icon: <CheckSquare className="h-5 w-5" />,
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
          icon: <Shield className="h-5 w-5" />,
        },
      ],
    },
  ]

  const renderSidebarContent = () => (
    <SidebarContent className="flex-1 overflow-auto py-4">
      {sidebarItems.map((categoryGroup, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">
            {categoryGroup.category}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryGroup.items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    onClick={() => {
                      if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile sidebar on item click
                    }}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          {index < sidebarItems.length - 1 && <SidebarSeparator className="my-2" />}
        </SidebarGroup>
      ))}
    </SidebarContent>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-background border-r transform transition-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {renderSidebarContent()} {/* Render the actual sidebar content */}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="flex h-screen w-64 flex-col border-r bg-background">
        {renderSidebarContent()} {/* Render the actual sidebar content */}
      </div>
    </>
  )
}

export default Sidebar
