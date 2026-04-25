"use client";
import type { KPIs } from "@/lib/types";

interface Props { kpis: KPIs }

function fmt(n: number) {
  if (n >= 1_000_000) return `KES ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `KES ${(n / 1_000).toFixed(1)}K`;
  return `KES ${n}`;
}

export default function KpiCards({ kpis }: Props) {
  const cards = [
    { label: "Revenue Received", value: fmt(kpis.total_received), sub: `Ordered: ${fmt(kpis.total_ordered)}`, accent: "text-[#1A376C]" },
    { label: "Revenue Shortfall", value: fmt(kpis.shortfall), sub: "22.6% of total orders unfulfilled", accent: "text-red-600" },
    { label: "Overall Fill Rate", value: `${kpis.fill_rate}%`, sub: "Cyka Fresh: 93.2%", accent: kpis.fill_rate < 85 ? "text-red-600" : "text-emerald-600" },
    { label: "Unique Products", value: kpis.unique_products.toString(), sub: "155 SKUs across 2 warehouses", accent: "text-[#1A376C]" },
    { label: "Total POs", value: kpis.total_pos.toString(), sub: `${kpis.total_line_items.toLocaleString()} line items`, accent: "text-[#1A376C]" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-1">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{c.label}</p>
          <p className={`text-2xl font-bold ${c.accent}`}>{c.value}</p>
          <p className="text-xs text-slate-400">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
