"use client"

import { useState } from "react"
import { Check, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("yearly")
  const [showEnterprise, setShowEnterprise] = useState(false)

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  const pricingPlans = [
    {
      name: "Starter",
      description: "Essential security tools for small businesses and startups",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Dark Web Monitoring (up to 5 domains)",
        "Password Analyzer",
        "Phishing Detection",
        "Basic Security Training",
        "Email Support",
        "1 User License",
      ],
      limitations: ["No API Access", "Limited Reporting", "No Compliance Tools"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "Advanced protection for growing businesses",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "Everything in Starter",
        "Dark Web Monitoring (up to 20 domains)",
        "Device Security Scanner",
        "Vulnerability Assessment",
        "Security Training (10 courses)",
        "Basic Compliance Checker",
        "API Access (limited)",
        "Priority Email Support",
        "5 User Licenses",
      ],
      limitations: ["Limited API Calls", "No Custom Reporting"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      description: "Comprehensive security solution for established organizations",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Everything in Professional",
        "Dark Web Monitoring (unlimited domains)",
        "Advanced Compliance Checker",
        "Custom Security Policies",
        "Security Training (all courses)",
        "Full API Access",
        "Custom Reporting",
        "Phone & Email Support",
        "15 User Licenses",
        "SSO Integration",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: false,
    },
  ]

  const enterprisePlan = {
    name: "Enterprise",
    description: "Tailored security solutions for large organizations",
    features: [
      "Everything in Business",
      "Unlimited User Licenses",
      "Dedicated Security Advisor",
      "Custom Security Training",
      "Advanced API Integration",
      "White Labeling",
      "Custom Deployment Options",
      "24/7 Priority Support",
      "Quarterly Security Reviews",
      "Custom SLA",
    ],
    cta: "Contact Sales",
  }

  const calculateSavings = (monthly, yearly) => {
    const monthlyCost = monthly * 12
    const yearlyCost = yearly
    const savings = monthlyCost - yearlyCost
    const percentage = Math.round((savings / monthlyCost) * 100)
    return percentage
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that's right for your organization's security needs
        </p>

        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="billing-toggle"
              className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}
            >
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={billingCycle === "yearly"} onCheckedChange={toggleBillingCycle} />
            <div className="flex items-center">
              <Label
                htmlFor="billing-toggle"
                className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}
              >
                Yearly
              </Label>
              {billingCycle === "yearly" && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""} dark:border-gray-700`}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-muted-foreground ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                {billingCycle === "yearly" && (
                  <div className="text-sm text-green-600 mt-1">
                    Save {calculateSavings(plan.monthlyPrice, plan.yearlyPrice)}% with annual billing
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">What's included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.limitations.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Limitations:</h4>
                    <ul className="space-y-2 mt-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start">
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <Button
          variant="outline"
          onClick={() => setShowEnterprise(!showEnterprise)}
          className="mx-auto flex items-center"
        >
          {showEnterprise ? "Hide Enterprise Plan" : "Show Enterprise Plan"}
          <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${showEnterprise ? "rotate-90" : ""}`} />
        </Button>
      </div>

      {showEnterprise && (
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl">{enterprisePlan.name}</CardTitle>
              <CardDescription className="text-base">{enterprisePlan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-xl font-medium">Custom pricing based on your needs</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">What's included:</h4>
                <ul className="space-y-2">
                  {enterprisePlan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" variant="default">
                {enterprisePlan.cta}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="bg-muted rounded-lg p-8 mb-12 dark:bg-gray-800/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Compare Plans</h2>
          <p className="text-muted-foreground">See which plan is right for your organization</p>
        </div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium">Feature</th>
                    <th className="text-center py-4 px-4 font-medium">Starter</th>
                    <th className="text-center py-4 px-4 font-medium">Professional</th>
                    <th className="text-center py-4 px-4 font-medium">Business</th>
                    <th className="text-center py-4 px-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span>User Licenses</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60">Number of user accounts that can access the platform</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">1</td>
                    <td className="text-center py-4 px-4">5</td>
                    <td className="text-center py-4 px-4">15</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span>Dark Web Monitoring</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60">Monitor the dark web for leaked credentials and data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">5 domains</td>
                    <td className="text-center py-4 px-4">20 domains</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span>API Access</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60">Programmatic access to platform features and data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">Limited</td>
                    <td className="text-center py-4 px-4">Full</td>
                    <td className="text-center py-4 px-4">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span>Compliance Checker</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60">Tools to assess compliance with regulatory frameworks</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4">Advanced</td>
                    <td className="text-center py-4 px-4">Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span>White Labeling</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60">Customize the platform with your brand</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium">Security Feature</th>
                    <th className="text-center py-4 px-4 font-medium">Starter</th>
                    <th className="text-center py-4 px-4 font-medium">Professional</th>
                    <th className="text-center py-4 px-4 font-medium">Business</th>
                    <th className="text-center py-4 px-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">Password Analyzer</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Phishing Detection</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Device Security Scanner</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Vulnerability Assessment</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Custom Security Policies</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Dedicated Security Advisor</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="support" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium">Support Feature</th>
                    <th className="text-center py-4 px-4 font-medium">Starter</th>
                    <th className="text-center py-4 px-4 font-medium">Professional</th>
                    <th className="text-center py-4 px-4 font-medium">Business</th>
                    <th className="text-center py-4 px-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">Email Support</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Priority Support</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Phone Support</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">24/7 Support</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Onboarding Assistance</td>
                    <td className="text-center py-4 px-4">Self-service</td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4">Guided</td>
                    <td className="text-center py-4 px-4">White-glove</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Custom SLA</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">—</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to secure your organization?</h2>
            <p className="mb-0">Start your 14-day free trial. No credit card required.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="lg">
              Compare Plans
            </Button>
            <Button variant="default" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">What happens after my free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-300">
                After your 14-day free trial ends, your account will automatically switch to the Free plan unless you
                choose to upgrade to Premium or Business.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Can I change plans later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while
              downgrades take effect at the end of your billing cycle.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 14-day free trial on all plans. No credit card required.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">How does billing work?</h3>
            <p className="text-muted-foreground">
              We offer both monthly and annual billing options. Annual plans come with a 20% discount compared to
              monthly billing.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Can I cancel my subscription?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. If you cancel, you'll have access to CyberRest until
              the end of your current billing period.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Do you offer discounts for nonprofits?</h3>
            <p className="text-muted-foreground">
              Yes, we offer special pricing for nonprofit organizations. Please contact our sales team for more
              information.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
