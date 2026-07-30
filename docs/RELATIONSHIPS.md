# Entity Relationships and Data Lifecycle

## System Architecture Model

The application operates as a single-table relational model optimized for local-first desktop usage.

```mermaid
classDiagram
    class Task {
        +int id
        +string title
        +string description
        +string due_date
        +string topic
        +TaskStatus status
        +boolean is_archived
        +string created_at
        +boolean computeIsOverdue()
    }

    class TaskStatus {
        <<enumeration>>
        Todo
        In-Progress
        Complete
    }

    Task "1" -- "1" TaskStatus : holds
```

## State Transitions & Task Lifecycle

A task record moves through defined state transitions:

```mermaid
stateDiagram-v2
    [*] --> Todo : Task Created
    Todo --> InProgress : User updates status
    InProgress --> Complete : Task completed
    Complete --> InProgress : Reopened
    
    Todo --> Archived : Soft Deleted
    InProgress --> Archived : Soft Deleted
    Complete --> Archived : Soft Deleted

    Archived --> Todo : Restored (Unarchived)
```

## Overdue Derivation Logic

Overdue state is derived dynamically at query runtime using the following logic:

- Condition 1: `status !== 'Complete'`
- Condition 2: `due_date < current_date` (ISO format `YYYY-MM-DD`)

If both conditions are met, `is_overdue` evaluates to `true`. Completed or archived tasks are never marked as overdue.
