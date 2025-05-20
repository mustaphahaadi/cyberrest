"use client"

import { useState } from "react"
import { Search, Key, Database, Clock, Code, Settings } from "lucide-react"
import Input from "@/components/ui/input"

const ApiReference = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const apiSections = [
    {
      id: "overview",
      title: "API Overview",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">CyberRest API Overview</h2>
          <p className="mb-4">
            The CyberRest API allows you to programmatically access and manage your cybersecurity data and tools. Our
            RESTful API provides secure access to all the features available in the CyberRest platform.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">Base URL</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono mb-4">https://api.cyberrest.com/v1</div>
          <h3 className="text-xl font-semibold mt-6 mb-3">Content Type</h3>
          <p className="mb-4">
            All requests must use <code>application/json</code> content type.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">API Versioning</h3>
          <p className="mb-4">
            The current API version is v1. We maintain backward compatibility for all non-deprecated endpoints.
          </p>
        </div>
      ),
    },
    {
      id: "authentication",
      title: "Authentication",
      icon: <Key className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Authentication</h2>
          <p className="mb-4">
            The CyberRest API uses API keys for authentication. You can generate and manage your API keys in the
            Developer Portal.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">API Key Authentication</h3>
          <p className="mb-4">Include your API key in the request header:</p>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono mb-4">
            Authorization: Bearer YOUR_API_KEY
          </div>
          <h3 className="text-xl font-semibold mt-6 mb-3">OAuth 2.0</h3>
          <p className="mb-4">
            For integrations that require user authorization, we support OAuth 2.0. See the OAuth documentation for
            details.
          </p>
        </div>
      ),
    },
    {
      id: "endpoints",
      title: "Endpoints",
      icon: <Database className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
          <p className="mb-4">The CyberRest API provides the following endpoint categories:</p>

          <div className="space-y-6 mt-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">Manage users, roles, and permissions</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    GET
                  </span>
                  <code className="text-sm">/users</code>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    POST
                  </span>
                  <code className="text-sm">/users</code>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    GET
                  </span>
                  <code className="text-sm">/users/{"{id}"}</code>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Security Scans</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">Manage and retrieve security scan results</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    GET
                  </span>
                  <code className="text-sm">/scans</code>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    POST
                  </span>
                  <code className="text-sm">/scans</code>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    GET
                  </span>
                  <code className="text-sm">/scans/{"{id}"}</code>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Vulnerabilities</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">
                Access vulnerability data and remediation information
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    GET
                  </span>
                  <code className="text-sm">/vulnerabilities</code>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    GET
                  </span>
                  <code className="text-sm">/vulnerabilities/{"{id}"}</code>
                </div>
                <div className="flex items-start">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs font-medium mr-2">
                    PATCH
                  </span>
                  <code className="text-sm">/vulnerabilities/{"{id}"}/status</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "rate-limits",
      title: "Rate Limits",
      icon: <Clock className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">API Rate Limits</h2>
          <p className="mb-4">
            To ensure the stability and availability of the API for all users, we implement rate limiting on all API
            endpoints.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Default Limits</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Plan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Requests per minute
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Requests per day
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Free</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">60</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">10,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Professional</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">300</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">50,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Enterprise</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">1,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">200,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Rate Limit Headers</h3>
          <p className="mb-4">
            Each API response includes headers that provide information about your current rate limit status:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono mb-4">
            X-RateLimit-Limit: 60
            <br />
            X-RateLimit-Remaining: 56
            <br />
            X-RateLimit-Reset: 1623456789
          </div>
        </div>
      ),
    },
    {
      id: "errors",
      title: "Error Handling",
      icon: <Code className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">API Error Handling</h2>
          <p className="mb-4">
            The CyberRest API uses conventional HTTP response codes to indicate the success or failure of an API
            request.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">HTTP Status Codes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">2xx - Success</h4>
              <p className="text-gray-600 dark:text-gray-300">
                The request was successfully received, understood, and accepted.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">4xx - Client Error</h4>
              <p className="text-gray-600 dark:text-gray-300">
                The request contains bad syntax or cannot be fulfilled.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">5xx - Server Error</h4>
              <p className="text-gray-600 dark:text-gray-300">The server failed to fulfill a valid request.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Error Response Format</h3>
          <p className="mb-4">Error responses include a JSON object with the following structure:</p>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono mb-4">
            {`{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "The 'name' field is required"
  }
}`}
          </div>
        </div>
      ),
    },
    {
      id: "sdks",
      title: "SDKs & Libraries",
      icon: <Settings className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">SDKs & Client Libraries</h2>
          <p className="mb-4">
            To make integration with CyberRest even easier, we provide official client libraries for popular programming
            languages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">JavaScript/TypeScript</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">Official Node.js client for CyberRest API</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm mb-3">
                npm install cyberrest-node
              </div>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                View Documentation →
              </a>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Python</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">Official Python client for CyberRest API</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm mb-3">
                pip install cyberrest-python
              </div>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                View Documentation →
              </a>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Java</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">Official Java client for CyberRest API</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm mb-3">
                {`<dependency>
  <groupId>com.cyberrest</groupId>
  <artifactId>cyberrest-java</artifactId>
  <version>1.0.0</version>
</dependency>`}
              </div>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                View Documentation →
              </a>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Go</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">Official Go client for CyberRest API</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm mb-3">
                go get github.com/cyberrest/cyberrest-go
              </div>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                View Documentation →
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const filteredSections = searchQuery
    ? apiSections.filter(
        (section) =>
          section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.content.props.children.some(
            (child) =>
              typeof child === "object" &&
              child.props &&
              typeof child.props.children === "string" &&
              child.props.children.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : apiSections

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">API Reference</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Complete reference documentation for the CyberRest API. Learn how to authenticate, make requests, and
          integrate with our platform.
        </p>

        <div className="mt-6 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search API documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="sticky top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Contents</h2>
            <nav className="space-y-1">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === section.id
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {section.icon && <span className="mr-3">{section.icon}</span>}
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            {filteredSections.find((section) => section.id === activeTab)?.content || (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a section from the sidebar to view documentation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiReference
