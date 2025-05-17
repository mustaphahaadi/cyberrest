"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "CyberRest has transformed our security posture. We've seen a 70% reduction in security incidents since implementing their platform.",
    author: "Sarah Johnson",
    position: "CTO, TechCorp Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    content:
      "The threat detection capabilities are unmatched. We identified and neutralized a sophisticated attack that our previous solution completely missed.",
    author: "Michael Chen",
    position: "Security Director, Global Finance",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    content:
      "Implementation was seamless, and the support team is incredibly responsive. CyberRest feels like an extension of our security team.",
    author: "Alex Rodriguez",
    position: "IT Manager, HealthTech Solutions",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    content:
      "The compliance tools alone have saved us countless hours of manual work. Our audit preparation time has been reduced by 60%.",
    author: "Emma Wilson",
    position: "Compliance Officer, Retail Chain",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    content:
      "As a small business, we never thought we could afford enterprise-grade security. CyberRest made it accessible and scalable for our needs.",
    author: "David Park",
    position: "Founder, StartUp Innovations",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef(null)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    intervalRef.current = setInterval(nextTestimonial, 8000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const resetInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextTestimonial, 8000)
  }

  const handlePrev = () => {
    prevTestimonial()
    resetInterval()
  }

  const handleNext = () => {
    nextTestimonial()
    resetInterval()
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[120px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Security{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Professionals
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            See what our customers have to say about how CyberRest has transformed their security operations.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-12 rounded-2xl border border-slate-700 relative"
            >
              <div className="absolute top-6 left-6 text-cyan-400 opacity-30">
                <Quote size={48} />
              </div>

              <div className="relative z-10">
                <p className="text-lg md:text-xl text-slate-300 mb-8 relative z-10">
                  "{testimonials[activeIndex].content}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[activeIndex].author}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonials[activeIndex].author}</h4>
                    <p className="text-slate-400 text-sm">{testimonials[activeIndex].position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    resetInterval()
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-cyan-500 w-6" : "bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
