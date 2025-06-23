import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { motion } from "framer-motion"
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Download,
  Search,
  Settings
} from "lucide-react"

export default function ComplianceChecker() {
  const [scanResults, setScanResults] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState("gdpr")

  const frameworks = [
    { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation" },
    { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
    { id: "sox", name: "SOX", description: "Sarbanes-Oxley Act" },
    { id: "pci", name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
    { id: "iso27001", name: "ISO 27001", description: "Information Security Management" }
  ]

  const mockResults = {
    overall: 78,
    passed: 23,
    failed: 7,
    warnings: 5,
    total: 35,
    checks: [
      {
        category: "Data Protection",
        status: "passed",
        score: 85,
        items: [
          { name: "Data encryption at rest", status: "passed" },
          { name: "Data encryption in transit", status: "passed" },
          { name: "Access controls", status: "warning" },
          { name: "Data retention policies", status: "failed" }
        ]
      },
      {
        category: "Privacy Controls",
        status: "warning",
        score: 72,
        items: [
          { name: "Privacy policy", status: "passed" },
          { name: "Consent management", status: "warning" },
          { name: "Data subject rights", status: "passed" },
          { name: "Cookie compliance", status: "failed" }
        ]
      },
      {
        category: "Security Measures",
        status: "passed",
        score: 90,
        items: [
          { name: "Multi-factor authentication", status: "passed" },
          { name: "Regular security audits", status: "passed" },
          { name: "Incident response plan", status: "passed" },
          { name: "Employee training", status: "warning" }
        ]
      }
    ]
  }

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setScanResults(mockResults)
      setIsScanning(false)
    }, 3000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "passed": return "text-green-600 bg-green-100"
      case "warning": return "text-yellow-600 bg-yellow-100"
      case "failed": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed": return <CheckCircle className="h-4 w-4" />
      case "warning": return <AlertTriangle className="h-4 w-4" />
      case "failed": return <XCircle className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Compliance Checker</h2>
        <p className="text-muted-foreground">Verify compliance with regulatory frameworks and standards</p>
      </div>

      <Tabs defaultValue="scan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scan">Compliance Scan</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Run Compliance Check</CardTitle>
              <CardDescription>Select a framework and scan your organization's compliance status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="framework">Compliance Framework</Label>
                <select
                  id="framework"
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {frameworks.map((framework) => (
                    <option key={framework.id} value={framework.id}>
                      {framework.name} - {framework.description}
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="w-full"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Start Compliance Scan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {scanResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Score</CardTitle>
                  <CardDescription>Overall compliance rating for {frameworks.find(f => f.id === selectedFramework)?.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-primary">{scanResults.overall}%</div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {scanResults.passed} passed, {scanResults.failed} failed, {scanResults.warnings} warnings
                      </div>
                    </div>
                  </div>
                  <Progress value={scanResults.overall} className="h-3" />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Passed</p>
                        <p className="text-2xl font-bold text-green-600">{scanResults.passed}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                        <p className="text-2xl font-bold text-yellow-600">{scanResults.warnings}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Failed</p>
                        <p className="text-2xl font-bold text-red-600">{scanResults.failed}</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Results</CardTitle>
                  <CardDescription>Breakdown by compliance category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {scanResults.checks.map((category, index) => (
                      <motion.div
                        key={category.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{category.category}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(category.status)}>
                              {getStatusIcon(category.status)}
                              {category.status}
                            </Badge>
                            <span className="text-sm font-medium">{category.score}%</span>
                          </div>
                        </div>
                        <Progress value={category.score} className="mb-3 h-2" />
                        <div className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between text-sm">
                              <span>{item.name}</span>
                              <Badge className={getStatusColor(item.status)} variant="outline">
                                {getStatusIcon(item.status)}
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                  <CardDescription>Export results and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Recommendations
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {frameworks.map((framework) => (
              <Card key={framework.id}>
                <CardHeader>
                  <CardTitle>{framework.name}</CardTitle>
                  <CardDescription>{framework.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedFramework(framework.id)}
                    className="w-full"
                  >
                    Select Framework
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Historical compliance scan results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No reports available</h3>
                <p className="text-muted-foreground">Run a compliance scan to generate your first report.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}