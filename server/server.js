import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import eventsRouter from "./routes/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the built client
app.use("/public", express.static(path.resolve(__dirname, "./public")));
app.use(
  "/scripts",
  express.static(path.resolve(__dirname, "./public/scripts"))
);

// Health/root
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align:center;margin-top:50px;">Discover Local Music API</h1>'
    );
});

// API routes
app.use("/events", eventsRouter);

// Fallback 404 for unknown API paths (optional: serve client 404 instead)
app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
