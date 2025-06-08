import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookOpen, FileText, Users, MessageSquare, ArrowRight } from "lucide-react";

const resources = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references",
    icon: BookOpen,
    link: "/docs",
    items: [
      "Getting Started Guide",
      "API Documentation",
      "Integration Tutorials",
      "Best Practices"
    ]
  },
  {
    title: "Blog",
    description: "Latest insights and updates",
    icon: FileText,
    link: "/blog",
    items: [
      "Security Best Practices",
      "Industry Trends",
      "Product Updates",
      "Success Stories"
    ]
  },
  {
    title: "Case Studies",
    description: "Real-world implementations",
    icon: Users,
    link: "/case-studies",
    items: [
      "Enterprise Solutions",
      "SMB Success Stories",
      "Industry Solutions",
      "Implementation Guides"
    ]
  },
  {
    title: "Community",
    description: "Join our growing community",
    icon: MessageSquare,
    link: "/community",
    items: [
      "Developer Forum",
      "Knowledge Base",
      "User Groups",
      "Events & Webinars"
    ]
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Resources & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed with CyberRest. From detailed documentation to community support.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{resource.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <ul className="space-y-2 mb-6">
                {resource.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={resource.link}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of CyberRest.
            Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/community"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
