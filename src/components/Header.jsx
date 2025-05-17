"use client"

import { useState } from "react"
import { Menu, X, Shield } from "lucide-react"
import { ModeToggle } from "./ModeToggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">CyberRest</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </a>
              <a
                href="/dashboard"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Dashboard
              </a>
              <a
                href="/tools"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Tools
              </a>
              <a href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Documentation
              </a>
            </nav>

            <div className="flex items-center space-x-2">
              <ModeToggle />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Sign In</button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-2">
              <a
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              >
                Home
              </a>
              <a
                href="/dashboard"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              >
                Dashboard
              </a>
              <a
                href="/tools"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              >
                Tools
              </a>
              <a
                href="/docs"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              >
                Documentation
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2">Sign In</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
