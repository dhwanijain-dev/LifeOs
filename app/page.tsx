"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import SystemBar from "@/components/system-bar"
import DesktopLayout from "@/components/desktop-layout"
import MobileLayout from "@/components/mobile-layout"
import AIAssistant from "@/components/ai-assistant"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/components/app-provider"
import BackgroundShader from "@/components/background-shader"
import ClickSpark from "@/components/ClickSpark"
import LockScreen from "@/components/lockscreen"

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider>
      <AppProvider>
        <div className="relative w-full h-screen overflow-hidden">
          <BackgroundShader />
          {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
          {unlocked && (
            <ClickSpark
              sparkColor="#fff"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <div className="relative z-10 w-full h-full">
                <SystemBar />
                {isMobile ? <MobileLayout /> : <DesktopLayout />}
                <AIAssistant />
              </div>
            </ClickSpark>
          )}
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}
