import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Shield, Menu, X, User, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "./ui/button"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-bold text-white">CyberRest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link to="/products" className="text-slate-300 hover:text-white">
                Products
              </Link>
              <Link to="/solutions" className="text-slate-300 hover:text-white">
                Solutions
              </Link>
              <Link to="/resources" className="text-slate-300 hover:text-white">
                Resources
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="text-slate-300 hover:text-white">
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-300">{user.name}</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-slate-300 hover:text-white">
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800"
              >
                Products
              </Link>
              <Link
                to="/solutions"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800"
              >
                Solutions
              </Link>
              <Link
                to="/resources"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800"
              >
                Resources
              </Link>
              <div className="pt-4 pb-3 border-t border-slate-800">
                <div className="flex items-center px-5 space-x-4">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block w-full px-3 py-2 text-center text-white hover:bg-slate-800 rounded-md"
                      >
                        Dashboard
                      </Link>
                      <Button
                        onClick={logout}
                        className="w-full bg-red-500 hover:bg-red-600"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full px-3 py-2 text-center text-white hover:bg-slate-800 rounded-md"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full px-3 py-2 text-center bg-cyan-500 text-white hover:bg-cyan-600 rounded-md"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
