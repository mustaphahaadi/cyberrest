"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertTriangle, Globe, Shield, ExternalLink } from "lucide-react"

export default function PhishingDetector() {
  const [url, setUrl] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [result, setResult] = useState(null)

  // Mock phishing detection function
  const checkForPhishing = (url) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock result data
        const mockResults = {
          isSafe: Math.random() > 0.3, // 70% chance of being safe
          score: Math.floor(Math.random() * 100),
          warnings: [
            "Domain registered recently",
            "Similar to known brand",
            "Uses HTTP instead of HTTPS",
            "Contains suspicious URL patterns",
          ].filter(() => Math.random() > 0.5), // Randomly include warnings
          details: {
            domainAge: Math.floor(Math.random() * 1000),
            hasHttps: Math.random() > 0.3,
            redirectCount: Math.floor(Math.random() * 3),
            blacklisted: Math.random() > 0.7,
          },
        }

        // Adjust score based on isSafe
        if (mockResults.isSafe) {
          mockResults.score = 70 + Math.floor(Math.random() * 30)
        } else {
          mockResults.score = Math.floor(Math.random() * 60)
        }

        resolve(mockResults)
      }, 2000)
    })
  }

  const handleCheck = async () => {
    if (!url) return

    // Add https:// if not present
    let urlToCheck = url
    if (!urlToCheck.startsWith("http://") && !urlToCheck.startsWith("https://")) {
      urlToCheck = "https://" + urlToCheck
    }

    setScanning(true)
    setScanned(false)

    try {
      const results = await checkForPhishing(urlToCheck)
      setResult(results)
      setScanned(true)
    } catch (error) {
      console.error("Error checking URL:", error)
    } finally {
      setScanning(false)
    }
  }

  const getScoreColor = (score) => {
    if (score < 40) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    return "text-green-500"
  }

  const getScoreText = (score) => {
    if (score < 40) return "High Risk"
    if (score < 70) return "Moderate Risk"
    return "Low Risk"
  }

  const getProgressColor = (score) => {
    if (score < 40) return "bg-red-500"
    if (score < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Phishing Site Detector</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Check if a website is legitimate or a potential phishing attempt
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleCheck}
                  disabled={!url || scanning}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {scanning ? "Checking..." : "Check"}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We'll analyze this URL for signs of phishing or malicious content
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
              <div className="flex">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Phishing sites mimic legitimate websites to steal your personal information. Always verify before
                    entering sensitive data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm space-y-2 w-full">
            <h3 className="font-medium">Common signs of phishing:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Misspelled domain names (e.g., amaz0n.com)</li>
              <li>URLs with unusual characters or numbers</li>
              <li>Websites asking for sensitive information unexpectedly</li>
              <li>Poor design quality or grammatical errors</li>
              <li>Lack of HTTPS security</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Analysis Results</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {scanned ? `Detailed security analysis for ${url}` : "Enter a URL and click Check to see results"}
          </p>

          {scanning && (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 mb-4">
                <Globe className="h-6 w-6 animate-pulse text-blue-600 dark:text-blue-400" />
              </div>
              <p className="font-medium">Analyzing website...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This may take a few moments</p>
            </div>
          )}

          {scanned && !scanning && result && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`rounded-full p-3 mb-2 ${result.isSafe ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                >
                  {result.isSafe ? (
                    <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
                  )}
                </div>
                <h3
                  className={`text-lg font-bold ${result.isSafe ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
                >
                  {result.isSafe ? "Website Appears Safe" : "Potential Phishing Site Detected"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {result.isSafe
                    ? "Our analysis indicates this is likely a legitimate website"
                    : "This website shows signs of being a potential phishing attempt"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Risk Score:</span>
                  <span className={`font-bold ${getScoreColor(result.score)}`}>
                    {result.score}/100 ({getScoreText(result.score)})
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(result.score)}`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </div>

              {result.warnings && result.warnings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Warnings:</h4>
                  <div className="space-y-2">
                    {result.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm">{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-medium">Technical Details:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Domain Age:</div>
                  <div>{result.details.domainAge} days</div>

                  <div>HTTPS Secure:</div>
                  <div className="flex items-center">
                    {result.details.hasHttps ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    {result.details.hasHttps ? "Yes" : "No"}
                  </div>

                  <div>Redirects:</div>
                  <div>{result.details.redirectCount}</div>

                  <div>Blacklisted:</div>
                  <div className="flex items-center">
                    {result.details.blacklisted ? (
                      <CheckCircle className="h-4 w-4 text-red-500 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-green-500 mr-1" />
                    )}
                    {result.details.blacklisted ? "Yes" : "No"}
                  </div>
                </div>
              </div>

              {!result.isSafe && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        We recommend not sharing any personal information or credentials with this website.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Report False Detection
                </button>
              </div>
            </div>
          )}

          {!scanning && !scanned && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500 dark:text-gray-400">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <p>Enter a URL and click Check</p>
              <p className="text-sm mt-1">We'll analyze the website for phishing indicators</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
