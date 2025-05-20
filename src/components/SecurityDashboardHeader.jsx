"use client"

import { useTheme } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const SecurityDashboardHeader = ({ securityScore, threatCount, vulnerabilityCount, className }) => {
  const { isDarkTheme } = useTheme()

  // Determine security level based on score
  const getSecurityLevel = (score) => {
    if (score >= 90) return "secure"
    if (score >= 70) return "low"
    if (score >= 50) return "medium"
    return "high"
  }

  // Get color classes based on score
  const getScoreColorClasses = (score) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-blue-600 dark:text-blue-400"
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  // Get progress color based on score
  const getProgressColor = (score) => {
    if (score >= 90) return "bg-green-600 dark:bg-green-500"
    if (score >= 70) return "bg-blue-600 dark:bg-blue-500"
    if (score >= 50) return "bg-yellow-600 dark:bg-yellow-500"
    return "bg-red-600 dark:bg-red-500"
  }

  const securityLevel = getSecurityLevel(securityScore)

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
          <p className="text-m">Security Score: {securityScore}</p>
          <p className="text-m">Threats: {threatCount}</p>
          <p className="text-m">Vulnerabilities: {vulnerabilityCount}</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className={getScoreColorClasses(securityScore)}>Security Level: {securityLevel}</span>
        </div>
      </div>
      <Card>
        <CardContent>
          <Progress value={securityScore} className={getProgressColor(securityScore)} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SecurityDashboardHeader
