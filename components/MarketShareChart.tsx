"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { MarketShareEntry } from "@/lib/types";

const SUPPLIERS = [
  { key: "Prism Origin Ltd",              color: "#1A376C" },
  { key: "Cyka Fresh Limited",            color: "#E84C4C" },
  { key: "FARM TO FEED KENYA",            color: "#F59E0B" },
  { key: "AAA Growers",                   color: "#10B981" },
  { key: "Evergreen Fresh Distribution Ltd", color: "#6366F1" },
];

interface Props { data: MarketShareEntry[] }

export default function MarketShareChart({ data }: Props) {
  const periods = ["Early", "Mid", "Late"];
  const chartData = periods.map(period => {
    const entry: Record<string, string | number> = { period };
    SUPPLIERS.forEach(s => {
      const row = data.find(d => d.period === period && d.supplier === s.key);
      entry[s.key] = row ? row.share : 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="period" tick={{ fontSize: 12 }} />
        <YAxis unit="%" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {SUPPLIERS.map(s => (
          <Bar key={s.key} dataKey={s.key} stackId="a" fill={s.color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
