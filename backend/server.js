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
const allowedOrigins = [
  "http://localhost:5173",
  "https://vikas12-portfolio-filhtk266.vercel.app",
  "https://vikas12-portfolio.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

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

  // CORS error
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS: Origin not allowed.",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ================================
// SERVER
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});