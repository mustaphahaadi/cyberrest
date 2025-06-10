import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";

// Public pages
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Solutions from "./pages/Solutions";
import Resources from "./pages/Resources";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import Blog from "./pages/Blog";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import CareersPage from "./pages/CareersPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PoliciesPage from "./pages/PoliciesPage";
import DocsPage from "./pages/DocsPage";
import ApiReference from "./pages/ApiReference";
import DeveloperPortal from "./pages/DeveloperPortal";
import StatusPage from "./pages/StatusPage";
import KnowledgeBase from "./pages/KnowledgeBase";
import Changelog from "./pages/Changelog";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";

// Tool imports
import ToolsPage from "./pages/tools/ToolsPage";
import PasswordAnalyzer from "./pages/tools/PasswordAnalyzer";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import DataBreachScanner from "./pages/tools/DataBreachScanner";
import PhishingDetector from "./pages/tools/PhishingDetector";
import NetworkScanner from "./pages/tools/NetworkScanner";
import EncryptionTool from "./pages/tools/EncryptionTool";
import FileIntegrityChecker from "./pages/tools/FileIntegrityChecker";
import VulnerabilityAssessment from "./pages/tools/VulnerabilityAssessment";
import SecurityNews from "./pages/tools/SecurityNews";
import TwoFactorManager from "./pages/tools/TwoFactorManager";
import SecureNotes from "./pages/tools/SecureNotes";
import VpnManager from "./pages/tools/VpnManager";
import FirewallTool from "./pages/tools/FirewallTool";
import MalwareScanner from "./pages/tools/MalwareScanner";
import SecurityAudit from "./pages/tools/SecurityAudit";

// Protected Route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

// Dashboard wrapper component
function DashboardWrapper({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/api-reference" element={<ApiReference />} />
            <Route path="/developer" element={<DeveloperPortal />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/changelog" element={<Changelog />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardWrapper><Dashboard /></DashboardWrapper>} />
            <Route path="/profile" element={<DashboardWrapper><ProfilePage /></DashboardWrapper>} />
            <Route path="/dashboard/tools" element={<DashboardWrapper><ToolsPage /></DashboardWrapper>} />
            
            {/* Tool Routes */}
            <Route path="/dashboard/tools/password-analyzer" element={<DashboardWrapper><PasswordAnalyzer /></DashboardWrapper>} />
            <Route path="/dashboard/tools/password-generator" element={<DashboardWrapper><PasswordGenerator /></DashboardWrapper>} />
            <Route path="/dashboard/tools/data-breach-scanner" element={<DashboardWrapper><DataBreachScanner /></DashboardWrapper>} />
            <Route path="/dashboard/tools/phishing-detector" element={<DashboardWrapper><PhishingDetector /></DashboardWrapper>} />
            <Route path="/dashboard/tools/network-scanner" element={<DashboardWrapper><NetworkScanner /></DashboardWrapper>} />
            <Route path="/dashboard/tools/encryption-tool" element={<DashboardWrapper><EncryptionTool /></DashboardWrapper>} />
            <Route path="/dashboard/tools/file-integrity-checker" element={<DashboardWrapper><FileIntegrityChecker /></DashboardWrapper>} />
            <Route path="/dashboard/tools/vulnerability-assessment" element={<DashboardWrapper><VulnerabilityAssessment /></DashboardWrapper>} />
            <Route path="/dashboard/tools/security-news" element={<DashboardWrapper><SecurityNews /></DashboardWrapper>} />
            <Route path="/dashboard/tools/two-factor-manager" element={<DashboardWrapper><TwoFactorManager /></DashboardWrapper>} />
            <Route path="/dashboard/tools/secure-notes" element={<DashboardWrapper><SecureNotes /></DashboardWrapper>} />
            <Route path="/dashboard/tools/vpn-manager" element={<DashboardWrapper><VpnManager /></DashboardWrapper>} />
            <Route path="/dashboard/tools/firewall-tool" element={<DashboardWrapper><FirewallTool /></DashboardWrapper>} />
            <Route path="/dashboard/tools/malware-scanner" element={<DashboardWrapper><MalwareScanner /></DashboardWrapper>} />
            <Route path="/dashboard/tools/security-audit" element={<DashboardWrapper><SecurityAudit /></DashboardWrapper>} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;