import "./dotenv.js";
import { pool } from "./database.js";
import eventData from "../data/events.js";

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      datetime TIMESTAMPTZ NOT NULL,
      venue TEXT NOT NULL,
      genre TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      artists TEXT[]
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
    throw err;
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  const insertQuery = `
    INSERT INTO events (id, name, datetime, venue, genre, price, image, description, artists)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const rows = eventData.map((ev) => {
    return [
      ev.id,
      ev.name,
      ev.datetime,
      ev.venue,
      ev.genre,
      ev.price,
      ev.image,
      ev.description,
      ev.artists || [],
    ];
  });

  try {
    await Promise.all(rows.map((values) => pool.query(insertQuery, values)));
    console.log("✅ events seeded successfully");
  } catch (err) {
    console.error("⚠️ error seeding events", err);
    throw err;
  }
};

seedEventsTable();
