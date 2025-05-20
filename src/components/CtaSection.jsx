"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "../components/ui/button"

const CtaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[120px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxZTI5M2IiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRoLTJWMTZoMTB2MmgtOHYxNnptLTQtMTdoLTJ2MThoMnYtMTh6bS0xNCA3aC0ydjExaDJ2LTExem0tNyAzaC0ydjhoMnYtOHptMjEgMmgtMnY2aDJ2LTZ6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0xNyAxOWgtMnYxOGgyVjE5em0xNCAxNGgtMnY0aDJ2LTR6bS03LTZoLTJ2MTBoMlYyN3ptLTctM2gtMnYxM2gyVjI0em0yMSA1aC0ydjhoMnYtOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-10" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:max-w-xl">
                <div className="bg-cyan-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to secure your digital assets?</h2>

                <p className="text-slate-300 mb-6">
                  Join thousands of businesses that trust CyberRest for their cybersecurity needs. Get started today
                  with a free security assessment.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                    Schedule Demo
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl" />
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Security Dashboard Preview"
                  className="relative z-10 rounded-xl border border-slate-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
