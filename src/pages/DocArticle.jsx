"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Badge from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ArrowRight, Bookmark, ThumbsUp, ThumbsDown, Copy, Check, Clock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function DocArticle() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [helpful, setHelpful] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch article data
    setLoading(true)

    setTimeout(() => {
      // Mock article data
      const mockArticle = {
        id: id,
        title: "Password Best Practices",
        category: "Password Security",
        lastUpdated: "2023-05-15",
        readTime: 5,
        content: `
          <h2>Introduction</h2>
          <p>Creating and managing strong passwords is essential for protecting your online accounts and sensitive information. This guide outlines best practices for password security to help you stay safe online.</p>
          
          <h2>Why Password Security Matters</h2>
          <p>Weak passwords are one of the leading causes of account compromises and data breaches. Hackers can use various methods to crack passwords, including:</p>
          <ul>
            <li>Brute force attacks (trying every possible combination)</li>
            <li>Dictionary attacks (trying common words and phrases)</li>
            <li>Credential stuffing (using leaked passwords from other sites)</li>
            <li>Social engineering (tricking users into revealing passwords)</li>
          </ul>
          
          <h2>Password Creation Guidelines</h2>
          <p>Follow these guidelines to create strong, secure passwords:</p>
          
          <h3>1. Use Long Passwords</h3>
          <p>Length is one of the most important factors in password strength. Use passwords that are at least 12 characters long. Longer passwords are exponentially harder to crack.</p>
          
          <h3>2. Combine Character Types</h3>
          <p>Include a mix of:</p>
          <ul>
            <li>Uppercase letters (A-Z)</li>
            <li>Lowercase letters (a-z)</li>
            <li>Numbers (0-9)</li>
            <li>Special characters (!@#$%^&*)</li>
          </ul>
          
          <h3>3. Avoid Common Patterns</h3>
          <p>Don't use:</p>
          <ul>
            <li>Sequential keyboard patterns (qwerty, 12345)</li>
            <li>Common substitutions (p@ssw0rd)</li>
            <li>Personal information (birthdays, names)</li>
            <li>Dictionary words without modification</li>
          </ul>
          
          <h3>4. Use Passphrases</h3>
          <p>Consider using a passphrase—a sequence of random words—instead of a traditional password. For example: "correct-horse-battery-staple" is both memorable and secure due to its length.</p>
          
          <h2>Password Management Best Practices</h2>
          
          <h3>1. Use Unique Passwords</h3>
          <p>Never reuse passwords across different accounts. If one service is compromised, all your accounts with the same password become vulnerable.</p>
          
          <h3>2. Use a Password Manager</h3>
          <p>Password managers help you generate, store, and autofill strong, unique passwords for all your accounts. They encrypt your password database with a master password, so you only need to remember one strong password.</p>
          
          <h3>3. Enable Two-Factor Authentication (2FA)</h3>
          <p>Whenever possible, enable 2FA on your accounts. This adds an extra layer of security by requiring something you know (your password) and something you have (like your phone) to log in.</p>
          
          <h3>4. Regularly Update Critical Passwords</h3>
          <p>Change passwords for your most sensitive accounts (email, banking, etc.) every 3-6 months, or immediately if you suspect a breach.</p>
          
          <h2>Using CyberRest's Password Tools</h2>
          <p>CyberRest offers several tools to help you maintain strong password security:</p>
          
          <h3>Password Analyzer</h3>
          <p>Use our <a href="/tools/password-analyzer">Password Analyzer</a> to check the strength of your existing passwords and identify potential weaknesses.</p>
          
          <h3>Password Generator</h3>
          <p>Our <a href="/tools/password-generator">Password Generator</a> creates strong, random passwords that meet all security criteria while remaining memorable.</p>
          
          <h3>Data Breach Scanner</h3>
          <p>Regularly check if your accounts have been compromised in known data breaches using our <a href="/tools/data-breach-scanner">Data Breach Scanner</a>.</p>
          
          <h2>Conclusion</h2>
          <p>Strong password practices are your first line of defense against unauthorized access to your accounts and personal information. By following these guidelines and using CyberRest's security tools, you can significantly reduce your risk of becoming a victim of cybercrime.</p>
        `,
        relatedArticles: [
          { id: "password-analyzer-guide", title: "Using the Password Analyzer" },
          { id: "password-generator-guide", title: "Creating Strong Passwords" },
          { id: "two-factor-authentication", title: "Two-Factor Authentication Setup" },
        ],
      }

      setArticle(mockArticle)
      setLoading(false)

      // Scroll to top when article loads
      window.scrollTo(0, 0)
    }, 1000)
  }, [id])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (isHelpful) => {
    setHelpful(isHelpful)
    // In a real app, you would send this feedback to your backend
  }

  return (
    <>
      <Navbar />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <ArticleSkeleton />
          ) : (
            <>
              <Breadcrumb className="mb-6">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/docs">
                    Documentation
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to={`/docs/${article.category.toLowerCase().replace(/\s+/g, "-")}`}>
                    {article.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{article.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime} min read</span>
                  </div>
                  <span>Last updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              <div
                className="prose prose-slate dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="border-t border-b py-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Was this article helpful?</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={helpful === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFeedback(true)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Yes
                      </Button>
                      <Button
                        variant={helpful === false ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFeedback(false)}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        No
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyLink}>
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Copied" : "Copy Link"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Bookmark
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Related Articles</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {article.relatedArticles.map((related) => (
                    <Card key={related.id}>
                      <CardContent className="p-4">
                        <Link
                          to={`/docs/${article.category.toLowerCase().replace(/\s+/g, "-")}/${related.id}`}
                          className="font-medium hover:underline"
                        >
                          {related.title}
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/docs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Docs
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/docs/${article.category.toLowerCase().replace(/\s+/g, "-")}`}>
                    Browse {article.category}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function ArticleSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}
