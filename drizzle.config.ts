import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",               // Folder output migrasi
  schema: "./shared/schema.ts",     // Lokasi definisi schema Drizzle
  dialect: "postgresql",            // Dialek database
  dbCredentials: {
    url: process.env.DATABASE_URL,  // Ambil dari .env
  },
});