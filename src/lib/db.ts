import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'todo.db');
const db = new Database(dbPath);
// initialise the database schema ..
db.exec(
    `
    CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    due_date TEXT NOT NULL,
    topic TEXT NOT NULL,
    status TEXT CHECK(status IN ('To-Do','In-Progress','Completed')) NOT NULL DEFAULT 'to-do',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_Archived BOOLEAN NOT NULL DEFAULT 0
    )
    `
);

export default db;
