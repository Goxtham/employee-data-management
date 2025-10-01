import { Router, Request, Response } from "express";
import { openDb } from "../db/connection";

const router = Router();

// GET all employees
router.get("/", async (_req: Request, res: Response) => {
  try {
    const db = await openDb();
    const employees = await db.all("SELECT * FROM employees ORDER BY id DESC");
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// POST create new employee
router.post("/", async (req: Request, res: Response) => {
  const { name, email, position } = req.body;
  if (!name || !email || !position) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await openDb();
    const result = await db.run(
      "INSERT INTO employees (name, email, position) VALUES (?, ?, ?)",
      [name, email, position]
    );
    const employee = await db.get("SELECT * FROM employees WHERE id = ?", result.lastID);
    res.status(201).json(employee);
  } catch (err: any) {
    if (err.code === "SQLITE_CONSTRAINT" || err.message.includes("UNIQUE constraint")) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// PUT update employee
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, position } = req.body;
  if (!name || !email || !position) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await openDb();
    const result = await db.run(
      "UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?",
      [name, email, position, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employee = await db.get("SELECT * FROM employees WHERE id = ?", id);
    res.json(employee);
  } catch (err: any) {
    if (err.code === "SQLITE_CONSTRAINT" || err.message.includes("UNIQUE constraint")) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

// DELETE employee
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM employees WHERE id = ?", id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

export default router;
