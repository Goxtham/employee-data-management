import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const DB_FILE = path.resolve(__dirname, "..\..\data\employees.db"); // absolute path

console.log("Using DB file:", DB_FILE);

export async function openDb() {
  try {
    const db = await open({
      filename: DB_FILE,
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        position TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return db;
  } catch (err) {
    console.error("Failed to open DB:", err);
    throw err;
  }
}
