// backend/tests/employees.test.ts
import request from "supertest";
import fs from "fs";
import path from "path";
import app from "../src/index";
import { openDb } from "../src/db/connection";

// separate test DB
const TEST_DB = path.resolve(__dirname, "../../data/employees.test.db");

// reset the test DB before each test
beforeEach(async () => {
  if (fs.existsSync(TEST_DB)) {
    fs.unlinkSync(TEST_DB);
  }
  process.env.DB_FILE = TEST_DB;
  const db = await openDb();
  await db.exec("DELETE FROM employees"); // clear table
});

afterAll(async () => {
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
});

describe("Employee API CRUD Tests", () => {
  let employeeId: number;

  // CREATE
  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "John Doe", email: "john@example.com", position: "Dev" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John Doe");
    employeeId = res.body.id;
  });

  it("should not create employee with missing fields", async () => {
    const res = await request(app).post("/api/employees").send({ name: "", email: "", position: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("All fields are required");
  });

  it("should not create employee with duplicate email", async () => {
    await request(app).post("/api/employees").send({ name: "John", email: "dup@example.com", position: "Dev" });
    const res = await request(app).post("/api/employees").send({ name: "Jane", email: "dup@example.com", position: "Dev" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already exists");
  });

  // READ
  it("should get all employees", async () => {
    await request(app).post("/api/employees").send({ name: "John Doe", email: "john@example.com", position: "Dev" });
    const res = await request(app).get("/api/employees");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // UPDATE
  it("should update an existing employee", async () => {
    const createRes = await request(app).post("/api/employees").send({ name: "John", email: "john@example.com", position: "Dev" });
    const id = createRes.body.id;
    const res = await request(app).put(`/api/employees/${id}`).send({ name: "John Updated", email: "john@example.com", position: "Lead" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("John Updated");
    expect(res.body.position).toBe("Lead");
  });

  it("should not update non-existent employee", async () => {
    const res = await request(app).put("/api/employees/9999").send({ name: "No One", email: "noone@example.com", position: "None" });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Employee not found");
  });

  it("should not update with duplicate email", async () => {
    await request(app).post("/api/employees").send({ name: "John", email: "john@example.com", position: "Dev" });
    const createRes2 = await request(app).post("/api/employees").send({ name: "Jane", email: "jane@example.com", position: "Dev" });
    const id = createRes2.body.id;
    const res = await request(app).put(`/api/employees/${id}`).send({ name: "Jane", email: "john@example.com", position: "Dev" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already exists");
  });

  // DELETE
  it("should delete an existing employee", async () => {
    const createRes = await request(app).post("/api/employees").send({ name: "John", email: "john@example.com", position: "Dev" });
    const id = createRes.body.id;
    const res = await request(app).delete(`/api/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee deleted successfully");
  });

  it("should not delete non-existent employee", async () => {
    const res = await request(app).delete("/api/employees/9999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Employee not found");
  });
});
