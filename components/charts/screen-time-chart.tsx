"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
  {
    name: "Mon",
    hours: 5.2,
  },
  {
    name: "Tue",
    hours: 4.8,
  },
  {
    name: "Wed",
    hours: 6.7,
  },
  {
    name: "Thu",
    hours: 5.9,
  },
  {
    name: "Fri",
    hours: 7.3,
  },
  {
    name: "Sat",
    hours: 8.1,
  },
  {
    name: "Sun",
    hours: 6.7,
  },
]

export function ScreenTimeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length && payload[0]?.payload) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                      <span className="font-bold text-xs">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Hours</span>
                      <span className="font-bold text-xs">{(payload[0].value as number)?.toFixed(1)}h</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="hours" radius={[4, 4, 0, 0]} className="fill-primary" fill="rgba(147, 51, 234, 0.8)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
