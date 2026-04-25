"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { WarehouseTrend } from "@/lib/types";

interface Props { data: WarehouseTrend[] }

export default function WarehouseRevenueChart({ data }: Props) {
  const periods = ["Early", "Mid", "Late"];
  const warehouses = [...new Set(data.map(d => d.warehouse_name))];
  const colors = ["#1A376C", "#E84C4C"];

  const chartData = periods.map(period => {
    const entry: Record<string, string | number> = { period };
    warehouses.forEach(wh => {
      const row = data.find(d => d.period === period && d.warehouse_name === wh);
      entry[wh] = row ? Math.round(row.revenue / 1000) : 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="period" tick={{ fontSize: 12 }} />
        <YAxis unit="K" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => `KES ${Number(v).toLocaleString()}K`} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {warehouses.map((wh, i) => (
          <Line key={wh} type="monotone" dataKey={wh} stroke={colors[i]} strokeWidth={2.5}
            dot={{ r: 5 }} activeDot={{ r: 7 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
