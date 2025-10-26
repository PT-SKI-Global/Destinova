import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";

const questions = [
  // E/I - Extraversion vs Introversion
  {
    dimension: "E/I",
    question: "Di lingkungan sosial, Anda lebih merasa energik ketika:",
    options: [
      { value: "E", label: "Berinteraksi dengan banyak orang dan berada di tengah keramaian" },
      { value: "I", label: "Mengobrol mendalam dengan satu atau dua orang saja" },
    ],
  },
  {
    dimension: "E/I",
    question: "Setelah hari yang melelahkan, Anda lebih suka:",
    options: [
      { value: "E", label: "Keluar bertemu teman untuk refresh pikiran" },
      { value: "I", label: "Sendiri di rumah untuk mengisi ulang energi" },
    ],
  },
  {
    dimension: "E/I",
    question: "Dalam diskusi kelompok, Anda cenderung:",
    options: [
      { value: "E", label: "Aktif berbicara dan berbagi ide dengan spontan" },
      { value: "I", label: "Mendengarkan dulu, berpikir, baru berbicara" },
    ],
  },
  {
    dimension: "E/I",
    question: "Anda lebih suka bekerja:",
    options: [
      { value: "E", label: "Dalam tim dengan interaksi konstan" },
      { value: "I", label: "Sendiri dengan fokus mendalam" },
    ],
  },
  // S/N - Sensing vs Intuition
  {
    dimension: "S/N",
    question: "Ketika belajar sesuatu yang baru, Anda lebih fokus pada:",
    options: [
      { value: "S", label: "Fakta, detail, dan instruksi step-by-step yang jelas" },
      { value: "N", label: "Konsep besar, pola, dan kemungkinan masa depan" },
    ],
  },
  {
    dimension: "S/N",
    question: "Dalam menghadapi masalah, Anda lebih mengandalkan:",
    options: [
      { value: "S", label: "Pengalaman masa lalu dan metode yang sudah terbukti" },
      { value: "N", label: "Intuisi dan mencoba pendekatan baru yang kreatif" },
    ],
  },
  {
    dimension: "S/N",
    question: "Anda lebih tertarik pada:",
    options: [
      { value: "S", label: "Hal-hal praktis dan aplikasi real-world yang konkret" },
      { value: "N", label: "Teori, ide abstrak, dan kemungkinan di masa depan" },
    ],
  },
  {
    dimension: "S/N",
    question: "Saat membaca atau mendengar, Anda lebih memperhatikan:",
    options: [
      { value: "S", label: "Detail spesifik dan fakta akurat" },
      { value: "N", label: "Makna keseluruhan dan implikasi lebih luas" },
    ],
  },
  // T/F - Thinking vs Feeling
  {
    dimension: "T/F",
    question: "Saat membuat keputusan penting, prioritas utama Anda:",
    options: [
      { value: "T", label: "Logika, analisis objektif, dan efisiensi" },
      { value: "F", label: "Nilai-nilai, empati, dan dampak pada orang lain" },
    ],
  },
  {
    dimension: "T/F",
    question: "Dalam menyelesaikan konflik, Anda lebih menekankan:",
    options: [
      { value: "T", label: "Keadilan dan standar yang objektif" },
      { value: "F", label: "Harmoni dan perasaan semua pihak" },
    ],
  },
  {
    dimension: "T/F",
    question: "Orang lain sering menilai Anda sebagai:",
    options: [
      { value: "T", label: "Logis, objektif, dan langsung to-the-point" },
      { value: "F", label: "Empatik, hangat, dan memahami perasaan" },
    ],
  },
  {
    dimension: "T/F",
    question: "Dalam memberikan kritik, Anda cenderung:",
    options: [
      { value: "T", label: "Langsung dan fokus pada fakta/kesalahan" },
      { value: "F", label: "Menjaga perasaan dan membungkus dengan lembut" },
    ],
  },
  // J/P - Judging vs Perceiving
  {
    dimension: "J/P",
    question: "Dalam mengerjakan proyek, Anda lebih suka:",
    options: [
      { value: "J", label: "Membuat rencana detail dan deadline yang jelas sejak awal" },
      { value: "P", label: "Fleksibel, spontan, dan menyesuaikan sambil jalan" },
    ],
  },
  {
    dimension: "J/P",
    question: "Ruang kerja/kamar Anda cenderung:",
    options: [
      { value: "J", label: "Terorganisir rapi dengan sistem yang jelas" },
      { value: "P", label: "Kreatif berantakan, tapi Anda tahu di mana sesuatu berada" },
    ],
  },
  {
    dimension: "J/P",
    question: "Saat berlibur, Anda lebih nyaman dengan:",
    options: [
      { value: "J", label: "Itinerary yang terencana dengan baik" },
      { value: "P", label: "Pergi tanpa rencana pasti dan lihat apa yang terjadi" },
    ],
  },
  {
    dimension: "J/P",
    question: "Anda merasa paling produktif ketika:",
    options: [
      { value: "J", label: "Punya jadwal terstruktur dan checklist yang clear" },
      { value: "P", label: "Bebas mengeksplorasi dan beradaptasi sesuai mood" },
    ],
  },
];

interface PersonalityResult {
  mbtiType: string;
  description: string;
  strengths: string[];
  careerFit: string[];
}

export function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate MBTI type from backend
      setIsCalculating(true);
      try {
        // Include all answers including the current one
        const allAnswers = { ...answers };
        
        const quizAnswers = Object.entries(allAnswers).map(([questionId, value]) => ({
          questionId: parseInt(questionId),
          value
        }));

        if (quizAnswers.length !== questions.length) {
          throw new Error("Please answer all questions");
        }

        const response = await fetch("/api/personality/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: quizAnswers })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to calculate personality");
        }

        const data = await response.json();
        setResult(data);
        
        // Store personality type in localStorage for later use
        localStorage.setItem("userPersonalityType", data.mbtiType);
        localStorage.setItem("userPersonalityData", JSON.stringify(data));
        
        setShowResult(true);
      } catch (error) {
        console.error("Error calculating personality:", error);
        alert(error instanceof Error ? error.message : "Gagal menghitung tipe kepribadian");
        // Fallback to default result
        setResult({
          mbtiType: "INTJ",
          description: "The Architect - Strategic, analytical, and independent thinker.",
          strengths: ["Analytical thinking", "Strategic planning"],
          careerFit: ["Software Developer", "Engineer"]
        });
        setShowResult(true);
      } finally {
        setIsCalculating(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResult && result) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h3 className="text-2xl font-bold">Hasil Analisis Kepribadian</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-primary/10 rounded-lg">
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary">{result.mbtiType}</div>
              <p className="text-lg font-medium">{result.description}</p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Kekuatan Anda:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {result.strengths.map((strength, i) => (
                      <span key={i} className="px-3 py-1 bg-background rounded-full text-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Karier yang Cocok:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {result.careerFit.map((career, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            data-testid="button-view-recommendations"
            onClick={() => window.location.href = "/simulation"}
          >
            Buat Simulasi Karier
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
                  onClick={() => {
                    handleAnswer(option.value);
                    // If this is the last question and Next button will be enabled, give user time to review
                  }}
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
          disabled={!answers[currentQuestion] || isCalculating}
          data-testid="button-next"
        >
          {isCalculating ? "Menghitung..." : currentQuestion === questions.length - 1 ? "Lihat Hasil" : "Selanjutnya"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
