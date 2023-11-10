import { TodoItem } from "./todoItem";

export interface TodoList {
    [key: number]: TodoItem;
}
