const sqlite3 = require("sqlite3").verbose();

// Create database file
const db = new sqlite3.Database("movies.db");

// Create table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            type TEXT,
            genre TEXT,
            duration INTEGER,
            art_style TEXT,
            rating REAL,
            platform TEXT
        )
    `);

    console.log("Database and table created!");
});

db.close();
