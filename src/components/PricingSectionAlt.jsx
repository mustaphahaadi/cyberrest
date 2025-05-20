"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"

const PricingSectionAlt = () => {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: "Starter",
      description: "Essential security for small businesses",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        { name: "Vulnerability Scanning", included: true },
        { name: "Password Management", included: true },
        { name: "Basic Threat Detection", included: true },
        { name: "Email Security", included: true },
        { name: "24/7 Monitoring", included: false },
        { name: "Advanced Threat Intelligence", included: false },
        { name: "Custom Security Policies", included: false },
        { name: "Dedicated Support", included: false },
      ],
      popular: false,
      ctaText: "Get Started",
    },
    {
      name: "Professional",
      description: "Complete protection for growing teams",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        { name: "Vulnerability Scanning", included: true },
        { name: "Password Management", included: true },
        { name: "Advanced Threat Detection", included: true },
        { name: "Email Security", included: true },
        { name: "24/7 Monitoring", included: true },
        { name: "Advanced Threat Intelligence", included: true },
        { name: "Custom Security Policies", included: false },
        { name: "Dedicated Support", included: false },
      ],
      popular: true,
      ctaText: "Get Started",
    },
    {
      name: "Enterprise",
      description: "Maximum security for large organizations",
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        { name: "Vulnerability Scanning", included: true },
        { name: "Password Management", included: true },
        { name: "Advanced Threat Detection", included: true },
        { name: "Email Security", included: true },
        { name: "24/7 Monitoring", included: true },
        { name: "Advanced Threat Intelligence", included: true },
        { name: "Custom Security Policies", included: true },
        { name: "Dedicated Support", included: true },
      ],
      popular: false,
      ctaText: "Contact Sales",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="bg-slate-900 py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Security Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Every Business
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your organization's security needs. All plans include our core security
            features.
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-800 p-1 rounded-full inline-flex">
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !annual ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "text-slate-400"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  annual ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "text-slate-400"
                }`}
              >
                Annual <span className="text-xs opacity-75">(Save 20%)</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`bg-gradient-to-br ${
                plan.popular
                  ? "from-slate-800 to-slate-900 border-cyan-500/50"
                  : "from-slate-800 to-slate-900 border-slate-700"
              } rounded-2xl border p-8 relative group transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${annual ? plan.annualPrice : plan.monthlyPrice}</span>
                <span className="text-slate-400 ml-1">/month</span>
                {annual && <p className="text-cyan-400 text-sm mt-1">Billed annually</p>}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-cyan-400 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-slate-600 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-slate-300" : "text-slate-500"}>{feature.name}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                }`}
              >
                {plan.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">
            Need a custom solution?{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingSectionAlt
