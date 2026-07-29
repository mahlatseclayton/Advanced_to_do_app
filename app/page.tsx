// Next.js Server Component (no 'use client' needed here)
// This page runs on the server, reads from SQLite directly, and renders HTML

import { getTasks } from '@/src/lib/tasks';
import TaskForm from '@/src/lib/components/TaskForm';
import TaskCard from '@/src/lib/components/TaskCard';
import TaskFilterToolbar from '@/src/lib/components/TaskFilterToolbar';

// Next.js 15 page props for async searchParams
interface PageProps {
  searchParams: Promise<{ sortBy?: 'due_date' | 'topic' | 'status' }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  // Await search parameters from the URL (e.g., ?sortBy=topic)
  const params = await searchParams;
  const sortBy = params.sortBy || 'due_date';

  // Direct SQLite query on the server to get active tasks sorted
  const tasks = getTasks(sortBy);

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-8 min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          📝 Todo App
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Local-first SQLite task manager with dynamic overdue detection.
        </p>
      </header>

      {/* Task Creation Form */}
      <TaskForm />

      {/* Task Sorting Toolbar */}
      <TaskFilterToolbar />

      {/* List of Tasks */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          Tasks ({tasks.length})
        </h2>

        {/* Empty state if no tasks exist */}
        {tasks.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl border-zinc-300 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">No active tasks found. Create one above!</p>
          </div>
        ) : (
          /* Render grid of task cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
