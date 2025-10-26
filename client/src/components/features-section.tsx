import { FeatureCard } from "./feature-card";
import { Brain, Target, TrendingUp, Users, BookOpen, LineChart } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Generator Skenario AI",
    description: "AI membuat simulasi realistis dari keputusan Anda dengan analisis dampak finansial, waktu, dan peluang karier.",
  },
  {
    icon: Users,
    title: "Analisis Kepribadian",
    description: "Tes kepribadian Jungian untuk mencocokkan tipe Anda dengan jalur karier dan lingkungan kerja yang sesuai.",
  },
  {
    icon: Target,
    title: "Rencana Aksi Personal",
    description: "Dapatkan langkah-langkah konkret dan checklist untuk setiap skenario yang Anda pilih.",
  },
  {
    icon: TrendingUp,
    title: "Visualisasi Jalur Karier",
    description: "Lihat pohon keputusan dari pendidikan hingga karier dengan estimasi gaji dan skill yang dibutuhkan.",
  },
  {
    icon: BookOpen,
    title: "Analisis Training & Sertifikasi",
    description: "Evaluasi dampak training terhadap karier Anda dengan fit score berdasarkan kepribadian dan tujuan.",
  },
  {
    icon: LineChart,
    title: "Perbandingan Skenario",
    description: "Bandingkan 2-3 jalur berbeda side-by-side dengan metrik visual untuk keputusan lebih percaya diri.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fitur Lengkap untuk Keputusan Terbaik
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Platform lengkap untuk simulasi dan analisis keputusan karier, pendidikan, dan pengembangan skill Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
