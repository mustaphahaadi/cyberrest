"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { User, Shield, Bell, CreditCard, CheckCircle, AlertTriangle } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileUpdated, setProfileUpdated] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const [error, setError] = useState("")

  const [profile, setProfile] = useState({
    name: user?.name || "Demo User",
    email: user?.email || "demo@example.com",
    phone: "",
    company: "",
  })

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [notifications, setNotifications] = useState({
    securityAlerts: true,
    newFeatures: true,
    tips: true,
    marketing: false,
  })

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setProfileUpdated(true)
      setTimeout(() => setProfileUpdated(false), 3000)
    }, 1000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    if (password.new !== password.confirm) {
      setError("New passwords do not match")
      return
    }

    // Simulate API call
    setTimeout(() => {
      setPasswordUpdated(true)
      setPassword({
        current: "",
        new: "",
        confirm: "",
      })
      setError("")
      setTimeout(() => setPasswordUpdated(false), 3000)
    }, 1000)
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPassword({ ...password, [name]: value })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications({ ...notifications, [name]: checked })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-[600px]">
          Manage your profile, security, and notification preferences
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "security"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "notifications"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "billing"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <form onSubmit={handleProfileSubmit}>
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Profile Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Update your account profile information
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Company (optional)
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={profile.company}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {profileUpdated && (
                      <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                        <div className="flex">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <div className="ml-3">
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Profile information updated successfully.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <form onSubmit={handlePasswordSubmit}>
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Change Password</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Update your account password</p>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        name="current"
                        type="password"
                        value={password.current}
                        onChange={handlePasswordChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="new"
                        type="password"
                        value={password.new}
                        onChange={handlePasswordChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirm"
                        type="password"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {passwordUpdated && (
                      <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                        <div className="flex">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <div className="ml-3">
                            <p className="text-sm text-green-700 dark:text-green-300">Password updated successfully.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Notification Preferences</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage how you receive notifications</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="securityAlerts"
                            name="securityAlerts"
                            type="checkbox"
                            checked={notifications.securityAlerts}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="securityAlerts" className="font-medium text-gray-700 dark:text-gray-300">
                            Security Alerts
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receive notifications about security threats and vulnerabilities
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newFeatures"
                            name="newFeatures"
                            type="checkbox"
                            checked={notifications.newFeatures}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newFeatures" className="font-medium text-gray-700 dark:text-gray-300">
                            New Features
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receive notifications about new features and improvements
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="tips"
                            name="tips"
                            type="checkbox"
                            checked={notifications.tips}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="tips" className="font-medium text-gray-700 dark:text-gray-300">
                            Tips & Tutorials
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receive helpful tips and tutorials to get the most out of our platform
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketing"
                            name="marketing"
                            type="checkbox"
                            checked={notifications.marketing}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketing" className="font-medium text-gray-700 dark:text-gray-300">
                            Marketing Emails
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Receive promotional emails and special offers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Billing Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Manage your subscription and payment methods
                </p>

                <div className="space-y-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Current Plan</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">Premium Plan</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">$9.99/month</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Upgrade Plan
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/2025</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Update Payment Method
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Billing History</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">May 1, 2023</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Premium Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">$9.99</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Visa *4242</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">April 1, 2023</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Premium Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">$9.99</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Visa *4242</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View All Invoices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
