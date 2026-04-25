"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { GrowingProduct } from "@/lib/types";

interface Props { data: GrowingProduct[] }

export default function GrowingProductsChart({ data }: Props) {
  const chartData = [...data]
    .sort((a, b) => b.growth_pct - a.growth_pct)
    .map(d => ({
      name: d.product_name.length > 22 ? d.product_name.slice(0, 20) + "…" : d.product_name,
      growth: d.growth_pct,
      full: d.product_name,
      late_rev: d.late_rev,
    }));

  const colors = ["#1A376C", "#2E6DB5", "#4A8FD4", "#6AAEE0", "#8BC5E8",
                  "#A8D5F0", "#C0E2F7", "#D5EDFA", "#E5F4FC", "#F0F8FE"];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 50, left: 140, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={135} />
        <Tooltip
          formatter={(v, _, p) => [`+${v}%  (Late rev: KES ${p.payload.late_rev?.toLocaleString()})`, "Growth"]}
          labelFormatter={(_, p) => p?.[0]?.payload?.full ?? ""}
        />
        <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
          {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
