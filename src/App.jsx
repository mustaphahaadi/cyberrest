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

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cybersecurity-theme">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="tools/data-breach-scanner" element={<DataBreachScanner />} />
              <Route path="tools/phishing-detector" element={<PhishingDetector />} />
              <Route path="tools/network-scanner" element={<NetworkScanner />} />
              <Route path="tools/password-analyzer" element={<PasswordAnalyzer />} />
              <Route path="tools/password-generator" element={<PasswordGenerator />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
