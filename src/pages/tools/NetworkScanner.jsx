"use client"

import { useState } from "react"
import { Wifi, Shield, AlertTriangle, CheckCircle, XCircle, Info, Lock, Unlock } from "lucide-react"

export default function NetworkScanner() {
  const [ipAddress, setIpAddress] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [scanResults, setScanResults] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock network scan function
  const scanNetwork = (ip) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock scan results
        const mockResults = {
          networkInfo: {
            ipAddress: ip || "192.168.1.1",
            macAddress: "00:1A:2B:3C:4D:5E",
            networkName: "Home Network",
            encryption: Math.random() > 0.2 ? "WPA2" : "WEP",
            signalStrength: Math.floor(Math.random() * 100),
            connectedDevices: Math.floor(Math.random() * 10) + 1,
          },
          vulnerabilities: [
            {
              name: "Open Ports",
              description: "Several unnecessary ports are open on your network",
              severity: Math.random() > 0.5 ? "high" : "medium",
              status: Math.random() > 0.5 ? "vulnerable" : "secure",
            },
            {
              name: "Outdated Firmware",
              description: "Your router firmware is outdated and contains known vulnerabilities",
              severity: "high",
              status: Math.random() > 0.7 ? "vulnerable" : "secure",
            },
            {
              name: "Weak Encryption",
              description: "Your network is using outdated encryption standards",
              severity: "high",
              status: Math.random() > 0.3 ? "secure" : "vulnerable",
            },
            {
              name: "Default Credentials",
              description: "Your router may be using default login credentials",
              severity: "high",
              status: Math.random() > 0.6 ? "vulnerable" : "secure",
            },
            {
              name: "UPnP Enabled",
              description: "Universal Plug and Play is enabled and could be exploited",
              severity: "medium",
              status: Math.random() > 0.5 ? "vulnerable" : "secure",
            },
          ].filter(() => Math.random() > 0.3), // Randomly include vulnerabilities
          openPorts: [
            { port: 21, service: "FTP", status: Math.random() > 0.7 ? "open" : "closed" },
            { port: 22, service: "SSH", status: Math.random() > 0.5 ? "open" : "closed" },
            { port: 23, service: "Telnet", status: Math.random() > 0.8 ? "open" : "closed" },
            { port: 80, service: "HTTP", status: Math.random() > 0.3 ? "open" : "closed" },
            { port: 443, service: "HTTPS", status: Math.random() > 0.2 ? "open" : "closed" },
            { port: 3389, service: "RDP", status: Math.random() > 0.7 ? "open" : "closed" },
          ],
        }

        resolve(mockResults)
      }, 3000)
    })
  }

  const handleScan = async () => {
    setScanning(true)
    setScanned(false)

    try {
      const results = await scanNetwork(ipAddress)
      setScanResults(results)
      setScanned(true)
    } catch (error) {
      console.error("Error scanning network:", error)
    } finally {
      setScanning(false)
    }
  }

  const getVulnerabilityCount = () => {
    if (!scanResults) return 0
    return scanResults.vulnerabilities.filter((v) => v.status === "vulnerable").length
  }

  const getOpenPortCount = () => {
    if (!scanResults) return 0
    return scanResults.openPorts.filter((p) => p.status === "open").length
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900/30"
      case "medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30"
      case "low":
        return "text-green-500 bg-green-50 dark:bg-green-900/30"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "vulnerable":
        return "text-red-500"
      case "secure":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "vulnerable":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "secure":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "open":
        return <Unlock className="h-4 w-4 text-red-500" />
      case "closed":
        return <Lock className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Network Security Scanner</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Scan your network for vulnerabilities and security issues
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="IP Address (optional, defaults to current network)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">Leave blank to scan your current network</p>
            </div>

            <button
              onClick={handleScan}
              disabled={scanning}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scanning ? (
                <>
                  <Wifi className="mr-2 h-4 w-4 animate-pulse" />
                  Scanning Network...
                </>
              ) : (
                <>
                  <Wifi className="mr-2 h-4 w-4" />
                  Start Network Scan
                </>
              )}
            </button>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <div className="flex">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This scanner checks for common network vulnerabilities, open ports, and security misconfigurations.
                  Results are for informational purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Scan Results</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {scanned
              ? `Network security analysis for ${scanResults.networkInfo.networkName}`
              : "Start a scan to see network security results"}
          </p>

          {scanning && (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 mb-4">
                <Wifi className="h-6 w-6 animate-pulse text-blue-600 dark:text-blue-400" />
              </div>
              <p className="font-medium">Scanning network...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This may take a few moments</p>
            </div>
          )}

          {scanned && !scanning && scanResults && (
            <div>
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px space-x-8">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "overview"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("vulnerabilities")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === "vulnerabilities"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Vulnerabilities
                    {getVulnerabilityCount() > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        {getVulnerabilityCount()}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("ports")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === "ports"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Open Ports
                    {getOpenPortCount() > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {getOpenPortCount()}
                      </span>
                    )}
                  </button>
                </nav>
              </div>

              <div className="pt-4">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3">Network Information</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500 dark:text-gray-400">Network Name:</div>
                        <div>{scanResults.networkInfo.networkName}</div>

                        <div className="text-gray-500 dark:text-gray-400">IP Address:</div>
                        <div>{scanResults.networkInfo.ipAddress}</div>

                        <div className="text-gray-500 dark:text-gray-400">MAC Address:</div>
                        <div>{scanResults.networkInfo.macAddress}</div>

                        <div className="text-gray-500 dark:text-gray-400">Encryption:</div>
                        <div className="flex items-center">
                          {scanResults.networkInfo.encryption === "WPA2" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                          )}
                          {scanResults.networkInfo.encryption}
                        </div>

                        <div className="text-gray-500 dark:text-gray-400">Signal Strength:</div>
                        <div>{scanResults.networkInfo.signalStrength}%</div>

                        <div className="text-gray-500 dark:text-gray-400">Connected Devices:</div>
                        <div>{scanResults.networkInfo.connectedDevices}</div>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3">Security Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Vulnerabilities Found:</span>
                          <span
                            className={
                              getVulnerabilityCount() > 0 ? "text-red-500 font-medium" : "text-green-500 font-medium"
                            }
                          >
                            {getVulnerabilityCount()} of {scanResults.vulnerabilities.length}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Open Ports:</span>
                          <span
                            className={
                              getOpenPortCount() > 0 ? "text-yellow-500 font-medium" : "text-green-500 font-medium"
                            }
                          >
                            {getOpenPortCount()} of {scanResults.openPorts.length}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Overall Security:</span>
                          <span
                            className={
                              getVulnerabilityCount() === 0 && getOpenPortCount() === 0
                                ? "text-green-500 font-medium"
                                : getVulnerabilityCount() > 2 || getOpenPortCount() > 3
                                  ? "text-red-500 font-medium"
                                  : "text-yellow-500 font-medium"
                            }
                          >
                            {getVulnerabilityCount() === 0 && getOpenPortCount() === 0
                              ? "Secure"
                              : getVulnerabilityCount() > 2 || getOpenPortCount() > 3
                                ? "At Risk"
                                : "Needs Attention"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {getVulnerabilityCount() > 0 && (
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-300">
                              Your network has {getVulnerabilityCount()} vulnerabilities that should be addressed. Check
                              the Vulnerabilities tab for details.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "vulnerabilities" && (
                  <div className="space-y-4">
                    {scanResults.vulnerabilities.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
                          <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                        </div>
                        <p className="font-medium text-green-600 dark:text-green-400">No vulnerabilities found!</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Your network appears to be secure
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {scanResults.vulnerabilities.map((vuln, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 ${
                              vuln.status === "vulnerable"
                                ? "border-red-200 dark:border-red-800"
                                : "border-green-200 dark:border-green-800"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium flex items-center">
                                {getStatusIcon(vuln.status)}
                                <span className="ml-2">{vuln.name}</span>
                              </h3>
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(vuln.severity)}`}
                              >
                                {vuln.severity}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{vuln.description}</p>
                            <div className="flex justify-between items-center text-sm">
                              <span>Status:</span>
                              <span className={getStatusColor(vuln.status)}>
                                {vuln.status === "vulnerable" ? "Vulnerable" : "Secure"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "ports" && (
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3">Port Scan Results</h3>
                      <div className="space-y-3">
                        {scanResults.openPorts.map((port, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              {getStatusIcon(port.status)}
                              <span className="ml-2">
                                {port.port} ({port.service})
                              </span>
                            </div>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                                port.status === "open"
                                  ? "border-red-200 text-red-800 dark:border-red-800 dark:text-red-200"
                                  : "border-green-200 text-green-800 dark:border-green-800 dark:text-green-200"
                              }`}
                            >
                              {port.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                      <div className="flex">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <div className="ml-3">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Open ports are not necessarily vulnerabilities, but unnecessary open ports can increase your
                            attack surface. Consider closing ports that aren't needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!scanning && !scanned && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500 dark:text-gray-400">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 mb-4">
                <Wifi className="h-6 w-6" />
              </div>
              <p>Click Start Network Scan</p>
              <p className="text-sm mt-1">We'll check your network for security issues</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
