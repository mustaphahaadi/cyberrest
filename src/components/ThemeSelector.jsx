"use client"

import React from "react"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Check, Moon, Sun, Monitor, Eye, Laptop, Palette } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const THEME_PRESETS = {
  light: {
    name: "Light",
    icon: Sun,
    description: "Standard light theme",
  },
  dark: {
    name: "Dark",
    icon: Moon,
    description: "Standard dark theme",
  },
  system: {
    name: "System",
    icon: Monitor,
    description: "Follow system preference",
  },
  highContrast: {
    name: "High Contrast",
    icon: Eye,
    description: "Enhanced visibility",
  },
  nightShift: {
    name: "Night Shift",
    icon: Moon,
    description: "Reduced blue light",
  },
  terminal: {
    name: "Terminal",
    icon: Laptop,
    description: "Classic terminal look",
  },
}

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled className="w-9 h-9" />
  }

  const currentTheme = THEME_PRESETS[theme] || THEME_PRESETS.system

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <currentTheme.icon className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Change theme</p>
          </TooltipContent>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {Object.entries(THEME_PRESETS).map(([key, preset]) => (
                <DropdownMenuItem key={key} onClick={() => setTheme(key)} className="cursor-pointer">
                  <preset.icon className="mr-2 h-4 w-4" />
                  <span>{preset.name}</span>
                  {theme === key && <Check className="ml-auto h-4 w-4" />}
                  <span className="text-xs text-muted-foreground ml-auto mr-2">{preset.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 h-4 w-4" />
                <span>Customize</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Font Size</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Color Accent</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Contrast Level</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  )
}
