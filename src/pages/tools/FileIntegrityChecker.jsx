"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileCheck, Copy, CheckCircle, XCircle, Info } from "lucide-react"

export default function FileIntegrityChecker() {
  const [file, setFile] = useState(null)
  const [hashType, setHashType] = useState("sha256")
  const [calculatedHash, setCalculatedHash] = useState("")
  const [expectedHash, setExpectedHash] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [copied, setCopied] = useState(false)

  // Mock hash calculation function
  const calculateHash = (file, hashType) => {
    return new Promise((resolve) => {
      // In a real app, we would use the Web Crypto API to calculate the hash
      // This is just a mock for demonstration purposes
      setTimeout(() => {
        // Generate a random hash for demo
        const hashLength = hashType === "md5" ? 32 : hashType === "sha1" ? 40 : 64
        const characters = "0123456789abcdef"
        let hash = ""

        for (let i = 0; i < hashLength; i++) {
          hash += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        resolve(hash)
      }, 1500)
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setCalculatedHash("")
      setVerificationResult(null)
    }
  }

  const handleCalculateHash = async () => {
    if (!file) return

    setCalculatedHash("")
    setIsVerifying(true)

    try {
      const hash = await calculateHash(file, hashType)
      setCalculatedHash(hash)
    } catch (error) {
      console.error("Error calculating hash:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleVerifyHash = async () => {
    if (!file || !expectedHash) return

    setCalculatedHash("")
    setIsVerifying(true)

    try {
      const hash = await calculateHash(file, hashType)
      setCalculatedHash(hash)
      setVerificationResult(hash.toLowerCase() === expectedHash.toLowerCase())
    } catch (error) {
      console.error("Error verifying hash:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(calculatedHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>File Integrity Checker</CardTitle>
          <CardDescription>Calculate and verify file hashes to ensure file integrity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculate">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculate">
                <FileCheck className="mr-2 h-4 w-4" />
                Calculate Hash
              </TabsTrigger>
              <TabsTrigger value="verify">
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Hash
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select File</label>
                  <div className="flex items-center gap-2">
                    <Input type="file" onChange={handleFileChange} className="flex-1" />
                  </div>
                  {file && (
                    <p className="text-xs text-muted-foreground">
                      Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Hash Algorithm</label>
                  <Select value={hashType} onValueChange={setHashType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="md5">MD5 (Fast, less secure)</SelectItem>
                      <SelectItem value="sha1">SHA-1 (Legacy)</SelectItem>
                      <SelectItem value="sha256">SHA-256 (Recommended)</SelectItem>
                      <SelectItem value="sha512">SHA-512 (Most secure)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    SHA-256 provides a good balance of security and performance
                  </p>
                </div>
              </div>

              <TabsContent value="calculate" className="space-y-4 mt-0">
                <Button onClick={handleCalculateHash} disabled={!file || isVerifying} className="w-full">
                  {isVerifying ? (
                    <>
                      <FileCheck className="mr-2 h-4 w-4 animate-pulse" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <FileCheck className="mr-2 h-4 w-4" />
                      Calculate File Hash
                    </>
                  )}
                </Button>

                {calculatedHash && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">File Hash ({hashType.toUpperCase()})</label>
                    <div className="relative">
                      <Input value={calculatedHash} readOnly className="font-mono text-xs pr-10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={copyToClipboard}
                      >
                        {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">This is the unique digital fingerprint of your file</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="verify" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Hash</label>
                  <Input
                    placeholder={`Enter expected ${hashType.toUpperCase()} hash`}
                    value={expectedHash}
                    onChange={(e) => setExpectedHash(e.target.value)}
                    className="font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground">Paste the hash you want to verify against</p>
                </div>

                <Button onClick={handleVerifyHash} disabled={!file || !expectedHash || isVerifying} className="w-full">
                  {isVerifying ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 animate-pulse" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Verify File Hash
                    </>
                  )}
                </Button>

                {calculatedHash && verificationResult !== null && (
                  <Alert className={verificationResult ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                    {verificationResult ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <AlertDescription className={verificationResult ? "text-green-800" : "text-red-800"}>
                      {verificationResult
                        ? "Hash verification successful! The file is authentic and has not been modified."
                        : "Hash verification failed! The file may have been modified or corrupted."}
                    </AlertDescription>
                  </Alert>
                )}

                {calculatedHash && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Calculated Hash ({hashType.toUpperCase()})</label>
                    <Input value={calculatedHash} readOnly className="font-mono text-xs" />
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              File hashing is performed locally in your browser. Your files are never uploaded to our servers.
            </AlertDescription>
          </Alert>

          <div className="text-sm space-y-2 w-full mt-4">
            <h3 className="font-medium">What is file integrity checking?</h3>
            <p className="text-sm text-muted-foreground">
              File integrity checking uses cryptographic hash functions to create a unique "fingerprint" of a file. This
              fingerprint can be used to verify that a file hasn't been modified or corrupted during transfer or
              storage.
            </p>

            <h3 className="font-medium mt-2">Common uses:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Verify downloaded software hasn't been tampered with</li>
              <li>Ensure file transfers completed successfully</li>
              <li>Check if files have been modified</li>
              <li>Verify backups are intact</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
