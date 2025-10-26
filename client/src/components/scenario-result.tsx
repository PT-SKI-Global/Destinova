import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, DollarSign, Target, BookmarkPlus } from "lucide-react";

export function ScenarioResult() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Skenario: Bootcamp Full-Stack Developer</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Pengembangan Skill</Badge>
                <Badge variant="outline">INTJ Compatible</Badge>
              </div>
            </div>
            <Button variant="outline" data-testid="button-save-simulation">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Estimasi Gaji</p>
            <p className="text-2xl font-mono font-bold">Rp 8-12jt</p>
            <p className="text-xs text-green-600 mt-1">+150% dari saat ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Waktu Investasi</p>
            <p className="text-2xl font-mono font-bold">6 bulan</p>
            <p className="text-xs text-muted-foreground mt-1">Full-time learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Personality Fit</p>
            <p className="text-2xl font-mono font-bold">87%</p>
            <p className="text-xs text-green-600 mt-1">Highly compatible</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Peluang Kerja</p>
            <p className="text-2xl font-mono font-bold">Tinggi</p>
            <p className="text-xs text-muted-foreground mt-1">Demand meningkat</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scenario" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenario" data-testid="tab-scenario">Skenario AI</TabsTrigger>
          <TabsTrigger value="action" data-testid="tab-action">Action Plan</TabsTrigger>
          <TabsTrigger value="career" data-testid="tab-career">Jalur Karier</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scenario">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Dampak Pendidikan & Karier</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Dengan mengambil bootcamp full-stack development, Anda akan mendapatkan skill komprehensif di frontend (React, TypeScript) dan backend (Node.js, databases). Sebagai INTJ, Anda cocok dengan pola pikir sistematis yang dibutuhkan dalam programming.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Peluang Karier</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Lulusan bootcamp dengan portfolio kuat bisa langsung masuk ke posisi Junior Full-Stack Developer dengan gaji entry-level Rp 8-10 juta. Dalam 2-3 tahun bisa naik ke Mid-Level (Rp 12-18 juta) dengan spesialisasi tertentu.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Lingkungan Kerja</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Anda akan bekerja dengan tipe kepribadian dominan: INTJ, INTP, ISTJ - orang-orang yang analitis dan fokus pada solusi teknis. Tim developer biasanya bekerja remote atau hybrid dengan fleksibilitas tinggi.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="action">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  "Research dan pilih bootcamp terpercaya (RevoU, Hacktiv8, atau online bootcamp)",
                  "Persiapkan dana investasi Rp 15-30 juta atau cari bootcamp dengan ISA (Income Share Agreement)",
                  "Mulai belajar fundamental programming (HTML, CSS, JavaScript) sebelum bootcamp",
                  "Siapkan waktu 6 bulan full-time atau 9-12 bulan part-time",
                  "Bangun portfolio dengan 3-5 proyek selama bootcamp",
                  "Networking dengan alumni dan ikuti komunitas developer",
                  "Apply ke perusahaan startup/tech company sebelum lulus",
                ].map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="career">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    0-1y
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Junior Full-Stack Developer</h4>
                    <p className="text-sm text-muted-foreground">Rp 8-10 juta/bulan • Startup/Software House</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2-3y
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Mid-Level Developer</h4>
                    <p className="text-sm text-muted-foreground">Rp 12-18 juta/bulan • Tech Company</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    4-5y
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Senior Developer / Tech Lead</h4>
                    <p className="text-sm text-muted-foreground">Rp 20-35 juta/bulan • Tech Company/Unicorn</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    6+y
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Engineering Manager / Staff Engineer</h4>
                    <p className="text-sm text-muted-foreground">Rp 40-70 juta/bulan • Unicorn/MNC</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
