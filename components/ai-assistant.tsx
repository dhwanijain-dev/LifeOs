"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your LifeOS assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    if (isMinimized) setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'm your LifeOS assistant. I've received your message: "${input}". How else can I assist you?`,
        },
      ])
    }, 1000)

    setInput("")
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleOpen}
        className={cn(
          "fixed bottom-14 right-6 z-40 p-3 rounded-full",
          "bg-gradient-to-r from-purple-500 to-cyan-500",
          "shadow-lg shadow-purple-500/20",
          "text-white",
        )}
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      {/* Assistant Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "auto" : "70vh",
              width: isMinimized ? "300px" : "400px",
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed bottom-20 right-6 z-40 overflow-hidden",
              "rounded-2xl flex flex-col",
              "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
              "border border-white/20 dark:border-white/10",
              "shadow-2xl shadow-black/10 dark:shadow-white/5",
            )}
          >
            {/* Chat Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium">LifeOS Assistant</h3>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={toggleMinimize} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button onClick={toggleOpen} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mb-4 max-w-[80%] p-3 rounded-2xl",
                      message.role === "user" ? "ml-auto bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-800",
                    )}
                  >
                    {message.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat Input */}
            {!isMinimized && (
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  >
                    Send
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
