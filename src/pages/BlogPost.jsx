import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();

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
  };

  if (blogPost.title === "Article Not Found") {
    return (
      <div className="py-16 md:py-24 text-center">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By {blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{blogPost.category}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <img
                src={blogPost.authorImage}
                alt={blogPost.author}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{blogPost.author}</h3>
                <p className="text-muted-foreground">{blogPost.authorTitle}</p>
              </div>
            </div>
          </div>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
}
