import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// POST /entries
router.post("/", async (req, res) => {
  try {
    const { entry_date, mood, feeling, reflection } = req.body;

    if (!entry_date || !mood || !feeling) {
      return res.status(400).json({
        error: "entry_date, mood, and feeling are required",
      });
    }

    if (mood < 1 || mood > 7) {
      return res.status(400).json({ error: "mood must be between 1 and 7" });
    }

    const result = await pool.query(
      `INSERT INTO journal_entries 
        (entry_date, mood, feeling, reflection)
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [entry_date, mood, feeling, reflection]
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

    let query = `SELECT * FROM journal_entries`;
    let values = [];

    if (mood) {
      query += " WHERE mood = $1";
      values.push(mood);
    }

    query += " ORDER BY entry_date DESC";

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
      "DELETE FROM journal_entries WHERE id = $1 RETURNING *",
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
