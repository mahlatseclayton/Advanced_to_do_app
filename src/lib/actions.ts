'use server';
import { createTask, updateTask, archiveTask, unarchiveTask } from './tasks';
import { TaskStatus } from './types';
import { revalidatePath } from 'next/cache';

// Creating tasks
export async function createTaskAction(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due_date = formData.get('due_date') as string;
    const status = (formData.get('status') as TaskStatus) || 'Todo';
    const topic = formData.get('topic') as string;

    if (!title || !description || !topic || !due_date) {
        throw new Error('All fields are required');
    }

    createTask({ title, description, due_date, topic, status });
    revalidatePath('/');
    return { success: true };
}

// Updating tasks
export async function updateTaskAction(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due_date = formData.get('due_date') as string;
    const status = (formData.get('status') as TaskStatus) || 'Todo';
    const topic = formData.get('topic') as string;

    if (!title || !description || !topic || !due_date) {
        throw new Error('All fields are required');
    }

    updateTask(id, { title, description, due_date, topic, status });
    revalidatePath('/');
    return { success: true };
}

// Archiving tasks
export async function archiveTaskAction(id: number) {
    archiveTask(id);
    revalidatePath('/');
    return { success: true };
}

// Unarchiving tasks
export async function unarchiveTaskAction(id: number) {
    unarchiveTask(id);
    revalidatePath('/');
    return { success: true };
}