"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/ModeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import {
  Home,
  Shield,
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
  CreditCard,
  Settings,
  HelpCircle,
  BarChart,
  LogOut,
  User,
  Users,
  LinkIcon,
  Eye,
  GraduationCap,
  FileCheck,
} from "lucide-react"

export default function DashboardLayout() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const tools = [
    { name: "Password Analyzer", path: "/tools/password-analyzer", icon: Key },
    { name: "Password Generator", path: "/tools/password-generator", icon: Lock },
    { name: "Data Breach Scanner", path: "/tools/data-breach-scanner", icon: Search },
    { name: "Dark Web Monitor", path: "/tools/dark-web-monitor", icon: Eye },
    { name: "Phishing Detector", path: "/tools/phishing-detector", icon: Globe },
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
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login (would use React Router in a real app)
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CyberRest</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Security Tools</h2>
            <div className="space-y-1">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    location.pathname === tool.path ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <tool.icon className="h-6 w-6" />
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard Sections</h2>
            <div className="space-y-1">
              <Link
                to="/dashboard"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Home className="h-6 w-6" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/dashboard/analytics"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/analytics" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <BarChart className="h-6 w-6" />
                <span>Analytics</span>
              </Link>
              <Link
                to="/dashboard/team"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/team" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Users className="h-6 w-6" />
                <span>Team</span>
              </Link>
              <Link
                to="/dashboard/subscription"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/subscription" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <CreditCard className="h-6 w-6" />
                <span>Subscription</span>
              </Link>
              <Link
                to="/dashboard/api-integrations"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/api-integrations" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <LinkIcon className="h-6 w-6" />
                <span>API & Integrations</span>
              </Link>
              <Link
                to="/dashboard/usage"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/usage" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <BarChart className="h-6 w-6" />
                <span>Usage</span>
              </Link>
              <Link
                to="/dashboard/settings"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/settings" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Link>
              <Link
                to="/dashboard/support"
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  location.pathname === "/dashboard/support" ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <HelpCircle className="h-6 w-6" />
                <span>Support</span>
              </Link>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={user?.name} />
                        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ModeToggle />
            </div>
          </div>
        </Sidebar>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );\
}
