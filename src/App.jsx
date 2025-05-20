import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardLayout from "./layouts/DashboardLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import Dashboard from "./pages/dashboard/Dashboard"
import DataBreachScanner from "./pages/tools/DataBreachScanner"
import PhishingDetector from "./pages/tools/PhishingDetector"
import NetworkScanner from "./pages/tools/NetworkScanner"
import PasswordAnalyzer from "./pages/tools/PasswordAnalyzer"
import PasswordGenerator from "./pages/tools/PasswordGenerator"
import NotFoundPage from "./pages/NotFoundPage"
import ApiReference from "./pages/api-reference/ApiReference"
import DocumentationHub from "./pages/documentation/DocumentationHub"
import StatusPage from "./pages/status/StatusPage"
import BlogPage from "./pages/BlogPage"
import BlogPost from "./pages/BlogPost"
import CaseStudies from "./pages/CaseStudies"
import Changelog from "./pages/Changelog"
import ContactPage from "./pages/ContactPage"
import DeveloperPortal from "./pages/DeveloperPortal"
import DocArticle from "./pages/DocArticle"
import DocsPage from "./pages/DocsPage"
import EnterpriseFeatures from "./pages/EnterpriseFeatures"
import FeatureComparisonPage from "./pages/FeatureComparisonPage"
import IntegrationsDirectory from "./pages/IntegrationsDirectory"
import KnowledgeBase from "./pages/KnowledgeBase"
import PricingPage from "./pages/PricingPage"
import ProfilePage from "./pages/ProfilePage"
import ResourcesHub from "./pages/ResourcesHub"
import SearchResultsPage from "./pages/SearchResultsPage"
import Analytics from "./pages/dashboard/Analytics"
import Settings from "./pages/dashboard/Settings"
import Subscription from "./pages/dashboard/Subscription"
import Support from "./pages/dashboard/Support"
import TeamManagement from "./pages/dashboard/TeamManagement"
import Usage from "./pages/dashboard/Usage"
import ApiIntegrations from "./pages/tools/ApiIntegrations"
import ComplianceChecker from "./pages/tools/ComplianceChecker"
import DarkWebMonitor from "./pages/tools/DarkWebMonitor"
import VulnerabilityAssessment from "./pages/tools/VulnerabilityAssessment"
import VpnManager from "./pages/tools/VpnManager"
import TwoFactorManager from "./pages/tools/TwoFactorManager"
import SecurityTraining from "./pages/tools/SecurityTraining"
import SecurityNews from "./pages/tools/SecurityNews"
import SecurityAudit from "./pages/tools/SecurityAudit"
import SecureNotes from "./pages/tools/SecureNotes"
import MalwareScanner from "./pages/tools/MalwareScanner"
import FirewallTool from "./pages/tools/FirewallTool"
import FileIntegrityChecker from "./pages/tools/FileIntegrityChecker"
import EncryptionTool from "./pages/tools/EncryptionTool"
import DeviceSecurityScanner from "./pages/tools/DeviceSecurityScanner"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cybersecurity-theme">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/features/enterprise" element={<EnterpriseFeatures />} />
            <Route path="/features/compare" element={<FeatureComparisonPage />} />
            <Route path="/integrations" element={<IntegrationsDirectory />} />
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/search" element={<SearchResultsPage />} />

            {/* Documentation Routes */}
            <Route path="/docs" element={<DocsPage />}>
              <Route index element={<DocumentationHub />} />
              <Route path=":article" element={<DocArticle />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Developer Routes */}
            <Route path="/developers" element={<DeveloperPortal />}>
              <Route path="api" element={<ApiReference />} />
              <Route path="knowledge-base" element={<KnowledgeBase />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="support" element={<Support />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="usage" element={<Usage />} />
              <Route path="profile" element={<ProfilePage />} />
              
              {/* Tools Routes */}
              <Route path="tools">
                <Route path="data-breach-scanner" element={<DataBreachScanner />} />
                <Route path="phishing-detector" element={<PhishingDetector />} />
                <Route path="network-scanner" element={<NetworkScanner />} />
                <Route path="password-analyzer" element={<PasswordAnalyzer />} />
                <Route path="password-generator" element={<PasswordGenerator />} />
                <Route path="api-integrations" element={<ApiIntegrations />} />
                <Route path="compliance-checker" element={<ComplianceChecker />} />
                <Route path="dark-web-monitor" element={<DarkWebMonitor />} />
                <Route path="vulnerability-assessment" element={<VulnerabilityAssessment />} />
                <Route path="vpn-manager" element={<VpnManager />} />
                <Route path="two-factor-manager" element={<TwoFactorManager />} />
                <Route path="security-training" element={<SecurityTraining />} />
                <Route path="security-news" element={<SecurityNews />} />
                <Route path="security-audit" element={<SecurityAudit />} />
                <Route path="secure-notes" element={<SecureNotes />} />
                <Route path="malware-scanner" element={<MalwareScanner />} />
                <Route path="firewall-tool" element={<FirewallTool />} />
                <Route path="file-integrity-checker" element={<FileIntegrityChecker />} />
                <Route path="encryption-tool" element={<EncryptionTool />} />
                <Route path="device-security-scanner" element={<DeviceSecurityScanner />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              
              {/* Dashboard 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Global 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
