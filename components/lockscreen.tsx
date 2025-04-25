// components/lock-screen.tsx
"use client"

import { useState } from "react"

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
    const [input, setInput] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input === "1234") {
            onUnlock()
        } else {
            setError(true)
            setInput("")
        }
    }

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4">
            <h1 className="text-white text-3xl mb-6">🔒 Enter Password to Unlock</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Password"
                    className="p-3 rounded bg-gray-800 text-white text-lg outline-none"
                />
                {error && <p className="text-red-500 text-sm">Incorrect Password</p>}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-lg"
                >
                    Unlock
                </button>
                <p className="text-gray-400 text-sm text-center">Password Hint: 1234</p>
            </form>
        </div>
    )
}
