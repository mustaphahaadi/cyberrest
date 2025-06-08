import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Reach out to us via email for any queries.",
    value: "support@cyberrest.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us for urgent issues.",
    value: "+1 800 123 4567",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time.",
    value: "Available 24/7",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We typically respond within 1 business day.",
    value: "<24h",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page, click 'Forgot password?', and follow the instructions.",
  },
  {
    question: "Where can I find the API documentation?",
    answer: "Visit the Resources page and click on Documentation.",
  },
  {
    question: "How do I contact support?",
    answer: "Use any of the channels above or the contact form on the Contact page.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Need help? Our team is here for you 24/7. Choose a support channel or browse our FAQs below.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportChannels.map((channel) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg p-6 border border-border text-center"
            >
              <channel.icon className="w-8 h-8 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
              <p className="text-muted-foreground mb-2">{channel.description}</p>
              <div className="font-mono text-primary">{channel.value}</div>
            </motion.div>
          ))}
        </div>
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-muted rounded-lg p-4 border border-border">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 