// Client component directive for browser interactive pop-up modal
'use client';

// Import state hook from React
import { useState } from 'react';

// Import Task and TaskStatus types
import { Task, TaskStatus } from '../types';

// Import the update server action function
import { updateTaskAction } from '../actions';

// Props needed for the modal: the task to edit, and an onClose function to close the pop-up
interface TaskEditModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskEditModal({ task, onClose }: TaskEditModalProps) {
  // State to track if saving is in progress (shows 'Saving...' on button)
  const [isSaving, setIsSaving] = useState(false);

  // Form submit handler to update task details
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop normal page refresh
    setIsSaving(true);

    const formData = new FormData(e.currentTarget); // Get data entered into form inputs
    try {
      // Call the server action to update SQLite database using formData directly
      await updateTaskAction(task.id, formData);
      onClose(); // Close modal upon successful update
    } catch (err) {
      alert('Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // Modal Overlay: dark background overlay that covers the entire screen
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* Modal Dialog Box */}
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-xl">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Edit Task #{task.id}</h2>
          {/* Close button (X) */}
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-lg">✕</button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title input (pre-populated with task.title) */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Title *</label>
            <input
              name="title"
              defaultValue={task.title}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Topic input */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Topic *</label>
              <input
                name="topic"
                defaultValue={task.topic}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Due date picker */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Due Date *</label>
              <input
                name="due_date"
                type="date"
                defaultValue={task.due_date}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status dropdown */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</label>
            <select
              name="status"
              defaultValue={task.status}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todo">Todo</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          {/* Description text area */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={task.description}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Modal Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
