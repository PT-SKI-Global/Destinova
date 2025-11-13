var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertProfileSchema: () => insertProfileSchema,
  insertSimulationSchema: () => insertSimulationSchema,
  insertTrainingSchema: () => insertTrainingSchema,
  insertUserSchema: () => insertUserSchema,
  profiles: () => profiles,
  simulations: () => simulations,
  trainings: () => trainings,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  // nullable for guest users
  name: text("name").notNull(),
  jungianType: text("jungian_type"),
  // MBTI type
  education: text("education"),
  // Current education level
  careerGoal: text("career_goal"),
  interests: text("interests").array(),
  preferences: jsonb("preferences"),
  // lifestyle, work style, etc
  createdAt: timestamp("created_at").defaultNow()
});
var insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true
});
var simulations = pgTable("simulations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  // nullable for guest users
  title: text("title").notNull(),
  type: text("type").notNull(),
  // education, training, career, financial
  inputs: jsonb("inputs").notNull(),
  // user inputs for the simulation
  aiScenario: text("ai_scenario"),
  // AI generated scenario
  actionPlan: jsonb("action_plan"),
  // structured action plan
  metrics: jsonb("metrics"),
  // salary, fit score, time investment, etc
  careerPaths: jsonb("career_paths"),
  // predicted career paths
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  createdAt: true
});
var trainings = pgTable("trainings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  // tech, business, creative, etc
  description: text("description"),
  suitablePersonalities: text("suitable_personalities").array(),
  avgSalaryImpact: integer("avg_salary_impact"),
  // percentage
  timeCommitment: integer("time_commitment"),
  // hours
  difficulty: text("difficulty")
  // beginner, intermediate, advanced
});
var insertTrainingSchema = createInsertSchema(trainings).omit({
  id: true
});

// server/db.ts
import "dotenv/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Profile operations
  async getProfile(userId) {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile || void 0;
  }
  async createProfile(insertProfile) {
    const [profile] = await db.insert(profiles).values(insertProfile).returning();
    return profile;
  }
  async updateProfile(userId, profileData) {
    const [profile] = await db.update(profiles).set(profileData).where(eq(profiles.userId, userId)).returning();
    return profile;
  }
  // Simulation operations
  async getAllSimulations() {
    return await db.select().from(simulations).orderBy(desc(simulations.createdAt)).limit(100);
  }
  async getSimulation(id) {
    const [simulation] = await db.select().from(simulations).where(eq(simulations.id, id));
    return simulation || void 0;
  }
  async getSimulationsByUser(userId) {
    return await db.select().from(simulations).where(eq(simulations.userId, userId)).orderBy(desc(simulations.createdAt));
  }
  async createSimulation(insertSimulation) {
    const [simulation] = await db.insert(simulations).values(insertSimulation).returning();
    return simulation;
  }
  async updateSimulation(id, simulationData) {
    const [simulation] = await db.update(simulations).set(simulationData).where(eq(simulations.id, id)).returning();
    return simulation;
  }
  // Training operations
  async getAllTrainings() {
    return await db.select().from(trainings);
  }
  async getTrainingsByCategory(category) {
    return await db.select().from(trainings).where(eq(trainings.category, category));
  }
  async createTraining(insertTraining) {
    const [training] = await db.insert(trainings).values(insertTraining).returning();
    return training;
  }
};
var storage = new DatabaseStorage();

// server/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});
var openai_default = openai;

// server/personality.ts
var MBTI_TYPES = {
  "INTJ": {
    mbtiType: "INTJ",
    description: "The Architect - Strategic, analytical, and independent thinker.",
    strengths: ["Analytical thinking", "Strategic planning", "Problem solving", "Independence"],
    careerFit: ["Software Developer", "Data Scientist", "Engineer", "Strategist", "Researcher"]
  },
  "INTP": {
    mbtiType: "INTP",
    description: "The Logician - Innovative, curious, and theoretical.",
    strengths: ["Logical analysis", "Innovation", "Theoretical thinking", "Curiosity"],
    careerFit: ["Software Engineer", "Scientist", "Professor", "Analyst", "Architect"]
  },
  "ENTJ": {
    mbtiType: "ENTJ",
    description: "The Commander - Bold, imaginative, and strong-willed leader.",
    strengths: ["Leadership", "Strategic thinking", "Decisiveness", "Efficiency"],
    careerFit: ["CEO", "Manager", "Consultant", "Lawyer", "Entrepreneur"]
  },
  "ENTP": {
    mbtiType: "ENTP",
    description: "The Debater - Smart, curious, and loves intellectual challenges.",
    strengths: ["Innovation", "Quick thinking", "Adaptability", "Communication"],
    careerFit: ["Entrepreneur", "Consultant", "Marketing", "Inventor", "Lawyer"]
  },
  "INFJ": {
    mbtiType: "INFJ",
    description: "The Advocate - Quiet, mystical, and inspiring idealist.",
    strengths: ["Empathy", "Insight", "Creativity", "Idealism"],
    careerFit: ["Counselor", "Writer", "Teacher", "Designer", "Psychologist"]
  },
  "INFP": {
    mbtiType: "INFP",
    description: "The Mediator - Poetic, kind, and altruistic.",
    strengths: ["Creativity", "Empathy", "Idealism", "Open-mindedness"],
    careerFit: ["Writer", "Artist", "Counselor", "Teacher", "Designer"]
  },
  "ENFJ": {
    mbtiType: "ENFJ",
    description: "The Protagonist - Charismatic, inspiring, and natural leader.",
    strengths: ["Leadership", "Communication", "Empathy", "Organization"],
    careerFit: ["Teacher", "HR Manager", "Counselor", "Public Speaker", "Coach"]
  },
  "ENFP": {
    mbtiType: "ENFP",
    description: "The Campaigner - Enthusiastic, creative, and sociable.",
    strengths: ["Creativity", "Communication", "Enthusiasm", "Flexibility"],
    careerFit: ["Marketing", "Designer", "Entrepreneur", "Teacher", "Journalist"]
  },
  "ISTJ": {
    mbtiType: "ISTJ",
    description: "The Logistician - Practical, fact-minded, and reliable.",
    strengths: ["Organization", "Reliability", "Attention to detail", "Logic"],
    careerFit: ["Accountant", "Administrator", "Engineer", "Analyst", "Manager"]
  },
  "ISFJ": {
    mbtiType: "ISFJ",
    description: "The Defender - Dedicated, warm, and protector.",
    strengths: ["Reliability", "Empathy", "Attention to detail", "Dedication"],
    careerFit: ["Nurse", "Teacher", "Administrator", "Counselor", "Librarian"]
  },
  "ESTJ": {
    mbtiType: "ESTJ",
    description: "The Executive - Excellent administrator, organized and traditional.",
    strengths: ["Organization", "Leadership", "Decisiveness", "Practicality"],
    careerFit: ["Manager", "Administrator", "Lawyer", "Judge", "Military Officer"]
  },
  "ESFJ": {
    mbtiType: "ESFJ",
    description: "The Consul - Caring, social, and popular.",
    strengths: ["Social skills", "Organization", "Empathy", "Cooperation"],
    careerFit: ["Teacher", "Nurse", "HR", "Event Planner", "Social Worker"]
  },
  "ISTP": {
    mbtiType: "ISTP",
    description: "The Virtuoso - Bold, practical, and master of tools.",
    strengths: ["Technical skills", "Problem solving", "Practicality", "Adaptability"],
    careerFit: ["Engineer", "Mechanic", "Pilot", "Chef", "Craftsperson"]
  },
  "ISFP": {
    mbtiType: "ISFP",
    description: "The Adventurer - Flexible, charming, and artistic.",
    strengths: ["Creativity", "Flexibility", "Empathy", "Aesthetics"],
    careerFit: ["Artist", "Designer", "Musician", "Chef", "Photographer"]
  },
  "ESTP": {
    mbtiType: "ESTP",
    description: "The Entrepreneur - Smart, energetic, and perceptive.",
    strengths: ["Action-oriented", "Adaptability", "Problem solving", "Social skills"],
    careerFit: ["Entrepreneur", "Sales", "Marketing", "Paramedic", "Detective"]
  },
  "ESFP": {
    mbtiType: "ESFP",
    description: "The Entertainer - Spontaneous, energetic, and enthusiastic.",
    strengths: ["Social skills", "Enthusiasm", "Creativity", "Adaptability"],
    careerFit: ["Performer", "Teacher", "Sales", "Event Planner", "Designer"]
  }
};
function calculateMBTI(answers) {
  let E_score = 0;
  let I_score = 0;
  let S_score = 0;
  let N_score = 0;
  let T_score = 0;
  let F_score = 0;
  let J_score = 0;
  let P_score = 0;
  answers.forEach((answer) => {
    switch (answer.value) {
      case "E":
        E_score++;
        break;
      case "I":
        I_score++;
        break;
      case "S":
        S_score++;
        break;
      case "N":
        N_score++;
        break;
      case "T":
        T_score++;
        break;
      case "F":
        F_score++;
        break;
      case "J":
        J_score++;
        break;
      case "P":
        P_score++;
        break;
    }
  });
  console.log("MBTI Calculation - Scores:", {
    E_score,
    I_score,
    S_score,
    N_score,
    T_score,
    F_score,
    J_score,
    P_score,
    answers: answers.map((a) => ({ dimension: a.dimension, value: a.value }))
  });
  const mbti = (E_score > I_score ? "E" : "I") + (N_score > S_score ? "N" : "S") + (T_score > F_score ? "T" : "F") + (J_score > P_score ? "J" : "P");
  console.log("MBTI Result:", mbti);
  return MBTI_TYPES[mbti] || MBTI_TYPES["INTJ"];
}
function getCareerCompatibility(mbtiType, career) {
  const personality = MBTI_TYPES[mbtiType];
  if (!personality) return 50;
  const isDirectFit = personality.careerFit.some(
    (fit) => career.toLowerCase().includes(fit.toLowerCase()) || fit.toLowerCase().includes(career.toLowerCase())
  );
  if (isDirectFit) return 85 + Math.floor(Math.random() * 15);
  const techCareers = ["developer", "engineer", "programmer", "data", "tech"];
  const creativeCareers = ["designer", "artist", "writer", "creative"];
  const businessCareers = ["manager", "consultant", "entrepreneur", "business"];
  const socialCareers = ["teacher", "counselor", "nurse", "social"];
  const isTech = techCareers.some((t) => career.toLowerCase().includes(t));
  const isCreative = creativeCareers.some((t) => career.toLowerCase().includes(t));
  const isBusiness = businessCareers.some((t) => career.toLowerCase().includes(t));
  const isSocial = socialCareers.some((t) => career.toLowerCase().includes(t));
  if (mbtiType.startsWith("INT") && isTech) return 70 + Math.floor(Math.random() * 15);
  if (mbtiType.startsWith("ENT") && isBusiness) return 70 + Math.floor(Math.random() * 15);
  if (mbtiType.startsWith("INF") && isCreative) return 70 + Math.floor(Math.random() * 15);
  if (mbtiType.startsWith("E") && isSocial) return 70 + Math.floor(Math.random() * 15);
  return 50 + Math.floor(Math.random() * 20);
}
var JUNGIAN_FUNCTIONS = {
  "INTJ": {
    dominant: "Ni",
    auxiliary: "Te",
    tertiary: "Fi",
    inferior: "Se",
    descriptions: {
      "Ni": "Introverted Intuition - Visi jangka panjang, melihat pola tersembunyi",
      "Te": "Extraverted Thinking - Efisiensi, struktur, hasil terukur",
      "Fi": "Introverted Feeling - Nilai personal, integritas dalam",
      "Se": "Extraverted Sensing - Detail konkret, pengalaman sensorik"
    }
  },
  "INTP": {
    dominant: "Ti",
    auxiliary: "Ne",
    tertiary: "Si",
    inferior: "Fe",
    descriptions: {
      "Ti": "Introverted Thinking - Logika internal, analisis mendalam",
      "Ne": "Extraverted Intuition - Ide kreatif, kemungkinan tak terbatas",
      "Si": "Introverted Sensing - Memori detail, pengalaman masa lalu",
      "Fe": "Extraverted Feeling - Harmoni sosial, empati eksternal"
    }
  },
  "ENTJ": {
    dominant: "Te",
    auxiliary: "Ni",
    tertiary: "Se",
    inferior: "Fi",
    descriptions: {
      "Te": "Extraverted Thinking - Leadership, strategi bisnis efisien",
      "Ni": "Introverted Intuition - Visi strategis jangka panjang",
      "Se": "Extraverted Sensing - Action-oriented, responsif terhadap situasi",
      "Fi": "Introverted Feeling - Nilai internal yang kuat"
    }
  },
  "ENTP": {
    dominant: "Ne",
    auxiliary: "Ti",
    tertiary: "Fe",
    inferior: "Si",
    descriptions: {
      "Ne": "Extraverted Intuition - Inovasi, brainstorming",
      "Ti": "Introverted Thinking - Analisis logis, debugging mental",
      "Fe": "Extraverted Feeling - Charisma, membaca suasana",
      "Si": "Introverted Sensing - Konsistensi, rutinitas"
    }
  },
  "INFJ": {
    dominant: "Ni",
    auxiliary: "Fe",
    tertiary: "Ti",
    inferior: "Se",
    descriptions: {
      "Ni": "Introverted Intuition - Insight mendalam, visioner",
      "Fe": "Extraverted Feeling - Empati, harmoni kelompok",
      "Ti": "Introverted Thinking - Logika terstruktur",
      "Se": "Extraverted Sensing - Kesadaran lingkungan"
    }
  },
  "INFP": {
    dominant: "Fi",
    auxiliary: "Ne",
    tertiary: "Si",
    inferior: "Te",
    descriptions: {
      "Fi": "Introverted Feeling - Autentisitas, nilai kuat",
      "Ne": "Extraverted Intuition - Kemungkinan kreatif",
      "Si": "Introverted Sensing - Detail personal",
      "Te": "Extraverted Thinking - Organisasi eksternal"
    }
  },
  "ENFJ": {
    dominant: "Fe",
    auxiliary: "Ni",
    tertiary: "Se",
    inferior: "Ti",
    descriptions: {
      "Fe": "Extraverted Feeling - Inspirasi, membimbing orang",
      "Ni": "Introverted Intuition - Visi untuk masa depan",
      "Se": "Extraverted Sensing - Present-focused",
      "Ti": "Introverted Thinking - Analisis internal"
    }
  },
  "ENFP": {
    dominant: "Ne",
    auxiliary: "Fi",
    tertiary: "Te",
    inferior: "Si",
    descriptions: {
      "Ne": "Extraverted Intuition - Entusiasme, eksplorasi",
      "Fi": "Introverted Feeling - Autentik, passionate",
      "Te": "Extraverted Thinking - Efisiensi praktis",
      "Si": "Introverted Sensing - Tradisi, rutinitas"
    }
  },
  "ISTJ": {
    dominant: "Si",
    auxiliary: "Te",
    tertiary: "Fi",
    inferior: "Ne",
    descriptions: {
      "Si": "Introverted Sensing - Detail, akurasi, tradisi",
      "Te": "Extraverted Thinking - Efisiensi terstruktur",
      "Fi": "Introverted Feeling - Loyalitas, nilai personal",
      "Ne": "Extraverted Intuition - Kemungkinan baru"
    }
  },
  "ISFJ": {
    dominant: "Si",
    auxiliary: "Fe",
    tertiary: "Ti",
    inferior: "Ne",
    descriptions: {
      "Si": "Introverted Sensing - Protektif, detail-oriented",
      "Fe": "Extraverted Feeling - Caring, supportif",
      "Ti": "Introverted Thinking - Logika praktis",
      "Ne": "Extraverted Intuition - Inovasi"
    }
  },
  "ESTJ": {
    dominant: "Te",
    auxiliary: "Si",
    tertiary: "Ne",
    inferior: "Fi",
    descriptions: {
      "Te": "Extraverted Thinking - Administrator, organisator",
      "Si": "Introverted Sensing - Tradisi, prosedur",
      "Ne": "Extraverted Intuition - Adaptasi",
      "Fi": "Introverted Feeling - Nilai internal"
    }
  },
  "ESFJ": {
    dominant: "Fe",
    auxiliary: "Si",
    tertiary: "Ne",
    inferior: "Ti",
    descriptions: {
      "Fe": "Extraverted Feeling - Hospitality, harmoni",
      "Si": "Introverted Sensing - Mengingat preferensi orang",
      "Ne": "Extraverted Intuition - Kreativitas sosial",
      "Ti": "Introverted Thinking - Logika"
    }
  },
  "ISTP": {
    dominant: "Ti",
    auxiliary: "Se",
    tertiary: "Ni",
    inferior: "Fe",
    descriptions: {
      "Ti": "Introverted Thinking - Analisis mekanis",
      "Se": "Extraverted Sensing - Hands-on, praktis",
      "Ni": "Introverted Intuition - Problem-solving intuitif",
      "Fe": "Extraverted Feeling - Koneksi emosional"
    }
  },
  "ISFP": {
    dominant: "Fi",
    auxiliary: "Se",
    tertiary: "Ni",
    inferior: "Te",
    descriptions: {
      "Fi": "Introverted Feeling - Estetika, nilai artistik",
      "Se": "Extraverted Sensing - Pengalaman sensorik",
      "Ni": "Introverted Intuition - Kreativitas mendalam",
      "Te": "Extraverted Thinking - Struktur eksternal"
    }
  },
  "ESTP": {
    dominant: "Se",
    auxiliary: "Ti",
    tertiary: "Fe",
    inferior: "Ni",
    descriptions: {
      "Se": "Extraverted Sensing - Action, responsif",
      "Ti": "Introverted Thinking - Tactical thinking",
      "Fe": "Extraverted Feeling - Charisma natural",
      "Ni": "Introverted Intuition - Visi jangka panjang"
    }
  },
  "ESFP": {
    dominant: "Se",
    auxiliary: "Fi",
    tertiary: "Te",
    inferior: "Ni",
    descriptions: {
      "Se": "Extraverted Sensing - Entertainer, hidup saat ini",
      "Fi": "Introverted Feeling - Autentik, expressive",
      "Te": "Extraverted Thinking - Praktis",
      "Ni": "Introverted Intuition - Planning"
    }
  }
};
var ENNEAGRAM_TYPES = {
  1: {
    type: 1,
    wing: "1w9 atau 1w2",
    description: "The Reformer - Perfeksionis, berintegritas tinggi, fokus pada improvement",
    coreMotivation: "Menjadi baik, seimbang, dan berintegritas",
    coreFear: "Corrupt, tidak benar, atau cacat moral",
    strengths: ["Detail-oriented", "Ethical", "Reliable", "Organized"],
    challenges: ["Terlalu kritis", "Perfeksionis berlebihan", "Kaku"],
    careerFit: ["Quality Assurance", "Auditor", "Ethics Officer", "Editor", "Judge"]
  },
  2: {
    type: 2,
    wing: "2w1 atau 2w3",
    description: "The Helper - Empathetic, generous, people-oriented",
    coreMotivation: "Merasa dibutuhkan dan dihargai orang lain",
    coreFear: "Tidak dicintai atau tidak dibutuhkan",
    strengths: ["Empati tinggi", "Generosity", "People skills", "Supportif"],
    challenges: ["People-pleasing", "Mengabaikan kebutuhan sendiri"],
    careerFit: ["Counselor", "Nurse", "Teacher", "HR", "Social Worker"]
  },
  3: {
    type: 3,
    wing: "3w2 atau 3w4",
    description: "The Achiever - Success-oriented, adaptif, goal-driven",
    coreMotivation: "Merasa valuable dan worthwhile",
    coreFear: "Tidak bernilai tanpa prestasi",
    strengths: ["Goal-oriented", "Confident", "Efficient", "Adaptable"],
    challenges: ["Workaholic", "Image-focused"],
    careerFit: ["CEO", "Sales", "Marketing", "Entrepreneur", "Lawyer"]
  },
  4: {
    type: 4,
    wing: "4w3 atau 4w5",
    description: "The Individualist - Creative, sensitive, expressive",
    coreMotivation: "Menemukan diri sendiri dan significance",
    coreFear: "Tidak punya identitas unik",
    strengths: ["Creativity", "Emotional depth", "Authenticity", "Artistic"],
    challenges: ["Moody", "Self-absorbed"],
    careerFit: ["Artist", "Designer", "Writer", "Musician", "Therapist"]
  },
  5: {
    type: 5,
    wing: "5w4 atau 5w6",
    description: "The Investigator - Analytical, perceptive, independent",
    coreMotivation: "Memahami dunia dan kompeten",
    coreFear: "Incompetent atau overwhelmed",
    strengths: ["Analytical", "Innovative", "Independent", "Focused"],
    challenges: ["Detached", "Overthinking"],
    careerFit: ["Researcher", "Data Scientist", "Programmer", "Analyst", "Professor"]
  },
  6: {
    type: 6,
    wing: "6w5 atau 6w7",
    description: "The Loyalist - Responsible, trustworthy, security-oriented",
    coreMotivation: "Merasa aman dan didukung",
    coreFear: "Tanpa support atau guidance",
    strengths: ["Loyal", "Responsible", "Team player", "Prepared"],
    challenges: ["Anxious", "Suspicious"],
    careerFit: ["Project Manager", "Administrator", "Security", "Compliance", "Lawyer"]
  },
  7: {
    type: 7,
    wing: "7w6 atau 7w8",
    description: "The Enthusiast - Spontaneous, versatile, optimistic",
    coreMotivation: "Happy, fulfilled, dan mengalami berbagai hal",
    coreFear: "Terjebak dalam pain atau deprivation",
    strengths: ["Optimistic", "Versatile", "Spontaneous", "Energetic"],
    challenges: ["Impulsif", "Scattered focus"],
    careerFit: ["Entrepreneur", "Marketing", "Event Planner", "Travel Guide", "Designer"]
  },
  8: {
    type: 8,
    wing: "8w7 atau 8w9",
    description: "The Challenger - Powerful, assertive, protective",
    coreMotivation: "Self-reliant dan melindungi diri/orang lain",
    coreFear: "Dikontrol atau dikhianati",
    strengths: ["Leadership", "Decisive", "Confident", "Protective"],
    challenges: ["Dominating", "Confrontational"],
    careerFit: ["CEO", "Military Officer", "Lawyer", "Entrepreneur", "Union Leader"]
  },
  9: {
    type: 9,
    wing: "9w8 atau 9w1",
    description: "The Peacemaker - Agreeable, reassuring, complacent",
    coreMotivation: "Inner peace dan harmony",
    coreFear: "Konflik dan separation",
    strengths: ["Diplomatic", "Patient", "Accepting", "Supportive"],
    challenges: ["Avoidant", "Stubborn passively"],
    careerFit: ["Mediator", "Counselor", "HR", "Librarian", "Veterinarian"]
  }
};
function calculateEnneagram(mbtiType) {
  const mapping = {
    "INTJ": 5,
    "INTP": 5,
    "ENTJ": 8,
    "ENTP": 7,
    "INFJ": 4,
    "INFP": 4,
    "ENFJ": 2,
    "ENFP": 7,
    "ISTJ": 1,
    "ISFJ": 2,
    "ESTJ": 8,
    "ESFJ": 2,
    "ISTP": 9,
    "ISFP": 9,
    "ESTP": 7,
    "ESFP": 7
  };
  const enneagramType = mapping[mbtiType] || 5;
  return ENNEAGRAM_TYPES[enneagramType];
}
function getJungianFunctions(mbtiType) {
  return JUNGIAN_FUNCTIONS[mbtiType] || JUNGIAN_FUNCTIONS["INTJ"];
}
function calculateProPsych(mbtiType) {
  const basicResult = MBTI_TYPES[mbtiType] || MBTI_TYPES["INTJ"];
  const jungianFunctions = getJungianFunctions(mbtiType);
  const enneagram = calculateEnneagram(mbtiType);
  const recessionProofCareers = [];
  if (mbtiType.startsWith("INT") || mbtiType.startsWith("IST")) {
    recessionProofCareers.push({
      title: "Data Analyst / Data Scientist",
      fitScore: 92,
      recessionResistance: 95,
      reason: "Analytical mindset cocok untuk data-driven decisions. Demand tinggi di era digital.",
      avgSalary: "Rp 8-15 juta/bulan",
      demandTrend: "Tinggi",
      remoteWorkable: true
    });
  }
  if (mbtiType[2] === "T") {
    recessionProofCareers.push({
      title: "IT Support / Cybersecurity Specialist",
      fitScore: 88,
      recessionResistance: 90,
      reason: "Bisnis selalu butuh IT support. Critical infrastructure tidak bisa dipotong saat resesi.",
      avgSalary: "Rp 6-12 juta/bulan",
      demandTrend: "Tinggi",
      remoteWorkable: true
    });
  }
  if (mbtiType[2] === "F" || mbtiType.includes("SF")) {
    recessionProofCareers.push({
      title: "Healthcare Worker / Perawat",
      fitScore: 85,
      recessionResistance: 98,
      reason: "Kesehatan selalu dibutuhkan. Empati Anda cocok untuk patient care.",
      avgSalary: "Rp 5-10 juta/bulan",
      demandTrend: "Stabil",
      remoteWorkable: false
    });
  }
  if (mbtiType[0] === "E" || mbtiType[1] === "N") {
    recessionProofCareers.push({
      title: "Digital Marketing Specialist",
      fitScore: 87,
      recessionResistance: 80,
      reason: "Bisnis tetap butuh marketing bahkan saat resesi. Kreativitas dan people skills Anda cocok.",
      avgSalary: "Rp 6-12 juta/bulan",
      demandTrend: "Tinggi",
      remoteWorkable: true
    });
  }
  if (mbtiType.includes("STJ") || mbtiType.includes("IST")) {
    recessionProofCareers.push({
      title: "Accounting / Financial Analyst",
      fitScore: 90,
      recessionResistance: 92,
      reason: "Detail-oriented dan terstruktur. Setiap bisnis butuh akuntan, terutama saat resesi untuk cost control.",
      avgSalary: "Rp 7-14 juta/bulan",
      demandTrend: "Stabil",
      remoteWorkable: true
    });
  }
  const fallbackCareers = [
    {
      title: "Content Creator / UX Writer",
      fitScore: 82,
      recessionResistance: 75,
      reason: "Biaya rendah untuk start, fleksibel, dan demand tinggi untuk konten digital.",
      avgSalary: "Rp 5-10 juta/bulan",
      demandTrend: "Tinggi",
      remoteWorkable: true
    },
    {
      title: "Customer Service / Support Specialist",
      fitScore: 80,
      recessionResistance: 85,
      reason: "Selalu dibutuhkan untuk retain customers. Bisa remote, skill interpersonal penting.",
      avgSalary: "Rp 4-8 juta/bulan",
      demandTrend: "Stabil",
      remoteWorkable: true
    },
    {
      title: "Admin / Operations Assistant",
      fitScore: 78,
      recessionResistance: 82,
      reason: "Bisnis tetap butuh operasional support. Entry barrier rendah, bisa scale ke management.",
      avgSalary: "Rp 5-9 juta/bulan",
      demandTrend: "Stabil",
      remoteWorkable: false
    }
  ];
  while (recessionProofCareers.length < 3) {
    recessionProofCareers.push(fallbackCareers[recessionProofCareers.length]);
  }
  const costEffectiveSkills = [
    {
      skill: "Excel & Google Sheets Advanced",
      learningCost: "Gratis",
      timeToLearn: "2-3 bulan",
      roi: 85,
      resources: ["YouTube (Fran Lab)", "ExcelIsFun", "Google Skillshop"]
    },
    {
      skill: "SQL & Database Basics",
      learningCost: "Gratis",
      timeToLearn: "1-2 bulan",
      roi: 90,
      resources: ["SQLBolt", "W3Schools", "Khan Academy"]
    },
    {
      skill: "Digital Marketing (SEO/SEM)",
      learningCost: "Gratis",
      timeToLearn: "2-4 bulan",
      roi: 88,
      resources: ["Google Digital Garage", "HubSpot Academy", "Moz Beginner Guide"]
    }
  ];
  if (mbtiType[1] === "N") {
    costEffectiveSkills.push({
      skill: "UI/UX Design Fundamentals",
      learningCost: "Gratis",
      timeToLearn: "3-4 bulan",
      roi: 92,
      resources: ["Google UX Design Certificate (Coursera)", "Figma YouTube Channel"]
    });
  }
  if (mbtiType[2] === "T") {
    costEffectiveSkills.push({
      skill: "Python Programming",
      learningCost: "Gratis",
      timeToLearn: "3-5 bulan",
      roi: 95,
      resources: ["freeCodeCamp", "Python.org Tutorial", "Automate the Boring Stuff"]
    });
  }
  const sideHustles = [];
  if (mbtiType[2] === "T") {
    sideHustles.push({
      title: "Freelance Data Entry / Virtual Assistant",
      fitScore: 85,
      potentialIncome: "Rp 2-5 juta/bulan",
      startupCost: "Minimal",
      timeCommitment: "10-15 jam/minggu",
      whyGoodFit: "Sistematis dan detail-oriented. Bisa dikerjakan remote dengan modal laptop saja."
    });
  }
  if (mbtiType[1] === "N" || mbtiType[2] === "F") {
    sideHustles.push({
      title: "Content Writing / Copywriting",
      fitScore: 88,
      potentialIncome: "Rp 3-8 juta/bulan",
      startupCost: "Minimal",
      timeCommitment: "12-20 jam/minggu",
      whyGoodFit: "Kreativitas dan empati Anda cocok untuk storytelling. Demand tinggi untuk konten."
    });
  }
  if (mbtiType[0] === "E") {
    sideHustles.push({
      title: "Online Teaching / Tutoring",
      fitScore: 90,
      potentialIncome: "Rp 4-10 juta/bulan",
      startupCost: "Rendah",
      timeCommitment: "10-20 jam/minggu",
      whyGoodFit: "People skills Anda cocok untuk mengajar. Platform seperti Ruangguru, Zenius membayar kompetitif."
    });
  }
  const universalSideHustles = [
    {
      title: "Social Media Management",
      fitScore: 80,
      potentialIncome: "Rp 2-6 juta/bulan per client",
      startupCost: "Minimal",
      timeCommitment: "8-15 jam/minggu",
      whyGoodFit: "Skill yang bisa dipelajari cepat. UMKM banyak butuh ini tapi budget terbatas."
    },
    {
      title: "Freelance Translation / Proofreading",
      fitScore: 78,
      potentialIncome: "Rp 2-5 juta/bulan",
      startupCost: "Minimal",
      timeCommitment: "10-15 jam/minggu",
      whyGoodFit: "Fleksibel, bisa dikerjakan kapan saja. Demand tinggi untuk English-Indonesian translation."
    },
    {
      title: "Online Reselling / Dropshipping",
      fitScore: 75,
      potentialIncome: "Rp 3-8 juta/bulan",
      startupCost: "Rendah",
      timeCommitment: "15-25 jam/minggu",
      whyGoodFit: "E-commerce terus tumbuh. Modal kecil, bisa dimulai sambil kerja full-time."
    }
  ];
  for (const hustle of universalSideHustles) {
    if (sideHustles.length >= 3) break;
    sideHustles.push(hustle);
  }
  const preferredWorkEnvironment = [];
  if (mbtiType[0] === "E") preferredWorkEnvironment.push("Kolaborasi tim aktif");
  else preferredWorkEnvironment.push("Deep work dengan interupsi minimal");
  if (mbtiType[1] === "N") preferredWorkEnvironment.push("Inovasi dan problem-solving kreatif");
  else preferredWorkEnvironment.push("Prosedur jelas dengan hasil terukur");
  if (mbtiType[3] === "J") preferredWorkEnvironment.push("Struktur waktu yang teratur");
  else preferredWorkEnvironment.push("Fleksibilitas dan variety");
  let communicationStyle = "";
  if (mbtiType[2] === "T") {
    communicationStyle = "Direct, data-driven, to-the-point. Efektif untuk negoisasi salary dan career advancement.";
  } else {
    communicationStyle = "Empathetic, collaborative. Cocok untuk networking dan building relationships.";
  }
  let incomeOptimizationStrategy = "";
  if (mbtiType[3] === "J") {
    incomeOptimizationStrategy = "Fokus pada satu skill sampai expert (T-shaped), lalu diversifikasi. Build systematic passive income streams.";
  } else {
    incomeOptimizationStrategy = "Multi-skill approach. Combine freelance projects dengan main job. Eksperimen berbagai income streams untuk find best fit.";
  }
  let budgetFriendlyPath = `1. Mulai dengan skill gratis ROI tinggi (${costEffectiveSkills[0].skill}). 
2. Ambil freelance project kecil untuk portfolio. 
3. Build online presence (LinkedIn + portofolio). 
4. Scale up dengan certification murah jika ROI jelas. 
5. Parallel: Start side hustle ${sideHustles[0].title} untuk income boost.`;
  return {
    ...basicResult,
    jungianFunctions,
    enneagram,
    recessionProofCareers,
    costEffectiveSkills,
    sideHustles,
    preferredWorkEnvironment,
    communicationStyle,
    incomeOptimizationStrategy,
    budgetFriendlyPath
  };
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/personality/calculate", async (req, res) => {
    try {
      const { answers } = req.body;
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
  app2.post("/api/personality/pro", async (req, res) => {
    try {
      const { mbtiType } = req.body;
      if (!mbtiType || typeof mbtiType !== "string" || mbtiType.length !== 4) {
        return res.status(400).json({ error: "Invalid MBTI type" });
      }
      const result = calculateProPsych(mbtiType);
      res.json(result);
    } catch (error) {
      console.error("Error generating Pro Psych result:", error);
      res.status(500).json({ error: "Failed to generate Pro Psych analysis" });
    }
  });
  app2.post("/api/simulations/generate", async (req, res) => {
    try {
      const { education, careerGoal, decision, jungianType, notes } = req.body;
      if (!education || !careerGoal || !decision) {
        return res.status(400).json({ error: "Missing required fields" });
      }
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
      const completion = await openai_default.chat.completions.create({
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
      const compatibilityScore = jungianType ? getCareerCompatibility(jungianType, careerGoal) : aiResponse.fitScore || 75;
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
  app2.get("/api/simulations", async (req, res) => {
    try {
      const simulations2 = await storage.getAllSimulations();
      res.json(simulations2);
    } catch (error) {
      console.error("Error fetching all simulations:", error);
      res.status(500).json({ error: "Failed to fetch simulations" });
    }
  });
  app2.post("/api/simulations", async (req, res) => {
    try {
      const simulationData = insertSimulationSchema.parse(req.body);
      const simulation = await storage.createSimulation(simulationData);
      res.json(simulation);
    } catch (error) {
      console.error("Error creating simulation:", error);
      res.status(400).json({ error: "Invalid simulation data" });
    }
  });
  app2.get("/api/simulations/:id", async (req, res) => {
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
  app2.get("/api/simulations/user/:userId", async (req, res) => {
    try {
      const simulations2 = await storage.getSimulationsByUser(req.params.userId);
      res.json(simulations2);
    } catch (error) {
      console.error("Error fetching user simulations:", error);
      res.status(500).json({ error: "Failed to fetch simulations" });
    }
  });
  app2.get("/api/trainings", async (req, res) => {
    try {
      const trainings2 = await storage.getAllTrainings();
      res.json(trainings2);
    } catch (error) {
      console.error("Error fetching trainings:", error);
      res.status(500).json({ error: "Failed to fetch trainings" });
    }
  });
  app2.post("/api/profiles", async (req, res) => {
    try {
      const profile = await storage.createProfile(req.body);
      res.json(profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(400).json({ error: "Invalid profile data" });
    }
  });
  app2.get("/api/profiles/user/:userId", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
