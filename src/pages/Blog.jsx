import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Calendar, Clock, User, Search } from "lucide-react"

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding Modern Cybersecurity Threats",
      excerpt: "Learn about the latest cybersecurity threats and how to protect your organization from them.",
      author: "Alex Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Security",
      image: "/blog/cybersecurity-threats.jpg"
    },
    {
      id: 2,
      title: "Best Practices for Network Security",
      excerpt: "Essential network security practices that every organization should implement.",
      author: "Sarah Chen",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Networking",
      image: "/blog/network-security.jpg"
    },
    {
      id: 3,
      title: "The Future of AI in Cybersecurity",
      excerpt: "How artificial intelligence is transforming the landscape of cybersecurity.",
      author: "Michael Brown",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "AI",
      image: "/blog/ai-security.jpg"
    }
  ]

  const categories = ["All", "Security", "Networking", "AI", "Cloud", "Compliance"]

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">CyberRest Blog</h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Stay informed about the latest trends, threats, and best practices in cybersecurity.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800 rounded-lg overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                    <p className="text-slate-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Blog 