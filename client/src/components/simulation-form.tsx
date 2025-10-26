import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, Clock, DollarSign, Target, Briefcase, ArrowLeft } from "lucide-react";

interface SimulationResult {
  aiScenario: string;
  actionPlan: string[];
  metrics: {
    salary: string;
    salaryIncrease: string;
    timeCommitment: string;
    fitScore: number;
    jobDemand: string;
    skills: string[];
  };
  careerPaths: Array<{
    timeline: string;
    position: string;
    salary: string;
    description: string;
  }>;
  careerCircle: string;
}

export function SimulationForm() {
  const [formData, setFormData] = useState({
    education: "",
    careerGoal: "",
    decision: "",
    notes: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jungianType] = useState<string>(() => {
    // Get personality type from localStorage if available
    const stored = localStorage.getItem("userPersonalityType");
    return stored || "INTJ";
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/simulations/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          education: formData.education,
          careerGoal: formData.careerGoal,
          decision: formData.decision,
          notes: formData.notes,
          jungianType: jungianType
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate simulation");
      }

      const result = await response.json();
      console.log("Simulation generated:", result);
      
      // Save the simulation
      try {
        const saveResponse = await fetch("/api/simulations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "guest-user", // TODO: Get from auth
            title: `${formData.decision} - ${formData.careerGoal}`,
            type: formData.decision,
            inputs: {
              education: formData.education,
              careerGoal: formData.careerGoal,
              notes: formData.notes
            },
            aiScenario: result.aiScenario,
            actionPlan: result.actionPlan,
            metrics: result.metrics,
            careerPaths: result.careerPaths
          })
        });

        if (!saveResponse.ok) {
          const errorData = await saveResponse.json();
          console.error("Failed to save simulation:", errorData);
        }

        // Show results in UI
        setSimulationResult(result);
      } catch (saveError) {
        console.error("Failed to save simulation:", saveError);
        // Still show results even if save failed
        setSimulationResult(result);
      }
    } catch (error) {
      console.error("Error generating simulation:", error);
      setError("Gagal membuat simulasi. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSimulationResult(null);
    setError(null);
    setFormData({
      education: "",
      careerGoal: "",
      decision: "",
      notes: "",
    });
  };

  // Show results if available
  if (simulationResult) {
    return (
      <div className="space-y-6" data-testid="simulation-results">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Hasil Simulasi Karier</h3>
              <Button variant="outline" onClick={handleReset} data-testid="button-new-simulation">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Buat Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fit Score */}
            <div className="p-6 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Compatibility Score</span>
                </div>
                <span className="text-3xl font-bold text-primary" data-testid="fit-score">
                  {simulationResult.metrics.fitScore}%
                </span>
              </div>
              <Progress value={simulationResult.metrics.fitScore} className="h-2" />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Estimasi Gaji</span>
                </div>
                <p className="text-lg font-semibold" data-testid="salary-estimate">{simulationResult.metrics.salary}</p>
                <p className="text-sm text-green-600">{simulationResult.metrics.salaryIncrease}</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Waktu Dibutuhkan</span>
                </div>
                <p className="text-lg font-semibold">{simulationResult.metrics.timeCommitment}</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Permintaan Pasar</span>
                </div>
                <p className="text-lg font-semibold">{simulationResult.metrics.jobDemand}</p>
              </div>
            </div>

            {/* AI Scenario */}
            <div>
              <h4 className="font-semibold mb-3">Prediksi Karier Anda</h4>
              <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{simulationResult.aiScenario}</p>
              </div>
            </div>

            {/* Skills Required */}
            {simulationResult.metrics.skills && simulationResult.metrics.skills.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Skills yang Dibutuhkan</h4>
                <div className="flex flex-wrap gap-2">
                  {simulationResult.metrics.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Plan */}
            {simulationResult.actionPlan && simulationResult.actionPlan.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Rencana Aksi</h4>
                <div className="space-y-2">
                  {simulationResult.actionPlan.map((step, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-card border rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {i + 1}
                      </span>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Path */}
            {simulationResult.careerPaths && simulationResult.careerPaths.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Jalur Karier</h4>
                <div className="space-y-3">
                  {simulationResult.careerPaths.map((path, i) => (
                    <div key={i} className="p-4 bg-card border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{path.position}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{path.timeline}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary">{path.salary}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h3 className="text-2xl font-bold">Buat Simulasi Baru</h3>
        <p className="text-muted-foreground">
          Masukkan informasi untuk mendapatkan simulasi AI yang akurat
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="education">Pendidikan Terakhir</Label>
            <Select
              value={formData.education}
              onValueChange={(value) => setFormData({ ...formData, education: value })}
            >
              <SelectTrigger id="education" data-testid="select-education">
                <SelectValue placeholder="Pilih pendidikan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smp">SMP</SelectItem>
                <SelectItem value="sma-ipa">SMA IPA</SelectItem>
                <SelectItem value="sma-ips">SMA IPS</SelectItem>
                <SelectItem value="smk-teknik">SMK Teknik</SelectItem>
                <SelectItem value="smk-bisnis">SMK Bisnis</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="s1">S1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="careerGoal">Tujuan Karier</Label>
            <Input
              id="careerGoal"
              placeholder="Contoh: Software Developer, UI/UX Designer"
              value={formData.careerGoal}
              onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
              data-testid="input-career-goal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decision">Keputusan yang Ingin Disimulasikan</Label>
            <Select
              value={formData.decision}
              onValueChange={(value) => setFormData({ ...formData, decision: value })}
            >
              <SelectTrigger id="decision" data-testid="select-decision">
                <SelectValue placeholder="Pilih tipe keputusan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Memilih Jurusan Kuliah">Memilih Jurusan Kuliah</SelectItem>
                <SelectItem value="Memilih Jalur SMA/SMK">Memilih Jalur SMA/SMK</SelectItem>
                <SelectItem value="Mengikuti Bootcamp">Mengikuti Bootcamp</SelectItem>
                <SelectItem value="Mencari Pekerjaan Pertama">Mencari Pekerjaan Pertama</SelectItem>
                <SelectItem value="Pindah Karier">Pindah Karier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Detail Tambahan (Opsional)</Label>
            <Textarea
              id="notes"
              placeholder="Jelaskan lebih detail tentang situasi atau pertimbangan Anda..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              data-testid="textarea-notes"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!formData.education || !formData.careerGoal || !formData.decision || isGenerating}
            data-testid="button-generate"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Simulasi dengan AI"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
