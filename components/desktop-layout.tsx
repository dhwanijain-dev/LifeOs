"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rnd } from "react-rnd"
import { useAppContext } from "@/components/app-provider"
import AppIcon from "@/components/app-icon"
import { X, Minus, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Define types for App and AppWindowProps
interface App {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  content: React.ReactNode
}

interface AppWindowProps {
  app: App
  onClose: () => void
}

export default function DesktopLayout() {
  const { apps, openApp, closeApp, openApps } = useAppContext()

  return (
    <div className="pt-12 w-full h-full">
      {/* Desktop Icons */}
      <div className="grid grid-cols-6 gap-4 p-6">
        {apps.map((app: App) => (
          <AppIcon key={app.id} icon={app.icon} name={app.name} onClick={() => openApp(app.id)} />
        ))}
      </div>

      {/* App Windows */}
      <AnimatePresence>
        {openApps.map((app: App) => (
          <AppWindow key={app.id} app={app} onClose={() => closeApp(app.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function AppWindow({ app, onClose }: AppWindowProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(false)
  const [isMaximized, setIsMaximized] = useState<boolean>(false)

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  if (isMinimized) return null

  return (
    <Rnd
      default={{
        x: 100 + (app.id.charCodeAt(0) % 5) * 30,
        y: 100 + (app.id.charCodeAt(0) % 5) * 30,
        width: isMaximized ? window.innerWidth - 20 : 600,
        height: isMaximized ? window.innerHeight - 80 : 400,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      style={{ zIndex: 20 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "w-full h-full rounded-lg overflow-hidden flex flex-col",
          "backdrop-blur-xl bg-white/30 dark:bg-gray-900/40",
          "border border-white/20 dark:border-white/10",
          "shadow-xl shadow-black/5 dark:shadow-white/5",
        )}
      >
        {/* Window Title Bar */}
        <div className="h-10 flex items-center justify-between px-4 bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full bg-${app.color}-500`}></span>
            <span className="text-sm font-medium">{app.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleMinimize} className="p-1 rounded-full hover:bg-white/20 dark:hover:bg-black/20">
              <Minus className="h-4 w-4" />
            </button>
            <button onClick={handleMaximize} className="p-1 rounded-full hover:bg-white/20 dark:hover:bg-black/20">
              <Maximize2 className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 dark:hover:bg-black/20">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 p-4 overflow-auto">{app.content}</div>
      </motion.div>
    </Rnd>
  )
}