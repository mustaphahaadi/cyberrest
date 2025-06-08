import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Shield, Lock, Activity, Zap, ArrowRight, CheckCircle, Users, Cpu, Globe, BarChart } from "lucide-react"

const products = [
  {
    title: "Threat Detection",
    description: "AI-powered threat detection and response system that protects your digital assets 24/7.",
    icon: Shield,
    features: [
      "Real-time threat monitoring",
      "AI-powered anomaly detection",
      "Automated incident response",
      "Threat intelligence integration"
    ]
  },
  {
    title: "Vulnerability Management",
    description: "Comprehensive vulnerability assessment and remediation platform.",
    icon: Lock,
    features: [
      "Automated vulnerability scanning",
      "Risk assessment and prioritization",
      "Remediation tracking",
      "Compliance reporting"
    ]
  },
  {
    title: "Security Analytics",
    description: "Advanced analytics and reporting for better security insights.",
    icon: BarChart,
    features: [
      "Real-time security metrics",
      "Customizable dashboards",
      "Trend analysis",
      "Executive reporting"
    ]
  },
  {
    title: "Compliance Management",
    description: "Streamline your compliance efforts with automated tools.",
    icon: CheckCircle,
    features: [
      "Regulatory compliance tracking",
      "Automated compliance checks",
      "Audit trail management",
      "Policy enforcement"
    ]
  }
]

export default function Products() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Security Products
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Comprehensive security solutions designed to protect your business in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Secure Your Business?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get started with CyberRest today and experience enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 