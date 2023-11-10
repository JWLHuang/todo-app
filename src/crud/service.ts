import { todoList } from "../data/list";
import { TodoItem } from "../model/todoItem";

export const getTodoList = async (): Promise<TodoItem[]> => Object.values(todoList);
