import { todoList } from "../data/list";
import { CATEGORY, TodoItem } from "../model/todoItem";

export const getTodoList = async (): Promise<TodoItem[]> => Object.values(todoList);

export const addTodoItem = async (title: string, category: CATEGORY, description: string): Promise<TodoItem> => {
    const newID: number = Object.keys(todoList).length + 1;
    const currentDate: number = Date.now();
    const newTodoItem: TodoItem = {
        id: newID,
        title,
        category,
        description,
        isCompleted: false,
        createDate: currentDate,
        updateDate: currentDate,
    };

    todoList[newID] = newTodoItem;
    console.log("Added" + newTodoItem);
    return newTodoItem;
}

export const findToDoItem = async (id: number): Promise<TodoItem> => todoList[id];
