import fs from "fs";
import path from "path";
import Dashboard from "@/components/Dashboard";
import type { DashboardData } from "@/lib/types";

function getData(): DashboardData {
  const file = path.join(process.cwd(), "public", "dashboard-data.json");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export default function Home() {
  const data = getData();
  return <Dashboard data={data} />;
}
