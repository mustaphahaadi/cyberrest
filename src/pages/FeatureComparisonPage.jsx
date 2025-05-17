"use client"

import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Check, X } from "lucide-react"

const FeatureComparisonPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "$39",
      description: "Essential security for small businesses",
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      description: "Complete protection for growing teams",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$159",
      description: "Maximum security for large organizations",
      popular: false,
    },
  ]

  const featureCategories = [
    {
      name: "Core Security",
      features: [
        {
          name: "Vulnerability Scanning",
          tooltip: "Automated scanning for security vulnerabilities",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Password Management",
          tooltip: "Secure storage and management of passwords",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Basic Threat Detection",
          tooltip: "Detection of common security threats",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Email Security",
          tooltip: "Protection against email-based threats",
          starter: true,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      name: "Advanced Protection",
      features: [
        {
          name: "24/7 Monitoring",
          tooltip: "Continuous monitoring of security events",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Advanced Threat Intelligence",
          tooltip: "Real-time threat intelligence feeds",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Custom Security Policies",
          tooltip: "Create and enforce custom security policies",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "Dedicated Support",
          tooltip: "Priority access to security experts",
          starter: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
    {
      name: "Compliance & Reporting",
      features: [
        {
          name: "Compliance Reports",
          tooltip: "Reports for regulatory compliance",
          starter: "Basic",
          professional: "Advanced",
          enterprise: "Comprehensive",
        },
        {
          name: "Security Dashboard",
          tooltip: "Visual dashboard of security status",
          starter: "Basic",
          professional: "Advanced",
          enterprise: "Customizable",
        },
        {
          name: "Audit Logs",
          tooltip: "Detailed logs of security events",
          starter: "7 days",
          professional: "30 days",
          enterprise: "1 year",
        },
        {
          name: "Risk Assessment",
          tooltip: "Evaluation of security risks",
          starter: false,
          professional: "Quarterly",
          enterprise: "Monthly",
        },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
              Plan Comparison
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compare CyberRest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Security Plans
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Find the perfect security solution for your organization's needs and budget.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <motion.div className="min-w-[800px]" variants={containerVariants} initial="hidden" animate="visible">
              {/* Plan headers */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4"></div>

                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    variants={itemVariants}
                    className={`p-6 rounded-xl text-center ${
                      plan.popular
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/50 relative"
                        : "bg-slate-800/50"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-2xl font-bold text-white mb-1">
                      {plan.price}
                      <span className="text-sm text-slate-400">/mo</span>
                    </div>
                    <p className="text-sm text-slate-400">{plan.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Feature categories */}
              {featureCategories.map((category) => (
                <motion.div key={category.name} variants={itemVariants}>
                  <div className="bg-slate-800/30 p-3 mb-4">
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  </div>

                  {/* Features */}
                  {category.features.map((feature) => (
                    <motion.div
                      key={feature.name}
                      variants={itemVariants}
                      className="grid grid-cols-4 gap-4 py-4 border-b border-slate-800 items-center"
                    >
                      <div className="flex items-center">
                        <div className="text-slate-300">{feature.name}</div>
                      </div>

                      {/* Starter */}
                      <div className="text-center">
                        {typeof feature.starter === "boolean" ? (
                          feature.starter ? (
                            <Check className="h-5 w-5 text-cyan-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-slate-300">{feature.starter}</span>
                        )}
                      </div>

                      {/* Professional */}
                      <div className="text-center">
                        {typeof feature.professional === "boolean" ? (
                          feature.professional ? (
                            <Check className="h-5 w-5 text-cyan-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-slate-300">{feature.professional}</span>
                        )}
                      </div>

                      {/* Enterprise */}
                      <div className="text-center">
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <Check className="h-5 w-5 text-cyan-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-slate-300">{feature.enterprise}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FeatureComparisonPage
