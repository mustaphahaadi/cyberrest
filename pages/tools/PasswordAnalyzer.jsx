"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react"

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("")
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
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="font-medium">Password Strength Analyzer</div>
          <div className="text-sm text-gray-500">Check how strong your password is against common attacks</div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setAnalyzed(false)
              }}
            />
            <p className="text-xs text-gray-500">Your password is never stored or transmitted</p>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!password}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            Analyze Password
          </button>
        </div>
        <div className="p-4 border-t">
          <div className="bg-blue-50 p-3 rounded flex items-start">
            <Info className="h-4 w-4 mt-0.5 mr-2 text-blue-500" />
            <div className="text-sm text-blue-800">
              A strong password should be at least 12 characters long and include uppercase letters, lowercase letters,
              numbers, and special characters.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="font-medium">Analysis Results</div>
          <div className="text-sm text-gray-500">
            {analyzed ? "Detailed breakdown of your password strength" : "Enter a password and click Analyze"}
          </div>
        </div>
        <div className="p-4 space-y-6">
          {analyzed && password && (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  <span className={getScoreColor(score)}>{score}/100</span>
                </div>
                <div className={`text-lg font-medium ${getScoreColor(score)}`}>{getScoreText(score)}</div>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className={`h-2 ${getProgressColor(score)} rounded-full`} style={{ width: `${score}%` }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Feedback:</h3>
                {feedback.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {item.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />}
                    {item.type === "error" && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                    {item.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>

              {score < 70 && (
                <div className="bg-blue-50 p-3 rounded flex items-start">
                  <Info className="h-4 w-4 mt-0.5 mr-2 text-blue-500" />
                  <div className="text-sm text-blue-800">
                    Try our Password Generator tool to create a stronger password.
                  </div>
                </div>
              )}
            </>
          )}

          {(!analyzed || !password) && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
              <AlertCircle className="h-10 w-10 mb-2" />
              <p>No password analyzed yet</p>
              <p className="text-sm">Enter a password and click Analyze to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
