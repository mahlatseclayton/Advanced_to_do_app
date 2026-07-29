export type TaskStatus = 'Todo' | 'In-Progress' | 'Complete';

export interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string; // ISO Format YYYY-MM-DD
    topic: string;
    status: TaskStatus;
    is_archived: number; // 0 or 1
    created_at: string;
    is_overdue?: boolean; // Derived field
}

export function computeIsOverdue(dueDateStr: string, status: TaskStatus): boolean {
    if (status === 'Complete') return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDateStr < today;
}