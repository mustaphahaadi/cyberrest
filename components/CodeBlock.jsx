"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Clipboard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-python"
import "prismjs/components/prism-json"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-sql"

// Import both light and dark themes
import "prismjs/themes/prism.css" // Light theme
import "prismjs/themes/prism-dark.css" // Dark theme

const CodeBlockProps = {
  code: "",
  language: "javascript",
  showLineNumbers: true,
  fileName: "",
  className: "",
}

export function CodeBlock({
  code,
  language = "javascript",
  showLineNumbers = true,
  fileName,
  className,
} = CodeBlockProps) {
  const { isDarkTheme } = useTheme()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Apply the appropriate theme class to the document
    if (isDarkTheme) {
      document.documentElement.classList.add("prism-dark")
      document.documentElement.classList.remove("prism-light")
    } else {
      document.documentElement.classList.add("prism-light")
      document.documentElement.classList.remove("prism-dark")
    }

    // Highlight all code blocks
    Prism.highlightAll()
  }, [isDarkTheme, code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-lg overflow-hidden", isDarkTheme ? "bg-gray-900" : "bg-gray-50", className)}>
      {fileName && (
        <div
          className={cn(
            "px-4 py-2 text-sm font-mono border-b",
            isDarkTheme ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-700",
          )}
        >
          {fileName}
        </div>
      )}
      <div className="relative">
        <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-8 w-8 p-0" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
        <pre className={cn("p-4 overflow-x-auto", showLineNumbers && "line-numbers")}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}
