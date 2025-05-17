"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage or a token)
    const checkAuth = () => {
      try {
        // For demo purposes, we'll create a mock user
        const mockUser = {
          id: "user123",
          name: "Demo User",
          email: "demo@example.com",
          avatar: null,
        }

        const mockSubscription = {
          plan: "premium", // free, premium, business
          status: "active", // active, inactive, cancelled
          startDate: "2023-01-15T00:00:00Z",
          endDate: null,
          billingCycle: "monthly", // monthly, annually
          price: 9.99,
          features: {
            passwordTools: true,
            dataBreachScanner: true,
            phishingDetector: true,
            securityNews: true,
            networkScanner: false,
            encryptionTool: true,
            fileIntegrityChecker: true,
            vulnerabilityAssessment: false,
            twoFactorManager: true,
            secureNotes: true,
            vpnManager: false,
            firewallTool: false,
            malwareScanner: false,
            securityAudit: false,
          },
        }

        setUser(mockUser)
        setSubscription(mockSubscription)
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
        setSubscription(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    // In a real app, this would make an API call to authenticate
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: "user123",
            name: "Demo User",
            email: email,
            avatar: null,
          }

          const mockSubscription = {
            plan: "premium",
            status: "active",
            startDate: "2023-01-15T00:00:00Z",
            endDate: null,
            billingCycle: "monthly",
            price: 9.99,
            features: {
              passwordTools: true,
              dataBreachScanner: true,
              phishingDetector: true,
              securityNews: true,
              networkScanner: false,
              encryptionTool: true,
              fileIntegrityChecker: true,
              vulnerabilityAssessment: false,
              twoFactorManager: true,
              secureNotes: true,
              vpnManager: false,
              firewallTool: false,
              malwareScanner: false,
              securityAudit: false,
            },
          }

          setUser(mockUser)
          setSubscription(mockSubscription)
          resolve(mockUser)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const register = async (email, password, name) => {
    // In a real app, this would make an API call to register
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const mockUser = {
            id: "user123",
            name: name,
            email: email,
            avatar: null,
          }

          const mockSubscription = {
            plan: "free",
            status: "active",
            startDate: new Date().toISOString(),
            endDate: null,
            billingCycle: "monthly",
            price: 0,
            features: {
              passwordTools: true,
              dataBreachScanner: false,
              phishingDetector: true,
              securityNews: true,
              networkScanner: false,
              encryptionTool: false,
              fileIntegrityChecker: false,
              vulnerabilityAssessment: false,
              twoFactorManager: false,
              secureNotes: false,
              vpnManager: false,
              firewallTool: false,
              malwareScanner: false,
              securityAudit: false,
            },
          }

          setUser(mockUser)
          setSubscription(mockSubscription)
          resolve(mockUser)
        } else {
          reject(new Error("Invalid registration data"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    // In a real app, this would clear tokens, etc.
    setUser(null)
    setSubscription(null)
  }

  const updateSubscription = (newSubscription) => {
    setSubscription(newSubscription)
  }

  const hasAccess = (feature) => {
    if (!subscription) return false
    return subscription.features[feature] || false
  }

  const value = {
    user,
    loading,
    subscription,
    login,
    register,
    logout,
    updateSubscription,
    hasAccess,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
