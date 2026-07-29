'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './TaskFilterToolbar.module.css';

export default function TaskFilterToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sortBy') || 'due_date';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', e.target.value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.toolbar}>
      <span className={styles.label}>Sort Tasks By:</span>
      <select value={currentSort} onChange={handleSortChange} className={styles.select}>
        <option value="due_date">Due Date</option>
        <option value="topic">Topic</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}
