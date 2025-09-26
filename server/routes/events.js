import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import eventsData from "../data/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET /events -> JSON list
router.get("/", (req, res) => {
  res.status(200).json(eventsData);
});

// GET /events/:id -> serve the detail HTML
router.get("/:eventId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/event.html"));
});

export default router;
