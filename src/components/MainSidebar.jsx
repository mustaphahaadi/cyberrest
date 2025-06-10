"use client"

import * as React from "react"
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
  User,
  Home,
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
  SidebarSeparator,
} from "@/components/ui/sidebar"

function MainSidebar() {
  const location = useLocation()

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
          icon: <Home className="h-5 w-5" />,
        },
        {
          name: "Profile",
          path: "/profile",
          icon: <User className="h-5 w-5" />,
        },
      ],
    },
    {
      category: "Security Tools",
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

  return (
    <Sidebar variant="sidebar" side="left">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CyberRest</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 py-4">
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
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-4 py-2">
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
    </Sidebar>
  )
}

export default MainSidebar