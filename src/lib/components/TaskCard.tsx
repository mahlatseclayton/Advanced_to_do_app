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

  return (
    // Outer card container div (dims opacity if isArchiving is true)
    <div className={`p-5 rounded-xl border shadow-sm transition-all bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 ${isArchiving ? 'opacity-50' : ''}`}>
      
      {/* Header section: Title and Status badge side by side */}
      <div className="flex items-start justify-between gap-4">
        {/* Task Title */}
        <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{task.title}</h3>
        
        {/* Status Badge: Green for Complete, Yellow for In-Progress, Blue for Todo */}
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          task.status === 'Complete' 
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            : task.status === 'In-Progress'
            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
        }`}>
          {task.status}
        </span>
      </div>

      {/* Task Description (only renders if a description was provided) */}
      {task.description && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{task.description}</p>
      )}

      {/* Footer section: Topic tag, Due Date, and Dynamic OVERDUE badge */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-3">
        <div className="flex items-center gap-2">
          {/* Topic Badge */}
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono text-zinc-700 dark:text-zinc-300">
            #{task.topic}
          </span>
          {/* Due Date display */}
          <span>Due: {task.due_date}</span>
        </div>

        {/* Dynamic Overdue Badge: Only renders if task.is_overdue is calculated as true */}
        {task.is_overdue && (
          <span className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded font-semibold animate-pulse">
            ⚠️ OVERDUE
          </span>
        )}
      </div>

      {/* Action buttons: Edit and Archive */}
      <div className="mt-4 flex justify-end gap-2 text-xs">
        {/* Click to open the Edit Modal */}
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium transition"
        >
          Edit
        </button>

        {/* Click to archive the task */}
        <button
          onClick={handleArchive}
          disabled={isArchiving}
          className="px-3 py-1.5 rounded bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium transition"
        >
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
