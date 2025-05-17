"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, BookOpen, Shield, Server, Users, HelpCircle, FileText } from "lucide-react"

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="h-6 w-6" />,
      articles: [
        { id: 'account-setup', title: 'Setting up your CyberRest account', views: 1245 },
        { id: 'dashboard-overview', title: 'Navigating the dashboard', views: 982 },
        { id: 'first-scan', title: 'Running your first security scan', views: 876 },
        { id: 'invite-team', title: 'Inviting team members', views: 654 }
      ]
    },
    {
      id: 'security-tools',
      title: 'Security Tools',
      icon: <Shield className="h-6 w-6" />,
      articles: [
        { id: 'dark-web-monitor', title: 'Using the Dark Web Monitor', views: 1532 },
        { id: 'device-scanner', title: 'Device Security Scanner guide', views: 1245 },
        { id: 'password-analyzer', title: 'Password strength analysis', views: 987 },
        { id: 'phishing-detector', title: 'Detecting phishing attempts', views: 876 },
        { id: 'vulnerability-assessment', title: 'Running a vulnerability assessment', views: 765 }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance',
      icon: <FileText className="h-6 w-6" />,
      articles: [
        { id: 'gdpr-compliance', title: 'GDPR compliance checklist', views: 1876 },
        { id: 'hipaa-guide', title: 'HIPAA compliance guide', views: 1543 },
        { id: 'pci-dss', title: 'PCI DSS requirements', views: 1321 },
        { id: 'compliance-reports', title: 'Generating compliance reports', views: 987 }
      ]
    },
    {
      id: 'account-management',
      title: 'Account Management',
      icon: <Users className="h-6 w-6" />,
      articles: [
        { id: 'subscription-management', title: 'Managing your subscription', views: 1432 },
        { id: 'billing-faq', title: 'Billing and payment FAQ', views: 1234 },
        { id: 'team-permissions', title: 'Team roles and permissions', views: 987 },
        { id: 'account-security', title: 'Securing your account', views: 876 }
      ]
    },
    {
      id: 'api-integrations',
      title: 'API & Integrations',
      icon: <Server className="h-6 w-6" />,
      articles: [
        { id: 'api-overview', title: 'API overview and authentication', views: 1543 },
        { id: 'webhooks', title: 'Setting up webhooks', views: 1234 },
        { id: 'sso-setup', title: 'Single Sign-On (SSO) configuration', views: 1098 },
        { id: 'third-party-integrations', title: 'Third-party integrations', views: 987 }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle className="h-6 w-6" />,
      articles: [
        { id: 'common-issues', title: 'Common issues and solutions', views: 2143 },
        { id: 'scan-errors', title: 'Resolving scan errors', views: 1765 },
        { id: 'api-errors', title: 'API error codes explained', views: 1432 },
        { id: 'connection-problems', title: 'Fixing connection problems', views: 1234 }
      ]
    }
  ];

  // Filter categories and articles based on search query
  const filteredCategories = searchQuery
    ? categories.map(category => ({
        ...category,
        articles: category.articles.filter(article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.articles.length > 0)
    : categories;

  // Get popular articles across all categories
  const popularArticles = categories
    .flatMap(category => category.articles)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Knowledge Base</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions and learn how to get the most out of CyberRest's cybersecurity tools.
        </p>
        
        <div className="mt-6 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search knowledge base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!searchQuery && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Popular Articles</h2>
          <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {popularArticles.map((article) => (
                <li key={article.id}>
                  <Link 
                    to={`/knowledge-base/article/${article.id}`} 
                    className="block hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                          {article.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {article.views} views
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div 
            key={category.id} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="mr-3 text-blue-600 dark:text-blue-400">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold">{category.title}</h2>
            </div>
            <ul className="space-y-2">
              {category.articles.map((article) => (
                <li key={article.id}>
                  <Link 
                    to={`/knowledge-base/article/${article.id}`} 
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to={`/knowledge-base/category/${category.id}`}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all articles in {category.title} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No results found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any articles matching "{searchQuery}". Try using different keywords or browse the categories.
          </p>
        </div>
      )}

      <div className="mt-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Our support team is ready to help you with any questions or issues you might have.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/support" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contact Support
          </Link>
          <Link 
            to="/documentation" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"\
