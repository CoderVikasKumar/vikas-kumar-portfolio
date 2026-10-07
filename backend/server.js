import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ================================
// SECURITY
// ================================
app.use(helmet());

// ================================
// CORS
// ================================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ================================
// BODY PARSER
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// API RATE LIMIT
// ================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// ================================
// AUTH API
// ================================
app.use("/api/auth", authRoutes);

// ================================
// CONTACT API
// ================================
app.use("/api/contact", contactRoutes);

// ================================
// TEST ROUTE
// ================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vikas Portfolio API is running 🚀",
  });
});

// ================================
// 404 ROUTE
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ================================
// ERROR HANDLER
// ================================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ================================
// SERVER
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});