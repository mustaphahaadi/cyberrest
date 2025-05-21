"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggler } from "@/components/ThemeToggler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Shield, Menu, Search, User, Settings, LogOut } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const tools = [
    {
      name: "Password Analyzer",
      description: "Check password strength and security",
      path: "/tools/password-analyzer",
    },
    {
      name: "Password Generator",
      description: "Create strong, random passwords",
      path: "/tools/password-generator",
    },
    {
      name: "Data Breach Scanner",
      description: "Check if your data has been compromised",
      path: "/tools/data-breach-scanner",
    },
    {
      name: "Dark Web Monitor",
      description: "Monitor the dark web for your personal information",
      path: "/tools/dark-web-monitor",
    },
    {
      name: "Phishing Detector",
      description: "Identify potential phishing websites",
      path: "/tools/phishing-detector",
    },
    {
      name: "Network Scanner",
      description: "Scan your network for vulnerabilities",
      path: "/tools/network-scanner",
    },
    {
      name: "Device Security Scanner",
      description: "Scan all your devices for security issues",
      path: "/tools/device-security-scanner",
    },
    {
      name: "Encryption Tool",
      description: "Encrypt and decrypt sensitive information",
      path: "/tools/encryption-tool",
    },
    {
      name: "File Integrity Checker",
      description: "Verify file integrity with checksums",
      path: "/tools/file-integrity-checker",
    },
    {
      name: "Vulnerability Assessment",
      description: "Identify security weaknesses",
      path: "/tools/vulnerability-assessment",
    },
    {
      name: "Security Training",
      description: "Interactive security awareness training",
      path: "/tools/security-training",
    },
    {
      name: "Compliance Checker",
      description: "Check compliance with security standards",
      path: "/tools/compliance-checker",
    },
    {
      name: "Security News",
      description: "Stay updated with security news",
      path: "/tools/security-news",
    },
    {
      name: "Two-Factor Manager",
      description: "Manage 2FA for your accounts",
      path: "/tools/two-factor-manager",
    },
    {
      name: "Secure Notes",
      description: "Store sensitive information securely",
      path: "/tools/secure-notes",
    },
    {
      name: "VPN Manager",
      description: "Secure your internet connection",
      path: "/tools/vpn-manager",
    },
    {
      name: "Firewall Tool",
      description: "Configure and manage firewall rules",
      path: "/tools/firewall-tool",
    },
    {
      name: "Malware Scanner",
      description: "Scan for viruses and malware",
      path: "/tools/malware-scanner",
    },
    {
      name: "Security Audit",
      description: "Comprehensive security assessment",
      path: "/tools/security-audit",
    },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CyberRest</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} active={location.pathname === "/"}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    {tools.map((tool) => (
                      <Link key={tool.path} to={tool.path}>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">{tool.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{tool.description}</p>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={location.pathname === "/pricing"}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} active={location.pathname === "/blog"}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} active={location.pathname === "/docs"}>
                    Docs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={location.pathname === "/contact"}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-40 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <ThemeToggler />

          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>CyberRest</SheetTitle>
                <SheetDescription>Cybersecurity tools by ReStartDigital</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <div className="grid grid-cols-1 gap-2">
                  <SheetClose asChild>
                    <Link to="/">
                      <Button variant="ghost" className="w-full justify-start">
                        Home
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/pricing">
                      <Button variant="ghost" className="w-full justify-start">
                        Pricing
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/blog">
                      <Button variant="ghost" className="w-full justify-start">
                        Blog
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/docs">
                      <Button variant="ghost" className="w-full justify-start">
                        Docs
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contact">
                      <Button variant="ghost" className="w-full justify-start">
                        Contact
                      </Button>
                    </Link>
                  </SheetClose>
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <Link to="/dashboard">
                          <Button variant="ghost" className="w-full justify-start">
                            Dashboard
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/profile">
                          <Button variant="ghost" className="w-full justify-start">
                            Profile
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                          Log out
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Link to="/login">
                          <Button variant="ghost" className="w-full justify-start">
                            Log in
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/register">
                          <Button variant="default" className="w-full">
                            Sign up
                          </Button>
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Security Tools</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {tools.map((tool) => (
                      <SheetClose key={tool.path} asChild>
                        <Link to={tool.path}>
                          <Button variant="ghost" className="w-full justify-start">
                            {tool.name}
                          </Button>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { Navbar }
