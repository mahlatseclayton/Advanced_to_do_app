import db from './db';
import { Task, TaskStatus, computeIsOverdue } from './types';
export function getTasks(sortBy: 'due_date' | 'topic' | 'status' = 'due_date'): Task[] {

    const validSortColumns = ['due_date', 'topic', 'status'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'due_date';

    const sql = `SELECT * FROM tasks WHERE is_archived = 0 ORDER BY ${sortColumn} ASC`;
    const tasks = db.prepare(sql).all() as Task[];

    return tasks.map(task => ({
        ...task,
        is_overdue: computeIsOverdue(task.due_date, task.status)
    }));
}

export function createTask(task: {
    title: string;
    description?: string;
    due_date: string;
    topic: string;
    status?: TaskStatus;
}) {
    const stmt = db.prepare(`
    INSERT INTO tasks (title, description, due_date, topic, status)
    VALUES (?, ?, ?, ?, ?)
  `);

    return stmt.run(
        task.title,
        task.description || '',
        task.due_date,
        task.topic,
        task.status || 'Todo'
    );
}


export function updateTask(
    id: number,
    task: {
        title: string;
        description?: string;
        due_date: string;
        topic: string;
        status: TaskStatus;
    }
) {
    const stmt = db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, due_date = ?, topic = ?, status = ?
    WHERE id = ?
  `);

    return stmt.run(
        task.title,
        task.description || '',
        task.due_date,
        task.topic,
        task.status,
        id
    );
}


export function archiveTask(id: number) {
    return db.prepare(`UPDATE tasks SET is_archived = 1 WHERE id = ?`).run(id);
}

export function getArchivedTasks(): Task[] {
    const sql = `SELECT * FROM tasks WHERE is_archived = 1 ORDER BY created_at DESC`;
    const tasks = db.prepare(sql).all() as Task[];

    return tasks.map(task => ({
        ...task,
        is_overdue: computeIsOverdue(task.due_date, task.status)
    }));
}

export function unarchiveTask(id: number) {
    return db.prepare(`UPDATE tasks SET is_archived = 0 WHERE id = ?`).run(id);
}

