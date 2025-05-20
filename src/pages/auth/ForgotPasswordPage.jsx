"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import { Shield } from "lucide-react"

function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setError("")
    }, 1000)
  }

  return (
    <div>
      <Header />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>
          {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                If an account exists with that email, you'll receive password reset instructions.
              </p>
              <Link to="/login" className="mt-4 block text-sm text-primary hover:underline">
                Return to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Reset Password
              </button>
              <div className="text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default ForgotPasswordPage
