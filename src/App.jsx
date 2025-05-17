import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/theme-provider"

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

// Pages
import HomePage from "@/pages/HomePage"
import PricingPage from "@/pages/PricingPage"
import ContactPage from "@/pages/ContactPage"
import BlogPage from "@/pages/BlogPage"
import BlogPost from "@/pages/BlogPost"
import DocsPage from "@/pages/DocsPage"
import DocArticle from "@/pages/DocArticle"
import SearchResultsPage from "@/pages/SearchResultsPage"

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage"
import ProfilePage from "@/pages/auth/ProfilePage"
import ProtectedRoute from "@/components/ProtectedRoute"

// Dashboard Pages
import Dashboard from "@/pages/dashboard/Dashboard"
import Subscription from "@/pages/dashboard/Subscription"
import Settings from "@/pages/dashboard/Settings"
import Support from "@/pages/dashboard/Support"
import Usage from "@/pages/dashboard/Usage"
import TeamManagement from "@/pages/dashboard/TeamManagement"
import Analytics from "@/pages/dashboard/Analytics"

// Tool Pages
import PasswordAnalyzer from "@/pages/tools/PasswordAnalyzer"
import PasswordGenerator from "@/pages/tools/PasswordGenerator"
import DataBreachScanner from "@/pages/tools/DataBreachScanner"
import PhishingDetector from "@/pages/tools/PhishingDetector"
import NetworkScanner from "@/pages/tools/NetworkScanner"
import EncryptionTool from "@/pages/tools/EncryptionTool"
import FileIntegrityChecker from "@/pages/tools/FileIntegrityChecker"
import VulnerabilityAssessment from "@/pages/tools/VulnerabilityAssessment"
import SecurityNews from "@/pages/tools/SecurityNews"
import TwoFactorManager from "@/pages/tools/TwoFactorManager"
import SecureNotes from "@/pages/tools/SecureNotes"
import VpnManager from "@/pages/tools/VpnManager"
import FirewallTool from "@/pages/tools/FirewallTool"
import MalwareScanner from "@/pages/tools/MalwareScanner"
import SecurityAudit from "@/pages/tools/SecurityAudit"
import DarkWebMonitor from "@/pages/tools/DarkWebMonitor"
import DeviceSecurityScanner from "@/pages/tools/DeviceSecurityScanner"
import SecurityTraining from "@/pages/tools/SecurityTraining"
import ComplianceChecker from "@/pages/tools/ComplianceChecker"
import ApiIntegrations from "@/pages/tools/ApiIntegrations"

// Lazy loading for performance optimization
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Loading component
const LoadingFallback = () => (
  <div className="container mx-auto p-4">
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
)

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cyberrest-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/docs" element={<DocsPage />} />
                    <Route path="/docs/:id" element={<DocArticle />} />
                    <Route path="/search" element={<SearchResultsPage />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile" element={<ProfilePage />} />

                      {/* Dashboard Routes */}
                      <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="subscription" element={<Subscription />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="support" element={<Support />} />
                        <Route path="usage" element={<Usage />} />
                        <Route path="team" element={<TeamManagement />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="api-integrations" element={<ApiIntegrations />} />
                      </Route>

                      {/* Tool Routes */}
                      <Route path="/tools/password-analyzer" element={<PasswordAnalyzer />} />
                      <Route path="/tools/password-generator" element={<PasswordGenerator />} />
                      <Route path="/tools/data-breach-scanner" element={<DataBreachScanner />} />
                      <Route path="/tools/phishing-detector" element={<PhishingDetector />} />
                      <Route path="/tools/network-scanner" element={<NetworkScanner />} />
                      <Route path="/tools/encryption-tool" element={<EncryptionTool />} />
                      <Route path="/tools/file-integrity-checker" element={<FileIntegrityChecker />} />
                      <Route path="/tools/vulnerability-assessment" element={<VulnerabilityAssessment />} />
                      <Route path="/tools/security-news" element={<SecurityNews />} />
                      <Route path="/tools/two-factor-manager" element={<TwoFactorManager />} />
                      <Route path="/tools/secure-notes" element={<SecureNotes />} />
                      <Route path="/tools/vpn-manager" element={<VpnManager />} />
                      <Route path="/tools/firewall-tool" element={<FirewallTool />} />
                      <Route path="/tools/malware-scanner" element={<MalwareScanner />} />
                      <Route path="/tools/security-audit" element={<SecurityAudit />} />

                      {/* New Tool Routes */}
                      <Route path="/tools/dark-web-monitor" element={<DarkWebMonitor />} />
                      <Route path="/tools/device-security-scanner" element={<DeviceSecurityScanner />} />
                      <Route path="/tools/security-training" element={<SecurityTraining />} />
                      <Route path="/tools/compliance-checker" element={<ComplianceChecker />} />
                    </Route>
                  </Routes>
                </Suspense>
              </main>
            </div>
          </div>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
