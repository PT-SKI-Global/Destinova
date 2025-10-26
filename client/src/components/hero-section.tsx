import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Career_planning_hero_image_54d30d5b.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Didukung AI Terkini</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Simulasi Keputusan Karier & Pendidikan Anda
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
            Eksplorasi berbagai jalur karier dengan AI. Dapatkan simulasi realistis, analisis kepribadian, dan rekomendasi personalisasi untuk keputusan hidup yang lebih percaya diri.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary/90 backdrop-blur-md border border-primary-border hover-elevate active-elevate-2"
              data-testid="button-start-simulation"
            >
              Mulai Simulasi Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover-elevate active-elevate-2"
              data-testid="button-learn-more"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
