"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle, CheckCircle, Shield, Lock, User, Globe } from "lucide-react"

export default function SecurityActivityLog() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivityLog()
  }, [])

  const fetchActivityLog = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock activity data
      const mockActivities = [
        {
          id: 1,
          type: "login",
          description: "Successful login from Chrome on Windows",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          ip: "192.168.1.1",
          location: "New York, USA",
          status: "success",
        },
        {
          id: 2,
          type: "password_change",
          description: "Password changed successfully",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          status: "success",
        },
        {
          id: 3,
          type: "login_attempt",
          description: "Failed login attempt from unknown device",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          ip: "45.67.89.123",
          location: "Unknown",
          status: "failed",
        },
        {
          id: 4,
          type: "security_scan",
          description: "Security scan completed",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          status: "success",
          details: "No issues found",
        },
        {
          id: 5,
          type: "2fa_enabled",
          description: "Two-factor authentication enabled",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
          status: "success",
        },
      ]

      setActivities(mockActivities)
      setLoading(false)
    }, 1500)
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return `${diffSec} seconds ago`
    if (diffMin < 60) return `${diffMin} minutes ago`
    if (diffHour < 24) return `${diffHour} hours ago`
    if (diffDay < 7) return `${diffDay} days ago`

    return date.toLocaleDateString()
  }

  const getActivityIcon = (type, status) => {
    if (status === "failed") return <AlertTriangle className="h-5 w-5 text-red-500" />

    switch (type) {
      case "login":
        return <User className="h-5 w-5 text-blue-500" />
      case "login_attempt":
        return <User className="h-5 w-5 text-yellow-500" />
      case "password_change":
        return <Lock className="h-5 w-5 text-green-500" />
      case "security_scan":
        return <Shield className="h-5 w-5 text-purple-500" />
      case "2fa_enabled":
        return <Shield className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Failed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Pending
          </span>
        )
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Security Activity Log</h3>
          <button onClick={fetchActivityLog} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex">
                <div className="flex-shrink-0">{getActivityIcon(activity.type, activity.status)}</div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.description}</p>
                    {getStatusBadge(activity.status)}
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatTimestamp(activity.timestamp)}</span>

                    {activity.ip && (
                      <>
                        <span className="mx-1">•</span>
                        <Globe className="h-3 w-3 mr-1" />
                        <span>{activity.ip}</span>
                      </>
                    )}

                    {activity.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{activity.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              View Full Activity Log
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
