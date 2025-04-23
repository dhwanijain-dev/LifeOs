"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Calendar, FileText, BarChart3, Settings, Music, ImageIcon, Mail, Clock,  FileImage } from "lucide-react"
import { WeeklyActivityChart } from "./charts/weekly-activity-chart"
import { AppUsageChart } from "./charts/app-usage-chart"
import { ScreenTimeChart } from "./charts/screen-time-chart"
 
// Define app types
interface App {
  id: string
  name: string
  icon: ReactNode
  color: string
  content: ReactNode
  
}

// Create context
interface AppContextType {
  apps: App[]
  openApps: App[]
  openApp: (id: string) => void
  closeApp: (id: string) => void
  wallpaper: string // Wallpaper state
  setWallpaper: (wallpaper: string) => void // Function to update wallpaper
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Define apps

 

  
  const [wallpaper, setWallpaper] = useState<string>("default");
  const appsList: App[] = [
    {
      id: "calendar",
      name: "Calendar",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      color: "blue",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-sm p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
              <div key={date} className="text-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                {date}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "notes",
      name: "Notes",
      icon: <FileText className="h-6 w-6 text-yellow-500" />,
      color: "yellow",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Notes</h2>
          <textarea
            className="flex-1 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Write your notes here..."
          />
        </div>
      ),
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      color: "purple",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Daily Screen Time</h3>
              <div className="text-2xl font-bold">6h 42m</div>
              <div className="text-xs text-green-500 font-medium mt-1">↓ 12% from yesterday</div>
              <div className="h-32 mt-2">
                <ScreenTimeChart />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">App Usage</h3>
              <div className="text-2xl font-bold">12 apps</div>
              <div className="text-xs text-purple-500 font-medium mt-1">Most used: Notes</div>
              <div className="h-32 mt-2">
                <AppUsageChart />
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Weekly Activity</h3>
              <select className="text-xs bg-white/50 dark:bg-gray-700/50 rounded-md border-0 p-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-48">
              <WeeklyActivityChart />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Notifications</h3>
              <div className="text-xl font-bold mt-1">247</div>
              <div className="text-xs text-red-500 mt-1">↑ 24%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Focus Time</h3>
              <div className="text-xl font-bold mt-1">3h 12m</div>
              <div className="text-xs text-green-500 mt-1">↑ 18%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Pickups</h3>
              <div className="text-xl font-bold mt-1">52</div>
              <div className="text-xs text-green-500 mt-1">↓ 8%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 shadow-sm">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Productivity</h3>
              <div className="text-xl font-bold mt-1">87%</div>
              <div className="text-xs text-green-500 mt-1">↑ 5%</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="h-6 w-6 text-gray-500" />,
      color: "gray",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <h3 className="font-medium mb-2">Display</h3>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                  <div className="absolute top-0.5 left-0.5 dark:left-5 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <h3 className="font-medium mb-2">Notifications</h3>
              <div className="flex items-center justify-between">
                <span>Enable Notifications</span>
                <div className="w-10 h-5 bg-purple-500 rounded-full relative">
                  <div className="absolute top-0.5 left-5 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "music",
      name: "Music",
      icon: <Music className="h-6 w-6 text-pink-500" />,
      color: "pink",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Music Player</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Music className="h-16 w-16 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Cosmic Harmony</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Future Beats</p>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <button className="p-2 rounded-full bg-white/20 dark:bg-black/20">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12L5 21V3L19 12Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "gallery",
      name: "Gallery",
      icon: <ImageIcon className="h-6 w-6 text-green-500" />,
      color: "green",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center"
              >
                <ImageIcon className="h-10 w-10 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "mail",
      name: "Mail",
      icon: <Mail className="h-6 w-6 text-red-500" />,
      color: "red",
      content: (
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Mail</h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Subject Line {index + 1}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {index === 0 ? "Just now" : index === 1 ? "Yesterday" : "Last week"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "clock",
      name: "Clock",
      icon: <Clock className="h-6 w-6 text-cyan-500" />,
      color: "cyan",
      content: (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold mb-4">{new Date().toLocaleTimeString()}</div>
            <div className="text-lg">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "wallpaper",
      name: "Wallpaper",
      icon: <FileImage className="h-6 w-6 text-cyan-500" />,
      color: "cyan",
      content: (
        <div className="h-full flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Choose a Wallpaper</h2>
          <div className="grid grid-cols-3 gap-4">
            {["default", "shader1", "shader2", "shader3","shader4","shader5"].map((shader) => (
              <div
                key={shader}
                className="w-24 h-24 rounded-lg cursor-pointer bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-cyan-500"
                onClick={() => setWallpaper(shader)}
              >
                <span className="text-sm font-medium capitalize">{shader}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  const [openApps, setOpenApps] = useState<App[]>([])

  const openApp = (id: string) => {
    const app = appsList.find((app) => app.id === id)
    if (!app) return

    // Check if app is already open
    if (openApps.some((a) => a.id === id)) {
      // Bring to front by removing and adding to end
      setOpenApps((prev) => [...prev.filter((a) => a.id !== id), app])
    } else {
      // Add new app
      setOpenApps((prev) => [...prev, app])
    }
  }

  const closeApp = (id: string) => {
    setOpenApps((prev) => prev.filter((app) => app.id !== id))
  }

  return (
    <AppContext.Provider
      value={{ apps: appsList, openApps, wallpaper, setWallpaper, openApp, closeApp   }}
    >
      {children}
    </AppContext.Provider>
  ); 
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
