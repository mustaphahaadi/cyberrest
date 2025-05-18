"use client"

import { useState, useEffect } from "react"
import { Globe, AlertTriangle, Shield } from "lucide-react"

export default function SecurityThreatMap() {
  const [loading, setLoading] = useState(true)
  const [threats, setThreats] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    blocked: 0,
    countries: 0,
  })

  useEffect(() => {
    fetchThreatData()
  }, [])

  const fetchThreatData = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock threat data
      const mockThreats = [
        { id: 1, country: "Russia", count: Math.floor(Math.random() * 100) + 50, type: "brute_force" },
        { id: 2, country: "China", count: Math.floor(Math.random() * 100) + 40, type: "malware" },
        { id: 3, country: "United States", count: Math.floor(Math.random() * 50) + 20, type: "phishing" },
        { id: 4, country: "Brazil", count: Math.floor(Math.random() * 40) + 10, type: "ddos" },
        { id: 5, country: "Nigeria", count: Math.floor(Math.random() * 30) + 5, type: "phishing" },
        { id: 6, country: "India", count: Math.floor(Math.random() * 25) + 5, type: "malware" },
        { id: 7, country: "Ukraine", count: Math.floor(Math.random() * 20) + 5, type: "brute_force" },
      ]

      const totalThreats = mockThreats.reduce((sum, threat) => sum + threat.count, 0)
      const blockedThreats = Math.floor(totalThreats * 0.95) // 95% blocked

      setThreats(mockThreats)
      setStats({
        total: totalThreats,
        blocked: blockedThreats,
        countries: mockThreats.length,
      })
      setLoading(false)
    }, 1500)
  }

  const getThreatTypeIcon = (type) => {
    switch (type) {
      case "brute_force":
        return <Shield className="h-4 w-4 text-red-500" />
      case "malware":
        return <AlertTriangle className="h-4 w-4 text-purple-500" />
      case "phishing":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "ddos":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getThreatTypeLabel = (type) => {
    switch (type) {
      case "brute_force":
        return "Brute Force"
      case "malware":
        return "Malware"
      case "phishing":
        return "Phishing"
      case "ddos":
        return "DDoS"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-500" />
            Global Threat Map
          </h3>
          <button onClick={fetchThreatData} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Threats</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Blocked</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.blocked}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Countries</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.countries}</p>
              </div>
            </div>

            <div className="relative h-48 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">[World Map Visualization]</p>
              </div>
            </div>

            <h4 className="text-sm font-medium mb-2">Top Threat Sources</h4>
            <div className="space-y-3">
              {threats.map((threat) => (
                <div key={threat.id} className="flex items-center">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-sm font-medium">{threat.country}</span>
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${(threat.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getThreatTypeIcon(threat.type)}
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      {getThreatTypeLabel(threat.type)}
                    </span>
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-sm font-medium">{threat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
