import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Lock, Search, AlertTriangle, Wifi, FileText, CheckSquare, Bell, Key, FileDigit, Globe, ShieldAlert, Scan } from "lucide-react";

const solutions = [
  {
    title: "Threat Detection",
    description: "Advanced threat detection and monitoring system that identifies and alerts you to potential security risks in real-time.",
    icon: Shield,
    features: [
      "Real-time threat monitoring",
      "Automated alerts",
      "Threat intelligence integration",
      "Customizable detection rules"
    ]
  },
  {
    title: "Vulnerability Assessment",
    description: "Comprehensive vulnerability scanning and assessment tools to identify and fix security weaknesses before they can be exploited.",
    icon: ShieldAlert,
    features: [
      "Automated vulnerability scanning",
      "Risk scoring and prioritization",
      "Remediation guidance",
      "Compliance reporting"
    ]
  },
  {
    title: "Network Security",
    description: "Protect your network infrastructure with advanced security tools and monitoring capabilities.",
    icon: Wifi,
    features: [
      "Network traffic analysis",
      "Intrusion detection",
      "Firewall management",
      "VPN solutions"
    ]
  },
  {
    title: "Data Protection",
    description: "Secure your sensitive data with encryption, access controls, and data loss prevention tools.",
    icon: Lock,
    features: [
      "Data encryption",
      "Access control management",
      "Data loss prevention",
      "Secure file sharing"
    ]
  },
  {
    title: "Security Monitoring",
    description: "24/7 security monitoring and alerting system to keep your systems protected around the clock.",
    icon: Bell,
    features: [
      "Real-time monitoring",
      "Automated alerts",
      "Incident response",
      "Security dashboards"
    ]
  },
  {
    title: "Compliance Management",
    description: "Stay compliant with industry regulations and standards with our comprehensive compliance tools.",
    icon: CheckSquare,
    features: [
      "Regulatory compliance",
      "Audit trails",
      "Policy management",
      "Compliance reporting"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Security Solutions
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Protect your digital assets with our suite of advanced security solutions.
              From threat detection to compliance management, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/pricing"
                className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                variants={itemVariants}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{solution.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckSquare className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Digital Assets?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of businesses that trust CyberRest for their security needs.
              Get started today and experience enterprise-grade security.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
