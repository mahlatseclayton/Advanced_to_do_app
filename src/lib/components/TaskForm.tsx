'use client';

import { useRef, useState } from 'react';
import { createTaskAction } from '../actions';
import styles from './TaskForm.module.css';

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createTaskAction(formData);
      formRef.current?.reset();
    } catch (err) {
      alert('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.formCard}>
      <h2 className={styles.heading}>Create New Task</h2>
      
      <div className={styles.gridTwo}>
        <div className={styles.field}>
          <label className={styles.label}>Title *</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Finish Lab 1 Report"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Topic *</label>
          <input
            name="topic"
            type="text"
            required
            placeholder="e.g. University / SDP"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Due Date *</label>
          <input name="due_date" type="date" required className={styles.input} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select name="status" defaultValue="Todo" className={styles.select}>
            <option value="Todo">Todo</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          name="description"
          rows={2}
          placeholder="Additional notes or details..."
          className={styles.textarea}
        ></textarea>
      </div>

      <div className={styles.actions}>
        <button type="submit" disabled={isSubmitting} className={styles.btnSubmit}>
          {isSubmitting ? 'Adding Task...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
