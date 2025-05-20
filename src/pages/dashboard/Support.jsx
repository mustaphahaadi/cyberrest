"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Badge from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Check,
  MessageSquare,
  HelpCircle,
  FileText,
  ExternalLink,
  Search,
  CreditCard,
  Shield,
  Settings,
  Smartphone,
  AlertTriangle,
  Lock,
} from "lucide-react"

export default function Support() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    attachments: [],
    submitting: false,
    submitted: false,
  })

  const [searchQuery, setSearchQuery] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTicketForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setTicketForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setTicketForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }))
  }

  const removeAttachment = (index) => {
    setTicketForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTicketForm((prev) => ({ ...prev, submitting: true }))

    // Simulate API call
    setTimeout(() => {
      setTicketForm((prev) => ({
        ...prev,
        submitting: false,
        submitted: true,
        subject: "",
        category: "",
        priority: "medium",
        description: "",
        attachments: [],
      }))
    }, 1500)
  }

  const supportTickets = [
    {
      id: "T-1234",
      subject: "Unable to access encryption tool",
      status: "open",
      priority: "high",
      created: "2023-05-15T10:30:00Z",
      updated: "2023-05-15T14:45:00Z",
      messages: 3,
    },
    {
      id: "T-1233",
      subject: "Question about subscription billing",
      status: "closed",
      priority: "medium",
      created: "2023-05-10T08:20:00Z",
      updated: "2023-05-12T11:15:00Z",
      messages: 5,
    },
  ]

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password. Follow the link in the email and create a new password.",
    },
    {
      question: "How can I upgrade my subscription?",
      answer:
        "You can upgrade your subscription by going to Dashboard > Subscription and selecting the 'Upgrade Plan' button. Choose your desired plan and follow the payment instructions to complete the upgrade.",
    },
    {
      question: "What is the difference between the Premium and Business plans?",
      answer:
        "The Premium plan is designed for individuals and families, offering advanced security features for up to 5 devices. The Business plan is tailored for organizations, providing comprehensive security solutions for unlimited devices, along with team management features and priority support.",
    },
    {
      question: "How do I scan my system for malware?",
      answer:
        "To scan your system for malware, navigate to the Malware Scanner tool in your dashboard. Click on 'Start Scan' and select the scan type (Quick, Full, or Custom). The scanner will check your system for malicious software and provide a detailed report upon completion.",
    },
    {
      question: "Can I use CyberRest on multiple devices?",
      answer:
        "Yes, you can use CyberRest on multiple devices depending on your subscription plan. The Free plan supports 1 device, Premium supports up to 5 devices, and Business supports unlimited devices. You can manage your devices in the Dashboard > Settings section.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, go to Dashboard > Subscription and click on 'Cancel Subscription'. Follow the prompts to confirm your cancellation. Your access will continue until the end of your current billing period.",
    },
  ]

  const filteredFAQs = faqItems.filter(
    (item) =>
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Support Center</h2>
        <p className="text-muted-foreground">Get help with CyberRest products and services.</p>
      </div>

      <Tabs defaultValue="tickets">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Support Ticket</CardTitle>
                <CardDescription>Submit a new support request</CardDescription>
              </CardHeader>
              {ticketForm.submitted ? (
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-green-100 p-3 mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Ticket Submitted Successfully</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                    </p>
                    <Button
                      onClick={() => setTicketForm((prev) => ({ ...prev, submitted: false }))}
                      className="w-full md:w-auto"
                    >
                      Create Another Ticket
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Brief description of your issue"
                        value={ticketForm.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={ticketForm.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing & Subscription</SelectItem>
                            <SelectItem value="account">Account Management</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={ticketForm.priority}
                          onValueChange={(value) => handleSelectChange("priority", value)}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Please provide details about your issue"
                        rows={5}
                        value={ticketForm.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attachments">Attachments (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <Input id="attachments" type="file" multiple onChange={handleFileChange} className="max-w-sm" />
                      </div>
                      {ticketForm.attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Attached Files:</p>
                          <ul className="text-sm space-y-1">
                            {ticketForm.attachments.map((file, index) => (
                              <li key={index} className="flex items-center justify-between">
                                <span className="truncate">{file.name}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                                  Remove
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={ticketForm.submitting} className="w-full md:w-auto">
                      {ticketForm.submitting ? "Submitting..." : "Submit Ticket"}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Support Tickets</CardTitle>
                <CardDescription>View and manage your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                {supportTickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Support Tickets</h3>
                    <p className="text-muted-foreground">You haven't created any support tickets yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex flex-col p-4 border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{ticket.subject}</h3>
                            <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id}</p>
                          </div>
                          <Badge variant={ticket.status === "open" ? "default" : "secondary"} className="capitalize">
                            {ticket.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <span className="capitalize">
                              Priority: <span className="font-medium">{ticket.priority}</span>
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>
                              Created:{" "}
                              <span className="font-medium">{new Date(ticket.created).toLocaleDateString()}</span>
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{ticket.messages} messages</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Tickets
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Options</CardTitle>
              <CardDescription>Other ways to get support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-4 border rounded-md">
                  <MessageSquare className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium mb-1">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team in real-time for immediate assistance.
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </div>
                <div className="flex flex-col items-center text-center p-4 border rounded-md">
                  <HelpCircle className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium mb-1">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our extensive knowledge base for tutorials and guides.
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Articles
                  </Button>
                </div>
                <div className="flex flex-col items-center text-center p-4 border rounded-md">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">Email our support team for non-urgent inquiries.</p>
                  <Button variant="outline" size="sm">
                    Email Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about CyberRest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search FAQs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {filteredFAQs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any FAQs matching your search. Try different keywords or create a support ticket.
                  </p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
            <CardFooter>
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  Can't find what you're looking for? Create a{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0"
                    onClick={() => document.querySelector('[value="tickets"]').click()}
                  >
                    support ticket
                  </Button>{" "}
                  for personalized assistance.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Quick links to common support topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <span>Password Management</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <span>Billing & Subscriptions</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <span>Security Tools</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <span>Account Settings</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <span>Mobile App</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <span>Troubleshooting</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Comprehensive guides and documentation for CyberRest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn the basics of CyberRest and how to set up your account.
                  </p>
                  <div className="space-y-2">
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Account Setup Guide</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Dashboard Overview</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Security Tools Introduction</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-2">Security Tools</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed documentation for each security tool in CyberRest.
                  </p>
                  <div className="space-y-2">
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Password Tools Guide</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Data Breach Scanner Guide</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Encryption Tool Guide</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-2">Account Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how to manage your account, subscription, and settings.
                  </p>
                  <div className="space-y-2">
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Subscription Management</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Profile Settings</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Two-Factor Authentication</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-2">Troubleshooting</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Solutions to common issues and troubleshooting guides.
                  </p>
                  <div className="space-y-2">
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Common Error Messages</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Connection Issues</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="link" className="h-auto p-0 flex items-center" asChild>
                      <a href="#" className="flex items-center">
                        <span>Tool-Specific Problems</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">API Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Technical documentation for developers integrating with CyberRest API.
                </p>
                <Button variant="outline" asChild>
                  <a href="#" className="flex items-center">
                    <span>View API Documentation</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto" asChild>
                <a href="/docs">Browse Full Documentation</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
