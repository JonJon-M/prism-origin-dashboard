import Dashboard from "@/components/Dashboard";
import type { DashboardData } from "@/lib/types";

async function getData(): Promise<DashboardData> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/dashboard-data.json`, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return <Dashboard data={data} />;
}
