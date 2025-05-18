"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, CreditCard, Info } from "lucide-react"

export default function Subscription() {
  const { user, subscription, updateSubscription } = useAuth()
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Basic security tools for individuals",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        "Password strength analyzer",
        "Password generator",
        "Basic phishing detection",
        "Limited security news",
        "1 device",
      ],
      limitations: [
        "No data breach scanning",
        "No encryption tools",
        "No vulnerability assessment",
        "No advanced features",
        "No priority support",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      description: "Advanced security for individuals and families",
      price: {
        monthly: 9.99,
        annually: 7.99,
      },
      features: [
        "All Free features",
        "Data breach scanning",
        "Encryption tools",
        "File integrity checker",
        "Two-factor authentication",
        "Secure notes storage",
        "Up to 5 devices",
        "Email support",
      ],
      limitations: ["Limited vulnerability assessment", "No network scanning", "No firewall configuration"],
    },
    {
      id: "business",
      name: "Business",
      description: "Complete protection for businesses",
      price: {
        monthly: 19.99,
        annually: 16.99,
      },
      features: [
        "All Premium features",
        "Full vulnerability assessment",
        "Network security scanner",
        "VPN connection manager",
        "Firewall configuration",
        "Malware scanner",
        "Security audit tools",
        "Unlimited devices",
        "Priority support",
        "Admin dashboard",
        "Team management",
      ],
      limitations: [],
    },
  ]

  const handleUpgrade = (planId) => {
    setSelectedPlan(planId)
    setShowUpgradeDialog(true)
  }

  const processPayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan)

      // Create new subscription object
      const newSubscription = {
        plan: selectedPlan,
        status: "active",
        startDate: new Date().toISOString(),
        endDate: null,
        billingCycle: billingCycle,
        price: selectedPlanDetails.price[billingCycle],
        features: {
          passwordTools: true,
          dataBreachScanner: selectedPlan !== "free",
          phishingDetector: true,
          securityNews: true,
          networkScanner: selectedPlan === "business",
          encryptionTool: selectedPlan !== "free",
          fileIntegrityChecker: selectedPlan !== "free",
          vulnerabilityAssessment: selectedPlan === "business",
          twoFactorManager: selectedPlan !== "free",
          secureNotes: selectedPlan !== "free",
          vpnManager: selectedPlan === "business",
          firewallTool: selectedPlan === "business",
          malwareScanner: selectedPlan === "business",
          securityAudit: selectedPlan === "business",
        },
      }

      // Update subscription in context
      updateSubscription(newSubscription)

      setIsProcessing(false)
      setShowUpgradeDialog(false)
    }, 2000)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  const getNextBillingDate = () => {
    if (!subscription?.startDate) return "N/A"
    const startDate = new Date(subscription.startDate)
    const nextBillingDate = new Date(startDate)

    if (subscription.billingCycle === "annually") {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
    } else {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
    }

    return nextBillingDate.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscription Management</h2>
        <p className="text-muted-foreground">Manage your subscription plan and billing information.</p>
      </div>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Plan</TabsTrigger>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Current Plan</CardTitle>
              <CardDescription>Details about your current subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold capitalize">{subscription?.plan} Plan</h3>
                  <p className="text-muted-foreground">
                    {subscription?.plan === "free"
                      ? "Basic security tools for individuals"
                      : subscription?.plan === "premium"
                        ? "Advanced security for individuals and families"
                        : "Complete protection for businesses"}
                  </p>
                </div>
                <Badge variant={subscription?.status === "active" ? "default" : "destructive"} className="mt-2 md:mt-0">
                  {subscription?.status}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Start Date</p>
                  <p>{formatDate(subscription?.startDate)}</p>
                </div>

                {subscription?.plan !== "free" && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Next Billing Date</p>
                    <p>{getNextBillingDate()}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium">Devices</p>
                  <p>
                    {subscription?.plan === "free"
                      ? "1 device"
                      : subscription?.plan === "premium"
                        ? "Up to 5 devices"
                        : "Unlimited devices"}
                  </p>
                </div>

                {subscription?.plan !== "free" && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Price</p>
                    <p>
                      ${subscription?.price?.toFixed(2)}/
                      {subscription?.billingCycle === "annually" ? "month, billed annually" : "month"}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Included Features</h4>
                <ul className="grid gap-2 md:grid-cols-2">
                  {plans
                    .find((plan) => plan.id === subscription?.plan)
                    ?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {subscription?.plan !== "business" && (
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Upgrade your plan to access more security features and protect more devices.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              {subscription?.plan !== "business" && (
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => handleUpgrade(subscription?.plan === "free" ? "premium" : "business")}
                >
                  Upgrade Plan
                </Button>
              )}
              {subscription?.plan !== "free" && (
                <Button variant="outline" className="w-full sm:w-auto">
                  Cancel Subscription
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Choose a Plan</h3>
            <div className="flex items-center space-x-2">
              <Label htmlFor="billing-toggle" className={billingCycle === "monthly" ? "font-medium" : ""}>
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={billingCycle === "annually"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
              />
              <div className="flex items-center">
                <Label htmlFor="billing-toggle" className={billingCycle === "annually" ? "font-medium" : ""}>
                  Annually
                </Label>
                <span className="ml-2 text-xs font-medium text-green-500 bg-green-100 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${subscription?.plan === plan.id ? "border-primary" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price[billingCycle].toFixed(2)}</span>
                    <span className="text-muted-foreground ml-2">
                      {plan.price[billingCycle] > 0
                        ? `/ ${billingCycle === "monthly" ? "month" : "month, billed annually"}`
                        : "forever"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-medium pt-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="flex items-start text-muted-foreground">
                              <span className="h-5 w-5 text-muted-foreground mr-2 shrink-0 mt-0.5">✕</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {subscription?.plan === plan.id ? (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.id === "free" ? "outline" : "default"}
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      {plan.id === "free" ? "Downgrade to Free" : `Upgrade to ${plan.name}`}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4 pt-4">
          {subscription?.plan === "free" ? (
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>You are currently on the Free plan with no billing history.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Billing History</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  You're currently on the Free plan. Upgrade to a paid plan to view your billing history and invoices.
                </p>
                <Button className="mt-4" onClick={() => handleUpgrade("premium")}>
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div>Date</div>
                    <div>Description</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Invoice</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 p-4">
                      <div>{formatDate(subscription?.startDate)}</div>
                      <div>
                        {subscription?.plan.charAt(0).toUpperCase() + subscription?.plan.slice(1)} Plan -{" "}
                        {subscription?.billingCycle === "annually" ? "Annual" : "Monthly"}
                      </div>
                      <div>${subscription?.price?.toFixed(2)}</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Paid
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPlan === "free"
                ? "Downgrade to Free Plan"
                : `Upgrade to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan`}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan === "free"
                ? "You will lose access to premium features immediately."
                : "Complete your payment information to upgrade your subscription."}
            </DialogDescription>
          </DialogHeader>

          {selectedPlan !== "free" && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>
                  {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan -{" "}
                  {billingCycle === "annually" ? "Annual" : "Monthly"}
                </span>
                <span className="font-medium">
                  ${plans.find((p) => p.id === selectedPlan)?.price[billingCycle].toFixed(2)}/
                  {billingCycle === "annually" ? "mo" : "month"}
                </span>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "credit-card" && (
                <div className="space-y-2">
                  <Label htmlFor="card-details">Card Details</Label>
                  <div className="rounded-md border p-4 text-center text-muted-foreground">
                    Credit card form would be displayed here
                  </div>
                </div>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {billingCycle === "annually"
                    ? "You will be charged annually. You can cancel anytime."
                    : "You will be charged monthly. You can cancel anytime."}
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={processPayment} disabled={isProcessing}>
              {isProcessing ? "Processing..." : selectedPlan === "free" ? "Confirm Downgrade" : "Complete Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
