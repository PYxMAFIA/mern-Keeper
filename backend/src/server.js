import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  console.log("Serving static files from:", path.join(__dirname, "../frontend/dist"));
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    console.log("Serving index.html for path:", req.path);
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  // Development mode: Only serve API routes
  console.log("Development mode: API server running on port", PORT);
  console.log("Frontend should be running on http://localhost:5173");
  
  // Health check endpoint for development
  app.get("/", (req, res) => {
    res.json({ 
      message: "Backend API server is running", 
      mode: "development",
      frontend: "http://localhost:5173",
      api: `http://localhost:${PORT}/api`
    });
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    console.log("NODE_ENV:", process.env.NODE_ENV);
  });
});