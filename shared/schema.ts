import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// User profiles with personality and preferences
export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"), // nullable for guest users
  name: text("name").notNull(),
  jungianType: text("jungian_type"), // MBTI type
  education: text("education"), // Current education level
  careerGoal: text("career_goal"),
  interests: text("interests").array(),
  preferences: jsonb("preferences"), // lifestyle, work style, etc
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

// Simulations/scenarios created by users
export const simulations = pgTable("simulations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"), // nullable for guest users
  title: text("title").notNull(),
  type: text("type").notNull(), // education, training, career, financial
  inputs: jsonb("inputs").notNull(), // user inputs for the simulation
  aiScenario: text("ai_scenario"), // AI generated scenario
  actionPlan: jsonb("action_plan"), // structured action plan
  metrics: jsonb("metrics"), // salary, fit score, time investment, etc
  careerPaths: jsonb("career_paths"), // predicted career paths
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  createdAt: true,
});

export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
export type Simulation = typeof simulations.$inferSelect;

// Training/certification catalog
export const trainings = pgTable("trainings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // tech, business, creative, etc
  description: text("description"),
  suitablePersonalities: text("suitable_personalities").array(),
  avgSalaryImpact: integer("avg_salary_impact"), // percentage
  timeCommitment: integer("time_commitment"), // hours
  difficulty: text("difficulty"), // beginner, intermediate, advanced
});

export const insertTrainingSchema = createInsertSchema(trainings).omit({
  id: true,
});

export type InsertTraining = z.infer<typeof insertTrainingSchema>;
export type Training = typeof trainings.$inferSelect;
