"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import type { FillRateEntry } from "@/lib/types";

interface Props { data: FillRateEntry[] }

export default function FillRateChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.fill_rate - a.fill_rate);
  const short = sorted.map(d => ({
    name: d.supplier_name.replace("Prism Origin Ltd", "Prism Origin").replace("Cyka Fresh Limited", "Cyka Fresh").replace("FARM TO FEED KENYA", "Farm to Feed").replace("Evergreen Fresh Distribution Ltd", "Evergreen").replace("AAA Growers", "AAA Growers").replace("Burton & Bamber Company Ltd", "Burton & Bamber"),
    fill_rate: d.fill_rate,
    rev: Math.round(d.rev_received / 1000),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={short} layout="vertical" margin={{ top: 4, right: 40, left: 100, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={95} />
        <Tooltip formatter={(v) => `${v}%`} />
        <ReferenceLine x={90} stroke="#10B981" strokeDasharray="4 2" label={{ value: "90% target", position: "top", fontSize: 10, fill: "#10B981" }} />
        <Bar dataKey="fill_rate" radius={[0, 4, 4, 0]}>
          {short.map((entry) => (
            <Cell key={entry.name} fill={entry.fill_rate >= 90 ? "#10B981" : entry.fill_rate >= 85 ? "#F59E0B" : "#E84C4C"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
