"use client";
import type { DroppedProduct } from "@/lib/types";

interface Props { data: DroppedProduct[] }

export default function DroppedProductsTable({ data }: Props) {
  const filtered = data.filter(d => d.early_revenue > 0);
  return (
    <div className="overflow-y-auto max-h-[280px]">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-[#1A376C] text-white">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Product</th>
            <th className="px-3 py-2 text-right font-medium">H1 2025 Rev</th>
            <th className="px-3 py-2 text-right font-medium">H1 Qty</th>
            <th className="px-3 py-2 text-right font-medium">Last Supplied</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d, i) => (
            <tr key={d.product_name} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
              <td className="px-3 py-1.5">{d.product_name}</td>
              <td className="px-3 py-1.5 text-right text-red-600 font-medium">
                KES {d.early_revenue.toLocaleString()}
              </td>
              <td className="px-3 py-1.5 text-right">{d.early_qty.toLocaleString()}</td>
              <td className="px-3 py-1.5 text-right text-slate-500">{d.last_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
