import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import openai from "./openai";
import { calculateMBTI, getCareerCompatibility, type QuizAnswer } from "./personality";
import { insertSimulationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Personality Quiz Routes
  app.post("/api/personality/calculate", async (req, res) => {
    try {
      const { answers } = req.body as { answers: QuizAnswer[] };
      
      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "Invalid answers format" });
      }

      const result = calculateMBTI(answers);
      res.json(result);
    } catch (error) {
      console.error("Error calculating personality:", error);
      res.status(500).json({ error: "Failed to calculate personality type" });
    }
  });

  // AI Scenario Generation
  app.post("/api/simulations/generate", async (req, res) => {
    try {
      const { education, careerGoal, decision, jungianType, notes } = req.body;

      if (!education || !careerGoal || !decision) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Generate AI scenario using OpenAI
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const prompt = `Kamu adalah Destinova AI, asisten karier untuk anak muda Indonesia.

Berdasarkan profil berikut:
- Pendidikan: ${education}
- Tujuan Karier: ${careerGoal}
- Tipe Kepribadian: ${jungianType || "Belum diketahui"}
- Keputusan yang ingin disimulasikan: ${decision}
${notes ? `- Catatan tambahan: ${notes}` : ""}

Buatkan analisis LENGKAP dalam format JSON dengan struktur:
{
  "scenario": "Penjelasan detail dampak keputusan ini terhadap karier (3-4 paragraf dalam bahasa Indonesia)",
  "salaryEstimate": "Range gaji dalam format 'Rp X-Y juta'",
  "salaryIncrease": "Persentase kenaikan gaji dari kondisi saat ini (contoh: '+150%')",
  "timeCommitment": "Waktu yang dibutuhkan (contoh: '6 bulan', '1 tahun')",
  "fitScore": number (0-100),
  "jobDemand": "Tinggi/Sedang/Rendah",
  "actionPlan": [
    "Langkah 1 yang spesifik dan actionable",
    "Langkah 2 yang spesifik dan actionable",
    ... (minimal 5-7 langkah)
  ],
  "careerPath": [
    {
      "timeline": "0-1 tahun",
      "position": "Posisi entry-level",
      "salary": "Rp X-Y juta",
      "description": "Deskripsi singkat"
    },
    ... (minimal 4 tahap karier)
  ],
  "skills": ["Skill 1", "Skill 2", ...],
  "careerCircle": "Tipe kepribadian yang dominan di lingkungan kerja ini"
}

Pastikan semua teks dalam bahasa Indonesia yang natural dan relevan untuk konteks Indonesia.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          {
            role: "system",
            content: "Kamu adalah AI asisten karier yang ahli dalam analisis karier dan pendidikan untuk Indonesia. Selalu berikan output dalam format JSON yang valid."
          },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 8192
      });

      const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

      // Calculate compatibility score
      const compatibilityScore = jungianType 
        ? getCareerCompatibility(jungianType, careerGoal)
        : aiResponse.fitScore || 75;

      const result = {
        aiScenario: aiResponse.scenario || "Scenario generated successfully",
        actionPlan: aiResponse.actionPlan || [],
        metrics: {
          salary: aiResponse.salaryEstimate || "Rp 5-8 juta",
          salaryIncrease: aiResponse.salaryIncrease || "+50%",
          timeCommitment: aiResponse.timeCommitment || "6 bulan",
          fitScore: compatibilityScore,
          jobDemand: aiResponse.jobDemand || "Sedang",
          skills: aiResponse.skills || []
        },
        careerPaths: aiResponse.careerPath || [],
        careerCircle: aiResponse.careerCircle || "Analytical and technical professionals"
      };

      res.json(result);
    } catch (error) {
      console.error("Error generating simulation:", error);
      res.status(500).json({ error: "Failed to generate simulation" });
    }
  });

  // Simulation CRUD
  app.get("/api/simulations", async (req, res) => {
    try {
      const simulations = await storage.getAllSimulations();
      res.json(simulations);
    } catch (error) {
      console.error("Error fetching all simulations:", error);
      res.status(500).json({ error: "Failed to fetch simulations" });
    }
  });

  app.post("/api/simulations", async (req, res) => {
    try {
      const simulationData = insertSimulationSchema.parse(req.body);
      const simulation = await storage.createSimulation(simulationData);
      res.json(simulation);
    } catch (error) {
      console.error("Error creating simulation:", error);
      res.status(400).json({ error: "Invalid simulation data" });
    }
  });

  app.get("/api/simulations/:id", async (req, res) => {
    try {
      const simulation = await storage.getSimulation(req.params.id);
      if (!simulation) {
        return res.status(404).json({ error: "Simulation not found" });
      }
      res.json(simulation);
    } catch (error) {
      console.error("Error fetching simulation:", error);
      res.status(500).json({ error: "Failed to fetch simulation" });
    }
  });

  app.get("/api/simulations/user/:userId", async (req, res) => {
    try {
      const simulations = await storage.getSimulationsByUser(req.params.userId);
      res.json(simulations);
    } catch (error) {
      console.error("Error fetching user simulations:", error);
      res.status(500).json({ error: "Failed to fetch simulations" });
    }
  });

  // Training data
  app.get("/api/trainings", async (req, res) => {
    try {
      const trainings = await storage.getAllTrainings();
      res.json(trainings);
    } catch (error) {
      console.error("Error fetching trainings:", error);
      res.status(500).json({ error: "Failed to fetch trainings" });
    }
  });

  // Profile routes
  app.post("/api/profiles", async (req, res) => {
    try {
      const profile = await storage.createProfile(req.body);
      res.json(profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  app.get("/api/profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
