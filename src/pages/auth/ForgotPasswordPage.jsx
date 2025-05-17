"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield, AlertCircle, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-2 text-center mb-8">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Your Password</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-[600px]">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Forgot Password</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              We'll email you instructions to reset your password
            </p>

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

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">Check Your Email</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">We've sent password reset instructions to:</p>
                <p className="font-medium mb-4 text-gray-900 dark:text-white">{email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  If you don't see the email, check your spam folder or{" "}
                  <button
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    onClick={() => setSubmitted(false)}
                  >
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
