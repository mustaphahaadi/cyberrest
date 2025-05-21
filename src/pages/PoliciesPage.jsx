import React from 'react';
import { Container } from '../components/ui/container';

export default function PoliciesPage() {
  const policies = [
    {
      title: "Acceptable Use Policy",
      content: "This policy outlines the acceptable use of our services and platform. Users must comply with all applicable laws and regulations while using our services."
    },
    {
      title: "Security Policy",
      content: "Our security policy details the measures we take to protect our systems and data, as well as the responsibilities of our users in maintaining security."
    },
    {
      title: "Data Retention Policy",
      content: "This policy explains how long we retain different types of data and the processes for data deletion and archival."
    },
    {
      title: "Service Level Agreement",
      content: "Our SLA defines the level of service we provide, including uptime guarantees, support response times, and service credits."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Company Policies</h1>
          <p className="text-muted-foreground mb-12">
            Our policies are designed to ensure transparency, security, and compliance in all aspects of our service.
          </p>

          <div className="space-y-12">
            {policies.map((policy, index) => (
              <section key={index} className="bg-background p-6 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
                <p className="text-muted-foreground mb-6">{policy.content}</p>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Key Points</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Compliance with industry standards</li>
                    <li>Regular policy reviews and updates</li>
                    <li>Clear communication of changes</li>
                    <li>Enforcement procedures</li>
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-16 bg-primary/5 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
            <p className="text-muted-foreground mb-4">
              We regularly review and update our policies to ensure they remain current and effective. Any significant changes will be communicated to our users in advance.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-4">Contact Information</h3>
              <p className="text-muted-foreground">
                For questions about our policies, please contact our compliance team at:
              </p>
              <div className="mt-4 p-4 bg-background rounded-lg">
                <p>Email: compliance@cyberrest.com</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
} 