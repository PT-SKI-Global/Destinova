import { db } from "./db";
import { trainings } from "@shared/schema";

const seedTrainings = [
  {
    name: "Bootcamp Full-Stack Development",
    category: "tech",
    description: "Intensive 6-month bootcamp covering React, Node.js, databases, and deployment",
    suitablePersonalities: ["INTJ", "INTP", "ENTJ", "ENTP", "ISTJ"],
    avgSalaryImpact: 150, // percentage
    timeCommitment: 960, // hours (6 months x 40 hours/week)
    difficulty: "intermediate"
  },
  {
    name: "Cisco CCNA Networking",
    category: "tech",
    description: "Network administration and infrastructure certification",
    suitablePersonalities: ["ISTJ", "INTJ", "ISTP", "ESTJ"],
    avgSalaryImpact: 80,
    timeCommitment: 480,
    difficulty: "intermediate"
  },
  {
    name: "UI/UX Design Bootcamp",
    category: "creative",
    description: "Comprehensive design bootcamp covering Figma, user research, and prototyping",
    suitablePersonalities: ["ENFP", "INFP", "ISFP", "INFJ", "ENFJ"],
    avgSalaryImpact: 120,
    timeCommitment: 720,
    difficulty: "beginner"
  },
  {
    name: "Digital Marketing Certification",
    category: "business",
    description: "Complete digital marketing including SEO, SEM, social media, and analytics",
    suitablePersonalities: ["ENFP", "ENTP", "ESFP", "ESTP", "ENFJ"],
    avgSalaryImpact: 90,
    timeCommitment: 360,
    difficulty: "beginner"
  },
  {
    name: "Data Science & Machine Learning",
    category: "tech",
    description: "Python, statistics, ML algorithms, and data visualization",
    suitablePersonalities: ["INTJ", "INTP", "ISTJ", "ENTJ"],
    avgSalaryImpact: 180,
    timeCommitment: 1200,
    difficulty: "advanced"
  },
  {
    name: "Business Strategy Program (BSP)",
    category: "business",
    description: "MBA-level business strategy, finance, and management",
    suitablePersonalities: ["ENTJ", "INTJ", "ESTJ", "ENTP"],
    avgSalaryImpact: 100,
    timeCommitment: 960,
    difficulty: "advanced"
  },
  {
    name: "Graphic Design Mastery",
    category: "creative",
    description: "Adobe Creative Suite, branding, and visual communication",
    suitablePersonalities: ["ISFP", "INFP", "ENFP", "ESFP"],
    avgSalaryImpact: 70,
    timeCommitment: 480,
    difficulty: "beginner"
  },
  {
    name: "Project Management Professional (PMP)",
    category: "business",
    description: "Global project management certification and methodologies",
    suitablePersonalities: ["ESTJ", "ENTJ", "ISTJ", "ENFJ"],
    avgSalaryImpact: 85,
    timeCommitment: 600,
    difficulty: "intermediate"
  }
];

async function seed() {
  console.log("Starting database seed...");

  try {
    // Clear existing trainings
    await db.delete(trainings);

    // Insert seed data
    await db.insert(trainings).values(seedTrainings);

    console.log(`✓ Seeded ${seedTrainings.length} trainings`);
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }

  process.exit(0);
}

seed();
