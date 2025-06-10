"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Check, Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ""
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }

    if (charset === "") {
      // If no character set is selected, default to lowercase
      charset = "abcdefghijklmnopqrstuvwxyz"
    }

    let newPassword = ""
    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(newPassword)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate a password on initial render
  useEffect(() => {
    if (password === "") {
      generatePassword()
    }
  }, [password])

  const getPasswordStrength = () => {
    const characterTypes = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length
    
    if (passwordLength >= 12 && characterTypes >= 3) return { text: "Strong", color: "text-green-500" }
    if (passwordLength >= 8 && characterTypes >= 2) return { text: "Moderate", color: "text-yellow-500" }
    return { text: "Weak", color: "text-red-500" }
  }

  const strength = getPasswordStrength()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Secure Password Generator</CardTitle>
          <CardDescription>Create strong, random passwords to keep your accounts safe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password-length" className="text-sm font-medium">
                Password Length: {passwordLength}
              </Label>
            </div>
            <Slider
              id="password-length"
              min={8}
              max={64}
              step={1}
              value={[passwordLength]}
              onValueChange={(value) => setPasswordLength(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>8</span>
              <span>36</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="include-uppercase" className="text-sm font-medium">
                Include Uppercase Letters
              </Label>
              <Switch
                id="include-uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="include-lowercase" className="text-sm font-medium">
                Include Lowercase Letters
              </Label>
              <Switch
                id="include-lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="include-numbers" className="text-sm font-medium">
                Include Numbers
              </Label>
              <Switch
                id="include-numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="include-symbols" className="text-sm font-medium">
                Include Symbols
              </Label>
              <Switch
                id="include-symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="exclude-similar" className="text-sm font-medium">
                Exclude Similar Characters (i, l, 1, L, o, 0, O)
              </Label>
              <Switch
                id="exclude-similar"
                checked={excludeSimilar}
                onCheckedChange={setExcludeSimilar}
              />
            </div>
          </div>

          <Button
            onClick={generatePassword}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Generated Password</CardTitle>
          <CardDescription>Copy this password and store it in a secure password manager</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input 
              value={password} 
              readOnly 
              className="pr-10 font-mono text-base" 
            />
            <Button 
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <div className="text-sm font-medium mb-2">Password Strength</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Length</span>
                <span className={passwordLength >= 12 ? "text-green-500" : "text-yellow-500"}>
                  {passwordLength} characters
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Character Types</span>
                <span
                  className={
                    [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length >= 3
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {[includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length}/4
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Overall Strength</span>
                <span className={strength.color}>
                  {strength.text}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={copyToClipboard}
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}