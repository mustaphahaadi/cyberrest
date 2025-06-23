import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SEOHead = ({ 
  title = "CyberRest - AI-Powered Cybersecurity Platform",
  description = "Next-generation cybersecurity platform providing AI-powered threat detection, automated security tools, and comprehensive protection for modern organizations.",
  keywords = "cybersecurity, AI security, threat detection, security tools, data protection, vulnerability assessment",
  image = "/og-image.jpg",
  url,
  type = "website"
}) => {
  const location = useLocation()
  const currentUrl = url || `${window.location.origin}${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let element = document.querySelector(selector)
      
      if (!element) {
        element = document.createElement('meta')
        if (property) {
          element.setAttribute('property', name)
        } else {
          element.setAttribute('name', name)
        }
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'CyberRest')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'CyberRest', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:site', '@cyberrest')
    updateMetaTag('twitter:creator', '@cyberrest')

    // Additional SEO tags
    updateMetaTag('theme-color', '#0891b2')
    updateMetaTag('msapplication-TileColor', '#0891b2')
    updateMetaTag('application-name', 'CyberRest')

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', currentUrl)

    // JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "CyberRest",
      "description": description,
      "url": "https://cyberrest.com",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "CyberRest",
        "url": "https://cyberrest.com"
      }
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)

  }, [title, description, keywords, image, currentUrl, type])

  return null
}

// Page-specific SEO configurations
export const seoConfigs = {
  home: {
    title: "CyberRest - AI-Powered Cybersecurity Platform",
    description: "Protect your organization with next-generation cybersecurity. AI-powered threat detection, automated security tools, and comprehensive protection.",
    keywords: "cybersecurity platform, AI security, threat detection, automated security, data protection"
  },
  dashboard: {
    title: "Security Dashboard - CyberRest",
    description: "Monitor your security posture with real-time threat detection, vulnerability assessments, and comprehensive security analytics.",
    keywords: "security dashboard, threat monitoring, vulnerability assessment, security analytics"
  },
  tools: {
    title: "Security Tools - CyberRest",
    description: "Access powerful cybersecurity tools including password analyzers, breach scanners, network security tools, and more.",
    keywords: "security tools, password analyzer, breach scanner, network security, vulnerability scanner"
  },
  pricing: {
    title: "Pricing Plans - CyberRest",
    description: "Choose the perfect cybersecurity plan for your organization. Flexible pricing with enterprise-grade security features.",
    keywords: "cybersecurity pricing, security plans, enterprise security, security subscription"
  },
  about: {
    title: "About CyberRest - Leading Cybersecurity Innovation",
    description: "Learn about CyberRest's mission to revolutionize cybersecurity with AI-powered solutions and automated threat protection.",
    keywords: "about cyberrest, cybersecurity company, AI security innovation, threat protection"
  },
  contact: {
    title: "Contact CyberRest - Get Security Support",
    description: "Get in touch with our cybersecurity experts. Professional support for all your security needs and questions.",
    keywords: "contact cyberrest, security support, cybersecurity help, security consultation"
  }
}

export default SEOHead