"use client"

import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Badge from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"

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
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          <Badge className="mb-4">{blogPost.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{blogPost.title}</h1>

          <div className="flex items-center space-x-4 mb-8">
            <img
              src={blogPost.authorImage || "/placeholder.svg"}
              alt={blogPost.author}
              className="rounded-full h-10 w-10"
            />
            <div>
              <div className="font-medium">{blogPost.author}</div>
              <div className="text-sm text-muted-foreground">{blogPost.authorTitle}</div>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{blogPost.date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{blogPost.readTime} min read</span>
          </div>

          <img src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} className="w-full rounded-lg mb-8" />

          <div
            className="prose prose-lg max-w-none dark:prose-invert mb-12"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="flex items-center justify-between border-t border-b py-4 mb-8">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {blogPost.relatedPosts.map((post) => (
                <Card key={post.id}>
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-32 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <Button variant="link" asChild className="px-0 mt-2">
                      <Link to={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
