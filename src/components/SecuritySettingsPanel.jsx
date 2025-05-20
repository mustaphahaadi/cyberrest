"use client"

import { useState } from "react"
import { Shield, Lock, Bell, Eye, AlertTriangle, CheckCircle } from "lucide-react"

export default function SecuritySettingsPanel() {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    passwordExpiry: 90, // days
    securityQuestions: false,
    activityLogging: true,
    ipRestriction: false,
    deviceManagement: true,
    dataEncryption: true,
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    })
    setSaved(false)
  }

  const handlePasswordExpiryChange = (e) => {
    setSettings({
      ...settings,
      passwordExpiry: Number.parseInt(e.target.value, 10),
    })
    setSaved(false)
  }

  const handleSave = () => {
    setSaving(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      // 5% chance of error for demo purposes
      if (Math.random() < 0.05) {
        setError("An error occurred while saving settings. Please try again.")
        setSaving(false)
        return
      }

      setSaving(false)
      setSaved(true)

      // Reset saved status after 3 seconds
      setTimeout(() => {
        setSaved(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            Security Settings
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="twoFactorAuth"
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle("twoFactorAuth")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactorAuth" className="font-medium text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication
                </label>
                <p className="text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="loginNotifications"
                  type="checkbox"
                  checked={settings.loginNotifications}
                  onChange={() => handleToggle("loginNotifications")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="loginNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                  Login Notifications
                </label>
                <p className="text-gray-500 dark:text-gray-400">Receive notifications for new login attempts</p>
              </div>
            </div>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="securityQuestions"
                  type="checkbox"
                  checked={settings.securityQuestions}
                  onChange={() => handleToggle("securityQuestions")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="securityQuestions" className="font-medium text-gray-700 dark:text-gray-300">
                  Security Questions
                </label>
                <p className="text-gray-500 dark:text-gray-400">Set up security questions for account recovery</p>
              </div>
            </div>
            <Shield className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="activityLogging"
                  type="checkbox"
                  checked={settings.activityLogging}
                  onChange={() => handleToggle("activityLogging")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="activityLogging" className="font-medium text-gray-700 dark:text-gray-300">
                  Activity Logging
                </label>
                <p className="text-gray-500 dark:text-gray-400">Keep a log of all account activity</p>
              </div>
            </div>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="ipRestriction"
                  type="checkbox"
                  checked={settings.ipRestriction}
                  onChange={() => handleToggle("ipRestriction")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="ipRestriction" className="font-medium text-gray-700 dark:text-gray-300">
                  IP Restriction
                </label>
                <p className="text-gray-500 dark:text-gray-400">Restrict login to specific IP addresses</p>
              </div>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </div>

          <div>
            <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Expiry (days)
            </label>
            <select
              id="passwordExpiry"
              value={settings.passwordExpiry}
              onChange={handlePasswordExpiryChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>365 days</option>
              <option value={0}>Never</option>
            </select>
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

          {saved && (
            <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm text-green-700 dark:text-green-300">Security settings saved successfully.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  )
}
