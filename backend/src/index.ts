import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import employeesRouter from "./routes/employees";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/employees", employeesRouter);

app.get("/", (_req, res) => res.json({ message: "Employee API root" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
