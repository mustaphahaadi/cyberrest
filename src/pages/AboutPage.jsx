import React from 'react';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              About CyberRest
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering organizations with cutting-edge cybersecurity solutions
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At CyberRest, we're dedicated to revolutionizing cybersecurity through innovative solutions that protect businesses and individuals in an increasingly complex digital landscape.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to make advanced cybersecurity accessible, understandable, and effective for organizations of all sizes.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Industry-leading security solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>24/7 expert support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Continuous innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Proven track record</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-primary/5">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Add team member cards here */}
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
              <p className="text-muted-foreground text-center">CEO & Founder</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">Jane Smith</h3>
              <p className="text-muted-foreground text-center">CTO</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">Mike Johnson</h3>
              <p className="text-muted-foreground text-center">Head of Security</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">Join thousands of organizations trusting CyberRest for their security needs.</p>
            <Button variant="secondary" size="lg">
              Contact Sales
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
} 