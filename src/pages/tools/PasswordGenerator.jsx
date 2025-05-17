"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Check, Copy } from "lucide-react"

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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="font-medium">Secure Password Generator</div>
          <div className="text-sm text-gray-500">Create strong, random passwords to keep your accounts safe</div>
        </div>
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password-length" className="text-sm font-medium">
                Password Length: {passwordLength}
              </label>
            </div>
            <input
              id="password-length"
              type="range"
              min="8"
              max="64"
              step="1"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number.parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>8</span>
              <span>36</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="include-uppercase" className="text-sm font-medium">
                Include Uppercase Letters
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="include-uppercase"
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className="sr-only"
                />
                <div
                  className={`block h-6 rounded-full ${includeUppercase ? "bg-blue-600" : "bg-gray-300"} w-10`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeUppercase ? "transform translate-x-4" : ""}`}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="include-lowercase" className="text-sm font-medium">
                Include Lowercase Letters
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="include-lowercase"
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className="sr-only"
                />
                <div
                  className={`block h-6 rounded-full ${includeLowercase ? "bg-blue-600" : "bg-gray-300"} w-10`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeLowercase ? "transform translate-x-4" : ""}`}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="include-numbers" className="text-sm font-medium">
                Include Numbers
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="include-numbers"
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className="sr-only"
                />
                <div className={`block h-6 rounded-full ${includeNumbers ? "bg-blue-600" : "bg-gray-300"} w-10`}></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeNumbers ? "transform translate-x-4" : ""}`}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="include-symbols" className="text-sm font-medium">
                Include Symbols
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="include-symbols"
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className="sr-only"
                />
                <div className={`block h-6 rounded-full ${includeSymbols ? "bg-blue-600" : "bg-gray-300"} w-10`}></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeSymbols ? "transform translate-x-4" : ""}`}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="exclude-similar" className="text-sm font-medium">
                Exclude Similar Characters (i, l, 1, L, o, 0, O)
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="exclude-similar"
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={() => setExcludeSimilar(!excludeSimilar)}
                  className="sr-only"
                />
                <div className={`block h-6 rounded-full ${excludeSimilar ? "bg-blue-600" : "bg-gray-300"} w-10`}></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${excludeSimilar ? "transform translate-x-4" : ""}`}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="font-medium">Your Generated Password</div>
          <div className="text-sm text-gray-500">Copy this password and store it in a secure password manager</div>
        </div>
        <div className="p-4 space-y-4">
          <div className="relative">
            <input value={password} readOnly className="w-full px-3 py-2 border rounded pr-10 font-mono text-base" />
            <button className="absolute right-0 top-0 h-full px-3" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <div className="text-sm font-medium">Password Strength</div>
            <div className="mt-2 space-y-2">
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
                    includeUppercase + includeLowercase + includeNumbers + includeSymbols >= 3
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {includeUppercase + includeLowercase + includeNumbers + includeSymbols}/4
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Overall Strength</span>
                <span
                  className={
                    passwordLength >= 12 && includeUppercase + includeLowercase + includeNumbers + includeSymbols >= 3
                      ? "text-green-500"
                      : passwordLength >= 8 &&
                          includeUppercase + includeLowercase + includeNumbers + includeSymbols >= 2
                        ? "text-yellow-500"
                        : "text-red-500"
                  }
                >
                  {passwordLength >= 12 && includeUppercase + includeLowercase + includeNumbers + includeSymbols >= 3
                    ? "Strong"
                    : passwordLength >= 8 && includeUppercase + includeLowercase + includeNumbers + includeSymbols >= 2
                      ? "Moderate"
                      : "Weak"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            className="w-full border border-gray-300 py-2 rounded flex items-center justify-center"
            onClick={copyToClipboard}
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  )
}
