"use client"

import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Badge from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp, User, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"

export default function BlogPost() {
  const { id } = useParams()

  // Mock blog post data - in a real app, you would fetch this based on the ID
  const blogPost = {
    id: id,
    title:
      id === "cybersecurity-best-practices"
        ? "10 Cybersecurity Best Practices Everyone Should Follow"
        : id === "password-security"
          ? "The Ultimate Guide to Password Security"
          : id === "phishing-prevention"
            ? "How to Identify and Prevent Phishing Attacks"
            : "Article Not Found",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h2>Why Cybersecurity Matters</h2>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h2>Top 10 Cybersecurity Practices</h2>
      
      <h3>1. Use Strong, Unique Passwords</h3>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h3>2. Enable Two-Factor Authentication</h3>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h3>3. Keep Software Updated</h3>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h3>4. Be Cautious with Email and Messages</h3>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h3>5. Use a VPN on Public Wi-Fi</h3>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
      
      <h2>Conclusion</h2>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
    `,
    date: "2023-05-15",
    author: "Alex Johnson",
    authorTitle: "Senior Security Analyst at ReStartDigital",
    authorImage: "/placeholder.svg?height=80&width=80",
    category: "guides",
    tags: ["security", "best-practices", "protection"],
    image: "/placeholder.svg?height=400&width=800",
    readTime: 5,
    relatedPosts: [
      {
        id: "password-security",
        title: "The Ultimate Guide to Password Security",
        excerpt:
          "Learn how to create and manage strong passwords, why password managers are essential, and how to protect your accounts from unauthorized access.",
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        id: "phishing-prevention",
        title: "How to Identify and Prevent Phishing Attacks",
        excerpt:
          "Phishing remains one of the most common cyber threats. Learn how to spot suspicious emails and protect yourself from these deceptive attacks.",
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        id: "data-protection",
        title: "Data Protection Strategies for Remote Workers",
        excerpt:
          "Working remotely introduces new security challenges. Discover effective strategies to protect sensitive data while working from home or on the go.",
        image: "/placeholder.svg?height=150&width=300",
      },
    ],
  }

  if (blogPost.title === "Article Not Found") {
    return (
      <div className="py-16 md:py-24 text-center">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-8">
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                {blogPost.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{blogPost.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blogPost.readTime} min read</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            <div className="mt-12 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-semibold text-white mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
