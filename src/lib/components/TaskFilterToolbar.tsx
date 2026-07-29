// Client component directive for drop-down navigation
'use client';

// Next.js navigation hooks to change URL search parameters (like ?sortBy=due_date)
import { useRouter, useSearchParams } from 'next/navigation';

export default function TaskFilterToolbar() {
  const router = useRouter(); // Hook to navigate/push new URL
  const searchParams = useSearchParams(); // Hook to read current URL search query (?sortBy=...)
  const currentSort = searchParams.get('sortBy') || 'due_date'; // Default sort is 'due_date'

  // Called whenever user changes the dropdown selection
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', e.target.value); // Set new sortBy query value
    router.push(`/?${params.toString()}`); // Update browser URL, triggering server re-query
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Sort Tasks By:</span>
      
      {/* Dropdown for sorting options */}
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="px-3 py-1.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
      >
        <option value="due_date">Due Date</option>
        <option value="topic">Topic</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}
