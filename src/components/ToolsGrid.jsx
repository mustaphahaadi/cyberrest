import { Shield, AlertTriangle, CheckCircle, Wifi, Lock, Search, Activity, TrendingUp, Users, FileText, Key, FileCheck, Bug, Newspaper, Smartphone, StickyNote, Globe, ShieldAlert, ShieldCheck, AlertOctagon } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
import { useNavigate } from "react-router-dom"

const tools = [
  {
    title: "Password Analyzer",
    description: "Check password strength and get recommendations",
    icon: Lock,
    path: "/dashboard/tools/password-analyzer"
  },
  {
    title: "Password Generator",
    description: "Generate strong, secure passwords",
    icon: Key,
    path: "/dashboard/tools/password-generator"
  },
  {
    title: "Data Breach Scanner",
    description: "Check if your data has been compromised",
    icon: Search,
    path: "/dashboard/tools/data-breach-scanner"
  },
  {
    title: "Phishing Detector",
    description: "Analyze URLs for potential phishing attempts",
    icon: AlertTriangle,
    path: "/dashboard/tools/phishing-detector"
  },
  {
    title: "Network Scanner",
    description: "Scan your network for vulnerabilities",
    icon: Wifi,
    path: "/dashboard/tools/network-scanner"
  },
  {
    title: "Encryption Tool",
    description: "Encrypt and decrypt sensitive data",
    icon: Lock,
    path: "/dashboard/tools/encryption-tool"
  },
  {
    title: "File Integrity Checker",
    description: "Verify file integrity and detect modifications",
    icon: FileCheck,
    path: "/dashboard/tools/file-integrity-checker"
  },
  {
    title: "Vulnerability Assessment",
    description: "Identify security vulnerabilities",
    icon: Bug,
    path: "/dashboard/tools/vulnerability-assessment"
  },
  {
    title: "Security News",
    description: "Stay updated with latest security threats",
    icon: Newspaper,
    path: "/dashboard/tools/security-news"
  },
  {
    title: "Two-Factor Manager",
    description: "Manage 2FA for your accounts",
    icon: Smartphone,
    path: "/dashboard/tools/two-factor-manager"
  },
  {
    title: "Secure Notes",
    description: "Store sensitive information securely",
    icon: StickyNote,
    path: "/dashboard/tools/secure-notes"
  },
  {
    title: "VPN Manager",
    description: "Configure and monitor VPN connections",
    icon: Globe,
    path: "/dashboard/tools/vpn-manager"
  },
  {
    title: "Firewall Tool",
    description: "Manage and monitor firewall rules",
    icon: ShieldAlert,
    path: "/dashboard/tools/firewall-tool"
  },
  {
    title: "Malware Scanner",
    description: "Scan for malware and suspicious files",
    icon: AlertOctagon,
    path: "/dashboard/tools/malware-scanner"
  },
  {
    title: "Security Audit",
    description: "Comprehensive security assessment",
    icon: ShieldCheck,
    path: "/dashboard/tools/security-audit"
  }
]

export default function ToolsGrid() {
  const navigate = useNavigate()

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">All Security Tools</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate(tool.path)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <tool.icon className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">{tool.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 