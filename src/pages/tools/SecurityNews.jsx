"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Tag, Clock } from "lucide-react"

export default function SecurityNews() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")

  // Mock news data
  const mockNews = [
    {
      id: 1,
      title: "Critical Vulnerability Found in Popular JavaScript Library",
      summary:
        "Researchers have discovered a severe vulnerability in a widely-used JavaScript library that could lead to remote code execution.",
      date: "2023-05-15",
      source: "CyberSecurity Today",
      url: "#",
      category: "vulnerabilities",
      severity: "critical",
      readTime: 4,
    },
    {
      id: 2,
      title: "New Ransomware Strain Targets Healthcare Organizations",
      summary:
        "A new ransomware variant has been observed targeting healthcare organizations worldwide, encrypting critical patient data.",
      date: "2023-05-12",
      source: "Threat Post",
      url: "#",
      category: "threats",
      severity: "high",
      readTime: 6,
    },
    {
      id: 3,
      title: "Microsoft Releases Patch for Zero-Day Vulnerability",
      summary:
        "Microsoft has released an emergency patch for a zero-day vulnerability that is being actively exploited in the wild.",
      date: "2023-05-10",
      source: "Microsoft Security",
      url: "#",
      category: "patches",
      severity: "high",
      readTime: 3,
    },
    {
      id: 4,
      title: "New Data Privacy Regulations Coming into Effect Next Month",
      summary:
        "Companies need to prepare for new data privacy regulations that will impose stricter requirements on how personal data is handled.",
      date: "2023-05-08",
      source: "Privacy Journal",
      url: "#",
      category: "compliance",
      severity: "medium",
      readTime: 7,
    },
    {
      id: 5,
      title: "Advanced Persistent Threat Group Targets Critical Infrastructure",
      summary:
        "Security researchers have identified a new APT campaign targeting critical infrastructure in multiple countries.",
      date: "2023-05-05",
      source: "Threat Intelligence",
      url: "#",
      category: "threats",
      severity: "critical",
      readTime: 8,
    },
    {
      id: 6,
      title: "Open Source Security Tool Released to Detect Supply Chain Attacks",
      summary:
        "A new open-source tool has been released to help organizations detect and prevent software supply chain attacks.",
      date: "2023-05-03",
      source: "Open Security",
      url: "#",
      category: "tools",
      severity: "low",
      readTime: 5,
    },
    {
      id: 7,
      title: "New Phishing Campaign Exploits Social Media Platforms",
      summary:
        "A sophisticated phishing campaign is targeting users of popular social media platforms to steal login credentials and personal information.",
      date: "2023-05-01",
      source: "Social Media Security",
      url: "#",
      category: "phishing",
      severity: "high",
      readTime: 6,
    },
  ]

  useEffect(() => {
    setLoading(true)
    // Simulate fetching news data
    setTimeout(() => {
      setNews(mockNews)
      setFilteredNews(mockNews)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    filterNews(activeCategory)
  }, [news, activeCategory])

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    filterNews(activeCategory, query)
  }

  const filterNews = (category, query = searchQuery) => {
    let filtered = [...news]

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category)
    }

    if (query) {
      filtered = filtered.filter(
        (item) => item.title.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query),
      )
    }

    setFilteredNews(filtered)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    filterNews(category)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-gray-800"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-300 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Security News</h1>
        <Input
          type="search"
          placeholder="Search news..."
          className="w-1/3"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Tabs defaultValue="all" className="mb-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleCategoryChange("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" onClick={() => handleCategoryChange("vulnerabilities")}>
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger value="threats" onClick={() => handleCategoryChange("threats")}>
            Threats
          </TabsTrigger>
          <TabsTrigger value="patches" onClick={() => handleCategoryChange("patches")}>
            Patches
          </TabsTrigger>
          <TabsTrigger value="compliance" onClick={() => handleCategoryChange("compliance")}>
            Compliance
          </TabsTrigger>
          <TabsTrigger value="tools" onClick={() => handleCategoryChange("tools")}>
            Tools
          </TabsTrigger>
          <TabsTrigger value="phishing" onClick={() => handleCategoryChange("phishing")}>
            Phishing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all"></TabsContent>
        <TabsContent value="vulnerabilities"></TabsContent>
        <TabsContent value="threats"></TabsContent>
        <TabsContent value="patches"></TabsContent>
        <TabsContent value="compliance"></TabsContent>
        <TabsContent value="tools"></TabsContent>
        <TabsContent value="phishing"></TabsContent>
      </Tabs>

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                  <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{item.summary}</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">{item.date}</span>
                  <Tag className="h-4 w-4" />
                  <span className="text-xs">{item.category}</span>
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">{item.readTime} min read</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Source: {item.source}</p>
                <Button variant="link" asChild>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Read More <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
