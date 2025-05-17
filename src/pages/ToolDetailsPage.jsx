"use client"

import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Shield, Lock, AlertTriangle, Wifi, FileCheck, Search } from "lucide-react"

export default function ToolDetailsPage() {
  const { id } = useParams()

  // Mock tool data - in a real app, you would fetch this based on the ID
  const tools = {
    "password-analyzer": {
      title: "Password Strength Analyzer",
      description: "Evaluate the strength of your passwords and get recommendations for improvement.",
      icon: Lock,
      category: "Password Security",
      features: [
        "Comprehensive password strength evaluation",
        "Identifies common patterns and weaknesses",
        "Provides specific improvement recommendations",
        "Checks against known data breaches",
        "Supports multiple languages and character sets",
      ],
      benefits: [
        "Prevent unauthorized account access",
        "Protect sensitive personal information",
        "Reduce risk of identity theft",
        "Meet security compliance requirements",
      ],
      howItWorks: [
        "Enter your password (never stored or transmitted)",
        "Our algorithm analyzes length, complexity, and patterns",
        "Receive a detailed strength score and breakdown",
        "Get actionable recommendations to improve security",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    "password-generator": {
      title: "Secure Password Generator",
      description: "Create strong, random passwords that are difficult to crack and easy to remember.",
      icon: Lock,
      category: "Password Security",
      features: [
        "Customizable password length and complexity",
        "Options for special characters, numbers, and mixed case",
        "Pronounceable password generation option",
        "Passphrase generation with dictionary words",
        "Exclude similar characters to prevent confusion",
      ],
      benefits: [
        "Create unique passwords for every account",
        "Eliminate predictable password patterns",
        "Balance security and memorability",
        "Meet specific password requirements for different services",
      ],
      howItWorks: [
        "Select your desired password options and length",
        "Our algorithm generates a random, secure password",
        "Copy the password to your clipboard",
        "Save it in a password manager for future use",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    "data-breach": {
      title: "Data Breach Scanner",
      description: "Check if your email or accounts have been compromised in known data breaches.",
      icon: AlertTriangle,
      category: "Threat Detection",
      features: [
        "Scans against database of known breaches",
        "Email and username monitoring",
        "Detailed breach information and timeline",
        "Continuous monitoring with alerts",
        "Recommendations for compromised accounts",
      ],
      benefits: [
        "Quickly identify compromised accounts",
        "Take action before credentials are misused",
        "Understand the scope and severity of breaches",
        "Prioritize which passwords to change first",
      ],
      howItWorks: [
        "Enter your email address or username",
        "Our system checks against a database of known breaches",
        "Receive detailed information about any breaches found",
        "Get step-by-step remediation instructions",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    "phishing-detector": {
      title: "Phishing Site Detector",
      description: "Identify potentially fraudulent websites designed to steal your information.",
      icon: AlertTriangle,
      category: "Threat Detection",
      features: [
        "URL analysis and reputation checking",
        "Visual similarity detection",
        "SSL certificate verification",
        "Domain age and registration analysis",
        "Real-time website scanning",
      ],
      benefits: [
        "Avoid identity theft and credential theft",
        "Protect financial information",
        "Prevent malware infections",
        "Stay safe while browsing unfamiliar sites",
      ],
      howItWorks: [
        "Enter a suspicious URL or website link",
        "Our system analyzes multiple security factors",
        "Receive a risk assessment and detailed explanation",
        "Get recommendations on how to proceed safely",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    "network-scanner": {
      title: "Network Security Scanner",
      description: "Identify vulnerabilities and security issues in your network.",
      icon: Wifi,
      category: "Network Protection",
      features: [
        "Open port detection",
        "Device discovery and inventory",
        "Vulnerability identification",
        "Encryption strength assessment",
        "Router security analysis",
      ],
      benefits: [
        "Discover unknown devices on your network",
        "Identify potential entry points for attackers",
        "Ensure proper network configuration",
        "Maintain network security hygiene",
      ],
      howItWorks: [
        "Initiate a scan of your local network",
        "Our tool identifies devices and potential vulnerabilities",
        "Receive a comprehensive security report",
        "Follow specific recommendations to secure your network",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    encryption: {
      title: "Encryption/Decryption Tool",
      description: "Securely encrypt sensitive files and messages with strong encryption.",
      icon: Lock,
      category: "Data Protection",
      features: [
        "Multiple encryption algorithms (AES-256, RSA)",
        "File and text encryption",
        "Password-protected encryption",
        "Secure key management",
        "Cross-platform compatibility",
      ],
      benefits: [
        "Protect sensitive documents and communications",
        "Secure data before cloud storage or transmission",
        "Ensure only authorized recipients can access information",
        "Maintain privacy of personal information",
      ],
      howItWorks: [
        "Select a file or enter text to encrypt",
        "Choose an encryption method and create a secure password",
        "Our system encrypts your data with industry-standard algorithms",
        "Share the encrypted data and password separately with recipients",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    "file-integrity": {
      title: "File Integrity Checker",
      description: "Verify that files haven't been tampered with or corrupted.",
      icon: FileCheck,
      category: "Data Protection",
      features: [
        "Multiple hash algorithms (MD5, SHA-256, SHA-512)",
        "File comparison and verification",
        "Batch file processing",
        "Historical hash storage",
        "Automated integrity monitoring",
      ],
      benefits: [
        "Verify software authenticity before installation",
        "Ensure critical files haven't been modified",
        "Detect malicious changes to system files",
        "Confirm successful file transfers",
      ],
      howItWorks: [
        "Select a file to check or verify",
        "Our tool calculates cryptographic hash values",
        "Compare against known good hashes or save for future verification",
        "Receive immediate notification of any discrepancies",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
    vulnerability: {
      title: "Vulnerability Assessment",
      description: "Identify security weaknesses in your systems and applications.",
      icon: Search,
      category: "Security Assessment",
      features: [
        "Comprehensive vulnerability scanning",
        "CVE database integration",
        "Risk prioritization",
        "Remediation guidance",
        "Compliance checking",
      ],
      benefits: [
        "Proactively identify security weaknesses",
        "Prioritize fixes based on risk level",
        "Reduce attack surface",
        "Maintain security compliance",
      ],
      howItWorks: [
        "Initiate a scan of your system or application",
        "Our tool checks for known vulnerabilities and misconfigurations",
        "Receive a detailed report with severity ratings",
        "Follow step-by-step remediation instructions",
      ],
      image: "/placeholder.svg?height=400&width=800",
      demoImage: "/placeholder.svg?height=300&width=600",
    },
  }

  const tool = tools[id]

  if (!tool) {
    return (
      <div className="py-16 md:py-24 text-center">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/tools">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Tools
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const Icon = tool.icon

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link to="/tools" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            View All Tools
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-16">
          <div>
            <Badge className="mb-4">{tool.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{tool.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{tool.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to={`/dashboard/${id}`}>
                  Try Tool Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/register">Create Free Account</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl" />
            <img
              src={tool.image || "/placeholder.svg"}
              alt={tool.title}
              className="relative rounded-lg border shadow-xl"
              width={800}
              height={400}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Key Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tool.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>How It Works</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 list-decimal list-inside">
                {tool.howItWorks.map((step, index) => (
                  <li key={index} className="pl-2">
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Tool Demo</h2>
          <div className="aspect-video rounded-lg overflow-hidden border">
            <img
              src={tool.demoImage || "/placeholder.svg"}
              alt={`${tool.title} Demo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Security?</h2>
          <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
            Try our {tool.title} and all other security tools with a free CyberRest account.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to={`/dashboard/${id}`}>Try Tool Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
