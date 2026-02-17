import type { TODO } from '../model/todo.types';
import type { TodoDataStore } from "../../../core/storage/storage.interface";
import { LocalStorageService } from "../../../core/storage/local-storage.service";


export class TodoRepository {
    private store: TodoDataStore;

    constructor(store: TodoDataStore = new LocalStorageService()) {
        this.store = store;
    }

    getAll(): TODO[] {
        return this.store.getAll();
    }

    getById(id: string): TODO | null {
        try {
            return this.store.get(id);
        } catch {
            return null;
        }
    }

    create(todo: TODO): void {
        this.store.add(todo);
    }

    toggle(todo: TODO): TODO {
        return this.store.updateStatus(todo);
    }

    remove(id: string): void {
        this.store.delete(id);
    }
}
