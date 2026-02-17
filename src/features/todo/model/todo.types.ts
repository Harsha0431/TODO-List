export type TaskStatus = 'completed' | 'pending'

export interface TODO {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: number
}