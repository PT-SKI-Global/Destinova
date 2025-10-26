import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SimulationForm } from "@/components/simulation-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalityQuiz } from "@/components/personality-quiz";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, User } from "lucide-react";

export default function Simulation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Simulasi Baru</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Buat Simulasi Keputusan</h1>
            <p className="text-lg text-muted-foreground">
              Mulai dengan profil Anda atau langsung buat simulasi
            </p>
          </div>

          <Tabs defaultValue="simulation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="simulation" data-testid="tab-simulation">
                <Sparkles className="h-4 w-4 mr-2" />
                Simulasi
              </TabsTrigger>
              <TabsTrigger value="personality" data-testid="tab-personality">
                <User className="h-4 w-4 mr-2" />
                Tes Kepribadian
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="simulation">
              <SimulationForm />
            </TabsContent>
            
            <TabsContent value="personality">
              <PersonalityQuiz />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
