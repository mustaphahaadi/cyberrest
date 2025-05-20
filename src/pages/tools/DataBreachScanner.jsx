"use client"

import { useState } from "react"
import { Search, Shield, AlertTriangle, CheckCircle, Mail, Info } from "lucide-react"

export default function DataBreachScanner() {
  const [email, setEmail] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")

  // Mock breach check function
  const checkForBreaches = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock breach data
        const mockBreaches = [
          {
            name: "ExampleSite",
            domain: "example.com",
            breachDate: "2021-04-15",
            description: "A data breach that affected millions of users",
            dataClasses: ["Email addresses", "Passwords", "Names", "Phone numbers"],
            verified: true,
            logoPath: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "AnotherService",
            domain: "anotherservice.com",
            breachDate: "2020-11-03",
            description: "A security incident that exposed user data",
            dataClasses: ["Email addresses", "Passwords", "IP addresses"],
            verified: true,
            logoPath: "/placeholder.svg?height=40&width=40",
          },
        ]

        // Randomly decide if the email was found in breaches
        const found = Math.random() > 0.5

        if (found) {
          // Randomly select how many breaches to return
          const breachCount = Math.floor(Math.random() * mockBreaches.length) + 1
          resolve({
            found: true,
            breaches: mockBreaches.slice(0, breachCount),
            count: breachCount,
            lastChecked: new Date().toISOString(),
          })
        } else {
          resolve({
            found: false,
            breaches: [],
            count: 0,
            lastChecked: new Date().toISOString(),
          })
        }
      }, 2000)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter an email address")
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setScanning(true)
    setScanned(false)

    try {
      const breachResults = await checkForBreaches(email)
      setResults(breachResults)
      setScanned(true)
    } catch (err) {
      setError("An error occurred while checking for breaches. Please try again.")
    } finally {
      setScanning(false)
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Breach Scanner</h1>
          <p className="text-gray-600 dark:text-gray-400">Check if your email has been compromised in a data breach</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={scanning}
                />
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={scanning}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scanning ? (
                  <>
                    <Search className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="-ml-1 mr-2 h-4 w-4" />
                    Check for Breaches
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {scanning && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mb-4">
                <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Scanning for breaches...</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We're checking if your email appears in known data breaches
              </p>
            </div>
          </div>
        )}

        {scanned && !scanning && results && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Scan Results</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last checked: {formatDate(results.lastChecked)}
                </span>
              </div>

              {results.found ? (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-red-100 dark:bg-red-900 p-2 mr-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-red-600 dark:text-red-400">
                        Your email was found in {results.count} data {results.count === 1 ? "breach" : "breaches"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        We recommend changing your password for these services immediately.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {results.breaches.map((breach, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <img
                              src={breach.logoPath || "/placeholder.svg"}
                              alt={breach.name}
                              className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-lg font-medium">{breach.name}</h5>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(breach.breachDate)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{breach.description}</p>
                            <div>
                              <h6 className="text-sm font-medium mb-1">Compromised Data:</h6>
                              <div className="flex flex-wrap gap-1">
                                {breach.dataClasses.map((dataClass, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  >
                                    {dataClass}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-2 mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400">
                      Good news! Your email was not found in any known data breaches.
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Continue to practice good security habits to keep your data safe.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      What should I do if my email was found in a breach?
                    </h4>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Change your password immediately for the affected services</li>
                        <li>Enable two-factor authentication where available</li>
                        <li>Don't reuse passwords across different services</li>
                        <li>Consider using a password manager to generate and store strong passwords</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-medium">How to Protect Your Data</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Use Strong, Unique Passwords</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create strong, unique passwords for each of your accounts to prevent unauthorized access.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Enable Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add an extra layer of security by enabling two-factor authentication on your accounts.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Be Cautious of Phishing Attempts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Be wary of suspicious emails or messages asking for your personal information.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Regularly Monitor Your Accounts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regularly check your accounts for any suspicious activity and report it immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
