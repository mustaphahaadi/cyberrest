"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Lock, Eye } from "lucide-react"
import { Button } from "../components/ui/button"

const HeroSection = () => {
  const particlesRef = useRef(null)

  useEffect(() => {
    // Simple particle animation
    const canvas = particlesRef.current
    const ctx = canvas.getContext("2d")
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      initParticles()
    }

    const initParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 217, 255, ${p.opacity})`
        ctx.fill()

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      // Draw connections
      ctx.strokeStyle = "rgba(100, 217, 255, 0.1)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", resize)
    resize()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[90vh] flex items-center">
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />

      {/* Glowing orb effect */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-20" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600 rounded-full filter blur-[128px] opacity-20" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div variants={itemVariants}>
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
                Next-Gen Cybersecurity Platform
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Your Digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Future</span>{" "}
              Today
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-300 mb-8 max-w-lg">
              CyberRest provides enterprise-grade security tools for businesses of all sizes. Protect your data, detect
              threats, and respond to incidents with our all-in-one platform.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                View Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="text-sm text-slate-400">
                  Trusted by <span className="text-white font-medium">2,000+</span> companies
                </div>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 p-1 rounded-2xl shadow-2xl border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="CyberRest Dashboard"
                className="rounded-xl shadow-lg w-full"
              />

              {/* Feature highlights */}
              <div className="absolute -left-8 top-1/4 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Threat Detection</p>
                    <p className="text-xs text-slate-400">Real-time monitoring</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-full">
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Data Encryption</p>
                    <p className="text-xs text-slate-400">End-to-end protection</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-3/4 left-1/4 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <Eye className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Vulnerability Scanning</p>
                    <p className="text-xs text-slate-400">Proactive security</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl opacity-30" />
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl opacity-10" />
          </motion.div>
        </motion.div>

        {/* Trusted by logos */}
        <motion.div variants={itemVariants} className="mt-24 text-center">
          <p className="text-sm text-slate-400 mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-32 bg-slate-800/50 rounded-md flex items-center justify-center">
                <div className="text-slate-500 font-semibold">COMPANY {i}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
