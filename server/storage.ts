import {
  users,
  profiles,
  simulations,
  trainings,
  type User,
  type InsertUser,
  type Profile,
  type InsertProfile,
  type Simulation,
  type InsertSimulation,
  type Training,
  type InsertTraining
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile operations
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, profile: Partial<InsertProfile>): Promise<Profile>;

  // Simulation operations
  getAllSimulations(): Promise<Simulation[]>;
  getSimulation(id: string): Promise<Simulation | undefined>;
  getSimulationsByUser(userId: string): Promise<Simulation[]>;
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;
  updateSimulation(id: string, simulation: Partial<InsertSimulation>): Promise<Simulation>;

  // Training operations
  getAllTrainings(): Promise<Training[]>;
  getTrainingsByCategory(category: string): Promise<Training[]>;
  createTraining(training: InsertTraining): Promise<Training>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Profile operations
  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile || undefined;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [profile] = await db
      .insert(profiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async updateProfile(userId: string, profileData: Partial<InsertProfile>): Promise<Profile> {
    const [profile] = await db
      .update(profiles)
      .set(profileData)
      .where(eq(profiles.userId, userId))
      .returning();
    return profile;
  }

  // Simulation operations
  async getAllSimulations(): Promise<Simulation[]> {
    return await db
      .select()
      .from(simulations)
      .orderBy(desc(simulations.createdAt))
      .limit(100);
  }

  async getSimulation(id: string): Promise<Simulation | undefined> {
    const [simulation] = await db.select().from(simulations).where(eq(simulations.id, id));
    return simulation || undefined;
  }

  async getSimulationsByUser(userId: string): Promise<Simulation[]> {
    return await db
      .select()
      .from(simulations)
      .where(eq(simulations.userId, userId))
      .orderBy(desc(simulations.createdAt));
  }

  async createSimulation(insertSimulation: InsertSimulation): Promise<Simulation> {
    const [simulation] = await db
      .insert(simulations)
      .values(insertSimulation)
      .returning();
    return simulation;
  }

  async updateSimulation(id: string, simulationData: Partial<InsertSimulation>): Promise<Simulation> {
    const [simulation] = await db
      .update(simulations)
      .set(simulationData)
      .where(eq(simulations.id, id))
      .returning();
    return simulation;
  }

  // Training operations
  async getAllTrainings(): Promise<Training[]> {
    return await db.select().from(trainings);
  }

  async getTrainingsByCategory(category: string): Promise<Training[]> {
    return await db.select().from(trainings).where(eq(trainings.category, category));
  }

  async createTraining(insertTraining: InsertTraining): Promise<Training> {
    const [training] = await db
      .insert(trainings)
      .values(insertTraining)
      .returning();
    return training;
  }
}

export const storage = new DatabaseStorage();
