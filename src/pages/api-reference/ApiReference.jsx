"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Lock,
  Database,
  Bell,
  Zap,
  Server,
  GitBranch,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Badge from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ApiReference = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("curl");

  const apiEndpoints = [
    {
      category: "Authentication",
      icon: <Lock className="h-5 w-5" />,
      endpoints: [
        {
          name: "Generate API Key",
          method: "POST",
          path: "/api/v1/auth/api-keys",
          description: "Generate a new API key for your account",
          isNew: false,
        },
        {
          name: "List API Keys",
          method: "GET",
          path: "/api/v1/auth/api-keys",
          description: "List all API keys for your account",
          isNew: false,
        },
        {
          name: "Revoke API Key",
          method: "DELETE",
          path: "/api/v1/auth/api-keys/{key_id}",
          description: "Revoke an existing API key",
          isNew: false,
        },
        {
          name: "Refresh Token",
          method: "POST",
          path: "/api/v1/auth/refresh",
          description: "Refresh an authentication token",
          isNew: false,
        },
      ],
    },
    {
      category: "Security Tools",
      icon: <Zap className="h-5 w-5" />,
      endpoints: [
        {
          name: "Password Analysis",
          method: "POST",
          path: "/api/v1/tools/password-analysis",
          description: "Analyze password strength and security",
          isNew: false,
        },
        {
          name: "Data Breach Check",
          method: "POST",
          path: "/api/v1/tools/breach-check",
          description:
            "Check if credentials have been exposed in known data breaches",
          isNew: false,
        },
        {
          name: "Dark Web Scan",
          method: "POST",
          path: "/api/v1/tools/dark-web-scan",
          description: "Scan the dark web for exposed information",
          isNew: true,
        },
        {
          name: "Device Security Scan",
          method: "POST",
          path: "/api/v1/tools/device-scan",
          description: "Scan devices for security vulnerabilities",
          isNew: true,
        },
      ],
    },
    {
      category: "Data Management",
      icon: <Database className="h-5 w-5" />,
      endpoints: [
        {
          name: "Export Security Report",
          method: "GET",
          path: "/api/v1/reports/export",
          description: "Export security reports in various formats",
          isNew: false,
        },
        {
          name: "List Security Events",
          method: "GET",
          path: "/api/v1/events",
          description: "List security events for your account",
          isNew: false,
        },
        {
          name: "Get Event Details",
          method: "GET",
          path: "/api/v1/events/{event_id}",
          description: "Get detailed information about a security event",
          isNew: false,
        },
        {
          name: "Delete Data",
          method: "DELETE",
          path: "/api/v1/data/{data_id}",
          description: "Delete stored data from your account",
          isNew: false,
        },
      ],
    },
    {
      category: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      endpoints: [
        {
          name: "Configure Webhooks",
          method: "POST",
          path: "/api/v1/webhooks",
          description:
            "Configure webhook endpoints for real-time notifications",
          isNew: false,
        },
        {
          name: "List Webhooks",
          method: "GET",
          path: "/api/v1/webhooks",
          description: "List all configured webhooks",
          isNew: false,
        },
        {
          name: "Update Webhook",
          method: "PUT",
          path: "/api/v1/webhooks/{webhook_id}",
          description: "Update an existing webhook configuration",
          isNew: false,
        },
        {
          name: "Test Webhook",
          method: "POST",
          path: "/api/v1/webhooks/{webhook_id}/test",
          description: "Send a test notification to a webhook endpoint",
          isNew: false,
        },
      ],
    },
    {
      category: "Enterprise",
      icon: <Server className="h-5 w-5" />,
      endpoints: [
        {
          name: "Team Management",
          method: "GET",
          path: "/api/v1/enterprise/teams",
          description: "Manage team members and permissions",
          isNew: false,
        },
        {
          name: "SSO Configuration",
          method: "POST",
          path: "/api/v1/enterprise/sso",
          description: "Configure Single Sign-On for your organization",
          isNew: true,
        },
        {
          name: "Custom Reports",
          method: "POST",
          path: "/api/v1/enterprise/reports",
          description: "Generate custom security reports",
          isNew: true,
        },
        {
          name: "White Label Settings",
          method: "PUT",
          path: "/api/v1/enterprise/white-label",
          description: "Configure white labeling options",
          isNew: true,
        },
      ],
    },
  ];

  const filteredEndpoints = searchQuery
    ? apiEndpoints
        .map((category) => ({
          ...category,
          endpoints: category.endpoints.filter(
            (endpoint) =>
              endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
              endpoint.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.endpoints.length > 0)
    : apiEndpoints;

  const getCodeExample = (endpoint, language) => {
    const { method, path } = endpoint;

    switch (language) {
      case "curl":
        return `curl -X ${method} \\
  https://api.cyberrest.com${path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"param1": "value1", "param2": "value2"}'`;

      case "javascript":
        return `const response = await fetch('https://api.cyberrest.com${path}', {
  method: '${method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    param1: 'value1',
    param2: 'value2'
  })
});

const data = await response.json();
console.log(data);`;

      case "python":
        return `import requests

url = "https://api.cyberrest.com${path}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "param1": "value1",
    "param2": "value2"
}

response = requests.${method.toLowerCase()}(url, json=payload, headers=headers)
data = response.json()
print(data)`;

      default:
        return "";
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          API Reference
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Integrate CyberRest's powerful security tools into your applications
          with our comprehensive API.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search API endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-medium mb-2">API Sections</h3>
              {apiEndpoints.map((category) => (
                <Button
                  key={category.category}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() =>
                    document
                      .getElementById(
                        category.category.toLowerCase().replace(" ", "-")
                      )
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.category}
                </Button>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="font-medium mb-2">Resources</h3>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/docs/api/authentication">
                  <Lock className="mr-2 h-4 w-4" />
                  Authentication Guide
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/docs/api/rate-limits">
                  <Zap className="mr-2 h-4 w-4" />
                  Rate Limits
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/docs/api/errors">
                  <Code className="mr-2 h-4 w-4" />
                  Error Codes
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/docs/api/versioning">
                  <GitBranch className="mr-2 h-4 w-4" />
                  API Versioning
                </Link>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for or need assistance with
                integration?
              </p>
              <Button className="w-full" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Follow these steps to start using the CyberRest API in your
                applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="pl-2">
                  <span className="font-medium">Generate an API Key</span>
                  <p className="text-sm text-muted-foreground mt-1 ml-6">
                    Create an API key in your{" "}
                    <Link
                      to="/dashboard/settings"
                      className="text-primary hover:underline"
                    >
                      account settings
                    </Link>
                    .
                  </p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Include Authentication</span>
                  <p className="text-sm text-muted-foreground mt-1 ml-6">
                    Add your API key to the Authorization header:{" "}
                    <code className="bg-muted px-1 py-0.5 rounded">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Make Requests</span>
                  <p className="text-sm text-muted-foreground mt-1 ml-6">
                    All API requests should be made to{" "}
                    <code className="bg-muted px-1 py-0.5 rounded">
                      https://api.cyberrest.com
                    </code>
                  </p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Handle Responses</span>
                  <p className="text-sm text-muted-foreground mt-1 ml-6">
                    All responses are returned in JSON format with appropriate
                    HTTP status codes.
                  </p>
                </li>
              </ol>
            </CardContent>
          </Card>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">API Reference</h2>
            <Tabs
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
              className="mb-6"
            >
              <TabsList>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredEndpoints.map((category) => (
            <div
              key={category.category}
              id={category.category.toLowerCase().replace(" ", "-")}
              className="mb-10 scroll-mt-4"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-primary/10 mr-3">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.endpoints.map((endpoint) => (
                  <Card key={endpoint.path} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge
                            className={`mr-3 ${
                              endpoint.method === "GET"
                                ? "bg-green-100 text-green-800"
                                : endpoint.method === "POST"
                                ? "bg-blue-100 text-blue-800"
                                : endpoint.method === "PUT"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                          <CardTitle className="text-lg">
                            {endpoint.name}
                          </CardTitle>
                        </div>
                        {endpoint.isNew && (
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {endpoint.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="endpoint-details">
                          <AccordionTrigger>
                            <div className="flex items-center text-sm font-mono bg-muted px-3 py-1 rounded">
                              <span
                                className={`mr-2 ${
                                  endpoint.method === "GET"
                                    ? "text-green-600"
                                    : endpoint.method === "POST"
                                    ? "text-blue-600"
                                    : endpoint.method === "PUT"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {endpoint.method}
                              </span>
                              <span>{endpoint.path}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="mt-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">
                                  Request Example
                                </h4>
                                <div className="relative">
                                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                    <code>
                                      {getCodeExample(
                                        endpoint,
                                        selectedLanguage
                                      )}
                                    </code>
                                  </pre>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={() =>
                                      copyToClipboard(
                                        getCodeExample(
                                          endpoint,
                                          selectedLanguage
                                        )
                                      )
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">
                                  Response Example
                                </h4>
                                <div className="relative">
                                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                    <code>{`{
  "status": "success",
  "data": {
    "id": "1234567890",
    "created_at": "2023-05-16T13:45:30Z",
    "result": {
      // Response data specific to this endpoint
    }
  }
}`}</code>
                                  </pre>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={() =>
                                      copyToClipboard(`{
  "status": "success",
  "data": {
    "id": "1234567890",
    "created_at": "2023-05-16T13:45:30Z",
    "result": {
      // Response data specific to this endpoint
    }
  }
}`)
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <Button variant="outline" size="sm" asChild>
                                  <Link
                                    to={`/api-reference/endpoints${endpoint.path}`}
                                  >
                                    View Full Documentation
                                    <ExternalLink className="ml-2 h-3 w-3" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-bold mb-6">SDKs & Client Libraries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 18.178L4.632 13.352L12 8.525L19.368 13.352L12 18.178Z"
                        fill="#F7DF1E"
                      />
                      <path
                        d="M12 4L21.392 9.5V18.5L12 24L2.608 18.5V9.5L12 4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    JavaScript
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Official JavaScript SDK for Node.js and browser
                    applications.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/docs/sdks/javascript">Documentation</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <a
                        href="https://github.com/cyberrest/javascript-sdk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.04 4.67L4.53 19.5H8.03L9.17 17.12H14.91L16.05 19.5H19.55L12.04 4.67ZM10.2 14.56L12.04 10.44L13.88 14.56H10.2Z"
                        fill="#3776AB"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Python
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Official Python SDK for server-side applications.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/docs/sdks/python">Documentation</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <a
                        href="https://github.com/cyberrest/python-sdk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        fill="#5C2D91"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M16 8L12 12M12 12L8 16M12 12L8 8M12 12L16 16"
                        stroke="#5C2D91"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    .NET
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Official .NET SDK for C# applications.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/docs/sdks/dotnet">Documentation</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <a
                        href="https://github.com/cyberrest/dotnet-sdk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiReference;
