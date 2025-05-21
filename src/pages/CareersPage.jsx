import React from 'react';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "Senior Security Engineer",
      location: "Remote",
      type: "Full-time",
      description: "Join our security team to help build and maintain our cutting-edge security infrastructure."
    },
    {
      title: "Security Analyst",
      location: "New York, NY",
      type: "Full-time",
      description: "Monitor and analyze security threats, investigate incidents, and implement security measures."
    },
    {
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure and deployment pipelines."
    },
    {
      title: "Product Manager",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead product development and strategy for our security solutions."
    }
  ];

  const benefits = [
    {
      title: "Health & Wellness",
      items: ["Comprehensive health insurance", "Mental health support", "Gym membership"]
    },
    {
      title: "Work-Life Balance",
      items: ["Flexible hours", "Remote work options", "Generous PTO"]
    },
    {
      title: "Learning & Growth",
      items: ["Professional development budget", "Conference attendance", "Training programs"]
    },
    {
      title: "Perks & Benefits",
      items: ["Competitive salary", "Stock options", "Home office setup"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us build the future of cybersecurity
            </p>
          </div>
        </Container>
      </section>

      {/* Culture Section */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At CyberRest, we believe in fostering an environment of innovation, collaboration, and continuous learning. Our team is diverse, passionate, and committed to making a difference in the cybersecurity landscape.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Innovation-driven environment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Collaborative team culture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Continuous learning opportunities</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-primary/5 rounded-lg"></div>
              <div className="aspect-square bg-primary/5 rounded-lg"></div>
              <div className="aspect-square bg-primary/5 rounded-lg"></div>
              <div className="aspect-square bg-primary/5 rounded-lg"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-primary/5">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Job Openings Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <Button variant="outline">Apply Now</Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <Container>
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
            <p className="text-lg mb-6">We're always looking for talented individuals. Send us your resume!</p>
            <Button variant="secondary" size="lg">
              Send Resume
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
} 