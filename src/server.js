require("dotenv").config();

const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const { PORT } = require("./config/env");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Aisona backend is running" });
});

// Routes
app.use("/api/chat", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Aisona backend running on http://localhost:${PORT}`);
});
