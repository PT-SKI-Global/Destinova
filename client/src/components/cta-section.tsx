import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Simulasi AI unlimited untuk jalur karier",
  "Analisis kepribadian Jungian lengkap",
  "Perbandingan skenario side-by-side",
  "Action plan personalisasi",
];

export function CTASection() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Mulai Simulasi Keputusan Anda Hari Ini
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dapatkan akses gratis untuk mencoba platform dan lihat bagaimana AI dapat membantu keputusan karier Anda.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" data-testid="button-cta-start">
                    Mulai Sekarang Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" data-testid="button-cta-demo">
                    Lihat Demo
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
                  <Card className="relative">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Pengguna Aktif</div>
                        <div className="text-4xl font-mono font-bold">1,200+</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Simulasi Dibuat</div>
                        <div className="text-4xl font-mono font-bold">5,400+</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Rating</div>
                        <div className="text-4xl font-mono font-bold">4.8/5</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
