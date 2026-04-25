-- Prism Origin Commercial Dashboard — Supabase Schema
-- Run this in your Supabase SQL Editor to create all tables

create table if not exists kpis (
  id                  serial primary key,
  total_ordered       numeric,
  total_received      numeric,
  fill_rate           numeric,
  shortfall           numeric,
  unique_products     int,
  total_pos           int,
  total_line_items    int,
  created_at          timestamptz default now()
);

create table if not exists warehouse_summary (
  id                serial primary key,
  warehouse_name    text,
  revenue_received  numeric,
  revenue_ordered   numeric,
  qty_ordered       int,
  qty_received      int,
  pos               int,
  products          int,
  fill_rate         numeric,
  share             numeric,
  created_at        timestamptz default now()
);

create table if not exists market_share_trend (
  id         serial primary key,
  period     text,
  supplier   text,
  revenue    numeric,
  share      numeric,
  created_at timestamptz default now()
);

create table if not exists top_products (
  id           serial primary key,
  product_name text,
  revenue      numeric,
  qty          int,
  avg_price    numeric,
  pos          int,
  created_at   timestamptz default now()
);

create table if not exists warehouse_trend (
  id             serial primary key,
  warehouse_name text,
  period         text,
  revenue        numeric,
  qty            int,
  products       int,
  created_at     timestamptz default now()
);

create table if not exists fill_rate_comparison (
  id            serial primary key,
  supplier_name text,
  qty_ordered   int,
  qty_received  int,
  rev_ordered   numeric,
  rev_received  numeric,
  fill_rate     numeric,
  shortfall     numeric,
  created_at    timestamptz default now()
);

create table if not exists dropped_products (
  id             serial primary key,
  product_name   text,
  early_revenue  numeric,
  early_qty      int,
  created_at     timestamptz default now()
);

create table if not exists growing_products (
  id           serial primary key,
  product_name text,
  early_qty    int,
  late_qty     int,
  late_rev     numeric,
  growth_pct   numeric,
  created_at   timestamptz default now()
);

create table if not exists pricing_comparison (
  id           serial primary key,
  product_name text,
  prism_price  numeric,
  cyka_price   numeric,
  prism_rev    numeric,
  diff_pct     numeric,
  created_at   timestamptz default now()
);

-- Enable Row Level Security with open read access for dashboard
alter table kpis               enable row level security;
alter table warehouse_summary  enable row level security;
alter table market_share_trend enable row level security;
alter table top_products       enable row level security;
alter table warehouse_trend    enable row level security;
alter table fill_rate_comparison enable row level security;
alter table dropped_products   enable row level security;
alter table growing_products   enable row level security;
alter table pricing_comparison enable row level security;

create policy "Public read" on kpis               for select using (true);
create policy "Public read" on warehouse_summary  for select using (true);
create policy "Public read" on market_share_trend for select using (true);
create policy "Public read" on top_products       for select using (true);
create policy "Public read" on warehouse_trend    for select using (true);
create policy "Public read" on fill_rate_comparison for select using (true);
create policy "Public read" on dropped_products   for select using (true);
create policy "Public read" on growing_products   for select using (true);
create policy "Public read" on pricing_comparison for select using (true);
