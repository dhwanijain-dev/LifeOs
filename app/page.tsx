"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import SystemBar from "@/components/system-bar"
import DesktopLayout from "@/components/desktop-layout"
import MobileLayout from "@/components/mobile-layout"
import BackgroundShader from "@/components/background-shader"
import AIAssistant from "@/components/ai-assistant"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/components/app-provider"

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider>
      <AppProvider>
        <div className="relative w-full h-screen overflow-hidden">
          <BackgroundShader />

          <div className="relative z-10 w-full h-full">
            <SystemBar />

            {isMobile ? <MobileLayout /> : <DesktopLayout />}

            <AIAssistant />
          </div>
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}
