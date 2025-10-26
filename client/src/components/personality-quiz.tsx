import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, TrendingUp, DollarSign, Clock, Zap, BookOpen, Briefcase, Target, Shield } from "lucide-react";

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

interface EnneagramResult {
  type: number;
  wing: string;
  description: string;
  coreMotivation: string;
  coreFear: string;
  strengths: string[];
  challenges: string[];
  careerFit: string[];
}

interface JungianFunctions {
  dominant: string;
  auxiliary: string;
  tertiary: string;
  inferior: string;
  descriptions: {
    [key: string]: string;
  };
}

interface RecessionProofCareer {
  title: string;
  fitScore: number;
  recessionResistance: number;
  reason: string;
  avgSalary: string;
  demandTrend: "Tinggi" | "Stabil" | "Menurun";
  remoteWorkable: boolean;
}

interface CostEffectiveSkill {
  skill: string;
  learningCost: "Gratis" | "Rendah" | "Menengah";
  timeToLearn: string;
  roi: number;
  resources: string[];
}

interface SideHustleRecommendation {
  title: string;
  fitScore: number;
  potentialIncome: string;
  startupCost: "Minimal" | "Rendah" | "Menengah";
  timeCommitment: string;
  whyGoodFit: string;
}

interface ProPsychResult extends PersonalityResult {
  jungianFunctions: JungianFunctions;
  enneagram: EnneagramResult;
  recessionProofCareers: RecessionProofCareer[];
  costEffectiveSkills: CostEffectiveSkill[];
  sideHustles: SideHustleRecommendation[];
  preferredWorkEnvironment: string[];
  communicationStyle: string;
  incomeOptimizationStrategy: string;
  budgetFriendlyPath: string;
}

export function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showProResult, setShowProResult] = useState(false);
  const [proResult, setProResult] = useState<ProPsychResult | null>(null);
  const [isLoadingPro, setIsLoadingPro] = useState(false);

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

  const handleViewProAnalysis = async () => {
    if (!result?.mbtiType) return;
    
    setIsLoadingPro(true);
    try {
      const response = await fetch("/api/personality/pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mbtiType: result.mbtiType })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Pro analysis");
      }

      const data = await response.json();
      setProResult(data);
      setShowProResult(true);
    } catch (error) {
      console.error("Error fetching Pro analysis:", error);
      alert("Gagal memuat analisis PRO. Silakan coba lagi.");
    } finally {
      setIsLoadingPro(false);
    }
  };

  // PRO PSIKOTES RESULT VIEW - Check this FIRST before basic result
  if (showProResult && proResult) {
    return (
      <div className="max-w-5xl mx-auto space-y-6" data-testid="pro-analysis-view">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Analisis PRO - Fokus Ekonomi Resesi</h2>
                <p className="text-muted-foreground mt-2">Rekomendasi karir & skill untuk {proResult.mbtiType}</p>
              </div>
              <Button variant="outline" onClick={() => setShowProResult(false)} data-testid="button-back-basic">
                Kembali
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        {/* Recession-Proof Careers */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Karir Tahan Resesi</h3>
            </div>
            <p className="text-muted-foreground">Karir dengan demand tinggi bahkan saat ekonomi sulit</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {proResult.recessionProofCareers.map((career, idx) => (
              <div key={idx} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{career.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{career.reason}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                      <Shield className="h-4 w-4" />
                      {career.recessionResistance}% Tahan Resesi
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Target className="h-4 w-4" />
                      Fit: {career.fitScore}%
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span>{career.avgSalary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Demand: {career.demandTrend}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{career.remoteWorkable ? "Remote OK ✓" : "On-site"}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Cost-Effective Skills */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Skill ROI Tinggi (Gratis/Murah)</h3>
            </div>
            <p className="text-muted-foreground">Skill yang bisa dipelajari dengan budget minimal, hasil maksimal</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {proResult.costEffectiveSkills.map((skill, idx) => (
              <div key={idx} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold">{skill.skill}</h4>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                        💰 {skill.learningCost}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {skill.timeToLearn}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                        <Zap className="h-3 w-3 inline mr-1" />
                        ROI: {skill.roi}%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Resources Gratis:</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.resources.map((resource, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-muted rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Side Hustles */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Rekomendasi Side Hustle</h3>
            </div>
            <p className="text-muted-foreground">Income tambahan yang cocok dengan kepribadian Anda</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {proResult.sideHustles.map((hustle, idx) => (
              <div key={idx} className="p-4 border rounded-lg space-y-2">
                <h4 className="font-bold text-lg">{hustle.title}</h4>
                <p className="text-sm text-muted-foreground">{hustle.whyGoodFit}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mt-3">
                  <div>
                    <span className="font-semibold">Potensi Income:</span>
                    <br />{hustle.potentialIncome}
                  </div>
                  <div>
                    <span className="font-semibold">Modal:</span>
                    <br />{hustle.startupCost}
                  </div>
                  <div>
                    <span className="font-semibold">Waktu:</span>
                    <br />{hustle.timeCommitment}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Strategi & Budget Path */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Strategi Income Optimization</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{proResult.incomeOptimizationStrategy}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Budget-Friendly Path</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-line">{proResult.budgetFriendlyPath}</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="py-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Siap Memulai?</h3>
              <p className="text-muted-foreground">Buat simulasi karir untuk melihat jalur yang lebih spesifik</p>
              <Button
                size="lg"
                onClick={() => window.location.href = "/simulation"}
                data-testid="button-create-simulation"
              >
                Buat Simulasi Karier Sekarang
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // BASIC RESULT VIEW
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
          
          {!showProResult && (
            <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-6 rounded-lg border-2 border-primary/30">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-lg">🔥 Analisis PRO - Khusus Ekonomi Resesi</h4>
                  <p className="text-sm text-muted-foreground">
                    Dapatkan rekomendasi karir tahan resesi, skill gratis ROI tinggi, side hustle, dan strategi income optimization yang disesuaikan dengan kepribadian Anda!
                  </p>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleViewProAnalysis}
                    disabled={isLoadingPro}
                    data-testid="button-view-pro-analysis"
                  >
                    {isLoadingPro ? "Memuat..." : "Lihat Analisis PRO (Gratis!) ⚡"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <Button
            className="w-full"
            size="lg"
            variant="outline"
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
