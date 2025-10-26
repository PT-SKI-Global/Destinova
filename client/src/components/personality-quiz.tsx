import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";

const questions = [
  {
    question: "Ketika menghadapi masalah baru, Anda lebih suka:",
    options: [
      { value: "analyze", label: "Menganalisis data dan fakta secara mendalam" },
      { value: "intuition", label: "Mengikuti intuisi dan pola yang Anda lihat" },
    ],
  },
  {
    question: "Di lingkungan kerja, Anda lebih energik ketika:",
    options: [
      { value: "team", label: "Bekerja dengan tim dan berdiskusi" },
      { value: "alone", label: "Bekerja sendiri dengan fokus mendalam" },
    ],
  },
  {
    question: "Saat membuat keputusan penting, Anda lebih mengandalkan:",
    options: [
      { value: "logic", label: "Logika dan analisis objektif" },
      { value: "values", label: "Nilai-nilai dan dampak pada orang lain" },
    ],
  },
  {
    question: "Anda lebih nyaman dengan:",
    options: [
      { value: "structured", label: "Rencana terstruktur dan jadwal yang jelas" },
      { value: "flexible", label: "Fleksibilitas dan spontanitas" },
    ],
  },
];

export function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      console.log("Quiz completed with answers:", answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h3 className="text-2xl font-bold">Hasil Analisis Kepribadian</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-primary/10 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">INTJ</div>
              <p className="text-lg font-medium mb-4">The Architect</p>
              <p className="text-muted-foreground leading-relaxed">
                Anda adalah pemikir strategis dengan kemampuan analitis yang kuat. Cocok untuk karier di bidang teknologi, engineering, atau konsultasi strategis.
              </p>
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            data-testid="button-view-recommendations"
          >
            Lihat Rekomendasi Karier
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Tes Kepribadian</h3>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {questions[currentQuestion].question}
          </h4>
          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
          >
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate active-elevate-2 cursor-pointer"
                  onClick={() => handleAnswer(option.value)}
                  data-testid={`radio-option-${option.value}`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          data-testid="button-previous"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Sebelumnya
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          data-testid="button-next"
        >
          {currentQuestion === questions.length - 1 ? "Lihat Hasil" : "Selanjutnya"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
