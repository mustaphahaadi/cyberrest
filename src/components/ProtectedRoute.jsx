"use client"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Render the protected content
  return <Outlet />
}
