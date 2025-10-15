import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import categoriesRoutes from "./routes/categoryRoutes.js";

dotenv.config();

// DB connect
connectDB();

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "https://yourfrontend.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoriesRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("🚀 Food Delivery Backend is running...");
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
