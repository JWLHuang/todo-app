import { CATEGORY } from "../model/todoItem";
import { TodoList } from "../model/todoList";

export let todoList: TodoList = {
    1: {
        id: 1,
        category: CATEGORY.Work,
        title: 'todo 1',
        description: 'done the first thing',
        isCompleted: true,
        createDate: 1234567890,
        updateDate: 1234567890,
    },
    2: {
        id: 2,
        category: CATEGORY.School,
        title: 'todo 2',
        description: 'do the second thing',
        isCompleted: false,
        createDate: 1234567890,
        updateDate: 1234567890,
    },
    3: {
        id: 3,
        category: CATEGORY.Other,
        title: 'todo 3',
        description: 'do the third thing',
        isCompleted: false,
        createDate: 1234567890,
        updateDate: 1234567890,
    },
};
