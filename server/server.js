import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./authRoutes.js";
import librariesRoutes from "./librariesRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create uploads directory if it doesn't exist
import fs from "fs";
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/libraries", librariesRoutes);
app.use("/api/upload", uploadRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server: http://localhost:${PORT}`);
});
