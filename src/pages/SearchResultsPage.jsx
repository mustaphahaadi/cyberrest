"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, FileText, PenToolIcon as Tool, ArrowRight, Calendar, User, Key, Lock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setSearchQuery(query)
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = (searchTerm) => {
    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock search results
      const mockResults = {
        tools: [
          {
            id: "password-analyzer",
            title: "Password Analyzer",
            description: "Check the strength of your passwords and get recommendations for improvement.",
            url: "/tools/password-analyzer",
            icon: "key",
            relevance: 0.95,
          },
          {
            id: "password-generator",
            title: "Password Generator",
            description: "Create strong, random passwords to keep your accounts secure.",
            url: "/tools/password-generator",
            icon: "lock",
            relevance: 0.92,
          },
          {
            id: "data-breach-scanner",
            title: "Data Breach Scanner",
            description: "Check if your email or accounts have been compromised in known data breaches.",
            url: "/tools/data-breach-scanner",
            icon: "search",
            relevance: 0.85,
          },
        ],
        docs: [
          {
            id: "password-security",
            title: "Password Security Guide",
            description: "Learn best practices for creating and managing secure passwords.",
            url: "/docs/guides/password-security",
            category: "Guides",
            relevance: 0.9,
          },
          {
            id: "two-factor-authentication",
            title: "Two-Factor Authentication Setup",
            description: "How to set up and use two-factor authentication for enhanced security.",
            url: "/docs/guides/two-factor-authentication",
            category: "Guides",
            relevance: 0.8,
          },
          {
            id: "password-manager-faq",
            title: "Password Manager FAQ",
            description: "Frequently asked questions about password managers and how to use them effectively.",
            url: "/docs/faq/password-managers",
            category: "FAQ",
            relevance: 0.75,
          },
        ],
        blog: [
          {
            id: "password-security-tips",
            title: "10 Essential Password Security Tips for 2023",
            description: "Learn how to create and manage strong passwords to protect your online accounts.",
            url: "/blog/password-security-tips",
            date: "2023-04-15",
            author: "Alex Johnson",
            image: "/placeholder.svg?height=150&width=300",
            relevance: 0.88,
          },
          {
            id: "password-managers-review",
            title: "The Best Password Managers Compared",
            description: "A comprehensive review of the top password management tools available today.",
            url: "/blog/password-managers-review",
            date: "2023-03-22",
            author: "Samantha Lee",
            image: "/placeholder.svg?height=150&width=300",
            relevance: 0.82,
          },
        ],
      }

      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
      performSearch(searchQuery)
    }
  }

  const getResultCount = () => {
    if (!results) return 0
    return (results.tools?.length || 0) + (results.docs?.length || 0) + (results.blog?.length || 0)
  }

  return (
    <>
      <Navbar />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>

          {query && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    Found {getResultCount()} results for <span className="font-medium">"{query}"</span>
                  </>
                )}
              </p>
            </div>
          )}

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {loading ? (
                <SearchResultsSkeleton />
              ) : getResultCount() === 0 ? (
                <NoResults query={query} />
              ) : (
                <>
                  {results.tools && results.tools.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Tools</h2>
                        <Button variant="link" size="sm" onClick={() => setActiveTab("tools")}>
                          View all tools
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        {results.tools.slice(0, 3).map((tool) => (
                          <ToolResultCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                    </div>
                  )}

                  {results.docs && results.docs.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Documentation</h2>
                        <Button variant="link" size="sm" onClick={() => setActiveTab("docs")}>
                          View all docs
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        {results.docs.slice(0, 3).map((doc) => (
                          <DocResultCard key={doc.id} doc={doc} />
                        ))}
                      </div>
                    </div>
                  )}

                  {results.blog && results.blog.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Blog</h2>
                        <Button variant="link" size="sm" onClick={() => setActiveTab("blog")}>
                          View all articles
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        {results.blog.slice(0, 2).map((post) => (
                          <BlogResultCard key={post.id} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              {loading ? (
                <SearchResultsSkeleton count={5} />
              ) : !results?.tools || results.tools.length === 0 ? (
                <NoResults query={query} type="tools" />
              ) : (
                results.tools.map((tool) => <ToolResultCard key={tool.id} tool={tool} />)
              )}
            </TabsContent>

            <TabsContent value="docs" className="space-y-4">
              {loading ? (
                <SearchResultsSkeleton count={5} />
              ) : !results?.docs || results.docs.length === 0 ? (
                <NoResults query={query} type="documentation" />
              ) : (
                results.docs.map((doc) => <DocResultCard key={doc.id} doc={doc} />)
              )}
            </TabsContent>

            <TabsContent value="blog" className="space-y-4">
              {loading ? (
                <SearchResultsSkeleton count={3} />
              ) : !results?.blog || results.blog.length === 0 ? (
                <NoResults query={query} type="blog posts" />
              ) : (
                results.blog.map((post) => <BlogResultCard key={post.id} post={post} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}

function ToolResultCard({ tool }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 mt-1">
          {tool.icon === "key" ? (
            <Key className="h-5 w-5 text-primary" />
          ) : tool.icon === "lock" ? (
            <Lock className="h-5 w-5 text-primary" />
          ) : (
            <Tool className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link to={tool.url} className="text-lg font-medium hover:underline">
              {tool.title}
            </Link>
            <Badge variant="outline">Tool</Badge>
          </div>
          <p className="text-muted-foreground mb-2">{tool.description}</p>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link to={tool.url}>
              Use Tool <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DocResultCard({ doc }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 mt-1">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link to={doc.url} className="text-lg font-medium hover:underline">
              {doc.title}
            </Link>
            <Badge variant="outline">{doc.category}</Badge>
          </div>
          <p className="text-muted-foreground mb-2">{doc.description}</p>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link to={doc.url}>
              Read Documentation <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BlogResultCard({ post }) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link to={post.url} className="text-lg font-medium hover:underline">
              {post.title}
            </Link>
            <Badge variant="outline">Blog</Badge>
          </div>
          <p className="text-muted-foreground mb-2">{post.description}</p>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <User className="h-3 w-3 mr-1" />
            <span>{post.author}</span>
          </div>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link to={post.url}>
              Read Article <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SearchResultsSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function NoResults({ query, type = "results" }) {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No {type} found</h3>
      <p className="text-muted-foreground mb-6">
        We couldn't find any {type} matching "{query}". Try different keywords or browse our resources below.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link to="/tools">Browse Tools</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/docs">View Documentation</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/blog">Read Blog</Link>
        </Button>
      </div>
    </div>
  )
}
