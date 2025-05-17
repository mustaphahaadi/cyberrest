"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Type, Palette, Monitor } from "lucide-react"

export function AccessibilitySettings() {
  const { theme, setTheme, fontSize, setFontSize, colorAccent, setColorAccent, contrastLevel, setContrastLevel } =
    useTheme()

  const [motionReduced, setMotionReduced] = useState(false)
  const [focusHighlight, setFocusHighlight] = useState(true)
  const [lineSpacing, setLineSpacing] = useState(1.5)

  const handleMotionChange = (checked) => {
    setMotionReduced(checked)
    document.documentElement.classList.toggle("reduce-motion", checked)
  }

  const handleFocusChange = (checked) => {
    setFocusHighlight(checked)
    document.documentElement.classList.toggle("enhanced-focus", checked)
  }

  const handleLineSpacingChange = (value) => {
    setLineSpacing(value[0])
    document.documentElement.style.setProperty("--line-height-multiplier", value[0])
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Accessibility & Display Settings</CardTitle>
        <CardDescription>Customize how CyberRest looks and works for you</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theme">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="theme">
              <Monitor className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="text">
              <Type className="h-4 w-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger value="color">
              <Palette className="h-4 w-4 mr-2" />
              Color
            </TabsTrigger>
            <TabsTrigger value="motion">
              <Eye className="h-4 w-4 mr-2" />
              Vision
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Theme Preference</h3>
              <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="light" id="light" className="peer sr-only" />
                  <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-border p-2 w-full bg-background mb-2">
                      <div className="h-5 w-full rounded-sm bg-primary/20"></div>
                      <div className="mt-1 h-3 w-full rounded-sm bg-muted"></div>
                      <div className="mt-1 h-3 w-3/4 rounded-sm bg-muted"></div>
                    </div>
                    Light
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                  <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-border p-2 w-full bg-gray-950 mb-2">
                      <div className="h-5 w-full rounded-sm bg-blue-500/30"></div>
                      <div className="mt-1 h-3 w-full rounded-sm bg-gray-800"></div>
                      <div className="mt-1 h-3 w-3/4 rounded-sm bg-gray-800"></div>
                    </div>
                    Dark
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="system" id="system" className="peer sr-only" />
                  <Label
                    htmlFor="system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-border p-2 w-full bg-gradient-to-r from-background to-gray-950 mb-2">
                      <div className="h-5 w-full rounded-sm bg-gradient-to-r from-primary/20 to-blue-500/30"></div>
                      <div className="mt-1 h-3 w-full rounded-sm bg-gradient-to-r from-muted to-gray-800"></div>
                      <div className="mt-1 h-3 w-3/4 rounded-sm bg-gradient-to-r from-muted to-gray-800"></div>
                    </div>
                    System
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="highContrast" id="highContrast" className="peer sr-only" />
                  <Label
                    htmlFor="highContrast"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="rounded-md border border-black p-2 w-full bg-white mb-2">
                      <div className="h-5 w-full rounded-sm bg-blue-700"></div>
                      <div className="mt-1 h-3 w-full rounded-sm bg-black"></div>
                      <div className="mt-1 h-3 w-3/4 rounded-sm bg-black"></div>
                    </div>
                    High Contrast
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Font Size</h3>
              <RadioGroup value={fontSize} onValueChange={setFontSize} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="small" id="small" className="peer sr-only" />
                  <Label
                    htmlFor="small"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-sm">Aa</span>
                    <span className="text-xs mt-2">Small</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                  <Label
                    htmlFor="medium"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-base">Aa</span>
                    <span className="text-xs mt-2">Medium</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="large" id="large" className="peer sr-only" />
                  <Label
                    htmlFor="large"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-lg">Aa</span>
                    <span className="text-xs mt-2">Large</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Line Spacing</h3>
              <p className="text-sm text-muted-foreground mb-4">Adjust the space between lines of text</p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span>Compact</span>
                  <span>Spacious</span>
                </div>
                <Slider
                  defaultValue={[lineSpacing]}
                  max={2}
                  min={1}
                  step={0.1}
                  onValueChange={handleLineSpacingChange}
                />
                <div className="p-4 border rounded-md">
                  <p style={{ lineHeight: `${lineSpacing}em` }} className="text-sm">
                    This is a preview of how your text will look with the current line spacing settings. Proper line
                    spacing can make text easier to read, especially for longer periods of time.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="color" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Color Accent</h3>
              <RadioGroup
                value={colorAccent}
                onValueChange={setColorAccent}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div>
                  <RadioGroupItem value="blue" id="blue" className="peer sr-only" />
                  <Label
                    htmlFor="blue"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 mb-2"></div>
                    Blue
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="green" id="green" className="peer sr-only" />
                  <Label
                    htmlFor="green"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-600 mb-2"></div>
                    Green
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="purple" id="purple" className="peer sr-only" />
                  <Label
                    htmlFor="purple"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 mb-2"></div>
                    Purple
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="orange" id="orange" className="peer sr-only" />
                  <Label
                    htmlFor="orange"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-600 mb-2"></div>
                    Orange
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Contrast Level</h3>
              <RadioGroup value={contrastLevel} onValueChange={setContrastLevel} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="low" id="low-contrast" className="peer sr-only" />
                  <Label
                    htmlFor="low-contrast"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex gap-1 mb-2">
                      <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                    </div>
                    Low
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="normal" id="normal-contrast" className="peer sr-only" />
                  <Label
                    htmlFor="normal-contrast"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex gap-1 mb-2">
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                    </div>
                    Normal
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="high" id="high-contrast" className="peer sr-only" />
                  <Label
                    htmlFor="high-contrast"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex gap-1 mb-2">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                      <div className="w-4 h-4 rounded-full bg-black"></div>
                    </div>
                    High
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="motion" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduce-motion" className="text-base font-medium">
                    Reduce Motion
                  </Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch id="reduce-motion" checked={motionReduced} onCheckedChange={handleMotionChange} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="focus-highlight" className="text-base font-medium">
                    Enhanced Focus Indicators
                  </Label>
                  <p className="text-sm text-muted-foreground">Make focus outlines more visible</p>
                </div>
                <Switch id="focus-highlight" checked={focusHighlight} onCheckedChange={handleFocusChange} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dyslexia-font" className="text-base font-medium">
                    Dyslexia-Friendly Font
                  </Label>
                  <p className="text-sm text-muted-foreground">Use a font designed for readers with dyslexia</p>
                </div>
                <Switch
                  id="dyslexia-font"
                  onCheckedChange={(checked) => {
                    document.documentElement.classList.toggle("dyslexia-font", checked)
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
