"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, Bell, Settings } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SystemBar() {
  const { theme, setTheme } = useTheme()
  const [time, setTime] = useState(new Date())
  const [weather] = useState<{
    temp: number
    condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy"
  }>({ temp: 72, condition: "sunny" })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="h-5 w-5" />
      case "cloudy":
        return <Cloud className="h-5 w-5" />
      case "rainy":
        return <CloudRain className="h-5 w-5" />
      case "snowy":
        return <CloudSnow className="h-5 w-5" />
      case "stormy":
        return <CloudLightning className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 md:bottom-0 md:top-auto left-0 right-0 z-50 h-12 px-4 flex items-center justify-between backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/10 dark:border-white/5"
    >
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-lg font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent"
        >
          LifeOS
        </motion.div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          {getWeatherIcon()}
          <span className="text-sm">{weather.temp}°</span>
        </div>

        <div className="text-sm">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1 rounded-full hover:bg-white/10 dark:hover:bg-black/20"
        >
          {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.button>

        <motion.div whileHover={{ scale: 1.1 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-white/10  dark:hover:bg-black/20">
                <Bell className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20"
            >
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-white/10 dark:hover:bg-black/20">
                <Settings className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20"
            >
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>About LifeOS</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-0 rounded-full hover:bg-white/10 dark:hover:bg-black/20">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 backdrop-blur-md bg-white/80 dark:text-white   dark:bg-gray-900/80 border border-white/20"
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.div>
  )
}
