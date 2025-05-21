import React from 'react';
import { Container } from '@/components/ui/container';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              At CyberRest, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Name and contact information</li>
                <li>Company details</li>
                <li>Account credentials</li>
                <li>Payment information</li>
              </ul>

              <h3 className="text-xl font-medium">2.2 Usage Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Log data and device information</li>
                <li>Usage patterns and preferences</li>
                <li>Security-related data</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>To provide and maintain our services</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you about our services</li>
              <li>To ensure security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <p>Email: privacy@cyberrest.com</p>
              <p>Address: 123 Security Street, Cyber City, 12345</p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
} 