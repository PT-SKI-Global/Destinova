import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export function SimulationForm() {
  const [formData, setFormData] = useState({
    education: "",
    careerGoal: "",
    decision: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating simulation with:", formData);
  };

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
                <SelectItem value="education">Jalur Pendidikan</SelectItem>
                <SelectItem value="training">Training/Sertifikasi</SelectItem>
                <SelectItem value="career-change">Perubahan Karier</SelectItem>
                <SelectItem value="skill-development">Pengembangan Skill</SelectItem>
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
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            data-testid="button-generate-simulation"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Generate Simulasi dengan AI
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
