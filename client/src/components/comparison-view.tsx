import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Clock, TrendingUp, Briefcase, Target, Plus, Minus, Sparkles } from "lucide-react";
import type { Training } from "@shared/schema";

// Calculate deterministic fit score based on personality type and training suitability
function calculateTrainingFit(training: Training, personalityType?: string): number {
  if (!personalityType || !training.suitablePersonalities || training.suitablePersonalities.length === 0) {
    return 70; // Default score if no personality match available
  }

  // Direct match gives highest score (95)
  if (training.suitablePersonalities.includes(personalityType)) {
    return 95;
  }

  // Calculate partial match score deterministically
  let matchScore = 50; // Base score
  
  // Check each dimension of MBTI for partial matches
  for (const suitable of training.suitablePersonalities) {
    let dimensionMatches = 0;
    
    // Compare each position of MBTI (I/E, N/S, T/F, J/P)
    for (let i = 0; i < 4; i++) {
      if (personalityType[i] === suitable[i]) {
        dimensionMatches++;
      }
    }
    
    // Calculate score based on number of matching dimensions
    // 3 matches = 85, 2 matches = 75, 1 match = 65
    const score = 50 + (dimensionMatches * 12);
    matchScore = Math.max(matchScore, score);
  }

  return Math.min(matchScore, 89); // Cap at 89 (lower than direct match)
}

export function ComparisonView() {
  const [selectedTrainings, setSelectedTrainings] = useState<string[]>([]);
  const [personalityType] = useState<string | null>(() => {
    // Get personality type from localStorage if available
    return localStorage.getItem("userPersonalityType");
  });

  const { data: trainings = [], isLoading } = useQuery<Training[]>({
    queryKey: ["/api/trainings"],
  });

  const toggleTraining = (id: string) => {
    if (selectedTrainings.includes(id)) {
      setSelectedTrainings(selectedTrainings.filter(t => t !== id));
    } else if (selectedTrainings.length < 3) {
      setSelectedTrainings([...selectedTrainings, id]);
    }
  };

  const compareItems = trainings.filter(t => selectedTrainings.includes(t.id));

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading training programs...</p>
        </div>
      </div>
    );
  }

  // Show CTA if no personality type is available
  if (!personalityType) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Lengkapi Profil Kepribadian Anda</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Untuk mendapatkan rekomendasi training yang akurat dan personal, 
              silakan selesaikan tes kepribadian terlebih dahulu.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = "/simulation"}
              data-testid="button-take-quiz"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Ikuti Tes Kepribadian
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Bandingkan Program Training</h2>
        <p className="text-muted-foreground">
          Pilih hingga 3 program untuk dibandingkan berdasarkan profil Anda
        </p>
        {personalityType && (
          <div className="mt-2">
            <Badge variant="outline">Tipe Kepribadian: {personalityType}</Badge>
          </div>
        )}
      </div>

      {/* Training Selection */}
      {selectedTrainings.length < 3 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Pilih Program ({selectedTrainings.length}/3)</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainings.map((training) => {
                const fitScore = calculateTrainingFit(training, personalityType);
                const isSelected = selectedTrainings.includes(training.id);
                const canSelect = selectedTrainings.length < 3 || isSelected;

                return (
                  <div
                    key={training.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-primary/10 border-primary" 
                        : canSelect 
                          ? "hover-elevate" 
                          : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => canSelect && toggleTraining(training.id)}
                    data-testid={`training-card-${training.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        disabled={!canSelect}
                        className="mt-1"
                        data-testid={`checkbox-training-${training.id}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{training.name}</h4>
                            <Badge variant="outline" className="mt-1">{training.category}</Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Fit Score</div>
                            <div className="text-lg font-bold text-primary">{fitScore}%</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {training.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison View */}
      {compareItems.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Comparison ({compareItems.length})</h3>
            <Button
              variant="outline"
              onClick={() => setSelectedTrainings([])}
              data-testid="button-clear-selection"
            >
              Clear Selection
            </Button>
          </div>

          <div className={`grid grid-cols-1 ${compareItems.length === 2 ? 'lg:grid-cols-2' : compareItems.length === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
            {compareItems.map((training) => {
              const fitScore = calculateTrainingFit(training, personalityType);
              const estimatedSalary = training.avgSalaryImpact 
                ? `Rp ${Math.floor((5 + training.avgSalaryImpact / 100 * 5))}-${Math.floor((8 + training.avgSalaryImpact / 100 * 8))}jt`
                : "Rp 5-8jt";

              return (
                <Card key={training.id} className="hover-elevate transition-all" data-testid={`comparison-card-${training.id}`}>
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge>{training.category}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleTraining(training.id)}
                          data-testid={`button-remove-${training.id}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="text-xl font-bold">{training.name}</h3>
                      <p className="text-sm text-muted-foreground">{training.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <DollarSign className="h-4 w-4" />
                          <span>Dampak Gaji</span>
                        </div>
                        <p className="text-lg font-bold">{estimatedSalary}</p>
                        <p className="text-xs text-green-600">+{training.avgSalaryImpact || 50}%</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Clock className="h-4 w-4" />
                          <span>Durasi</span>
                        </div>
                        <p className="text-lg font-bold">
                          {training.timeCommitment ? `${Math.floor(training.timeCommitment / 40)} bulan` : "3-6 bulan"}
                        </p>
                        <p className="text-xs text-muted-foreground">{training.timeCommitment || 120} jam</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Target className="h-4 w-4" />
                          <span>Fit Score</span>
                        </div>
                        <p className="text-lg font-bold" data-testid={`fit-score-${training.id}`}>{fitScore}%</p>
                        <p className="text-xs text-muted-foreground">
                          {fitScore >= 80 ? "Sangat cocok" : fitScore >= 65 ? "Cukup cocok" : "Kurang cocok"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Briefcase className="h-4 w-4" />
                          <span>Kesulitan</span>
                        </div>
                        <p className="text-lg font-bold capitalize">{training.difficulty || "Intermediate"}</p>
                        <p className="text-xs text-muted-foreground">Level</p>
                      </div>
                    </div>

                    {training.suitablePersonalities && training.suitablePersonalities.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Cocok untuk:</p>
                        <div className="flex flex-wrap gap-2">
                          {training.suitablePersonalities.map((type, i) => (
                            <Badge key={i} variant={type === personalityType ? "default" : "outline"}>
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-2xl font-bold text-primary">{fitScore}%</span>
                      </div>
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${fitScore}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {compareItems.length === 0 && selectedTrainings.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Pilih Program untuk Dibandingkan</h3>
            <p className="text-muted-foreground">
              Pilih 2-3 program training untuk melihat perbandingan detail
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
