"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import {
  Code,
  FileText,
  ExternalLink,
  ArrowRight,
  Terminal,
  Puzzle,
  Webhook,
  Key,
  BookOpen,
  Github,
  Download,
  Copy,
  Check,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function DeveloperPortal() {
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    javascript: `import { CyberRest } from '@cyberrest/js-client';

// Initialize the client with your API key
const client = new CyberRest({
  apiKey: 'YOUR_API_KEY',
});

// Run a security scan
async function runSecurityScan() {
  try {
    const scan = await client.scans.create({
      scanType: 'network',
      target: '192.168.1.0/24',
      options: {
        portScan: true,
        vulnerabilityCheck: true,
      },
    });
    
    console.log('Scan created:', scan.scanId);
    
    // Poll for results
    const results = await client.scans.waitForResults(scan.scanId);
    console.log('Scan results:', results);
  } catch (error) {
    console.error('Error running scan:', error);
  }
}

runSecurityScan();`,

    python: `from cyberrest import CyberRest

# Initialize the client with your API key
client = CyberRest(api_key='YOUR_API_KEY')

# Run a security scan
def run_security_scan():
    try:
        scan = client.scans.create(
            scan_type='network',
            target='192.168.1.0/24',
            options={
                'port_scan': True,
                'vulnerability_check': True
            }
        )
        
        print(f"Scan created: {scan['scan_id']}")
        
        # Poll for results
        results = client.scans.wait_for_results(scan['scan_id'])
        print(f"Scan results: {results}")
    except Exception as e:
        print(f"Error running scan: {e}")

run_security_scan()`,

    curl: `# Generate an authentication token
curl -X POST https://api.cyberrest.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "api_key": "YOUR_API_KEY",
    "api_secret": "YOUR_API_SECRET"
  }'

# Store the token from the response
TOKEN="YOUR_TOKEN"

# Create a security scan
curl -X POST https://api.cyberrest.com/v1/scans \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "scan_type": "network",
    "target": "192.168.1.0/24",
    "options": {
      "port_scan": true,
      "vulnerability_check": true
    }
  }'

# Store the scan_id from the response
SCAN_ID="scan_12345"

# Get scan results
curl -X GET https://api.cyberrest.com/v1/scans/$SCAN_ID \\
  -H "Authorization: Bearer $TOKEN"`,
  }

  return (
    <>
      <Navbar />
      <main className="container py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Developer Portal</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">CyberRest Developer Portal</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Everything you need to integrate CyberRest's security tools into your applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/documentation/api">
                <FileText className="mr-2 h-4 w-4" />
                API Reference
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/documentation/api/quickstart">
                <Terminal className="mr-2 h-4 w-4" />
                Quickstart Guide
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/cyberrest" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Create and manage your API keys</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Generate API keys to authenticate your requests to the CyberRest API.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/dashboard/api-integrations">Manage API Keys</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>SDKs & Libraries</CardTitle>
              <CardDescription>Official client libraries for popular languages</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Use our official SDKs to integrate CyberRest into your applications quickly and easily.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/documentation/api/libraries">View Libraries</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">
                <Webhook className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Set up real-time notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure webhooks to receive real-time notifications about security events and scan results.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/documentation/api/webhooks">Configure Webhooks</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
          <Card>
            <CardHeader>
              <CardTitle>Get Started with the CyberRest API</CardTitle>
              <CardDescription>Examples in multiple languages to help you integrate with our API</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript">
                <TabsList className="mb-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([language, code]) => (
                  <TabsContent key={language} value={language}>
                    <div className="relative">
                      <div className="absolute right-2 top-2">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code, language)}>
                          {copiedCode === language ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="bg-muted p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link to="/documentation/api/examples">
                  View More Examples
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Integration Guides</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Slack Integration",
                description: "Send security alerts and notifications to Slack channels",
                icon: <Puzzle className="h-5 w-5" />,
                link: "/documentation/integrations/slack",
              },
              {
                title: "Microsoft Teams Integration",
                description: "Integrate security alerts with Microsoft Teams",
                icon: <Puzzle className="h-5 w-5" />,
                link: "/documentation/integrations/teams",
              },
              {
                title: "Jira Integration",
                description: "Create Jira tickets from security findings",
                icon: <Puzzle className="h-5 w-5" />,
                link: "/documentation/integrations/jira",
              },
              {
                title: "GitHub Integration",
                description: "Scan code repositories and integrate with GitHub",
                icon: <Puzzle className="h-5 w-5" />,
                link: "/documentation/integrations/github",
              },
              {
                title: "Zapier Integration",
                description: "Connect CyberRest with thousands of apps via Zapier",
                icon: <Puzzle className="h-5 w-5" />,
                link: "/documentation/integrations/zapier",
              },
              {
                title: "Custom Webhooks",
                description: "Build custom integrations with webhooks",
                icon: <Webhook className="h-5 w-5" />,
                link: "/documentation/integrations/webhooks",
              },
            ].map((integration, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">{integration.icon}</div>
                  <CardTitle>{integration.title}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={integration.link}>View Guide</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">API Documentation</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Interactive API Reference</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our comprehensive API documentation with interactive examples and request builders.
                  </p>
                  <Button asChild>
                    <Link to="/api">
                      <FileText className="mr-2 h-4 w-4" />
                      View API Reference
                    </Link>
                  </Button>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">OpenAPI Specification</h3>
                  <p className="text-muted-foreground mb-4">
                    Download our OpenAPI specification to generate client libraries or import into your API tools.
                  </p>
                  <div className="flex gap-4">
                    <Button asChild variant="outline">
                      <a href="/api-spec.yaml" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download YAML
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="/api-spec.json" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download JSON
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Developer Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sample Applications</CardTitle>
                <CardDescription>Example applications demonstrating CyberRest API integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Github className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Security Dashboard Demo</h4>
                      <p className="text-sm text-muted-foreground">
                        A React application demonstrating how to build a security dashboard with the CyberRest API.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <a href="https://github.com/cyberrest/dashboard-demo" target="_blank" rel="noopener noreferrer">
                          View on GitHub
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Github className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">CLI Security Scanner</h4>
                      <p className="text-sm text-muted-foreground">
                        A command-line tool for running security scans using the CyberRest API.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <a href="https://github.com/cyberrest/cli-scanner" target="_blank" rel="noopener noreferrer">
                          View on GitHub
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Github className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Webhook Receiver</h4>
                      <p className="text-sm text-muted-foreground">
                        A simple server for receiving and processing CyberRest webhooks.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <a
                          href="https://github.com/cyberrest/webhook-receiver"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on GitHub
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community & Support</CardTitle>
                <CardDescription>Get help and connect with other developers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Developer Forum</h4>
                      <p className="text-sm text-muted-foreground">
                        Ask questions, share knowledge, and connect with other developers using the CyberRest API.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <a href="https://community.cyberrest.com" target="_blank" rel="noopener noreferrer">
                          Visit Forum
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Github className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">GitHub Discussions</h4>
                      <p className="text-sm text-muted-foreground">
                        Participate in discussions about our SDKs and libraries on GitHub.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <a href="https://github.com/cyberrest/discussions" target="_blank" rel="noopener noreferrer">
                          Join Discussions
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Terminal className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Developer Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Get dedicated support for API integration and development questions.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <Link to="/contact?topic=developer">Contact Developer Support</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Ready to Build with CyberRest?</h2>
                <p className="mb-4">
                  Create an account or sign in to get your API keys and start integrating CyberRest's security tools
                  into your applications.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" asChild>
                    <Link to="/register">Create Account</Link>
                  </Button>
                  <Button variant="outline" className="bg-transparent" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="rounded-full bg-primary-foreground/20 p-6">
                  <Code className="h-16 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}
