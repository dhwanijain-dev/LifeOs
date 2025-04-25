"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, AlertCircle, ShieldAlert } from "lucide-react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

interface LockScreenProps {
    onUnlock: () => void
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
    const [pin, setPin] = useState<string[]>(["", "", "", ""])
    const [error, setError] = useState(false)
    const [time, setTime] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [particlesLoaded, setParticlesLoaded] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

 
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
            setParticlesLoaded(true)
        })
    }, [])

 
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
            setDate(now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    const handlePinChange = (index: number, value: string) => {
        if (error) setError(false)

       
        if (value && !/^\d+$/.test(value)) return

        const newPin = [...pin]
        newPin[index] = value
        setPin(newPin)

        
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }

        
        if (newPin.every((digit) => digit !== "") && index === 3) {
            validatePin(newPin.join(""))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const validatePin = (enteredPin: string) => {
        if (enteredPin === "1234") {
             
            setTimeout(() => {
                onUnlock()
            }, 500)
        } else {
            setAttempts((prev) => prev + 1)
            setError(true)
             
            setPin(["", "", "", ""])
            setTimeout(() => {
                inputRefs.current[0]?.focus()
            }, 300)
        }
    }

    const particlesOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: "#ffffff",
            },
            opacity: {
                value: 0.3,
                random: true,
            },
            size: {
                value: 2,
                random: true,
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.1,
                width: 1,
            },
        },
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
             
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black">
                {particlesLoaded && <Particles id="tsparticles" options={particlesOptions as any} />}
            </div>

             
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

            
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-white text-7xl font-light tracking-tight mb-2">{time}</h1>
                    <div className="flex items-center justify-center text-gray-300 text-lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{date}</span>
                    </div>
                </motion.div>

                
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3,
                    }}
                    className="mb-8"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <ShieldAlert className="w-10 h-10 text-white" />
                    </div>
                </motion.div>

                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-xl mb-8">
                    Enter PIN to unlock
                </motion.h2>

                 
                <div className="flex gap-4 mb-6">
                    {pin.map((digit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="relative"
                        >
                            <input
                                ref={(el: any) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e: any) => handlePinChange(index, e.target.value)}
                                onKeyDown={(e: any) => handleKeyDown(index, e)}
                                className={`w-14 h-14 text-center text-xl bg-white/10 backdrop-blur-md border-2 
                  ${error ? "border-red-500" : "border-white/30"} 
                  rounded-xl text-white outline-none focus:border-blue-500 transition-all`}
                            />
                            {digit && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-4 h-4 rounded-full bg-white/80" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center text-red-400 mb-4"
                        >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            <span>Incorrect PIN. {attempts > 1 ? `${attempts} failed attempts.` : ""}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1 }}
                    className="text-gray-400 text-sm mt-4"
                >
                    Hint: 1234
                </motion.p>
            </div>
        </div>
    )
}
