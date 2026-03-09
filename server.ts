import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ipm_kebumen.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'cabang' or 'ranting'
    name TEXT NOT NULL,
    location TEXT
  );
`);

// Seed initial stats if empty
const statsCount = db.prepare("SELECT COUNT(*) as count FROM stats").get() as { count: number };
if (statsCount.count === 0) {
  const insertStat = db.prepare("INSERT INTO stats (type, name, location) VALUES (?, ?, ?)");
  // Sample Cabang
  insertStat.run("cabang", "PC IPM Kebumen", "Kebumen");
  insertStat.run("cabang", "PC IPM Gombong", "Gombong");
  insertStat.run("cabang", "PC IPM Karanganyar", "Karanganyar");
  // Sample Ranting
  insertStat.run("ranting", "PR IPM SMA Muhammadiyah 1 Kebumen", "Kebumen");
  insertStat.run("ranting", "PR IPM SMK Muhammadiyah Kutowinangun", "Kutowinangun");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/news", (req, res) => {
    const news = db.prepare("SELECT * FROM news ORDER BY created_at DESC").all();
    res.json(news);
  });

  app.post("/api/news", (req, res) => {
    const { title, content, author, image_url } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const info = db.prepare("INSERT INTO news (title, content, author, image_url) VALUES (?, ?, ?, ?)")
      .run(title, content, author, image_url);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/stats", (req, res) => {
    const cabang = db.prepare("SELECT * FROM stats WHERE type = 'cabang'").all();
    const ranting = db.prepare("SELECT * FROM stats WHERE type = 'ranting'").all();
    res.json({ cabang, ranting });
  });

  app.post("/api/stats", (req, res) => {
    const { type, name, location } = req.body;
    if (!type || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const info = db.prepare("INSERT INTO stats (type, name, location) VALUES (?, ?, ?)")
      .run(type, name, location);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/news/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM news WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.delete("/api/stats/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM stats WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
