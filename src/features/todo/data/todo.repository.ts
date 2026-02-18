import type { TODO } from '../model/todo.types';
import type { TodoDataStore } from "../../../core/storage/storage.interface";
import { LocalStorageService } from "../../../core/storage/local-storage.service.js";

// Cache
export class TodoRepository {
    private store: TodoDataStore;

    constructor(store: TodoDataStore = new LocalStorageService()) {
        this.store = store;
    }

    async getAll(): Promise<TODO[]> {
        return this.store.getAll();
    }

    async getById(id: string): Promise<TODO | null> {
        try {
            return this.store.get(id);
        } catch {
            return null;
        }
    }

    async create(todo: TODO): Promise<TODO[]> {
        return this.store.add(todo);
    }

    async toggle(todo: TODO): Promise<TODO[]> {
        return this.store.updateStatus(todo);
    }

    async remove(id: string): Promise<TODO[]> {
        return this.store.delete(id);
    }
}
