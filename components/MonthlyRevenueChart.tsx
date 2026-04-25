"use client";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { MonthlyTrend } from "@/lib/types";

interface Props { data: MonthlyTrend[] }

export default function MonthlyRevenueChart({ data }: Props) {
  const chartData = data.map(d => ({
    month: d.month.slice(0, 7),
    "Revenue Received": Math.round(Number(d.revenue) / 1000),
    "Fill Rate %": Number(d.fill_rate),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={chartData} margin={{ top: 4, right: 40, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" interval={0} />
        <YAxis yAxisId="left" unit="K" tick={{ fontSize: 11 }} label={{ value: "KES (K)", angle: -90, position: "insideLeft", style: { fontSize: 10 } }} />
        <YAxis yAxisId="right" orientation="right" unit="%" domain={[50, 100]} tick={{ fontSize: 11 }} label={{ value: "Fill %", angle: 90, position: "insideRight", style: { fontSize: 10 } }} />
        <Tooltip
          formatter={(v, name) =>
            name === "Fill Rate %" ? `${v}%` : `KES ${Number(v).toLocaleString()}K`
          }
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar yAxisId="left" dataKey="Revenue Received" fill="#1A376C" radius={[3, 3, 0, 0]} opacity={0.85} />
        <Line yAxisId="right" type="monotone" dataKey="Fill Rate %" stroke="#E84C4C" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
