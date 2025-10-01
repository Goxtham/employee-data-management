import express from "express";
import cors from "cors";
import healthRouter from "./routes/health";
import employeesRouter from "./routes/employees";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/employees", employeesRouter);

app.get("/", (_req, res) => res.json({ message: "Employee API root" }));

export default app;
