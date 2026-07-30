'use client';

import { useState } from 'react';
import { Task } from '../types';
import { unarchiveTaskAction } from '../actions';
import styles from './ArchivedTasksModal.module.css';

interface ArchivedTasksModalProps {
  archivedTasks: Task[];
  onClose: () => void;
}

export default function ArchivedTasksModal({ archivedTasks, onClose }: ArchivedTasksModalProps) {
  const [restoringId, setRestoringId] = useState<number | null>(null);

  const handleUnarchive = async (id: number) => {
    setRestoringId(id);
    try {
      await unarchiveTaskAction(id);
    } catch (err) {
      alert('Failed to restore task');
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2 className={styles.title}>Archived Tasks ({archivedTasks.length})</h2>
          <button onClick={onClose} className={styles.btnClose}>X</button>
        </div>

        <div className={styles.content}>
          {archivedTasks.length === 0 ? (
            <p className={styles.emptyText}>No archived tasks currently stored.</p>
          ) : (
            <div className={styles.taskList}>
              {archivedTasks.map(task => (
                <div key={task.id} className={styles.taskItem}>
                  <div className={styles.taskInfo}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskTopic}>#{task.topic} - Due: {task.due_date}</span>
                  </div>
                  <button
                    onClick={() => handleUnarchive(task.id)}
                    disabled={restoringId === task.id}
                    className={styles.btnUnarchive}
                  >
                    {restoringId === task.id ? 'Restoring...' : 'Unarchive'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.btnCloseBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}
