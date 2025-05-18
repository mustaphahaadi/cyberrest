"use client"

import { useState } from "react"
import { Check, Shield, Users, Server, Lock, Database, BarChart, Settings, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const EnterpriseFeatures = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const features = [
    {
      id: "multi-tenant",
      title: "Multi-Tenant Architecture",
      icon: <Database className="h-10 w-10 text-primary" />,
      description:
        "Securely manage multiple business units, subsidiaries, or client organizations from a single platform.",
      benefits: [
        "Centralized security management across your entire organization",
        "Customizable security policies for different business units",
        "Consolidated reporting with drill-down capabilities",
        "Role-based access control for administrators and users",
      ],
    },
    {
      id: "sso",
      title: "Enterprise SSO Integration",
      icon: <Lock className="h-10 w-10 text-primary" />,
      description: "Seamlessly integrate with your existing identity providers for secure, streamlined authentication.",
      benefits: [
        "Support for SAML, OAuth, and OpenID Connect",
        "Integration with Azure AD, Okta, Google Workspace, and more",
        "Automated user provisioning and deprovisioning",
        "Customizable authentication policies",
      ],
    },
    {
      id: "advanced-reporting",
      title: "Advanced Analytics & Reporting",
      icon: <BarChart className="h-10 w-10 text-primary" />,
      description: "Gain comprehensive insights into your organization's security posture with advanced analytics.",
      benefits: [
        "Customizable executive dashboards",
        "Scheduled automated reports",
        "Compliance-focused reporting templates",
        "Historical trend analysis and benchmarking",
      ],
    },
    {
      id: "api-integration",
      title: "Enterprise API Integration",
      icon: <Server className="h-10 w-10 text-primary" />,
      description: "Integrate CyberRest with your existing security stack and business applications.",
      benefits: [
        "Comprehensive API documentation",
        "Webhook support for real-time event notifications",
        "Custom integration development assistance",
        "High-volume API access with dedicated support",
      ],
    },
    {
      id: "team-management",
      title: "Advanced Team Management",
      icon: <Users className="h-10 w-10 text-primary" />,
      description: "Manage large teams with sophisticated role-based access controls and permissions.",
      benefits: [
        "Granular permission controls",
        "Custom user roles and access levels",
        "Team activity monitoring and audit logs",
        "Delegated administration capabilities",
      ],
    },
    {
      id: "white-labeling",
      title: "White Labeling & Customization",
      icon: <Settings className="h-10 w-10 text-primary" />,
      description: "Customize the CyberRest platform with your organization's branding and terminology.",
      benefits: [
        "Custom logo, colors, and branding elements",
        "Personalized email notifications",
        "Custom domain support",
        "Tailored user experience for your organization",
      ],
    },
    {
      id: "global-deployment",
      title: "Global Deployment Options",
      icon: <Globe className="h-10 w-10 text-primary" />,
      description: "Deploy CyberRest in multiple regions to meet your global security and compliance requirements.",
      benefits: [
        "Regional data residency options",
        "Compliance with local regulations",
        "Optimized performance for global teams",
        "24/7 global support coverage",
      ],
    },
    {
      id: "dedicated-support",
      title: "Dedicated Enterprise Support",
      icon: <Shield className="h-10 w-10 text-primary" />,
      description: "Receive priority support from our dedicated enterprise customer success team.",
      benefits: [
        "Dedicated customer success manager",
        "Priority technical support with guaranteed SLAs",
        "Regular security reviews and optimization",
        "Advanced training and onboarding assistance",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Enterprise-Grade Security Platform</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the advanced features and capabilities designed specifically for enterprise organizations
        </p>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-12">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="multi-tenant">Multi-Tenant</TabsTrigger>
          <TabsTrigger value="sso">SSO</TabsTrigger>
          <TabsTrigger value="advanced-reporting">Reporting</TabsTrigger>
          <TabsTrigger value="api-integration">API</TabsTrigger>
          <TabsTrigger value="team-management">Teams</TabsTrigger>
          <TabsTrigger value="white-labeling">White Label</TabsTrigger>
          <TabsTrigger value="dedicated-support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {feature.benefits.slice(0, 2).map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab(feature.id)}>
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">{feature.icon}</div>
                <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                <p className="text-lg mb-6">{feature.description}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                    <ul className="space-y-4">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Why It Matters</h3>
                    <p className="text-muted-foreground">
                      Enterprise organizations face unique security challenges that require sophisticated solutions.
                      {feature.id === "multi-tenant" &&
                        "Our multi-tenant architecture allows you to manage complex organizational structures while maintaining security boundaries between different business units."}
                      {feature.id === "sso" &&
                        "Single Sign-On integration simplifies user management, enhances security, and improves the user experience for your team members."}
                      {feature.id === "advanced-reporting" &&
                        "Advanced reporting capabilities provide the insights you need to make informed security decisions and demonstrate compliance to stakeholders."}
                      {feature.id === "api-integration" &&
                        "Our enterprise API enables seamless integration with your existing security tools and business applications, creating a unified security ecosystem."}
                      {feature.id === "team-management" &&
                        "Advanced team management features allow you to scale your security operations efficiently while maintaining proper access controls."}
                      {feature.id === "white-labeling" &&
                        "White labeling capabilities enable you to provide a consistent brand experience for your users and clients."}
                      {feature.id === "global-deployment" &&
                        "Global deployment options ensure that you can meet regional compliance requirements while providing optimal performance for users worldwide."}
                      {feature.id === "dedicated-support" &&
                        "Dedicated enterprise support ensures that you have the expertise and assistance you need to maximize the value of your CyberRest implementation."}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button size="lg">Schedule a Demo</Button>
                  <Button variant="outline" size="lg" className="ml-4">
                    Contact Sales
                  </Button>
                </div>
              </div>

              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=600&width=800&text=${feature.title}`}
                  alt={`${feature.title} illustration`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Enterprise Security</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Advanced threat protection</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Customizable security policies</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Comprehensive audit logs</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Data loss prevention</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Enterprise Compliance</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">GDPR, HIPAA, PCI DSS compliance</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Customizable compliance reports</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Automated compliance monitoring</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Evidence collection for audits</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Enterprise Support</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">24/7 priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Custom implementation assistance</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">Quarterly security reviews</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Trusted by Enterprise Organizations</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Join hundreds of enterprise organizations that trust CyberRest to secure their most valuable assets
        </p>

        <div className="flex flex-wrap justify-center gap-12 items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <img
              key={i}
              src={`/placeholder.svg?height=60&width=180&text=Enterprise Logo ${i}`}
              alt={`Enterprise client ${i}`}
              className="h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to enhance your enterprise security?</h2>
            <p className="mb-0">Contact our enterprise sales team to discuss your specific requirements.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary">Schedule a Demo</Button>
            <Button variant="default" className="bg-white text-primary hover:bg-gray-100">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterpriseFeatures
