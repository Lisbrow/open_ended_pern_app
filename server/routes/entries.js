import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// POST /entries
router.post("/", async (req, res) => {
  try {
    const { mood_value, mood_score, entry_text } = req.body;

    if (!mood_value || !mood_score) {
      return res.status(400).json({
        error: "mood_value and mood_score are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO mood_entries
        (mood_value, mood_score, entry_text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [mood_value, mood_score, entry_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /entries (with optional mood filter)
router.get("/", async (req, res) => {
  try {
    const { mood } = req.query;

    let query = `SELECT * FROM mood_entries`;
    let values = [];

    if (mood) {
      query += " WHERE mood = $1";
      values.push(mood);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /entries/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid entry ID" });
    }

    const result = await pool.query(
      "DELETE FROM mood_entries WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json({ message: "Entry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
