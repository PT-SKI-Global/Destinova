import { Card, CardContent } from "@/components/ui/card";
import { User, Brain, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Buat Profil",
    description: "Isi data pendidikan, minat, dan ambil tes kepribadian singkat untuk analisis yang lebih akurat.",
  },
  {
    icon: Brain,
    title: "Input Keputusan",
    description: "Pilih keputusan yang ingin Anda simulasikan: jalur pendidikan, training, atau perubahan karier.",
  },
  {
    icon: Target,
    title: "AI Generate Skenario",
    description: "AI menganalisis dan membuat skenario realistis dengan dampak finansial, peluang, dan action plan.",
  },
  {
    icon: TrendingUp,
    title: "Bandingkan & Putuskan",
    description: "Lihat visualisasi dan metrik untuk setiap pilihan, lalu buat keputusan dengan lebih percaya diri.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Kerja Destinova
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empat langkah sederhana untuk simulasi keputusan yang lebih baik
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-2">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
