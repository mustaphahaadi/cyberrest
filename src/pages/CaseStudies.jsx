"use client"

import { useState } from "react"
import { ArrowRight, Search, Filter, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CaseStudies = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [solutionFilter, setSolutionFilter] = useState("all")

  const industries = [
    { id: "all", name: "All Industries" },
    { id: "finance", name: "Financial Services" },
    { id: "healthcare", name: "Healthcare" },
    { id: "technology", name: "Technology" },
    { id: "manufacturing", name: "Manufacturing" },
    { id: "retail", name: "Retail" },
    { id: "government", name: "Government" },
    { id: "education", name: "Education" },
  ]

  const solutions = [
    { id: "all", name: "All Solutions" },
    { id: "dark-web", name: "Dark Web Monitoring" },
    { id: "device-security", name: "Device Security" },
    { id: "compliance", name: "Compliance" },
    { id: "training", name: "Security Training" },
    { id: "vulnerability", name: "Vulnerability Management" },
  ]

  const caseStudies = [
    {
      id: "fintech-security",
      title: "How FinTech Leader Secured Customer Data with CyberRest",
      company: "SecureFinance",
      industry: "finance",
      solutions: ["dark-web", "compliance"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "SecureFinance implemented CyberRest to protect sensitive financial data and achieve compliance with industry regulations.",
      results: [
        "98% reduction in security incidents",
        "100% compliance with financial regulations",
        "75% faster threat detection and response",
        "$1.2M saved in potential breach costs",
      ],
      quote: {
        text: "CyberRest has transformed our security posture. We now have complete visibility into potential threats and can respond before they become incidents.",
        author: "Sarah Johnson",
        title: "CISO, SecureFinance",
      },
      featured: true,
    },
    {
      id: "healthcare-compliance",
      title: "MedTech Group Achieves HIPAA Compliance with CyberRest",
      company: "MedTech Group",
      industry: "healthcare",
      solutions: ["compliance", "training"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "MedTech Group implemented CyberRest to ensure HIPAA compliance and protect patient data across their network.",
      results: [
        "Achieved 100% HIPAA compliance",
        "90% of staff completed security training",
        "Reduced audit preparation time by 60%",
        "Eliminated security policy gaps",
      ],
      quote: {
        text: "CyberRest's compliance tools have simplified what used to be a complex and time-consuming process. Our team can now focus on patient care instead of worrying about security compliance.",
        author: "Dr. Michael Chen",
        title: "CTO, MedTech Group",
      },
      featured: true,
    },
    {
      id: "tech-startup",
      title: "Tech Startup Secures Remote Workforce with CyberRest",
      company: "InnovateTech",
      industry: "technology",
      solutions: ["device-security", "dark-web"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "InnovateTech deployed CyberRest to secure their fully remote workforce and protect intellectual property.",
      results: [
        "Secured 200+ remote employee devices",
        "Identified and remediated 15 critical vulnerabilities",
        "Prevented 3 potential data breaches",
        "Reduced security management time by 40%",
      ],
      quote: {
        text: "As a fast-growing startup with a distributed team, we needed a security solution that could scale with us. CyberRest provided exactly what we needed without slowing down our pace of innovation.",
        author: "Alex Rivera",
        title: "Founder & CEO, InnovateTech",
      },
      featured: false,
    },
    {
      id: "manufacturing-iot",
      title: "Global Manufacturer Secures IoT Devices with CyberRest",
      company: "GlobalManufacturing",
      industry: "manufacturing",
      solutions: ["device-security", "vulnerability"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "GlobalManufacturing implemented CyberRest to secure their IoT device network and protect production systems.",
      results: [
        "Secured 500+ IoT devices across 12 facilities",
        "Reduced security incidents by 85%",
        "Prevented production downtime",
        "Achieved ISO 27001 compliance",
      ],
      quote: {
        text: "CyberRest's device security capabilities have been game-changing for our IoT infrastructure. We now have visibility and control over devices we previously couldn't secure effectively.",
        author: "Robert Kim",
        title: "VP of Operations, GlobalManufacturing",
      },
      featured: false,
    },
    {
      id: "retail-chain",
      title: "Retail Chain Protects Customer Data with CyberRest",
      company: "RetailPlus",
      industry: "retail",
      solutions: ["dark-web", "compliance", "training"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "RetailPlus implemented CyberRest to protect customer payment information and achieve PCI DSS compliance.",
      results: [
        "100% PCI DSS compliance across 50+ locations",
        "95% reduction in phishing susceptibility",
        "Identified exposed credentials for 25 employees",
        "Streamlined security operations",
      ],
      quote: {
        text: "CyberRest has helped us build customer trust by ensuring their data is protected. The dark web monitoring feature alone has been worth the investment.",
        author: "Jennifer Lopez",
        title: "Director of IT Security, RetailPlus",
      },
      featured: false,
    },
    {
      id: "government-agency",
      title: "Government Agency Enhances Security Posture with CyberRest",
      company: "State Department of Administration",
      industry: "government",
      solutions: ["compliance", "vulnerability", "training"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "The State Department of Administration deployed CyberRest to strengthen security controls and meet regulatory requirements.",
      results: [
        "Achieved compliance with state security mandates",
        "Trained 2,000+ employees on security best practices",
        "Reduced vulnerability remediation time by 70%",
        "Improved security audit scores by 45%",
      ],
      quote: {
        text: "CyberRest has helped us transform our security program from reactive to proactive. We're now able to identify and address vulnerabilities before they can be exploited.",
        author: "Thomas Wilson",
        title: "Chief Information Security Officer, State Department of Administration",
      },
      featured: false,
    },
    {
      id: "university-security",
      title: "University Protects Research Data with CyberRest",
      company: "National University",
      industry: "education",
      solutions: ["dark-web", "device-security", "training"],
      logo: "/placeholder.svg?height=60&width=120",
      image: "/placeholder.svg?height=400&width=600",
      summary:
        "National University implemented CyberRest to protect valuable research data and secure a diverse device ecosystem.",
      results: [
        "Secured 10,000+ devices across campus",
        "Protected sensitive research data",
        "Trained faculty and students on security awareness",
        "Reduced security incidents by 65%",
      ],
      quote: {
        text: "With our diverse user base and complex IT environment, we needed a comprehensive security solution. CyberRest has provided the visibility and control we needed to protect our academic community.",
        author: "Dr. Patricia Lee",
        title: "IT Director, National University",
      },
      featured: false,
    },
  ]

  // Filter case studies based on search query and filters
  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesIndustry = industryFilter === "all" || study.industry === industryFilter

    const matchesSolution = solutionFilter === "all" || study.solutions.includes(solutionFilter)

    return matchesSearch && matchesIndustry && matchesSolution
  })

  // Get featured case studies
  const featuredCaseStudies = caseStudies.filter((study) => study.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Customer Success Stories</h1>
        <p className="text-muted-foreground max-w-3xl">
          Discover how organizations across industries are using CyberRest to strengthen their security posture, achieve
          compliance, and protect sensitive data.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search case studies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.id} value={industry.id}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={solutionFilter} onValueChange={setSolutionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by solution" />
            </SelectTrigger>
            <SelectContent>
              {solutions.map((solution) => (
                <SelectItem key={solution.id} value={solution.id}>
                  {solution.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!searchQuery && industryFilter === "all" && solutionFilter === "all" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Success Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCaseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <img src={study.logo || "/placeholder.svg"} alt={`${study.company} logo`} className="h-8 mr-3" />
                    <Badge variant="outline">{industries.find((i) => i.id === study.industry)?.name}</Badge>
                  </div>
                  <CardTitle>{study.title}</CardTitle>
                  <CardDescription>{study.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Results:</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-start">
                        <Quote className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm italic">{study.quote.text}</p>
                          <p className="text-sm font-medium mt-2">{study.quote.author}</p>
                          <p className="text-xs text-muted-foreground">{study.quote.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href={`/case-studies/${study.id}`}>
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Industries</TabsTrigger>
          <TabsTrigger value="finance">Financial</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="government">Government</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No case studies found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setIndustryFilter("all")
                  setSolutionFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <img src={study.logo || "/placeholder.svg"} alt={`${study.company} logo`} className="h-8" />
                      <Badge variant="outline">{industries.find((i) => i.id === study.industry)?.name}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                    <CardDescription>{study.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{study.summary}</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Solutions:</span>
                        <div className="flex flex-wrap gap-1 ml-2">
                          {study.solutions.map((solution) => (
                            <Badge key={solution} variant="secondary" className="text-xs">
                              {solutions.find((s) => s.id === solution)?.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Key Results:</span>
                        <p className="text-sm text-muted-foreground">{study.results[0]}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <a href={`/case-studies/${study.id}`}>
                        Read Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        {industries.slice(1).map((industry) => (
          <TabsContent key={industry.id} value={industry.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies
                .filter((study) => study.industry === industry.id)
                .map((study) => (
                  <Card key={study.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <img src={study.logo || "/placeholder.svg"} alt={`${study.company} logo`} className="h-8" />
                        <Badge variant="outline">{industry.name}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                      <CardDescription>{study.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{study.summary}</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">Solutions:</span>
                          <div className="flex flex-wrap gap-1 ml-2">
                            {study.solutions.map((solution) => (
                              <Badge key={solution} variant="secondary" className="text-xs">
                                {solutions.find((s) => s.id === solution)?.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Key Results:</span>
                          <p className="text-sm text-muted-foreground">{study.results[0]}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <a href={`/case-studies/${study.id}`}>
                          Read Case Study
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-primary text-primary-foreground rounded-lg p-8 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to become our next success story?</h2>
            <p className="mb-0">Join thousands of organizations that trust CyberRest for their security needs.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary">Schedule a Demo</Button>
            <Button variant="default" className="bg-white text-primary hover:bg-gray-100">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseStudies
