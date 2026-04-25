export interface KPIs {
  total_ordered: number;
  total_received: number;
  fill_rate: number;
  shortfall: number;
  unique_products: number;
  total_pos: number;
  total_line_items: number;
  date_from: string;
  date_to: string;
}

export interface WarehouseSummary {
  warehouse_name: string;
  revenue_received: number;
  revenue_ordered: number;
  qty_ordered: number;
  qty_received: number;
  pos: number;
  products: number;
  fill_rate: number;
  share: number;
}

export interface MarketShareEntry {
  period: string;
  supplier: string;
  revenue: number;
  share: number;
}

export interface MarketShareMonthly {
  month: string;
  supplier: string;
  revenue: number;
  share: number;
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  qty: number;
  fill_rate: number;
}

export interface WarehouseTrend {
  warehouse_name: string;
  period: string;
  revenue: number;
  qty: number;
  products: number;
}

export interface FillRateEntry {
  supplier_name: string;
  qty_ordered: number;
  qty_received: number;
  rev_ordered: number;
  rev_received: number;
  fill_rate: number;
  shortfall: number;
}

export interface FillRatePeriod {
  period: string;
  qty_fill: number;
  rev_fill: number;
  shortfall: number;
}

export interface TopProduct {
  product_name: string;
  revenue: number;
  qty: number;
  avg_price: number;
  pos: number;
}

export interface DroppedProduct {
  product_name: string;
  early_revenue: number;
  early_qty: number;
  last_date: string;
}

export interface GrowingProduct {
  product_name: string;
  early_qty: number;
  late_qty: number;
  late_rev: number;
  growth_pct: number;
}

export interface PricingComparison {
  product_name: string;
  prism_price: number;
  cyka_price: number;
  prism_rev: number;
  diff_pct: number;
}

export interface DashboardData {
  kpis: KPIs;
  warehouse_summary: WarehouseSummary[];
  monthly_trend: MonthlyTrend[];
  market_share_monthly: MarketShareMonthly[];
  market_share_period: MarketShareEntry[];
  warehouse_trend: WarehouseTrend[];
  top_products: TopProduct[];
  fill_rate_comparison: FillRateEntry[];
  fill_rate_by_period: FillRatePeriod[];
  dropped_products: DroppedProduct[];
  growing_products: GrowingProduct[];
  pricing_comparison: PricingComparison[];
}
