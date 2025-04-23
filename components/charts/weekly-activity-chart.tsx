"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Mon",
    screenTime: 5.2,
    productivity: 72,
    focus: 3.1,
  },
  {
    date: "Tue",
    screenTime: 4.8,
    productivity: 68,
    focus: 2.8,
  },
  {
    date: "Wed",
    screenTime: 6.7,
    productivity: 65,
    focus: 2.5,
  },
  {
    date: "Thu",
    screenTime: 5.9,
    productivity: 78,
    focus: 3.5,
  },
  {
    date: "Fri",
    screenTime: 7.3,
    productivity: 82,
    focus: 4.2,
  },
  {
    date: "Sat",
    screenTime: 8.1,
    productivity: 76,
    focus: 3.8,
  },
  {
    date: "Sun",
    screenTime: 6.7,
    productivity: 84,
    focus: 4.5,
  },
]

export function WeeklyActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorScreenTime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                      <span className="font-bold text-xs">{payload[0].payload.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Screen Time</span>
                      <span className="font-bold text-xs">{payload[0].value}h</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Productivity</span>
                      <span className="font-bold text-xs">{payload[1].value}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Focus Time</span>
                      <span className="font-bold text-xs">{payload[2].value}h</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area type="monotone" dataKey="screenTime" stroke="#8884d8" fillOpacity={1} fill="url(#colorScreenTime)" />
        <Area type="monotone" dataKey="productivity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProductivity)" />
        <Area type="monotone" dataKey="focus" stroke="#ffc658" fillOpacity={1} fill="url(#colorFocus)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
