"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Book, Code, Shield, Server, Users, FileText, HelpCircle, ExternalLink } from "lucide-react"
import Input from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Badge from "@/components/ui/badge"

const DocumentationHub = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const docCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of CyberRest and get up and running quickly",
      icon: <Book className="h-6 w-6 text-primary" />,
      articles: [
        { title: "Platform Overview", path: "/docs/platform-overview", badge: null },
        { title: "Quick Start Guide", path: "/docs/quick-start", badge: null },
        { title: "Account Setup", path: "/docs/account-setup", badge: null },
        { title: "Dashboard Navigation", path: "/docs/dashboard-navigation", badge: null },
        { title: "Subscription Management", path: "/docs/subscription-management", badge: null },
      ],
    },
    {
      id: "tools",
      title: "Security Tools",
      description: "Detailed guides for each security tool in the platform",
      icon: <Shield className="h-6 w-6 text-primary" />,
      articles: [
        { title: "Password Analyzer", path: "/docs/tools/password-analyzer", badge: null },
        { title: "Data Breach Scanner", path: "/docs/tools/data-breach-scanner", badge: null },
        { title: "Dark Web Monitor", path: "/docs/tools/dark-web-monitor", badge: "New" },
        { title: "Device Security Scanner", path: "/docs/tools/device-security-scanner", badge: "New" },
        { title: "Security Training", path: "/docs/tools/security-training", badge: "New" },
        { title: "Compliance Checker", path: "/docs/tools/compliance-checker", badge: "New" },
      ],
    },
    {
      id: "api",
      title: "API Documentation",
      description: "Integrate CyberRest into your applications and workflows",
      icon: <Code className="h-6 w-6 text-primary" />,
      articles: [
        { title: "API Overview", path: "/api-reference", badge: null },
        { title: "Authentication", path: "/api-reference/authentication", badge: null },
        { title: "Rate Limits", path: "/api-reference/rate-limits", badge: null },
        { title: "Webhooks", path: "/api-reference/webhooks", badge: null },
        { title: "API Changelog", path: "/api-reference/changelog", badge: null },
      ],
    },
    {
      id: "enterprise",
      title: "Enterprise Features",
      description: "Advanced features for enterprise customers",
      icon: <Server className="h-6 w-6 text-primary" />,
      articles: [
        { title: "Team Management", path: "/docs/enterprise/team-management", badge: null },
        { title: "SSO Integration", path: "/docs/enterprise/sso-integration", badge: null },
        { title: "Custom Reporting", path: "/docs/enterprise/custom-reporting", badge: null },
        { title: "White Labeling", path: "/docs/enterprise/white-labeling", badge: null },
        { title: "Enterprise API", path: "/docs/enterprise/enterprise-api", badge: null },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Solve common issues and get help when you need it",
      icon: <HelpCircle className="h-6 w-6 text-primary" />,
      articles: [
        { title: "Common Issues", path: "/docs/troubleshooting/common-issues", badge: null },
        { title: "Error Messages", path: "/docs/troubleshooting/error-messages", badge: null },
        { title: "Contact Support", path: "/docs/troubleshooting/contact-support", badge: null },
        { title: "System Status", path: "/status", badge: null },
        { title: "FAQ", path: "/docs/troubleshooting/faq", badge: null },
      ],
    },
  ]

  const filteredCategories = searchQuery
    ? docCategories
        .map((category) => ({
          ...category,
          articles: category.articles.filter((article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.articles.length > 0)
    : docCategories

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">CyberRest Documentation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guides and resources to help you get the most out of the CyberRest platform
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documentation..."
            className="pl-10 py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-10">
        <TabsList className="mx-auto flex justify-center mb-6">
          <TabsTrigger value="all">All Documentation</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-md bg-primary/10 mb-2">{category.icon}</div>
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.slice(0, 5).map((article, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <Link
                          to={article.path}
                          className="text-sm hover:underline hover:text-primary transition-colors flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          {article.title}
                        </Link>
                        {article.badge && (
                          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                            {article.badge}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to={`/docs/${category.id}`}>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All {category.title} Docs
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories
              .filter((cat) => ["getting-started", "tools", "troubleshooting"].includes(cat.id))
              .map((category) => (
                <Card key={category.id} className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-md bg-primary/10 mb-2">{category.icon}</div>
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.slice(0, 5).map((article, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <Link
                            to={article.path}
                            className="text-sm hover:underline hover:text-primary transition-colors flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            {article.title}
                          </Link>
                          {article.badge && (
                            <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                              {article.badge}
                            </Badge>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/docs/${category.id}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        View All {category.title} Docs
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories
              .filter((cat) => ["api", "enterprise"].includes(cat.id))
              .map((category) => (
                <Card key={category.id} className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-md bg-primary/10 mb-2">{category.icon}</div>
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.slice(0, 5).map((article, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <Link
                            to={article.path}
                            className="text-sm hover:underline hover:text-primary transition-colors flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            {article.title}
                          </Link>
                          {article.badge && (
                            <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                              {article.badge}
                            </Badge>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/docs/${category.id}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        View All {category.title} Docs
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Video Tutorials Coming Soon</CardTitle>
                <CardDescription>
                  We're currently working on a comprehensive library of video tutorials. Subscribe to our newsletter to
                  be notified when they're available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input type="email" placeholder="Enter your email" className="flex-1" />
                  <Button>Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Popular Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Getting Started Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                New to CyberRest? Start here for a complete overview of the platform.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/docs/quick-start">
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Comprehensive API documentation for developers.</p>
            </CardContent>
            <CardFooter>
              <Link to="/api-reference">
                <Button variant="outline" size="sm">
                  View API Docs
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to maximize your security posture with CyberRest.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/docs/security-best-practices">
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Answers to commonly asked questions about the platform.</p>
            </CardContent>
            <CardFooter>
              <Link to="/docs/troubleshooting/faq">
                <Button variant="outline" size="sm">
                  View FAQ
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Need more help?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Button variant="outline" className="flex-1">
            <Users className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
          <Button variant="outline" className="flex-1">
            <HelpCircle className="mr-2 h-4 w-4" />
            Community Forum
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DocumentationHub
