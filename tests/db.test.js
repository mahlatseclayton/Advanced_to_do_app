const test = require('node:test');
const assert = require('node:assert');
const Database = require('better-sqlite3');

// Helper function to initialize throwaway in-memory database
function setupInMemoryDb() {
    const db = new Database(':memory:');
    db.exec(`
        CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT NOT NULL,
            topic TEXT NOT NULL,
            status TEXT CHECK(status IN ('Todo','In-Progress','Complete')) NOT NULL DEFAULT 'Todo',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_archived BOOLEAN NOT NULL DEFAULT 0
        );
    `);
    return db;
}

// Helper to compute overdue dynamically
function computeIsOverdue(dueDateStr, status) {
    if (status === 'Complete') return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDateStr < today;
}

test('1. Task Creation and Retrieval on throwaway in-memory SQLite database', () => {
    const db = setupInMemoryDb();
    
    const stmt = db.prepare(`
        INSERT INTO tasks (title, description, due_date, topic, status)
        VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run('Complete Lab Report', 'Detail dynamic overdue rules', '2026-12-31', 'University', 'Todo');
    
    assert.strictEqual(info.changes, 1);
    
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
    assert.strictEqual(task.title, 'Complete Lab Report');
    assert.strictEqual(task.topic, 'University');
    assert.strictEqual(task.status, 'Todo');
    assert.strictEqual(task.is_archived, 0);
});

test('2. Dynamic Overdue Calculation Rule (read-time comparison)', () => {
    const pastDate = '2020-01-01';
    const futureDate = '2099-12-31';

    // Past due date with 'Todo' status must be overdue
    assert.strictEqual(computeIsOverdue(pastDate, 'Todo'), true);
    
    // Past due date with 'In-Progress' status must be overdue
    assert.strictEqual(computeIsOverdue(pastDate, 'In-Progress'), true);
    
    // Past due date with 'Complete' status must NOT be overdue
    assert.strictEqual(computeIsOverdue(pastDate, 'Complete'), false);
    
    // Future due date must NOT be overdue
    assert.strictEqual(computeIsOverdue(futureDate, 'Todo'), false);
});

test('3. Task Archiving (Soft-deletion) and Unarchiving Verification', () => {
    const db = setupInMemoryDb();
    
    // Insert task
    const info = db.prepare(`
        INSERT INTO tasks (title, due_date, topic) VALUES ('Archive Test Task', '2026-08-01', 'Testing')
    `).run();
    const taskId = info.lastInsertRowid;

    // Archive task (is_archived = 1)
    db.prepare('UPDATE tasks SET is_archived = 1 WHERE id = ?').run(taskId);
    let task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
    assert.strictEqual(task.is_archived, 1);

    // Active tasks query must not return archived task
    const activeTasks = db.prepare('SELECT * FROM tasks WHERE is_archived = 0').all();
    assert.strictEqual(activeTasks.length, 0);

    // Unarchive task (is_archived = 0)
    db.prepare('UPDATE tasks SET is_archived = 0 WHERE id = ?').run(taskId);
    task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
    assert.strictEqual(task.is_archived, 0);
});
