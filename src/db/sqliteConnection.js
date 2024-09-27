// src/db/sqliteConnection.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      hashed_password TEXT NOT NULL,
      gender TEXT CHECK( gender IN ('M','F','Other') ) NOT NULL,
      dob TEXT NOT NULL,
      user_image_path TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating users table', err);
      } else {
        console.log('Users table created or already exists.');
      }
    });
  }
});

module.exports = db;