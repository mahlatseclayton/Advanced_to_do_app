// Client component directive for form interactivity
'use client';

// useRef gets direct reference to the DOM form element; useState manages submission state
import { useRef, useState } from 'react';

// Import server action to create tasks in SQLite
import { createTaskAction } from '../actions';

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null); // Used to reset input fields after submit
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents multiple fast clicks

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents normal full-page browser reload
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget); // Gathers values from inputs by their 'name'
    try {
      await createTaskAction(formData); // Call server action to insert task into SQLite
      formRef.current?.reset(); // Clear all form inputs
    } catch (err) {
      alert('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create New Task</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Input */}
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Title *</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Finish Lab 1 Report"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Topic Input */}
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Topic *</label>
          <input
            name="topic"
            type="text"
            required
            placeholder="e.g. University / SDP"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Due Date *</label>
          <input
            name="due_date"
            type="date"
            required
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Selector */}
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</label>
          <select
            name="status"
            defaultValue="Todo"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>

      {/* Optional Description */}
      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Description</label>
        <textarea
          name="description"
          rows={2}
          placeholder="Additional notes or details..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow"
        >
          {isSubmitting ? 'Adding Task...' : '+ Add Task'}
        </button>
      </div>
    </form>
  );
}
