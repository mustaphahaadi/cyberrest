"use client"

import { useTheme } from "@/components/theme-provider"
import { Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

export const SecurityLevel = ["critical", "high", "medium", "low", "secure", "unknown"]

export function SecurityIndicator({ level, size = "md", showLabel = false, className }) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Size mappings
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  // Label text
  const labels = {
    critical: "Critical Risk",
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
    secure: "Secure",
    unknown: "Unknown",
  }

  // Icon mappings
  const IconComponent = {
    critical: ShieldAlert,
    high: ShieldAlert,
    medium: ShieldAlert,
    low: ShieldQuestion,
    secure: ShieldCheck,
    unknown: Shield,
  }[level]

  // Color mappings - adjusted for light/dark themes
  const getColorClasses = () => {
    switch (level) {
      case "critical":
        return isDark ? "text-red-400 bg-red-950/50" : "text-red-600 bg-red-50"
      case "high":
        return isDark ? "text-orange-400 bg-orange-950/50" : "text-orange-600 bg-orange-50"
      case "medium":
        return isDark ? "text-yellow-400 bg-yellow-950/50" : "text-yellow-600 bg-yellow-50"
      case "low":
        return isDark ? "text-blue-400 bg-blue-950/50" : "text-blue-600 bg-blue-50"
      case "secure":
        return isDark ? "text-green-400 bg-green-950/50" : "text-green-600 bg-green-50"
      case "unknown":
      default:
        return isDark ? "text-gray-400 bg-gray-800" : "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className={cn("flex items-center gap-2 rounded-full px-3 py-1", getColorClasses(), className)}>
      {IconComponent && <IconComponent className={sizeClasses[size]} />}
      {showLabel && (
        <span className={cn("font-medium", size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm")}>
          {labels[level]}
        </span>
      )}
    </div>
  )
}
