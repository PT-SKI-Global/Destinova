import { MetricCard } from "../metric-card";
import { DollarSign } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-6 max-w-xs">
      <MetricCard
        icon={DollarSign}
        label="Estimasi Gaji"
        value="Rp 8jt"
        trend="+25%"
        trendUp={true}
      />
    </div>
  );
}
