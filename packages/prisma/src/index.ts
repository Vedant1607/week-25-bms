import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find and load the `.env` file containing the DATABASE_URL
if (!process.env.DATABASE_URL) {
  const possiblePaths = [
    path.resolve(__dirname, "../../.env"), // when running compiled JS in dist/src/index.js
    path.resolve(__dirname, "../.env"),    // when running TS in src/index.ts
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "packages/prisma/.env")
  ];
  
  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      if (process.env.DATABASE_URL) {
        break;
      }
    }
  }
}

console.log("LOADED @repo/db");
console.log("DATABASE_URL =", process.env.DATABASE_URL);

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not defined.");
}

const adapter = new PrismaPg({ connectionString });
export const client = new PrismaClient({ adapter });