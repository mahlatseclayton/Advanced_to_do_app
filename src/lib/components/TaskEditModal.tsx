'use client';

import { useState } from 'react';
import { Task } from '../types';
import { updateTaskAction } from '../actions';
import styles from './TaskEditModal.module.css';

interface TaskEditModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskEditModal({ task, onClose }: TaskEditModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    try {
      await updateTaskAction(task.id, formData);
      onClose();
    } catch (err) {
      alert('Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Task #{task.id}</h2>
          <button onClick={onClose} className={styles.btnClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input
              name="title"
              defaultValue={task.title}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <label className={styles.label}>Topic *</label>
              <input
                name="topic"
                defaultValue={task.topic}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Due Date *</label>
              <input
                name="due_date"
                type="date"
                defaultValue={task.due_date}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <select name="status" defaultValue={task.status} className={styles.select}>
              <option value="Todo">Todo</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              defaultValue={task.description}
              rows={3}
              className={styles.textarea}
            ></textarea>
          </div>

          <div className={styles.footerActions}>
            <button type="button" onClick={onClose} className={styles.btnCancel}>
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className={styles.btnSave}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
