"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, Book, ArrowRight, ExternalLink, HelpCircle, Key, Shield, Wifi } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const guides = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of CyberRest and set up your account",
      icon: "book",
      articles: [
        { id: "account-setup", title: "Account Setup Guide" },
        { id: "dashboard-overview", title: "Dashboard Overview" },
        { id: "security-tools-intro", title: "Security Tools Introduction" },
        { id: "first-security-scan", title: "Running Your First Security Scan" },
      ],
    },
    {
      id: "password-security",
      title: "Password Security",
      description: "Guides for password management and security",
      icon: "key",
      articles: [
        { id: "password-best-practices", title: "Password Best Practices" },
        { id: "password-analyzer-guide", title: "Using the Password Analyzer" },
        { id: "password-generator-guide", title: "Creating Strong Passwords" },
        { id: "password-manager-guide", title: "Password Manager Integration" },
      ],
    },
    {
      id: "data-protection",
      title: "Data Protection",
      description: "Protect your sensitive data from breaches and leaks",
      icon: "shield",
      articles: [
        { id: "data-breach-scanner-guide", title: "Data Breach Scanner Guide" },
        { id: "encryption-basics", title: "Encryption Basics" },
        { id: "secure-file-storage", title: "Secure File Storage" },
        { id: "data-backup-strategies", title: "Data Backup Strategies" },
      ],
    },
    {
      id: "network-security",
      title: "Network Security",
      description: "Secure your network connections and devices",
      icon: "wifi",
      articles: [
        { id: "network-scanner-guide", title: "Network Scanner Guide" },
        { id: "vpn-setup", title: "VPN Setup and Configuration" },
        { id: "firewall-configuration", title: "Firewall Configuration" },
        { id: "secure-browsing", title: "Secure Browsing Practices" },
      ],
    },
  ]

  const apiDocs = [
    {
      id: "api-overview",
      title: "API Overview",
      description: "Introduction to the CyberRest API",
    },
    {
      id: "authentication",
      title: "Authentication",
      description: "API authentication and authorization",
    },
    {
      id: "endpoints",
      title: "API Endpoints",
      description: "Available API endpoints and methods",
    },
    {
      id: "rate-limits",
      title: "Rate Limits",
      description: "API rate limits and quotas",
    },
    {
      id: "error-handling",
      title: "Error Handling",
      description: "API error codes and handling",
    },
    {
      id: "webhooks",
      title: "Webhooks",
      description: "Setting up and using webhooks",
    },
  ]

  const faqCategories = [
    {
      id: "account",
      title: "Account & Billing",
      faqs: [
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password.",
        },
        {
          question: "How can I upgrade my subscription?",
          answer:
            "You can upgrade your subscription by going to Dashboard > Subscription and selecting the 'Upgrade Plan' button.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and bank transfers for annual plans. Cryptocurrency payments are coming soon.",
        },
        {
          question: "How do I cancel my subscription?",
          answer:
            "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
        },
      ],
    },
    {
      id: "tools",
      title: "Security Tools",
      faqs: [
        {
          question: "How do I scan my system for malware?",
          answer:
            "To scan your system for malware, navigate to the Malware Scanner tool in your dashboard. Click on 'Start Scan' and select the scan type (Quick, Full, or Custom).",
        },
        {
          question: "How often should I check for data breaches?",
          answer:
            "We recommend checking for data breaches at least once a month. Premium and Business plans include automatic monitoring that will alert you if your information appears in a new data breach.",
        },
        {
          question: "Can I use CyberRest on multiple devices?",
          answer:
            "Yes, you can use CyberRest on multiple devices depending on your subscription plan. The Free plan supports 1 device, Premium supports up to 5 devices, and Business supports unlimited devices.",
        },
      ],
    },
  ]

  return (
    <>
      <Navbar />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive guides and documentation to help you get the most out of CyberRest
            </p>

            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Guides</CardTitle>
                <CardDescription>Step-by-step tutorials and how-to guides</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">
                  Learn how to use CyberRest's features with our comprehensive guides and tutorials.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="#guides">Browse Guides</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Technical documentation for developers</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">
                  Integrate CyberRest into your applications with our comprehensive API documentation.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="#api">View API Docs</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">
                  Find answers to common questions about CyberRest features, billing, and more.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="#faq">View FAQ</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <section id="guides" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Guides & Tutorials</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {guides.map((guide) => (
                <Card key={guide.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-primary/10 p-2 w-fit">
                        {guide.icon === "book" ? (
                          <Book className="h-5 w-5 text-primary" />
                        ) : guide.icon === "key" ? (
                          <Key className="h-5 w-5 text-primary" />
                        ) : guide.icon === "shield" ? (
                          <Shield className="h-5 w-5 text-primary" />
                        ) : (
                          <Wifi className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <Badge variant="outline">{guide.articles.length} articles</Badge>
                    </div>
                    <CardTitle className="mt-2">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {guide.articles.map((article) => (
                        <li key={article.id}>
                          <Link
                            to={`/docs/${guide.id}/${article.id}`}
                            className="flex items-center text-sm hover:underline"
                          >
                            <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/docs/${guide.id}`}>View All Articles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section id="api" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">API Documentation</h2>
            <Card>
              <CardHeader>
                <CardTitle>CyberRest API Reference</CardTitle>
                <CardDescription>Integrate CyberRest's security features into your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {apiDocs.map((doc) => (
                    <Link
                      key={doc.id}
                      to={`/docs/api/${doc.id}`}
                      className="flex items-start p-4 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <a href="/docs/api" className="flex items-center">
                    <span>View Full API Documentation</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </section>

          <section id="faq" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Tabs defaultValue={faqCategories[0].id}>
              <TabsList className="mb-4">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>Frequently asked questions about {category.title.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/docs/faq">View All FAQs</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section className="mb-16">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
                    <p className="mb-4">
                      Can't find what you're looking for? Our support team is here to help you with any questions or
                      issues.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="secondary" asChild>
                        <Link to="/contact">Contact Support</Link>
                      </Button>
                      <Button variant="outline" className="bg-transparent" asChild>
                        <Link to="/dashboard/support">Submit a Ticket</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="rounded-full bg-primary-foreground/20 p-6">
                      <HelpCircle className="h-16 w-16" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
