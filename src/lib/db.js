import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const DEFAULT_DB_PATH = path.join(process.cwd(), "data", "quickhire.db");
const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : DEFAULT_DB_PATH;

function ensureDbDirectory() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

function toPlainRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function toPlainRow(row) {
  return row ? { ...row } : null;
}

function initializeSchema(db) {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      resume_link TEXT NOT NULL,
      cover_note TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );
  `);
}

function seedJobs(db) {
  const countRow = db.prepare("SELECT COUNT(*) AS total FROM jobs").get();
  if (countRow?.total > 0) {
    return;
  }

  const seedData = [
    {
      title: "Senior Product Designer",
      company: "ClassPass",
      location: "Manchester, UK",
      category: "Design",
      description:
        "Design modern product experiences across mobile and web. Collaborate with product managers and engineers to deliver clear UX flows, prototypes, and polished interfaces.",
    },
    {
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      category: "Design",
      description:
        "Own visual brand direction across campaigns and digital touchpoints. Create design systems, ad creatives, and brand assets that scale globally.",
    },
    {
      title: "Social Media Assistant",
      company: "Netlify",
      location: "Paris, France",
      category: "Marketing",
      description:
        "Support social media calendar planning, content publishing, and performance analysis. Work closely with growth and content teams to improve brand reach.",
    },
    {
      title: "Data Analyst",
      company: "Twitter",
      location: "San Diego, US",
      category: "Technology",
      description:
        "Analyze product and marketing data to uncover insights. Build dashboards, define KPIs, and communicate findings to business stakeholders.",
    },
    {
      title: "Interactive Developer",
      company: "Udacity",
      location: "Hamburg, Germany",
      category: "Engineering",
      description:
        "Develop high-performance interactive experiences using modern frontend technologies. Partner with designers to bring prototypes to production quality.",
    },
    {
      title: "Finance Associate",
      company: "Talkit",
      location: "Toronto, Canada",
      category: "Finance",
      description:
        "Manage budgeting, reporting, and forecasting processes. Improve finance operations through better workflows and automation.",
    },
    {
      title: "People Operations Specialist",
      company: "Revolut",
      location: "Madrid, Spain",
      category: "Human Resource",
      description:
        "Drive recruitment coordination and employee lifecycle processes. Help build a strong candidate and employee experience.",
    },
    {
      title: "Sales Development Representative",
      company: "Canva",
      location: "Ontario, Canada",
      category: "Sales",
      description:
        "Generate pipeline through outbound and inbound qualification. Work with account executives to build a predictable sales funnel.",
    },
  ];

  const insertStmt = db.prepare(`
    INSERT INTO jobs (title, company, location, category, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const job of seedData) {
    insertStmt.run(
      job.title,
      job.company,
      job.location,
      job.category,
      job.description,
    );
  }
}

function createDatabase() {
  ensureDbDirectory();
  const db = new DatabaseSync(DB_PATH);
  initializeSchema(db);
  seedJobs(db);
  return db;
}

function getDatabase() {
  const globalForDb = globalThis;
  if (!globalForDb.__quickHireDb) {
    globalForDb.__quickHireDb = createDatabase();
  }
  return globalForDb.__quickHireDb;
}

export function listJobs({ search = "", category = "", location = "" } = {}) {
  const db = getDatabase();
  const conditions = [];
  const params = {};

  if (search.trim()) {
    conditions.push(
      "(title LIKE :search OR company LIKE :search OR description LIKE :search)",
    );
    params.search = `%${search.trim()}%`;
  }

  if (category.trim()) {
    conditions.push("category = :category");
    params.category = category.trim();
  }

  if (location.trim()) {
    conditions.push("location LIKE :location");
    params.location = `%${location.trim()}%`;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const stmt = db.prepare(`
    SELECT id, title, company, location, category, description, created_at
    FROM jobs
    ${whereClause}
    ORDER BY datetime(created_at) DESC, id DESC
  `);

  return toPlainRows(stmt.all(params));
}

export function getJobById(id) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT id, title, company, location, category, description, created_at
    FROM jobs
    WHERE id = ?
    LIMIT 1
  `);
  return toPlainRow(stmt.get(id));
}

export function createJob({ title, company, location, category, description }) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO jobs (title, company, location, category, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(title, company, location, category, description);
  return getJobById(result.lastInsertRowid);
}

export function deleteJobById(id) {
  const db = getDatabase();
  const stmt = db.prepare("DELETE FROM jobs WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

export function createApplication({
  jobId,
  name,
  email,
  resumeLink,
  coverNote,
}) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO applications (job_id, name, email, resume_link, cover_note)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(jobId, name, email, resumeLink, coverNote);

  const selectStmt = db.prepare(`
    SELECT id, job_id, name, email, resume_link, cover_note, created_at
    FROM applications
    WHERE id = ?
    LIMIT 1
  `);
  return toPlainRow(selectStmt.get(result.lastInsertRowid));
}
