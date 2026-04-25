"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { MarketShareMonthly } from "@/lib/types";

const SUPPLIERS = [
  { key: "Prism Origin Ltd",                 color: "#1A376C" },
  { key: "Cyka Fresh Limited",               color: "#E84C4C" },
  { key: "FARM TO FEED KENYA",               color: "#F59E0B" },
  { key: "AAA Growers",                      color: "#10B981" },
  { key: "Evergreen Fresh Distribution Ltd", color: "#6366F1" },
];

interface Props { data: MarketShareMonthly[] }

export default function MarketShareChart({ data }: Props) {
  const months = [...new Set(data.map(d => d.month))].sort();
  const chartData = months.map(month => {
    const entry: Record<string, string | number> = { month: month.slice(0, 7) };
    SUPPLIERS.forEach(s => {
      const row = data.find(d => d.month === month && d.supplier === s.key);
      entry[s.key] = row ? row.share : 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" interval={1} />
        <YAxis unit="%" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ fontSize: 10 }} />
        {SUPPLIERS.map(s => (
          <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color}
            strokeWidth={s.key === "Prism Origin Ltd" ? 3 : 1.5}
            dot={false} activeDot={{ r: 4 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
