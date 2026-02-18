import type { TodoDataStore } from "./storage.interface";
import type { TODO } from "../../features/todo/model/todo.types";


export class LocalStorageService implements TodoDataStore {
    private readonly STORAGE_KEY = "todos";

    private read(): TODO[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (!raw) return [];

        try {
            return JSON.parse(raw) as TODO[];
        } catch {
            console.warn("Corrupted localStorage data. Resetting...");
            localStorage.removeItem(this.STORAGE_KEY);
            return [];
        }
    }

    private write(data: TODO[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    async get(id: string): Promise<TODO> {
        const todos = this.read();
        const todo = todos.find(t => t.id === id);

        if (!todo)
            throw new Error(`Todo with id "${id}" not found`);

        return todo;
    }

    async getAll(): Promise<TODO[]> {
        return this.read();
    }

    async add(data: TODO): Promise<TODO[]> {
        const todos = this.read();

        // prevent duplicate ids
        if (todos.some(t => t.id === data.id))
            throw new Error(`Todo with id "${data.id}" already exists`);

        todos.unshift(data);
        this.write(todos);

        return todos;
    }

    async updateStatus(task: TODO): Promise<TODO[]> {
        const todos: TODO[] = this.read();

        const index: number = todos.findIndex(t => t.id === task.id);
        if (index === -1 || !todos[index])
            throw new Error(`Todo with id "${task.id}" not found`);

        const todoTask: TODO = todos[index];
        
        todos[index] = {
            ...todoTask,
            completed: task.completed
        };

        this.write(todos);
        return todos;
    }

    async delete(id: string): Promise<TODO[]> {
        const todos = this.read();
        const filtered = todos.filter(t => t.id !== id);

        this.write(filtered);

        return filtered;
    }

    async search(title: string): Promise<TODO[]> {
        const todos = this.read();
        const filtered = todos.filter(t => t.title.toLowerCase().includes(title.toLowerCase()));

        return filtered;
    }
}
