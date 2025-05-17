"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield, AlertCircle, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    if (!agreeTerms) {
      return setError("You must agree to the terms and conditions")
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard (would use React Router in a real app)
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Failed to create an account. Please try again.")
      setLoading(false)
    }
  }

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: "No password" }

    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Map score to text
    let text = ""
    if (score <= 2) text = "Weak"
    else if (score <= 4) text = "Moderate"
    else text = "Strong"

    return { score: Math.min(score, 6), text }
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthColor =
    passwordStrength.text === "Weak"
      ? "bg-red-500"
      : passwordStrength.text === "Moderate"
        ? "bg-yellow-500"
        : "bg-green-500"

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-2 text-center mb-8">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your CyberRest Account</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-[600px]">
            Sign up to access all our cybersecurity tools and protect your digital life
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Sign Up</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Create a free account to get started</p>

            {error && (
              <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Password Strength:</span>
                      <span className="text-sm font-medium">{passwordStrength.text}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthColor}`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center text-xs">
                        <CheckCircle
                          className={`h-3 w-3 mr-1 ${password.length >= 8 ? "text-green-500" : "text-gray-400"}`}
                        />
                        <span>8+ characters</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <CheckCircle
                          className={`h-3 w-3 mr-1 ${/[A-Z]/.test(password) ? "text-green-500" : "text-gray-400"}`}
                        />
                        <span>Uppercase letter</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <CheckCircle
                          className={`h-3 w-3 mr-1 ${/[0-9]/.test(password) ? "text-green-500" : "text-gray-400"}`}
                        />
                        <span>Number</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <CheckCircle
                          className={`h-3 w-3 mr-1 ${/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-gray-400"}`}
                        />
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
