import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import { pool } from "./db.js";
import entries from "./routes/entries.js";

const app = express();

app.use(cors());
app.use(express.json());

// Use the entries router
app.use("/entries", entries);

// Root route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM mood_entries");
    const count = parseInt(result.rows[0].count, 10);

    res.json({
      message: "Mood Ledger API running",
      total_entries: count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mood Ledger API running on port ${PORT}`);
});
