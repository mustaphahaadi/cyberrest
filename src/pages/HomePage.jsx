import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Shield, Lock, Activity, Zap, ArrowRight, CheckCircle, Users, Cpu, Globe, BarChart } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "AI Threat Detection",
    description: "Detect and neutralize threats in real-time with advanced AI algorithms."
  },
  {
    icon: Lock,
    title: "Zero Trust Security",
    description: "Protect every endpoint and user with a zero-trust architecture."
  },
  {
    icon: Activity,
    title: "24/7 Monitoring",
    description: "Continuous monitoring and instant alerts for suspicious activity."
  },
  {
    icon: BarChart,
    title: "Actionable Analytics",
    description: "Gain deep insights into your security posture with powerful analytics."
  }
]

const customers = [
  {
    name: "TechCorp",
    logo: "https://placehold.co/200x80/1e293b/ffffff?text=TechCorp"
  },
  {
    name: "InnovateCo",
    logo: "https://placehold.co/200x80/1e293b/ffffff?text=InnovateCo"
  },
  {
    name: "GlobalBank",
    logo: "https://placehold.co/200x80/1e293b/ffffff?text=GlobalBank"
  },
  {
    name: "HealthPlus",
    logo: "https://placehold.co/200x80/1e293b/ffffff?text=HealthPlus"
  }
]

const testimonials = [
  {
    quote: "CyberRest's AI-driven platform gives us peace of mind. The automation and analytics are next-level.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp"
  },
  {
    quote: "We stopped multiple attacks thanks to CyberRest. Their support is world-class.",
    author: "Michael Chen",
    role: "Security Director, GlobalBank"
  },
  {
    quote: "The onboarding was seamless and the dashboard is beautiful. Highly recommended!",
    author: "Emily Rodriguez",
    role: "IT Manager, InnovateCo"
  }
]

const faqs = [
  {
    q: "How does CyberRest use AI for security?",
    a: "CyberRest leverages machine learning to detect anomalies, predict threats, and automate responses in real-time."
  },
  {
    q: "Is my data safe with CyberRest?",
    a: "Absolutely. We use end-to-end encryption and follow strict compliance standards to keep your data secure."
  },
  {
    q: "Can I try CyberRest before buying?",
    a: "Yes! We offer a free trial so you can experience the platform's power firsthand."
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-purple-700/10 blur-2xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold text-sm tracking-wide">
              AI-Powered Cybersecurity
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Secure. Automate. <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Rest Easy.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              CyberRest is the next-generation SaaS platform for proactive, intelligent, and automated cybersecurity. Protect your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors">
                Request Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {customers.map((c) => (
              <img key={c.name} src={c.logo} alt={c.name} className="h-10 grayscale hover:grayscale-0 transition-all" />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose CyberRest?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              All-in-one security, automation, and analytics for modern organizations.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-800 rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 hover:bg-slate-700 transition-all"
              >
                <div className="w-14 h-14 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Screenshot Section */}
      <section className="py-24 bg-slate-800/40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Unified Security Dashboard</h2>
            <p className="text-slate-300 mb-6">
              Monitor threats, automate responses, and analyze your security posture—all from a single, intuitive dashboard.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-400" /> Real-time threat map</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-400" /> Automated incident response</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-400" /> Compliance & reporting tools</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-3xl" />
              <img
                src="https://placehold.co/1200x800/1e293b/ffffff?text=Dashboard+Preview"
                alt="CyberRest Dashboard"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-800 rounded-xl p-8 shadow-lg text-center flex flex-col items-center"
              >
                <p className="text-slate-300 mb-4 italic">“{t.quote}”</p>
                <div>
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-slate-400 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-800/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-900/80 rounded-lg p-6 shadow"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Effortless Security?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Start your free trial today or schedule a demo with our experts. Join the future of cybersecurity with CyberRest.
            </p>
            <button className="px-8 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 mx-auto">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
