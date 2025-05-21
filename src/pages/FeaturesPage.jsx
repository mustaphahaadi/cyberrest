import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  const features = [
    {
      title: "Advanced Threat Detection",
      description: "Real-time monitoring and detection of sophisticated cyber threats using AI-powered algorithms.",
      icon: "🛡️"
    },
    {
      title: "Automated Response",
      description: "Instant automated responses to security incidents, minimizing potential damage.",
      icon: "⚡"
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with industry standards and regulations with our comprehensive compliance tools.",
      icon: "📋"
    },
    {
      title: "Security Analytics",
      description: "Deep insights into your security posture with advanced analytics and reporting.",
      icon: "📊"
    },
    {
      title: "Vulnerability Management",
      description: "Continuous scanning and assessment of security vulnerabilities across your infrastructure.",
      icon: "🔍"
    },
    {
      title: "Incident Response",
      description: "Streamlined incident response workflows with detailed documentation and tracking.",
      icon: "🚨"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Powerful Security Features
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive cybersecurity solutions designed to protect your organization
            </p>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-primary/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Seamless Integrations</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Connect with your existing tools and workflows. Our platform integrates with popular security tools, cloud providers, and enterprise systems.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Cloud Platform Integration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>SIEM Systems</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Security Tools</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Custom API Access</span>
                </li>
              </ul>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Supported Platforms</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded">AWS</div>
                <div className="p-4 bg-primary/5 rounded">Azure</div>
                <div className="p-4 bg-primary/5 rounded">GCP</div>
                <div className="p-4 bg-primary/5 rounded">Splunk</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Features?</h2>
            <p className="text-lg mb-6">Start your free trial today and see the difference.</p>
            <Button variant="secondary" size="lg">
              Start Free Trial
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
} 