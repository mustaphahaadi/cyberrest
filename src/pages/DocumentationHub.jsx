"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Book, Code, Server, Shield, FileText, HelpCircle } from "lucide-react"

const DocumentationHub = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      title: "Getting Started",
      icon: <Book className="h-6 w-6" />,
      description: "Learn the basics of CyberRest and how to set up your account",
      links: [
        { title: "Quick Start Guide", url: "/docs/quick-start" },
        { title: "Account Setup", url: "/docs/account-setup" },
        { title: "Dashboard Overview", url: "/docs/dashboard-overview" },
        { title: "Security Basics", url: "/docs/security-basics" },
      ],
    },
    {
      title: "API Documentation",
      icon: <Code className="h-6 w-6" />,
      description: "Comprehensive API reference for developers",
      links: [
        { title: "API Overview", url: "/api-reference" },
        { title: "Authentication", url: "/api-reference/authentication" },
        { title: "Endpoints", url: "/api-reference/endpoints" },
        { title: "Rate Limits", url: "/api-reference/rate-limits" },
      ],
    },
    {
      title: "Platform Features",
      icon: <Server className="h-6 w-6" />,
      description: "Detailed guides for all CyberRest features and tools",
      links: [
        { title: "Dark Web Monitor", url: "/docs/features/dark-web-monitor" },
        { title: "Device Security Scanner", url: "/docs/features/device-security-scanner" },
        { title: "Security Training", url: "/docs/features/security-training" },
        { title: "Compliance Checker", url: "/docs/features/compliance-checker" },
      ],
    },
    {
      title: "Security Guides",
      icon: <Shield className="h-6 w-6" />,
      description: "Best practices and security recommendations",
      links: [
        { title: "Password Security", url: "/docs/security/password-security" },
        { title: "Phishing Prevention", url: "/docs/security/phishing-prevention" },
        { title: "Data Protection", url: "/docs/security/data-protection" },
        { title: "Incident Response", url: "/docs/security/incident-response" },
      ],
    },
    {
      title: "Integrations",
      icon: <FileText className="h-6 w-6" />,
      description: "Connect CyberRest with your existing tools and services",
      links: [
        { title: "Integration Overview", url: "/docs/integrations/overview" },
        { title: "SSO Setup", url: "/docs/integrations/sso-setup" },
        { title: "API Integrations", url: "/docs/integrations/api-integrations" },
        { title: "Third-party Services", url: "/docs/integrations/third-party-services" },
      ],
    },
    {
      title: "Troubleshooting",
      icon: <HelpCircle className="h-6 w-6" />,
      description: "Solutions for common issues and questions",
      links: [
        { title: "Common Issues", url: "/docs/troubleshooting/common-issues" },
        { title: "FAQ", url: "/docs/troubleshooting/faq" },
        { title: "Contact Support", url: "/support" },
        { title: "System Status", url: "/status" },
      ],
    },
  ]

  const filteredCategories = searchQuery
    ? categories
        .map((category) => ({
          ...category,
          links: category.links.filter((link) => link.title.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((category) => category.links.length > 0)
    : categories

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">CyberRest Documentation</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Comprehensive guides, API references, and resources to help you get the most out of the CyberRest platform.
        </p>

        <div className="mt-6 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="mr-3 text-blue-600 dark:text-blue-400">{category.icon}</div>
              <h2 className="text-xl font-semibold">{category.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
            <ul className="space-y-2">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link to={link.url} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <span className="mr-2">→</span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Need more help?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Browse Knowledge Base
          </Link>
          <Link
            to="/support"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DocumentationHub
