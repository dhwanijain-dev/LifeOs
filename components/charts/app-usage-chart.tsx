"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Notes", value: 35, color: "#eab308" },
  { name: "Calendar", value: 25, color: "#3b82f6" },
  { name: "Mail", value: 15, color: "#ef4444" },
  { name: "Music", value: 10, color: "#ec4899" },
  { name: "Gallery", value: 8, color: "#22c55e" },
  { name: "Other", value: 7, color: "#6b7280" },
]

export function AppUsageChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">App</span>
                      <span className="font-bold text-xs">{payload[0].name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Usage</span>
                      <span className="font-bold text-xs">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
