import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import categoriesRoutes from "./routes/categoryRoutes.js";
import fs from "fs";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`✅ Loaded environment: ${process.env.NODE_ENV}`);
} else {
  console.warn(`⚠️ Environment file ${envFile} not found, loading default .env`);
  dotenv.config();
}

connectDB();

const app = express();

app.use(express.json());

// ✅ CORS setup — fully correct version
const allowedOrigins = [
  "http://localhost:3000",
  "https://food-delivery-frontend.vercel.app", // your actual frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Must be true for cookies/sessions
  })
);

// ✅ Also explicitly set headers (important for Vercel/Render/Netlify)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoriesRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Food Delivery Backend is running...");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
