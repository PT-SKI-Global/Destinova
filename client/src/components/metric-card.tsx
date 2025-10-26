import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export function MetricCard({ icon: Icon, label, value, trend, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {trend && (
            <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-mono font-bold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
