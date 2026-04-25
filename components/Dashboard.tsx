"use client";

import type { DashboardData } from "@/lib/types";
import KpiCards from "./KpiCards";
import MarketShareChart from "./MarketShareChart";
import WarehouseRevenueChart from "./WarehouseRevenueChart";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
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
              Commercial Purchase Analysis · Glovo Supply Chain
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-blue-200 text-xs">
              {data.kpis.date_from} → {data.kpis.date_to} · {data.kpis.total_line_items.toLocaleString()} line items · {data.kpis.total_pos} POs · 15 suppliers
            </p>
            <p className="text-blue-300 text-xs mt-0.5">Analysis based on actual PO creation dates</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Critical alert */}
        <InsightBanner
          type="danger"
          title="Market Share Crisis — 33 Points Lost in 16 Months"
          body="Prism Origin fell from 53.2% market share (Jan 2025) to 20.0% (Apr 2026) while Cyka Fresh grew from 29.9% to 65.2%. The total market expanded — Prism did not grow with it. Root cause: fill rate (81% vs Cyka's 93%), not pricing. April 2026 fill rate hit a record low of 57%."
        />

        {/* KPI row */}
        <KpiCards kpis={data.kpis} />

        {/* Monthly revenue trend (full width) */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">
            Monthly Revenue Trend — Prism Origin (Jan 2025 – Apr 2026)
          </h2>
          <p className="text-sm text-slate-500 mb-4">Revenue received vs ordered, with monthly fill rate</p>
          <MonthlyRevenueChart data={data.monthly_trend} />
        </section>

        {/* Market share + warehouse revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-1">
              Market Share Trend — Monthly (All Suppliers)
            </h2>
            <p className="text-sm text-slate-500 mb-4">Prism overtaken by Cyka Fresh in August 2025</p>
            <MarketShareChart data={data.market_share_monthly} />
          </section>
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-1">
              Revenue by Warehouse &amp; Period
            </h2>
            <p className="text-sm text-slate-500 mb-4">H1 2025 / H2 2025 / Q1-Q2 2026</p>
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
            Prism's fill rate is also deteriorating: H1 2025 = 82.2% → Q1/Q2 2026 = 78.2%.
          </p>
          <FillRateChart data={data.fill_rate_comparison} />
        </section>

        {/* Top products */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Top 20 Products by Revenue Received (KES) — All Periods
          </h2>
          <TopProductsChart data={data.top_products} />
        </section>

        {/* Pricing comparison */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">
            Pricing: Prism Origin vs Cyka Fresh (Top 15 Products by Prism Revenue)
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
              Growing Products (H1 2025 → Q1/Q2 2026)
            </h2>
            <p className="text-sm text-slate-500 mb-4">Volume growth % — areas where Prism is winning</p>
            <GrowingProductsChart data={data.growing_products} />
          </section>
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-1">
              Products No Longer Supplied (51 dropped)
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Supplied in H1 2025, absent in Q1/Q2 2026 · H1 revenue at risk: KES 2.38M
            </p>
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

        {/* Fill rate by period table */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Fill Rate Deterioration by Period — Prism Origin</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1A376C] text-white">
                  {["Period","Qty Fill Rate","Revenue Fill Rate","Shortfall (KES)"].map(h => (
                    <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.fill_rate_by_period.map((r, i) => (
                  <tr key={r.period} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-4 py-2 font-medium">{r.period}</td>
                    <td className="px-4 py-2">
                      <span className={`font-semibold ${r.qty_fill < 80 ? "text-red-600" : r.qty_fill < 85 ? "text-amber-600" : "text-emerald-600"}`}>
                        {r.qty_fill}%
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`font-semibold ${r.rev_fill < 75 ? "text-red-600" : r.rev_fill < 82 ? "text-amber-600" : "text-emerald-600"}`}>
                        {r.rev_fill}%
                      </span>
                    </td>
                    <td className="px-4 py-2 text-red-600 font-medium">KES {r.shortfall.toLocaleString()}</td>
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
              { tag: "Critical", color: "bg-red-100 text-red-800 border-red-200", action: "Fix fill rate — target 90%+ immediately", rationale: "Q1/Q2 2026 fill rate is 78.2% qty / 73.6% rev and falling. April 2026 hit 57%. This is the primary driver of 33 points of market share loss." },
              { tag: "Critical", color: "bg-red-100 text-red-800 border-red-200", action: "Emergency SAFARI warehouse review", rationale: "71.4% fill rate, 212 POs generating only KES 2M revenue. Identify whether logistics, staffing or stock sourcing is the bottleneck." },
              { tag: "Critical", color: "bg-red-100 text-red-800 border-red-200", action: "Investigate the June 2025 portfolio cut", rationale: "51 products dropped at end of June 2025 — many with strong H1 revenue. KES 2.38M at risk. Was this deliberate or a forced stock failure?" },
              { tag: "High", color: "bg-orange-100 text-orange-800 border-orange-200", action: "Reclaim Onions Red 1Kg", rationale: "Volume dropped 97% (6,190→190 units H1→Q1). Prism KES 77 beats Cyka KES 91. A pure availability loss worth KES 430K in H1 alone." },
              { tag: "High", color: "bg-orange-100 text-orange-800 border-orange-200", action: "Restore Strawberries, Grapes & Raspberries", rationale: "Prism was cheaper on all three. Combined H1 revenue: KES 930K. Loss is availability-driven, not price-driven." },
              { tag: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200", action: "Scale Kienyeji Chicken range", rationale: "Unique to Prism, +600% growth H1→Q1, KES 173K in Q1/Q2 2026. No Cyka equivalent — a genuine moat." },
              { tag: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200", action: "Scale Blueberry Punnet 125g", rationale: "+131% growth, KES 201K in Q1/Q2 2026, Prism is cheaper (KES 311 vs KES 364). Glovo is testing Prism's capacity here." },
              { tag: "Opportunity", color: "bg-green-100 text-green-800 border-green-200", action: "Formalise Mugutha branded range", rationale: "14 new SKUs in 2026. No competitor carries this category — builds supplier stickiness beyond fresh produce." },
            ].map((r) => (
              <div key={r.action} className={`flex gap-3 rounded-lg border p-4 ${r.color}`}>
                <span className="shrink-0 font-semibold text-xs mt-0.5 uppercase tracking-wide w-20">{r.tag}</span>
                <div>
                  <p className="font-semibold text-sm">{r.action}</p>
                  <p className="text-sm opacity-80 mt-0.5">{r.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs text-slate-400 pb-8">
          Prism Origin Ltd — Commercial Intelligence · {data.kpis.date_from} to {data.kpis.date_to} · Data: Glovo Purchases
        </footer>
      </main>
    </div>
  );
}
