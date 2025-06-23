"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState({
    plan: "free",
    status: "active",
    startDate: new Date().toISOString(),
    billingCycle: "monthly",
    price: 0
  })
  const navigate = useNavigate()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedSubscription = localStorage.getItem("subscription")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedSubscription) {
      setSubscription(JSON.parse(storedSubscription))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    // This is a mock login function
    // In a real app, you would make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "demo@example.com" && password === "password") {
          const user = {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            role: "user",
          }
          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  // Register function
  const register = (name, email, password) => {
    // This is a mock register function
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = {
          id: "2",
          name,
          email,
          role: "user",
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        resolve(user)
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("subscription")
    navigate("/login")
  }

  const updateSubscription = (newSubscription) => {
    setSubscription(newSubscription)
    localStorage.setItem("subscription", JSON.stringify(newSubscription))
  }

  const value = {
    user,
    loading,
    subscription,
    login,
    register,
    logout,
    updateSubscription,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
