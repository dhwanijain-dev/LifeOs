"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AppIconProps {
  icon: React.ReactNode
  name: string
  onClick: () => void
}

export default function AppIcon({ icon, name, onClick }: AppIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center space-y-2"
    >
      <div
        className={cn(
          "w-16 h-16 flex items-center justify-center rounded-2xl",
          "backdrop-blur-md bg-white/20 dark:bg-gray-800/40",
          "border border-white/20 dark:border-white/10",
          "shadow-lg shadow-black/5 dark:shadow-white/5",
        )}
      >
        {icon}
      </div>
      <span className="text-xs font-medium text-center">{name}</span>
    </motion.button>
  )
}
