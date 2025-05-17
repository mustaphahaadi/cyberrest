"use client"

import { useState } from "react"
import { AlertTriangle, X, ChevronRight } from "lucide-react"

export default function SecurityAlertBanner({
  title = "Security Alert",
  message = "We've detected a potential security issue with your account.",
  severity = "warning", // warning, critical, info
  onDismiss,
  onAction,
  actionText = "Take Action",
}) {
  const [dismissed, setDismissed] = useState(false)

  const handleDismiss = () => {
    setDismissed(true)
    if (onDismiss) onDismiss()
  }

  const getSeverityClasses = () => {
    switch (severity) {
      case "critical":
        return "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800"
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800"
      default:
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800"
    }
  }

  const getIconColor = () => {
    switch (severity) {
      case "critical":
        return "text-red-500 dark:text-red-400"
      case "info":
        return "text-blue-500 dark:text-blue-400"
      default:
        return "text-yellow-500 dark:text-yellow-400"
    }
  }

  const getTextColor = () => {
    switch (severity) {
      case "critical":
        return "text-red-800 dark:text-red-300"
      case "info":
        return "text-blue-800 dark:text-blue-300"
      default:
        return "text-yellow-800 dark:text-yellow-300"
    }
  }

  const getActionButtonClasses = () => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
      case "info":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
    }
  }

  if (dismissed) return null

  return (
    <div className={`rounded-lg border p-4 mb-6 ${getSeverityClasses()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className={`h-5 w-5 ${getIconColor()}`} />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${getTextColor()}`}>{title}</h3>
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getIconColor()}`}
              onClick={handleDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className={`mt-2 text-sm ${getTextColor()}`}>
            <p>{message}</p>
          </div>
          {onAction && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${getActionButtonClasses()} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  onClick={onAction}
                >
                  <span className="flex items-center">
                    {actionText}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
