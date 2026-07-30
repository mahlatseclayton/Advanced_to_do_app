'use client';

import { useState } from 'react';
import { Task } from '../types';
import ArchivedTasksModal from './ArchivedTasksModal';
import styles from './ArchivedSection.module.css';

interface ArchivedSectionProps {
  archivedTasks: Task[];
}

export default function ArchivedSection({ archivedTasks }: ArchivedSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(true)} className={styles.btnArchived}>
        📦 View Archived Tasks ({archivedTasks.length})
      </button>

      {isOpen && (
        <ArchivedTasksModal
          archivedTasks={archivedTasks}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
