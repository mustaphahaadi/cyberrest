"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Badge from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock blog posts data
  const blogPosts = [
    {
      id: "cybersecurity-best-practices",
      title: "10 Cybersecurity Best Practices Everyone Should Follow",
      excerpt:
        "Protect yourself online with these essential cybersecurity practices that can help prevent data breaches and keep your information secure.",
      date: "2023-05-15",
      author: "Alex Johnson",
      category: "guides",
      tags: ["security", "best-practices", "protection"],
      image: "/placeholder.svg?height=200&width=400",
      readTime: 5,
    },
    {
      id: "password-security",
      title: "The Ultimate Guide to Password Security",
      excerpt:
        "Learn how to create and manage strong passwords, why password managers are essential, and how to protect your accounts from unauthorized access.",
      date: "2023-05-10",
      author: "Samantha Lee",
      category: "guides",
      tags: ["passwords", "security", "authentication"],
      image: "/placeholder.svg?height=200&width=400",
      readTime: 7,
    },
    {
      id: "phishing-prevention",
      title: "How to Identify and Prevent Phishing Attacks",
      excerpt:
        "Phishing remains one of the most common cyber threats. Learn how to spot suspicious emails and protect yourself from these deceptive attacks.",
      date: "2023-05-05",
      author: "Michael Chen",
      category: "threats",
      tags: ["phishing", "email-security", "social-engineering"],
      image: "/placeholder.svg?height=200&width=400",
      readTime: 6,
    },
    {
      id: "data-protection",
      title: "Data Protection Strategies for Remote Workers",
      excerpt:
        "Working remotely introduces new security challenges. Discover effective strategies to protect sensitive data while working from home or on the go.",
      date: "2023-04-28",
      author: "Emily Rodriguez",
      category: "guides",
      tags: ["remote-work", "data-protection", "vpn"],
      image: "/placeholder.svg?height=200&width=400",
      readTime: 8,
    },
    {
      id: "ransomware-explained",
      title: "Ransomware Explained: What It Is and How to Defend Against It",
      excerpt:
        "Ransomware attacks are on the rise. Learn what ransomware is, how it works, and the steps you can take to protect your systems and data.",
      date: "2023-04-20",
      author: "David Kim",
      category: "threats",
      tags: ["ransomware", "malware", "backups"],
      image: "/placeholder.svg?height=200&width=400",
      readTime: 9,
    },
    {
      id: "two-factor-authentication",
      title: "Why Two-Factor Authentication Is Essential",
      excerpt:
        "Two-factor authentication adds an extra layer of security to your accounts. Discover why it's crucial and how to set it up for your important services.",
      date: "2023-04-15",
      author: "Alex Johnson",
      category: "guides",
      tags: ["2fa", "authentication", "security"],
      image: "/placeholder.svg?height=200&width=400",
      readTime: 4,
    },
  ];

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Group posts by category
  const guidesPosts = blogPosts.filter((post) => post.category === "guides");
  const threatsPosts = blogPosts.filter((post) => post.category === "threats");

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            CyberRest Blog
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Stay informed with the latest cybersecurity news, tips, and best
            practices.
          </p>

          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {searchQuery ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}"
            </h2>
            {filteredPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No articles found matching your search. Try different keywords.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={blogPosts[0].image || "/placeholder.svg"}
                      alt={blogPosts[0].title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 flex flex-col">
                    <div className="flex-1">
                      <Badge>{blogPosts[0].category}</Badge>
                      <h3 className="text-2xl font-bold mt-2 mb-2">
                        {blogPosts[0].title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {blogPosts[0].excerpt}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{blogPosts[0].date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{blogPosts[0].author}</span>
                        <span className="mx-2">•</span>
                        <span>{blogPosts[0].readTime} min read</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/blog/${blogPosts[0].id}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="all" className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="guides">Guides</TabsTrigger>
                  <TabsTrigger value="threats">Threats</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="guides" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {guidesPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="threats" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {threatsPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
                Get the latest cybersecurity news, tips, and updates delivered
                directly to your inbox.
              </p>
              <div className="flex max-w-md mx-auto gap-2">
                <Input type="email" placeholder="Your email address" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BlogPostCard({ post }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="h-48 w-full object-cover"
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge>{post.category}</Badge>
          <span className="text-xs text-muted-foreground">
            {post.readTime} min read
          </span>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-base">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <User className="h-3 w-3 mr-1" />
          <span>{post.author}</span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/blog/${post.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
