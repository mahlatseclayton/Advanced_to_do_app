// Tells Next.js that this component runs in the browser (needed for click handlers & useState)
'use client';

// Import React hook to keep track of state (like whether the edit modal is open)
import { useState } from 'react';

// Import the TypeScript definition of a Task object from our types file
import { Task } from '../types';

// Import the Server Action function to archive a task in SQLite
import { archiveTaskAction } from '../actions';

// Import the pop-up modal component used to edit tasks
import TaskEditModal from './TaskEditModal';

// Import CSS Modules styling
import styles from './TaskCard.module.css';

// Define what props (inputs) this component expects (it needs 1 Task object)
interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    // Local state: tracks if the edit modal pop-up is open (true or false)
    const [isEditing, setIsEditing] = useState(false);

    // Local state: tracks if we are currently archiving (used to dim the card)
    const [isArchiving, setIsArchiving] = useState(false);

    // Function called when the user clicks the "Archive" button
    const handleArchive = async () => {
        // Ask the user to confirm before archiving
        if (confirm(`Are you sure you want to archive "${task.title}"?`)) {
            setIsArchiving(true); // Dim the card visually
            await archiveTaskAction(task.id); // Call the server action to update SQLite
        }
    };

    // Helper function to return status badge CSS class based on task.status
    const getStatusClass = () => {
        if (task.status === 'Complete') return styles.statusComplete;
        if (task.status === 'In-Progress') return styles.statusInProgress;
        return styles.statusTodo;
    };

    return (
        // Outer card container div (dims opacity if isArchiving is true)
        <div className={`${styles.cardContainer} ${isArchiving ? styles.archiving : ''}`}>

            {/* Header section: Title and Status badge side by side */}
            <div className={styles.header}>
                {/* Task Title */}
                <h3 className={styles.title}>{task.title}</h3>

                {/* Status Badge: Green for Complete, Yellow for In-Progress, Blue for Todo */}
                <span className={`${styles.badge} ${getStatusClass()}`}>
                    {task.status}
                </span>
            </div>

            {/* Task Description (only renders if a description was provided) */}
            {task.description && (
                <p className={styles.description}>{task.description}</p>
            )}

            {/* Footer section: Topic tag, Due Date, and Dynamic OVERDUE badge */}
            <div className={styles.footer}>
                <div className={styles.metaGroup}>
                    {/* Topic Badge */}
                    <span className={styles.topicTag}>#{task.topic}</span>
                    {/* Due Date display */}
                    <span>Due: {task.due_date}</span>
                </div>

                {/* Dynamic Overdue Badge: Only renders if task.is_overdue is calculated as true */}
                {task.is_overdue && (
                    <span className={styles.overdueBadge}>OVERDUE</span>
                )}
            </div>

            {/* Action buttons: Edit and Archive */}
            <div className={styles.actions}>
                {/* Click to open the Edit Modal */}
                <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
                    Edit
                </button>

                {/* Click to archive the task */}
                <button onClick={handleArchive} disabled={isArchiving} className={styles.btnArchive}>
                    Archive
                </button>
            </div>

            {/* Edit Modal Pop-up: Only renders when isEditing === true */}
            {isEditing && (
                <TaskEditModal task={task} onClose={() => setIsEditing(false)} />
            )}
        </div>
    );
}
