"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { PricingComparison } from "@/lib/types";

interface Props { data: PricingComparison[] }

export default function PricingComparisonChart({ data }: Props) {
  const chartData = data.map(d => ({
    name: d.product_name.length > 20 ? d.product_name.slice(0, 18) + "…" : d.product_name,
    "Prism Origin": d.prism_price,
    "Cyka Fresh": d.cyka_price,
    full: d.product_name,
    diff: d.diff_pct,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 50, left: 160, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis type="number" unit=" KES" tick={{ fontSize: 11 }} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={155} />
        <Tooltip
          formatter={(v, name, p) => [`KES ${v}  (diff: ${p.payload.diff > 0 ? "+" : ""}${p.payload.diff}%)`, name]}
          labelFormatter={(_, p) => p?.[0]?.payload?.full ?? ""}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="Prism Origin" fill="#1A376C" radius={[0, 0, 0, 0]} />
        <Bar dataKey="Cyka Fresh"   fill="#E84C4C" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
