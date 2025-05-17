"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  return useContext(ThemeContext)
}

// Theme definitions with CSS variables
const themes = {
  light: {
    "--background": "0 0% 100%",
    "--foreground": "222.2 84% 4.9%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 84% 4.9%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "222.2 47.4% 11.2%",
    "--primary": "221.2 83.2% 53.3%",
    "--primary-foreground": "210 40% 98%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "215.4 16.3% 46.9%",
    "--accent": "210 40% 96.1%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "214.3 31.8% 91.4%",
    "--input": "214.3 31.8% 91.4%",
    "--ring": "221.2 83.2% 53.3%",
  },
  dark: {
    "--background": "222.2 84% 4.9%",
    "--foreground": "210 40% 98%",
    "--card": "222.2 84% 4.9%",
    "--card-foreground": "210 40% 98%",
    "--popover": "222.2 84% 4.9%",
    "--popover-foreground": "210 40% 98%",
    "--primary": "217.2 91.2% 59.8%",
    "--primary-foreground": "222.2 47.4% 11.2%",
    "--secondary": "217.2 32.6% 17.5%",
    "--secondary-foreground": "210 40% 98%",
    "--muted": "217.2 32.6% 17.5%",
    "--muted-foreground": "215 20.2% 65.1%",
    "--accent": "217.2 32.6% 17.5%",
    "--accent-foreground": "210 40% 98%",
    "--destructive": "0 62.8% 30.6%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "217.2 32.6% 17.5%",
    "--input": "217.2 32.6% 17.5%",
    "--ring": "224.3 76.3% 48%",
  },
  highContrast: {
    "--background": "0 0% 100%",
    "--foreground": "0 0% 0%",
    "--card": "0 0% 100%",
    "--card-foreground": "0 0% 0%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "0 0% 0%",
    "--primary": "226 100% 50%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "0 0% 90%",
    "--secondary-foreground": "0 0% 0%",
    "--muted": "0 0% 96%",
    "--muted-foreground": "0 0% 0%",
    "--accent": "226 100% 50%",
    "--accent-foreground": "0 0% 100%",
    "--destructive": "0 100% 50%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "0 0% 0%",
    "--input": "0 0% 0%",
    "--ring": "226 100% 50%",
  },
  nightShift: {
    "--background": "30 20% 10%",
    "--foreground": "35 40% 90%",
    "--card": "30 20% 10%",
    "--card-foreground": "35 40% 90%",
    "--popover": "30 20% 10%",
    "--popover-foreground": "35 40% 90%",
    "--primary": "35 80% 50%",
    "--primary-foreground": "35 40% 10%",
    "--secondary": "30 30% 15%",
    "--secondary-foreground": "35 40% 90%",
    "--muted": "30 30% 15%",
    "--muted-foreground": "35 30% 70%",
    "--accent": "30 30% 15%",
    "--accent-foreground": "35 40% 90%",
    "--destructive": "10 80% 50%",
    "--destructive-foreground": "35 40% 90%",
    "--border": "30 30% 20%",
    "--input": "30 30% 20%",
    "--ring": "35 80% 50%",
  },
  terminal: {
    "--background": "0 0% 10%",
    "--foreground": "120 100% 70%",
    "--card": "0 0% 15%",
    "--card-foreground": "120 100% 70%",
    "--popover": "0 0% 10%",
    "--popover-foreground": "120 100% 70%",
    "--primary": "120 100% 40%",
    "--primary-foreground": "0 0% 0%",
    "--secondary": "0 0% 20%",
    "--secondary-foreground": "120 100% 70%",
    "--muted": "0 0% 20%",
    "--muted-foreground": "120 60% 60%",
    "--accent": "0 0% 20%",
    "--accent-foreground": "120 100% 70%",
    "--destructive": "0 100% 50%",
    "--destructive-foreground": "0 0% 0%",
    "--border": "120 100% 30%",
    "--input": "120 100% 30%",
    "--ring": "120 100% 40%",
  },
}

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme-preference" }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storageKey])

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", isDark)
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = { theme, setTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
