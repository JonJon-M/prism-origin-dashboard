"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { TopProduct } from "@/lib/types";

interface Props { data: TopProduct[] }

export default function TopProductsChart({ data }: Props) {
  const chartData = data.map(d => ({
    name: d.product_name.length > 22 ? d.product_name.slice(0, 20) + "…" : d.product_name,
    revenue: Math.round(d.revenue / 1000),
    full_name: d.product_name,
    avg_price: d.avg_price,
    qty: d.qty,
  }));

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 40, left: 180, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis type="number" unit="K" tick={{ fontSize: 11 }} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={175} />
        <Tooltip
          formatter={(v) => [`KES ${Number(v).toLocaleString()}K`, "Revenue"]}
          labelFormatter={(_, p) => p?.[0]?.payload?.full_name ?? ""}
        />
        <Bar dataKey="revenue" fill="#1A376C" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
