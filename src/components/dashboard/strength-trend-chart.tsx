"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { strengthTrendData } from "@/lib/data"
import type { ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  weight: {
    label: "Weight (kg)",
  },
  "Bench Press": {
    label: "Bench Press",
    color: "hsl(var(--chart-1))",
  },
  "Squat": {
    label: "Squat",
    color: "hsl(var(--chart-2))",
  },
  "Deadlift": {
    label: "Deadlift",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function StrengthTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strength Trends</CardTitle>
        <CardDescription>Your lifting progress over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={strengthTrendData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value} kg`}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line
              dataKey="Bench Press"
              type="monotone"
              stroke="var(--color-Bench-Press)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Squat"
              type="monotone"
              stroke="var(--color-Squat)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Deadlift"
              type="monotone"
              stroke="var(--color-Deadlift)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
