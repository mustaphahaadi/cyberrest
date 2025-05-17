"use client"

import { useState } from "react"
import { Home, Shield, Lock, Search, FileText, Settings, ChevronDown, ChevronRight } from "lucide-react"

export default function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState({
    tools: true,
    account: false,
    settings: false,
  })

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    })
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">CyberRest</span>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Home className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Dashboard
          </a>

          <div>
            <button
              onClick={() => toggleCategory("tools")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                Security Tools
              </div>
              {expandedCategories.tools ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>

            {expandedCategories.tools && (
              <div className="ml-8 mt-1 space-y-1">
                <a
                  href="/tools/password-analyzer"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Password Analyzer
                </a>
                <a
                  href="/tools/password-generator"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Password Generator
                </a>
                <a
                  href="/tools/data-breach-scanner"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Data Breach Scanner
                </a>
                <a
                  href="/tools/phishing-detector"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Phishing Detector
                </a>
                <a
                  href="/tools/network-scanner"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Network Scanner
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleCategory("account")}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                Account
              </div>
              {expandedCategories.account ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>

            {expandedCategories.account && (
              <div className="ml-8 mt-1 space-y-1">
                <a
                  href="/profile"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Profile
                </a>
                <a
                  href="/subscription"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Subscription
                </a>
                <a
                  href="/settings"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Settings
                </a>
              </div>
            )}
          </div>

          <a
            href="/documentation"
            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FileText className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Documentation
          </a>

          <a
            href="/settings"
            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Settings
          </a>
        </nav>
      </div>
    </aside>
  )
}
