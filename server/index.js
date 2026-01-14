import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import { pool } from "./db.js";
import entries from "./routes/entries.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API routes
app.use("/entries", entries);

// Health/root check
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

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // ES module friendly catch-all
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mood Ledger API running on port ${PORT}`);
});
