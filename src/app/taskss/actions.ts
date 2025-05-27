import { FormData, TaskResult } from "./schema";

export const createTask = async (newTask: FormData) => {
        const response = await fetch('/api/task', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
        throw new Error('Creating task failed!');
        }
        return await response.json();
    };

export const updateTask = async ({_id, task, description}: TaskResult ) => {
        const response = await fetch(`/api/task/${_id.toString()}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({task,description}),
        });
        if (!response.ok) {
        throw new Error('Updating task failed!');
        }
        return await response.json();
    };
    
export const deleteTask = async (_id:string) =>{
        const response = await fetch(`/api/task/${_id.toString()}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
        throw new Error('Deleting task failed!');
        }
        return await response.json();
    }