'use server';
import { createTask, updateTask, archiveTask } from './tasks';
import { TaskStatus } from './types';
import { revalidatePath } from 'next/cache';

// creating tasks
export async function createTaskAction(formData: FormData) {
    // get form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due_date = formData.get('due_date') as string;
    const status = (formData.get('status') as TaskStatus) || 'To-Do';
    const topic = formData.get('topic') as string;
    if (!title || !description || !topic || !due_date) {
        throw new Error('All fields are required');
    }
    createTask({ title, description, due_date, topic, status });
    revalidatePath('/tasks');
    return { success: true };
}
export async function updateTaskAction(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due_date = formData.get('due_date') as string;
    const status = (formData.get('status') as TaskStatus) || 'To-Do';
    const topic = formData.get('topic') as string;
    if (!title || !description || !topic || !due_date) {
        throw new Error('All fields are required');
    }
    updateTask(id, { title, description, due_date, topic, status });
    revalidatePath('/tasks');
    return { success: true };
}
export async function archiveTaskAction(id: number) {
    archiveTask(id);
    revalidatePath('/tasks');
    revalidatePath('/archived');
    return { success: true };
}