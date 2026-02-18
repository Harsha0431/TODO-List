import type { TODO } from '../../features/todo/model/todo.types'


export interface TodoDataStore {
    get(id: string): Promise<TODO>
    
    getAll(): Promise<TODO[]>
    
    updateStatus(task: TODO): Promise<TODO[]>

    add(data: TODO): Promise<TODO[]>

    delete(id: string): Promise<TODO[]>

    search(title: string): Promise<TODO[]>
}