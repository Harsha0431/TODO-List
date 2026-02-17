import type { TODO } from "../model/todo.types";
import { TodoRepository } from "../data/todo.repository";
import { generateId } from "../../../utils/todo/generateId";


export class TodoService {
    constructor(private repo: TodoRepository = new TodoRepository()) {}

    async getTodos(): Promise<TODO[]> {
        const todos = this.repo.getAll();

        return todos.sort((a, b) => b.createdAt - a.createdAt);
    }

    async create(title: string): Promise<TODO | null> {
        const cleanTitle = title.trim();

        if (!cleanTitle)
            return null;

        const todo: TODO = {
            id: generateId(),
            title: cleanTitle,
            status: 'pending',
            createdAt: Date.now()
        };

        this.repo.create(todo);
        return todo;
    }

    async toggle(id: string): Promise<TODO | null> {
        const todo = this.repo.getById(id);
        if (!todo) return null;

        todo.status = todo.status === 'completed' ? 'pending' : 'completed';

        return this.repo.toggle(todo);
    }

    async delete(id: string): Promise<void> {
        this.repo.remove(id);
    }
}
