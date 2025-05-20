"use client"

import { useState } from "react"
import { Search, Filter, ArrowRight, Calendar, Clock, BookOpen, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Badge from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ResourcesHub = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [topicFilter, setTopicFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const topics = [
    { id: "all", name: "All Topics" },
    { id: "security-basics", name: "Security Basics" },
    { id: "compliance", name: "Compliance" },
    { id: "threat-intelligence", name: "Threat Intelligence" },
    { id: "best-practices", name: "Best Practices" },
    { id: "product-updates", name: "Product Updates" },
  ]

  const resourceTypes = [
    { id: "all", name: "All Types" },
    { id: "blog", name: "Blog Posts" },
    { id: "webinar", name: "Webinars" },
    { id: "whitepaper", name: "Whitepapers" },
    { id: "guide", name: "Guides" },
    { id: "video", name: "Videos" },
  ]

  const resources = [
    {
      id: "zero-trust-whitepaper",
      title: "Implementing Zero Trust Security: A Comprehensive Guide",
      type: "whitepaper",
      topics: ["security-basics", "best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-05-15",
      readTime: "25 min read",
      description:
        "Learn how to implement a Zero Trust security model in your organization with this comprehensive guide.",
      featured: true,
    },
    {
      id: "ransomware-webinar",
      title: "Ransomware Defense Strategies for 2023",
      type: "webinar",
      topics: ["threat-intelligence", "best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-06-22",
      duration: "45 minutes",
      description:
        "Join our security experts as they discuss the latest ransomware trends and effective defense strategies.",
      featured: true,
    },
    {
      id: "compliance-checklist",
      title: "GDPR Compliance Checklist for IT Teams",
      type: "guide",
      topics: ["compliance"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-04-10",
      readTime: "15 min read",
      description:
        "A practical checklist to help IT teams ensure their organizations are compliant with GDPR requirements.",
      featured: true,
    },
    {
      id: "security-awareness",
      title: "Building an Effective Security Awareness Program",
      type: "blog",
      topics: ["security-basics", "best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-07-05",
      readTime: "8 min read",
      description: "Discover how to create a security awareness program that actually changes employee behavior.",
      featured: false,
    },
    {
      id: "dark-web-monitoring",
      title: "Dark Web Monitoring: What You Need to Know",
      type: "blog",
      topics: ["security-basics", "threat-intelligence"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-06-18",
      readTime: "6 min read",
      description: "Learn how dark web monitoring works and why it's essential for modern cybersecurity strategies.",
      featured: false,
    },
    {
      id: "phishing-prevention",
      title: "Advanced Phishing Prevention Techniques",
      type: "webinar",
      topics: ["threat-intelligence", "best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-05-30",
      duration: "60 minutes",
      description: "Learn advanced techniques to protect your organization from sophisticated phishing attacks.",
      featured: false,
    },
    {
      id: "hipaa-compliance",
      title: "HIPAA Compliance in the Cloud Era",
      type: "whitepaper",
      topics: ["compliance"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-04-25",
      readTime: "20 min read",
      description: "Navigate the complexities of maintaining HIPAA compliance when using cloud services.",
      featured: false,
    },
    {
      id: "security-metrics",
      title: "Security Metrics That Matter to Executives",
      type: "guide",
      topics: ["best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-07-12",
      readTime: "12 min read",
      description: "Learn which security metrics are most effective for communicating with executive leadership.",
      featured: false,
    },
    {
      id: "product-update-q2",
      title: "CyberRest Q2 2023 Product Updates",
      type: "video",
      topics: ["product-updates"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-07-01",
      duration: "15 minutes",
      description: "A walkthrough of all the new features and improvements added to CyberRest in Q2 2023.",
      featured: false,
    },
    {
      id: "incident-response",
      title: "Building an Effective Incident Response Plan",
      type: "guide",
      topics: ["security-basics", "best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-06-05",
      readTime: "18 min read",
      description: "A step-by-step guide to creating and implementing an incident response plan for your organization.",
      featured: false,
    },
    {
      id: "supply-chain-security",
      title: "Securing Your Supply Chain: Best Practices",
      type: "blog",
      topics: ["best-practices", "threat-intelligence"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-05-20",
      readTime: "10 min read",
      description: "Learn how to identify and mitigate security risks in your supply chain.",
      featured: false,
    },
    {
      id: "compliance-automation",
      title: "Automating Compliance: Tools and Techniques",
      type: "webinar",
      topics: ["compliance", "best-practices"],
      image: "/placeholder.svg?height=400&width=600",
      date: "2023-04-15",
      duration: "50 minutes",
      description: "Discover how automation can streamline compliance processes and reduce manual effort.",
      featured: false,
    },
  ]

  // Filter resources based on search query and filters
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTopic = topicFilter === "all" || resource.topics.includes(topicFilter)

    const matchesType = typeFilter === "all" || resource.type === typeFilter

    return matchesSearch && matchesTopic && matchesType
  })

  // Get featured resources
  const featuredResources = resources.filter((resource) => resource.featured)

  // Get resource type icon
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case "blog":
        return <BookOpen className="h-5 w-5" />
      case "webinar":
        return <Video className="h-5 w-5" />
      case "whitepaper":
        return <FileText className="h-5 w-5" />
      case "guide":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resources Hub</h1>
        <p className="text-muted-foreground max-w-3xl">
          Explore our collection of cybersecurity resources, including blog posts, webinars, whitepapers, and guides to
          help you strengthen your security posture.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!searchQuery && topicFilter === "all" && typeFilter === "all" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getResourceTypeIcon(resource.type)}
                      <span className="capitalize">{resource.type}</span>
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {resource.type === "webinar" || resource.type === "video" ? (
                        <>
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.duration}
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.readTime}
                        </>
                      )}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(resource.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <a href={`/resources/${resource.id}`}>
                      {resource.type === "webinar"
                        ? "Watch Webinar"
                        : resource.type === "video"
                          ? "Watch Video"
                          : resource.type === "whitepaper" || resource.type === "guide"
                            ? "Download"
                            : "Read More"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="webinar">Webinars</TabsTrigger>
          <TabsTrigger value="whitepaper">Whitepapers</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setTopicFilter("all")
                  setTypeFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="h-full flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getResourceTypeIcon(resource.type)}
                        <span className="capitalize">{resource.type}</span>
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {resource.type === "webinar" || resource.type === "video" ? (
                          <>
                            <Clock className="h-4 w-4 mr-1" />
                            {resource.duration}
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 mr-1" />
                            {resource.readTime}
                          </>
                        )}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(resource.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <a href={`/resources/${resource.id}`}>
                        {resource.type === "webinar"
                          ? "Watch Webinar"
                          : resource.type === "video"
                            ? "Watch Video"
                            : resource.type === "whitepaper" || resource.type === "guide"
                              ? "Download"
                              : "Read More"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        {resourceTypes.slice(1).map((type) => (
          <TabsContent key={type.id} value={type.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter((resource) => resource.type === type.id)
                .map((resource) => (
                  <Card key={resource.id} className="h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getResourceTypeIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {resource.type === "webinar" || resource.type === "video" ? (
                            <>
                              <Clock className="h-4 w-4 mr-1" />
                              {resource.duration}
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 mr-1" />
                              {resource.readTime}
                            </>
                          )}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(resource.date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <a href={`/resources/${resource.id}`}>
                          {resource.type === "webinar"
                            ? "Watch Webinar"
                            : resource.type === "video"
                              ? "Watch Video"
                              : resource.type === "whitepaper" || resource.type === "guide"
                                ? "Download"
                                : "Read More"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted rounded-lg p-8 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground">
              Get the latest cybersecurity insights, tips, and resources delivered to your inbox monthly.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesHub
