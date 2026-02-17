import type { TODO } from '../../features/todo/model/todo.types'


export interface TodoDataStore {
    get(id: string): TODO;
    getAll(): TODO[]
    
    updateStatus(task: TODO): TODO

    add(data: TODO): void

    delete(id: string): void
}