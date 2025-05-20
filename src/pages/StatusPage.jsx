"use client"

import { useState } from "react"
import { CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw } from "lucide-react"

const StatusPage = () => {
  // In a real app, this would come from an API
  const [systemStatus, setSystemStatus] = useState({
    overall: "operational", // operational, degraded, outage
    lastUpdated: new Date().toISOString(),
    components: [
      {
        name: "API",
        status: "operational",
        uptime: "99.99%",
      },
      {
        name: "Web Application",
        status: "operational",
        uptime: "99.98%",
      },
      {
        name: "Authentication Services",
        status: "operational",
        uptime: "99.99%",
      },
      {
        name: "Database",
        status: "operational",
        uptime: "99.95%",
      },
      {
        name: "Security Scanning Engine",
        status: "operational",
        uptime: "99.97%",
      },
      {
        name: "Notification System",
        status: "operational",
        uptime: "99.93%",
      },
    ],
    incidents: [
      {
        id: "inc-001",
        title: "API Performance Degradation",
        status: "resolved",
        createdAt: "2023-05-15T14:32:00Z",
        updatedAt: "2023-05-15T16:45:00Z",
        updates: [
          {
            timestamp: "2023-05-15T14:32:00Z",
            message: "We are investigating reports of slow API response times.",
          },
          {
            timestamp: "2023-05-15T15:10:00Z",
            message: "We have identified the issue and are working on a fix.",
          },
          {
            timestamp: "2023-05-15T16:45:00Z",
            message: "The issue has been resolved and API performance has returned to normal.",
          },
        ],
      },
      {
        id: "inc-002",
        title: "Scheduled Maintenance",
        status: "scheduled",
        createdAt: "2023-06-10T08:00:00Z",
        updatedAt: "2023-06-10T08:00:00Z",
        scheduledFor: "2023-06-15T02:00:00Z",
        scheduledUntil: "2023-06-15T04:00:00Z",
        updates: [
          {
            timestamp: "2023-06-10T08:00:00Z",
            message:
              "We will be performing scheduled maintenance on our database systems. During this time, the platform may experience brief periods of unavailability.",
          },
        ],
      },
    ],
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "operational":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Operational
          </span>
        )
      case "degraded":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Degraded
          </span>
        )
      case "outage":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Outage
          </span>
        )
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </span>
        )
      case "resolved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const refreshStatus = () => {
    // In a real app, this would fetch the latest status from an API
    setSystemStatus({
      ...systemStatus,
      lastUpdated: new Date().toISOString(),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">System Status</h1>
          <button
            onClick={refreshStatus}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Last updated: {formatDate(systemStatus.lastUpdated)}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium">Current Status</h2>
          {getStatusBadge(systemStatus.overall)}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl>
            {systemStatus.components.map((component, index) => (
              <div
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">{component.name}</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-1">
                  {getStatusBadge(component.status)}
                </dd>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-1">
                  Uptime: {component.uptime}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Incident History</h2>
        <div className="space-y-6">
          {systemStatus.incidents.map((incident) => (
            <div key={incident.id} className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium">{incident.title}</h3>
                {getStatusBadge(incident.status)}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                {incident.status === "scheduled" && (
                  <div className="mb-4 text-sm">
                    <p className="font-medium">Scheduled Maintenance:</p>
                    <p className="mt-1">
                      From {formatDate(incident.scheduledFor)} to {formatDate(incident.scheduledUntil)}
                    </p>
                  </div>
                )}
                <div className="flow-root">
                  <ul className="-mb-8">
                    {incident.updates.map((update, updateIdx) => (
                      <li key={updateIdx}>
                        <div className="relative pb-8">
                          {updateIdx !== incident.updates.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                              aria-hidden="true"
                            ></span>
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ring-8 ring-white dark:ring-gray-900">
                                <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-800 dark:text-gray-200">{update.message}</p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                {formatDate(update.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium">Subscribe to Updates</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Get notified when there are changes to our system status.
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <form className="sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StatusPage
