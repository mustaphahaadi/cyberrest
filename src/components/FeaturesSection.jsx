"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Lock,
  Eye,
  Bell,
  Database,
  Zap,
  FileCheck,
  Search,
  UserCheck,
  Network,
  Cloud,
  Fingerprint,
} from "lucide-react"

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
        <Icon className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  )
}

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Threat Detection",
      description: "Real-time monitoring and analysis to identify potential security threats before they cause damage.",
      delay: 0.1,
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "End-to-end encryption to protect sensitive information from unauthorized access.",
      delay: 0.2,
    },
    {
      icon: Eye,
      title: "Vulnerability Scanning",
      description: "Proactive identification of security weaknesses in your systems and applications.",
      delay: 0.3,
    },
    {
      icon: Bell,
      title: "Incident Alerts",
      description: "Immediate notifications about security incidents requiring your attention.",
      delay: 0.4,
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Protected storage solutions for your most sensitive data and documents.",
      delay: 0.5,
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Automated response capabilities to contain and mitigate security incidents.",
      delay: 0.6,
    },
    {
      icon: FileCheck,
      title: "Compliance Tools",
      description: "Streamlined compliance with industry regulations and security standards.",
      delay: 0.7,
    },
    {
      icon: Search,
      title: "Threat Intelligence",
      description: "Up-to-date information about emerging threats and attack vectors.",
      delay: 0.8,
    },
    {
      icon: UserCheck,
      title: "Access Control",
      description: "Granular control over who can access your systems and data.",
      delay: 0.9,
    },
    {
      icon: Network,
      title: "Network Protection",
      description: "Comprehensive security for your entire network infrastructure.",
      delay: 1.0,
    },
    {
      icon: Cloud,
      title: "Cloud Security",
      description: "Specialized protection for your cloud-based assets and services.",
      delay: 1.1,
    },
    {
      icon: Fingerprint,
      title: "Identity Verification",
      description: "Multi-factor authentication and identity management solutions.",
      delay: 1.2,
    },
  ]

  return (
    <section className="bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            Comprehensive Protection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Advanced Security{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Features</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our platform offers a complete suite of cybersecurity tools designed to protect your business from evolving
            digital threats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
