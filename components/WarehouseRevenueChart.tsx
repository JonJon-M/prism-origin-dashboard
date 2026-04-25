"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { WarehouseTrend } from "@/lib/types";

const PERIOD_LABELS: Record<string, string> = {
  "H1 2025": "H1 2025\n(Jan–Jun)",
  "H2 2025": "H2 2025\n(Jul–Dec)",
  "Q1/Q2 2026": "Q1/Q2 2026\n(Jan–Apr)",
};

interface Props { data: WarehouseTrend[] }

export default function WarehouseRevenueChart({ data }: Props) {
  const periods = ["H1 2025", "H2 2025", "Q1/Q2 2026"];
  const warehouses = [...new Set(data.map(d => d.warehouse_name))];
  const colors = ["#1A376C", "#E84C4C"];

  const chartData = periods.map(period => {
    const entry: Record<string, string | number> = { period: PERIOD_LABELS[period] ?? period };
    warehouses.forEach(wh => {
      const row = data.find(d => d.period === period && d.warehouse_name === wh);
      entry[wh] = row ? Math.round(row.revenue / 1000) : 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="period" tick={{ fontSize: 10 }} />
        <YAxis unit="K" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => `KES ${Number(v).toLocaleString()}K`} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {warehouses.map((wh, i) => (
          <Bar key={wh} dataKey={wh} fill={colors[i]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
