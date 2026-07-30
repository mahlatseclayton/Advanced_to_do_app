import { getTasks, getArchivedTasks } from '@/src/lib/tasks';
import TaskForm from '@/src/lib/components/TaskForm';
import TaskCard from '@/src/lib/components/TaskCard';
import TaskFilterToolbar from '@/src/lib/components/TaskFilterToolbar';
import ArchivedSection from '@/src/lib/components/ArchivedSection';
import styles from './page.module.css';

interface PageProps {
  searchParams: Promise<{ sortBy?: 'due_date' | 'topic' | 'status' }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sortBy = params.sortBy || 'due_date';
  const tasks = getTasks(sortBy);
  const archivedTasks = getArchivedTasks();

  return (
    <main className={styles.mainContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
        <p className={styles.subtitle}>
          Local-first task manager with dynamic overdue detection.
        </p>
      </header>

      {/* Task Creation Form */}
      <TaskForm />

      {/* Task Sorting Toolbar */}
      <TaskFilterToolbar />

      {/* Archived Tasks Trigger Button */}
      <ArchivedSection archivedTasks={archivedTasks} />

      {/* List of Active Tasks */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Active Tasks ({tasks.length})
        </h2>

        {/* Empty state if no tasks exist */}
        {tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No active tasks found. Create one above.</p>
          </div>
        ) : (
          /* Render grid of task cards */
          <div className={styles.taskGrid}>
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
