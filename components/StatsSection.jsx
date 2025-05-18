"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Clock, Users } from "lucide-react"

const StatCard = ({ icon: Icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700"
    >
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
        <div>
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="text-slate-400">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    {
      icon: Shield,
      value: "99.9%",
      label: "Threat Detection Rate",
      delay: 0.1,
    },
    {
      icon: Lock,
      value: "10M+",
      label: "Protected Accounts",
      delay: 0.2,
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Security Monitoring",
      delay: 0.3,
    },
    {
      icon: Users,
      value: "2,000+",
      label: "Enterprise Clients",
      delay: 0.4,
    },
  ]

  return (
    <section className="bg-slate-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
