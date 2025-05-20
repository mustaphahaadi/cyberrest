import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardLayout from "./components/layouts/DashboardLayout"
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/auth/LoginPage"
import RegisterPage from "./componentspages/auth/RegisterPage"
import ForgotPasswordPage from "./components/pages/auth/ForgotPasswordPage"
import Dashboard from "./components/pages/dashboard/Dashboard"
import DataBreachScanner from "./components/pages/tools/DataBreachScanner"
import PhishingDetector from "./components/pages/tools/PhishingDetector"
import NetworkScanner from "./components/pages/tools/NetworkScanner"
import PasswordAnalyzer from "./components/pages/tools/PasswordAnalyzer"
import PasswordGenerator from "./components/pages/tools/PasswordGenerator"
import NotFoundPage from "./components/pages/NotFoundPage"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cybersecurity-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="data-breach-scanner" element={<DataBreachScanner />} />
              <Route path="phishing-detector" element={<PhishingDetector />} />
              <Route path="network-scanner" element={<NetworkScanner />} />
              <Route path="password-analyzer" element={<PasswordAnalyzer />} />
              <Route path="password-generator" element={<PasswordGenerator />} />
              {/* <Route path="" */}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
