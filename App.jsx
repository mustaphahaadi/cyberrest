import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
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
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
