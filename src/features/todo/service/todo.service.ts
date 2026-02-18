import type { TODO } from "../model/todo.types";
import { TodoRepository } from "../data/todo.repository.js";
import { generateId } from "../../../utils/todo/generateId.js";
import { sortTasksByDate } from "../../../utils/todo/filterAndSortTasks.js";


export class TodoService {
    constructor(private repo: TodoRepository = new TodoRepository()) {}

    async getTodos(): Promise<TODO[]> {
        const todos = await this.repo.getAll();

        return sortTasksByDate(todos);
    }

    async create(title: string): Promise<TODO[] | null> {
        const cleanTitle = title.trim();

        if (!cleanTitle)
            return null;

        const todo: TODO = {
            id: generateId(),
            title: cleanTitle,
            status: 'pending',
            createdAt: Date.now()
        };

        const updatedTodos:TODO[] = await this.repo.create(todo);
        return updatedTodos;
    }

    async toggle(id: string): Promise<TODO[] | null> {
        const todo = await this.repo.getById(id);
        if (!todo) return null;

        todo.status = todo.status === 'completed' ? 'pending' : 'completed';

        return this.repo.toggle(todo);
    }

    async delete(id: string): Promise<TODO[]> {
        return this.repo.remove(id);
    }
}
