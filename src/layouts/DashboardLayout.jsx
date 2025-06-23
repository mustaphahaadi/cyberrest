"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import MainSidebar from "../components/MainSidebar"
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar"
import { ModeToggle } from "../components/ModeToggle"
import { Button } from "../components/ui/button"
import { User, LogOut } from "lucide-react"

export default function DashboardLayout({ children }) {
  const { user, logout, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-lg font-semibold">
                {location.pathname === "/dashboard" 
                  ? "Dashboard" 
                  : location.pathname.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Dashboard"
                }
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {user?.name || user?.email}
                </span>
                <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}