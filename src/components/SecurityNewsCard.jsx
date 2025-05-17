"use client"

import { useState, useEffect } from "react"
import { Newspaper, ExternalLink, RefreshCw } from "lucide-react"

export default function SecurityNewsCard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSecurityNews()
  }, [])

  const fetchSecurityNews = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock news data
      const mockNews = [
        {
          id: 1,
          title: "Major Vulnerability Found in Popular Software",
          summary: "Researchers have discovered a critical vulnerability affecting millions of users...",
          source: "CyberSecurity Today",
          date: "2023-05-15T14:30:00Z",
          url: "#",
          category: "vulnerability",
        },
        {
          id: 2,
          title: "New Ransomware Strain Targeting Healthcare",
          summary: "A new ransomware variant is specifically targeting healthcare organizations...",
          source: "Security Weekly",
          date: "2023-05-14T09:15:00Z",
          url: "#",
          category: "ransomware",
        },
        {
          id: 3,
          title: "Government Issues Advisory on State-Sponsored Attacks",
          summary: "The government has issued an advisory warning about increased state-sponsored cyber attacks...",
          source: "Cyber Defense Magazine",
          date: "2023-05-13T16:45:00Z",
          url: "#",
          category: "advisory",
        },
        {
          id: 4,
          title: "New Data Protection Regulations Coming Next Month",
          summary: "Companies will need to comply with new data protection regulations starting next month...",
          source: "Privacy Journal",
          date: "2023-05-12T11:20:00Z",
          url: "#",
          category: "compliance",
        },
      ]

      setNews(mockNews)
      setLoading(false)
    }, 1500)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  }

  const getCategoryBadge = (category) => {
    switch (category) {
      case "vulnerability":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "ransomware":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "advisory":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "compliance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
            Security News
          </h3>
          <button
            onClick={fetchSecurityNews}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getCategoryBadge(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.summary}</p>
                <div className="flex justify-between items-center mt-3 text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.source} • {formatDate(item.date)}
                  </span>
                  <a href={item.url} className="text-blue-600 hover:text-blue-500 dark:text-blue-400 flex items-center">
                    Read more
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              View All News
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
