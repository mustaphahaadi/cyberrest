"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, AlertCircle, Info, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  // Mock password analysis function
  const analyzePassword = (pwd) => {
    if (!pwd) return { score: 0, feedback: [] }

    let score = 0
    const feedback = []

    // Length check
    if (pwd.length < 8) {
      feedback.push({ type: "error", message: "Password is too short (minimum 8 characters)" })
    } else if (pwd.length >= 12) {
      score += 25
      feedback.push({ type: "success", message: "Good password length" })
    } else {
      score += 15
      feedback.push({ type: "warning", message: "Password could be longer" })
    }

    // Uppercase check
    if (/[A-Z]/.test(pwd)) {
      score += 20
      feedback.push({ type: "success", message: "Contains uppercase letters" })
    } else {
      feedback.push({ type: "error", message: "No uppercase letters" })
    }

    // Lowercase check
    if (/[a-z]/.test(pwd)) {
      score += 15
      feedback.push({ type: "success", message: "Contains lowercase letters" })
    } else {
      feedback.push({ type: "error", message: "No lowercase letters" })
    }

    // Number check
    if (/\d/.test(pwd)) {
      score += 20
      feedback.push({ type: "success", message: "Contains numbers" })
    } else {
      feedback.push({ type: "error", message: "No numbers" })
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(pwd)) {
      score += 20
      feedback.push({ type: "success", message: "Contains special characters" })
    } else {
      feedback.push({ type: "error", message: "No special characters" })
    }

    // Common patterns check
    if (/123|abc|qwerty|password|admin/i.test(pwd)) {
      score -= 20
      feedback.push({ type: "error", message: "Contains common patterns" })
    }

    return { score: Math.min(Math.max(score, 0), 100), feedback }
  }

  const handleAnalyze = () => {
    setAnalyzed(true)
  }

  const { score, feedback } = analyzePassword(password)

  const getScoreColor = (score) => {
    if (score < 40) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    return "text-green-500"
  }

  const getScoreText = (score) => {
    if (score < 40) return "Weak"
    if (score < 70) return "Moderate"
    return "Strong"
  }

  const getProgressColor = (score) => {
    if (score < 40) return "bg-red-500"
    if (score < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Password Strength Analyzer</CardTitle>
          <CardDescription>Check how strong your password is against common attacks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setAnalyzed(false)
                }}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Your password is never stored or transmitted</p>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!password}
            className="w-full"
          >
            Analyze Password
          </Button>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              A strong password should be at least 12 characters long and include uppercase letters, lowercase letters,
              numbers, and special characters.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            {analyzed ? "Detailed breakdown of your password strength" : "Enter a password and click Analyze"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {analyzed && password && (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  <span className={getScoreColor(score)}>{score}/100</span>
                </div>
                <div className={`text-lg font-medium ${getScoreColor(score)}`}>{getScoreText(score)}</div>
                <Progress value={score} className="mt-2 h-2" />
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Feedback:</h3>
                {feedback.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {item.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />}
                    {item.type === "error" && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                    {item.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                    <span className="text-sm">{item.message}</span>
                  </div>
                ))}
              </div>

              {score < 70 && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Try our Password Generator tool to create a stronger password.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {(!analyzed || !password) && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
              <AlertCircle className="h-10 w-10 mb-2 opacity-50" />
              <p>No password analyzed yet</p>
              <p className="text-sm">Enter a password and click Analyze to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}