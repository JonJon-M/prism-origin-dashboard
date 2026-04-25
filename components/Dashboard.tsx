"use client";

import type { DashboardData } from "@/lib/types";
import KpiCards from "./KpiCards";
import MarketShareChart from "./MarketShareChart";
import WarehouseRevenueChart from "./WarehouseRevenueChart";
import TopProductsChart from "./TopProductsChart";
import FillRateChart from "./FillRateChart";
import DroppedProductsTable from "./DroppedProductsTable";
import GrowingProductsChart from "./GrowingProductsChart";
import PricingComparisonChart from "./PricingComparisonChart";
import InsightBanner from "./InsightBanner";

interface Props { data: DashboardData }

export default function Dashboard({ data }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#1A376C] text-white px-6 py-5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prism Origin Limited</h1>
            <p className="text-blue-200 text-sm mt-0.5">
              Commercial Purchase Analysis · Glovo Supply Chain · April 2025
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-blue-200 text-xs">Data: 20,783 line items · 445 POs · 15 suppliers</p>
            <p className="text-blue-300 text-xs mt-0.5">Period split: Early / Mid / Late (PO sequence proxy)</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Critical alert */}
        <InsightBanner
          type="danger"
          title="Market Share Crisis"
          body="Prism Origin has fallen from 49.3% → 22.3% market share while the total market nearly doubled. Cyka Fresh grew from 34% → 60% in the same period. Root cause: fill rate gap (81% vs 93%), not pricing."
        />

        {/* KPI row */}
        <KpiCards kpis={data.kpis} />

        {/* Market share + warehouse revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              Market Share Trend — Prism Origin vs Cyka Fresh
            </h2>
            <MarketShareChart data={data.market_share_trend} />
          </section>
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              Revenue by Warehouse &amp; Period
            </h2>
            <WarehouseRevenueChart data={data.warehouse_trend} />
          </section>
        </div>

        {/* Fill rate comparison */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">
            Fill Rate Comparison — All Produce Suppliers
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Cyka delivers 93% of ordered volume; Prism delivers 83% — the 10-point gap is the primary driver of volume migration.
          </p>
          <FillRateChart data={data.fill_rate_comparison} />
        </section>

        {/* Top products */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Top 20 Products by Revenue Received (KES)
          </h2>
          <TopProductsChart data={data.top_products} />
        </section>

        {/* Pricing comparison */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">
            Pricing: Prism Origin vs Cyka Fresh (Top 15 Products)
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Prism is cheaper on 61 of 75 overlapping products — pricing is NOT the reason for market share loss.
          </p>
          <PricingComparisonChart data={data.pricing_comparison} />
        </section>

        {/* Growing + Dropped side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-1">
              Growing Products (Early → Late)
            </h2>
            <p className="text-sm text-slate-500 mb-4">Volume growth % where Prism is winning</p>
            <GrowingProductsChart data={data.growing_products} />
          </section>
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-1">
              Products No Longer Supplied (45 dropped)
            </h2>
            <p className="text-sm text-slate-500 mb-4">Active in Early period, absent in Late period</p>
            <DroppedProductsTable data={data.dropped_products} />
          </section>
        </div>

        {/* Warehouse summary table */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Warehouse Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1A376C] text-white">
                  {["Warehouse","Revenue Received","Revenue Ordered","Fill Rate","Share","POs","Products"].map(h => (
                    <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.warehouse_summary.map((w, i) => (
                  <tr key={w.warehouse_name} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-4 py-2 font-medium">{w.warehouse_name}</td>
                    <td className="px-4 py-2">KES {w.revenue_received.toLocaleString()}</td>
                    <td className="px-4 py-2">KES {w.revenue_ordered.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className={`font-semibold ${w.fill_rate < 80 ? "text-red-600" : "text-emerald-600"}`}>
                        {w.fill_rate}%
                      </span>
                    </td>
                    <td className="px-4 py-2">{w.share}%</td>
                    <td className="px-4 py-2">{w.pos}</td>
                    <td className="px-4 py-2">{w.products}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommendations */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Strategic Recommendations</h2>
          <div className="space-y-3">
            {[
              { tag: "Critical", color: "bg-red-100 text-red-800 border-red-200", action: "Fix fill rate — target 90%+", rationale: "Single biggest reason Glovo rebalances to Cyka. Every unfulfilled order trains Glovo to order less from Prism." },
              { tag: "Critical", color: "bg-red-100 text-red-800 border-red-200", action: "Investigate SAFARI warehouse supply chain", rationale: "71.4% fill rate and only 11% revenue despite equal PO count is a structural operational failure." },
              { tag: "High", color: "bg-orange-100 text-orange-800 border-orange-200", action: "Reclaim Onions Red 1Kg", rationale: "Volume dropped 96% (4,658→190 units). Prism price KES 77 beats Cyka KES 91. This is a fill-rate loss, not a price loss." },
              { tag: "High", color: "bg-orange-100 text-orange-800 border-orange-200", action: "Defend Strawberries, Grapes & Raspberries", rationale: "Prism is cheaper on all three; the loss is availability-driven. Combined early revenue: KES 686,310." },
              { tag: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200", action: "Expand Kienyeji Chicken range", rationale: "Unique differentiation vs Cyka, strong early revenue (KES 261K), premium price point." },
              { tag: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200", action: "Scale Blueberry Punnet & Capsicum Green", rationale: "+1,388% and +567% growth — Glovo is testing Prism's capacity here." },
              { tag: "Opportunity", color: "bg-green-100 text-green-800 border-green-200", action: "Formalise Mugutha processed snack range", rationale: "No competitor carries this category — builds stickiness beyond fresh produce." },
            ].map((r) => (
              <div key={r.action} className={`flex gap-3 rounded-lg border p-4 ${r.color}`}>
                <span className="shrink-0 font-semibold text-xs mt-0.5 uppercase tracking-wide">{r.tag}</span>
                <div>
                  <p className="font-semibold text-sm">{r.action}</p>
                  <p className="text-sm opacity-80 mt-0.5">{r.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs text-slate-400 pb-8">
          Prism Origin Ltd — Commercial Intelligence · April 2025 · Data: Glovo Purchases
        </footer>
      </main>
    </div>
  );
}
