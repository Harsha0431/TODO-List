import type { TODO } from "../../features/todo/model/todo.types";

export function sortTasksByDate(data: TODO[]): TODO[] {
    return data.sort((a, b) => b.createdAt - a.createdAt);
}