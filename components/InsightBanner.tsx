"use client";

interface Props {
  type: "danger" | "warning" | "info";
  title: string;
  body: string;
}

const styles = {
  danger:  "bg-red-50 border-red-400 text-red-900",
  warning: "bg-amber-50 border-amber-400 text-amber-900",
  info:    "bg-blue-50 border-blue-400 text-blue-900",
};

export default function InsightBanner({ type, title, body }: Props) {
  return (
    <div className={`border-l-4 rounded-r-lg px-5 py-4 ${styles[type]}`}>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-sm mt-1 opacity-90">{body}</p>
    </div>
  );
}
