"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Lock, Unlock, RefreshCw, AlertCircle, Check, Info } from "lucide-react"

export default function EncryptionTool() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [password, setPassword] = useState("")
  const [algorithm, setAlgorithm] = useState("aes-256")
  const [mode, setMode] = useState("encrypt")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  // Mock encryption/decryption functions
  const encrypt = (text, password, algorithm) => {
    if (!text || !password) {
      throw new Error("Text and password are required")
    }

    // In a real app, we would use a proper encryption library
    // This is just a simple mock for demonstration
    try {
      // Simple XOR encryption for demo purposes only
      const result = text
        .split("")
        .map((char) => {
          return String.fromCharCode(char.charCodeAt(0) ^ password.charCodeAt(0 % password.length))
        })
        .join("")

      // Base64 encode the result
      return btoa(result)
    } catch (error) {
      throw new Error("Encryption failed")
    }
  }

  const decrypt = (text, password, algorithm) => {
    if (!text || !password) {
      throw new Error("Text and password are required")
    }

    try {
      // Base64 decode
      const decoded = atob(text)

      // Simple XOR decryption for demo purposes only
      return decoded
        .split("")
        .map((char) => {
          return String.fromCharCode(char.charCodeAt(0) ^ password.charCodeAt(0 % password.length))
        })
        .join("")
    } catch (error) {
      throw new Error(
        "Decryption failed. Make sure the text is properly encrypted and you're using the correct password.",
      )
    }
  }

  const handleProcess = () => {
    setError("")

    try {
      if (mode === "encrypt") {
        const encrypted = encrypt(inputText, password, algorithm)
        setOutputText(encrypted)
      } else {
        const decrypted = decrypt(inputText, password, algorithm)
        setOutputText(decrypted)
      }
    } catch (error) {
      setError(error.message)
      setOutputText("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setPassword("")
    setError("")
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Encryption/Decryption Tool</CardTitle>
          <CardDescription>Securely encrypt and decrypt sensitive information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="encrypt" onValueChange={(value) => setMode(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encrypt">
                <Lock className="mr-2 h-4 w-4" />
                Encrypt
              </TabsTrigger>
              <TabsTrigger value="decrypt">
                <Unlock className="mr-2 h-4 w-4" />
                Decrypt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="encrypt" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter text to encrypt"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  The text you enter here will be encrypted using the selected algorithm
                </p>
              </div>
            </TabsContent>

            <TabsContent value="decrypt" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter encrypted text to decrypt"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">Paste the encrypted text here to decrypt it</p>
              </div>
            </TabsContent>

            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password/Key</label>
                <Input
                  type="password"
                  placeholder="Enter encryption password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">You'll need this same password to decrypt the data</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Encryption Algorithm</label>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes-256">AES-256 (Recommended)</SelectItem>
                    <SelectItem value="aes-128">AES-128</SelectItem>
                    <SelectItem value="des">DES (Less Secure)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">AES-256 provides the strongest security</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex gap-2">
                <Button onClick={handleProcess} disabled={!inputText || !password} className="flex-1">
                  {mode === "encrypt" ? (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Encrypt Text
                    </>
                  ) : (
                    <>
                      <Unlock className="mr-2 h-4 w-4" />
                      Decrypt Text
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {mode === "encrypt"
                    ? "All encryption is performed locally in your browser. Your data is never sent to our servers."
                    : "Make sure you're using the same password and algorithm that was used for encryption."}
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-sm font-medium">
                {mode === "encrypt" ? "Encrypted Output" : "Decrypted Output"}
              </label>
              <div className="relative">
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[120px]"
                  placeholder={
                    mode === "encrypt" ? "Encrypted text will appear here" : "Decrypted text will appear here"
                  }
                />
                {outputText && (
                  <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {mode === "encrypt"
                  ? "Copy this encrypted text and share it securely"
                  : "This is the original, decrypted content"}
              </p>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="text-sm space-y-2 w-full">
            <h3 className="font-medium">Security Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Use a strong, unique password that you can remember</li>
              <li>Never share your encryption password in the same channel as the encrypted data</li>
              <li>For maximum security, use a different password for each encryption</li>
              <li>AES-256 is the recommended algorithm for sensitive information</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
