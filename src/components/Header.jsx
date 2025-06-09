"use client"

import { Link } from "react-router-dom"
import { Menu, X, Shield } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { ModeToggle } from "./ModeToggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">CyberRest</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium hover:underline">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link to="/products" className="text-sm font-medium hover:underline">
            Products
          </Link>
          <Link to="/solutions" className="text-sm font-medium hover:underline">
            Solutions
          </Link>
          <Link to="/resources" className="text-sm font-medium hover:underline">
            Resources
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-medium hover:underline">
                Dashboard
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:underline">
                Profile
              </Link>
              <button onClick={logout} className="text-sm font-medium hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:underline">
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/features" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="/products" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/solutions" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Solutions
            </Link>
            <Link to="/resources" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Resources
            </Link>
            <Link to="/about" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="text-sm font-medium hover:underline text-left"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
