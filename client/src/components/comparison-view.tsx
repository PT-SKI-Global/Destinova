import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, TrendingUp, Briefcase } from "lucide-react";

const scenarios = [
  {
    title: "Bootcamp Full-Stack Developer",
    type: "Training",
    salary: "Rp 8-12jt",
    salaryIncrease: "+150%",
    time: "6 bulan",
    fitScore: 87,
    jobDemand: "Tinggi",
    investment: "Rp 20jt",
  },
  {
    title: "Sertifikasi Cisco CCNA",
    type: "Training",
    salary: "Rp 6-9jt",
    salaryIncrease: "+80%",
    time: "3 bulan",
    fitScore: 65,
    jobDemand: "Sedang",
    investment: "Rp 8jt",
  },
];

export function ComparisonView() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Perbandingan Skenario</h2>
        <p className="text-muted-foreground">
          Bandingkan 2 pilihan untuk keputusan yang lebih baik
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => (
          <Card key={index} className="hover-elevate transition-all">
            <CardHeader>
              <div className="space-y-2">
                <Badge>{scenario.type}</Badge>
                <h3 className="text-xl font-bold">{scenario.title}</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <DollarSign className="h-4 w-4" />
                    <span>Estimasi Gaji</span>
                  </div>
                  <p className="text-lg font-mono font-bold">{scenario.salary}</p>
                  <p className="text-xs text-green-600">{scenario.salaryIncrease}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Waktu</span>
                  </div>
                  <p className="text-lg font-mono font-bold">{scenario.time}</p>
                  <p className="text-xs text-muted-foreground">Full-time</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>Fit Score</span>
                  </div>
                  <p className="text-lg font-mono font-bold">{scenario.fitScore}%</p>
                  <p className="text-xs text-muted-foreground">
                    {scenario.fitScore >= 80 ? "Sangat cocok" : "Cukup cocok"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Briefcase className="h-4 w-4" />
                    <span>Peluang Kerja</span>
                  </div>
                  <p className="text-lg font-mono font-bold">{scenario.jobDemand}</p>
                  <p className="text-xs text-muted-foreground">{scenario.investment}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-2xl font-bold text-primary">{scenario.fitScore}%</span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${scenario.fitScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
