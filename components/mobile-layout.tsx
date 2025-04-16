"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useAppContext } from "@/components/app-provider"
import AppIcon from "@/components/app-icon"
import { X, ChevronDown } from "lucide-react"

export default function MobileLayout() {
  const { apps, openApp, closeApp, openApps } = useAppContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const dragY = useMotionValue(0)
  const dragOpacity = useTransform(dragY, [0, -100], [0, 1])
  const dragScale = useTransform(dragY, [0, -100], [0.9, 1])

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -50) {
      setIsDrawerOpen(true)
    } else {
      setIsDrawerOpen(false)
    }
  }

  return (
    <div className="pt-12 w-full h-full">
      {/* Home Screen */}
      <div className="w-full h-full flex flex-col">
        {/* Current App */}
        {openApps.length > 0 ? (
          <AppScreen app={openApps[openApps.length - 1]} onClose={() => closeApp(openApps[openApps.length - 1].id)} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Welcome to LifeOS
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Swipe up to access your apps</p>
            </motion.div>
          </div>
        )}

        {/* App Drawer Handle */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ y: dragY }}
          className="h-12 w-full flex items-center justify-center"
        >
          <div className="w-16 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        </motion.div>
      </div>

      {/* App Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-30 pt-12"
          >
            <div className="w-full h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-t-3xl overflow-hidden flex flex-col">
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold">Apps</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-auto">
                <div className="grid grid-cols-4 gap-6">
                  {apps.map((app) => (
                    <AppIcon
                      key={app.id}
                      icon={app.icon}
                      name={app.name}
                      onClick={() => {
                        openApp(app.id)
                        setIsDrawerOpen(false)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AppScreen({ app, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col"
    >
      {/* App Header */}
      <div className="h-12 flex items-center justify-between px-4 bg-white/20 dark:bg-black/20">
        <div className="flex items-center space-x-2">
          <span className={`h-3 w-3 rounded-full bg-${app.color}-500`}></span>
          <span className="text-sm font-medium">{app.name}</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 dark:hover:bg-black/20">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* App Content */}
      <div className="flex-1 p-4 overflow-auto">{app.content}</div>
    </motion.div>
  )
}
