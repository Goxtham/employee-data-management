// src/db/connection.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

// Use test DB if in test environment, else use normal DB
const defaultDbPath =
  process.env.NODE_ENV === "test"
    ? path.resolve(__dirname, "../../data/employees.test.db")
    : path.resolve(__dirname, "../../data/employees.db");

// Allow override via environment variable
const DB_FILE = process.env.DB_FILE ? path.resolve(process.env.DB_FILE) : defaultDbPath;

// Ensure directory exists
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log("Using DB file:", DB_FILE);

export async function openDb() {
  const db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      position TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
