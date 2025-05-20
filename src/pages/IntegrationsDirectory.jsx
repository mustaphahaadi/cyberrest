"use client"

import { useState } from "react"
import { Search, Filter, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Badge from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const IntegrationsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const integrationCategories = [
    { id: "all", name: "All Categories" },
    { id: "identity", name: "Identity & Access" },
    { id: "communication", name: "Communication" },
    { id: "productivity", name: "Productivity" },
    { id: "security", name: "Security" },
    { id: "devops", name: "DevOps" },
    { id: "analytics", name: "Analytics" },
  ]

  const integrations = [
    {
      id: "microsoft365",
      name: "Microsoft 365",
      description: "Secure your Microsoft 365 environment and monitor for threats",
      category: "productivity",
      logo: "/placeholder.svg?height=80&width=80",
      popular: true,
      features: ["User account monitoring", "Email security scanning", "Document security", "Teams integration"],
      setupTime: "10 minutes",
      docsUrl: "/docs/integrations/microsoft365",
    },
    {
      id: "google-workspace",
      name: "Google Workspace",
      description: "Protect Google Workspace accounts, emails, and documents",
      category: "productivity",
      logo: "/placeholder.svg?height=80&width=80",
      popular: true,
      features: ["Gmail security", "Google Drive protection", "User account monitoring", "SSO integration"],
      setupTime: "15 minutes",
      docsUrl: "/docs/integrations/google-workspace",
    },
    {
      id: "slack",
      name: "Slack",
      description: "Receive security alerts and manage incidents directly in Slack",
      category: "communication",
      logo: "/placeholder.svg?height=80&width=80",
      popular: true,
      features: ["Real-time security alerts", "Incident management", "Command-line interface", "Automated workflows"],
      setupTime: "5 minutes",
      docsUrl: "/docs/integrations/slack",
    },
    {
      id: "okta",
      name: "Okta",
      description: "Integrate with Okta for identity management and SSO",
      category: "identity",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Single Sign-On (SSO)", "User provisioning", "Multi-factor authentication", "Identity governance"],
      setupTime: "20 minutes",
      docsUrl: "/docs/integrations/okta",
    },
    {
      id: "azure-ad",
      name: "Azure Active Directory",
      description: "Connect with Azure AD for comprehensive identity security",
      category: "identity",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Identity protection", "Conditional access", "Privileged identity management", "SSO integration"],
      setupTime: "25 minutes",
      docsUrl: "/docs/integrations/azure-ad",
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Manage security operations and receive alerts in Teams",
      category: "communication",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Security alerts", "Incident response", "Team collaboration", "Security chatbot"],
      setupTime: "10 minutes",
      docsUrl: "/docs/integrations/teams",
    },
    {
      id: "jira",
      name: "Jira",
      description: "Create and track security issues in Jira",
      category: "devops",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: [
        "Vulnerability tracking",
        "Security issue management",
        "Workflow automation",
        "Custom security dashboards",
      ],
      setupTime: "15 minutes",
      docsUrl: "/docs/integrations/jira",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Scan repositories for security vulnerabilities and secrets",
      category: "devops",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Code scanning", "Secret detection", "Dependency analysis", "Security alerts"],
      setupTime: "10 minutes",
      docsUrl: "/docs/integrations/github",
    },
    {
      id: "splunk",
      name: "Splunk",
      description: "Send security data to Splunk for advanced analytics",
      category: "analytics",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Security data integration", "Custom dashboards", "Advanced correlation", "Threat hunting"],
      setupTime: "30 minutes",
      docsUrl: "/docs/integrations/splunk",
    },
    {
      id: "datadog",
      name: "Datadog",
      description: "Monitor security metrics and logs with Datadog",
      category: "analytics",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Security monitoring", "Log analysis", "Anomaly detection", "Custom alerts"],
      setupTime: "20 minutes",
      docsUrl: "/docs/integrations/datadog",
    },
    {
      id: "crowdstrike",
      name: "CrowdStrike",
      description: "Integrate with CrowdStrike for endpoint protection",
      category: "security",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Endpoint visibility", "Threat intelligence", "Incident correlation", "Automated response"],
      setupTime: "45 minutes",
      docsUrl: "/docs/integrations/crowdstrike",
    },
    {
      id: "sentinelone",
      name: "SentinelOne",
      description: "Connect with SentinelOne for endpoint security",
      category: "security",
      logo: "/placeholder.svg?height=80&width=80",
      popular: false,
      features: ["Endpoint protection", "Threat detection", "Automated remediation", "Security insights"],
      setupTime: "30 minutes",
      docsUrl: "/docs/integrations/sentinelone",
    },
  ]

  // Filter integrations based on search query and category
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || integration.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Get popular integrations
  const popularIntegrations = integrations.filter((integration) => integration.popular)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Integrations Directory</h1>
        <p className="text-muted-foreground max-w-3xl">
          Extend CyberRest's capabilities by connecting with your favorite tools and services. Browse our growing
          library of integrations to enhance your security operations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search integrations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {integrationCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {filteredIntegrations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No integrations found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard key={integration.id} integration={integration} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </TabsContent>
        {integrationCategories.slice(1).map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations
                .filter((integration) => integration.category === category.id)
                .map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted rounded-lg p-8 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need a custom integration?</h2>
            <p className="text-muted-foreground">
              Don't see the integration you need? Our team can help build custom integrations for your specific
              requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">View API Documentation</Button>
            <Button>Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const IntegrationCard = ({ integration }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
            <img
              src={integration.logo || "/placeholder.svg"}
              alt={`${integration.name} logo`}
              className="h-12 w-12 object-contain"
            />
          </div>
          {integration.popular && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle>{integration.name}</CardTitle>
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Features:</h4>
            <ul className="space-y-1">
              {integration.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <span className="font-medium">Setup time:</span>{" "}
            <span className="text-muted-foreground">{integration.setupTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button>Connect</Button>
      </CardFooter>
    </Card>
  )
}

export default IntegrationsDirectory
