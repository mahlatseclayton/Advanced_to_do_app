# Database Design Documentation

## Overview
This project uses SQLite as a local-first, single-user relational database engine via the `better-sqlite3` driver for Node.js.

## Table Schema: `tasks`

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT NOT NULL,
    topic TEXT NOT NULL,
    status TEXT CHECK(status IN ('Todo','In-Progress','Complete')) NOT NULL DEFAULT 'Todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_archived BOOLEAN NOT NULL DEFAULT 0
);
```

## Field Specifications

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique identifier for each task record. |
| `title` | `TEXT` | `NOT NULL` | Short summary title of the task. |
| `description` | `TEXT` | Optional | Extended notes or detailed instructions for the task. |
| `due_date` | `TEXT` | `NOT NULL` | Due date formatted as ISO string (`YYYY-MM-DD`). |
| `topic` | `TEXT` | `NOT NULL` | Categorical topic tag (e.g. `SDP`, `Personal`). |
| `status` | `TEXT` | `CHECK(status IN ('Todo','In-Progress','Complete'))` | Current lifecycle state of the task. Default is `'Todo'`. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | System timestamp recorded on task creation. |
| `is_archived` | `BOOLEAN` | `DEFAULT 0` | Soft-deletion flag. `0` indicates active, `1` indicates archived. |

## Schema Design Decisions

1. Soft-Deletion (Archiving): Tasks are never permanently deleted from the database. Setting `is_archived = 1` retains all historical data while hiding archived tasks from active views.
2. Dynamic Overdue State: The database schema explicitly excludes an `is_overdue` column. Storing `is_overdue` in a database column creates stale data when dates pass. Overdue status is dynamically computed at read-time by comparing `due_date` against the current date for non-completed tasks.
