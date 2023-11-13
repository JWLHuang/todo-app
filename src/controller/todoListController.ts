import * as mongoDB from "mongodb";
import { CATEGORY, TodoItem } from "../model/todoItem";
import { collections } from "../db";

export const getTodoList = async (findQuery = {}): Promise<TodoItem[]> => {
    return await collections.todoList.find(findQuery).toArray();
}

export const findTodoItem = async (_id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<TodoItem> => {
    return await collections.todoList.findOne(_id);
}

export const addTodoItem = async (userLogin: string, title: string, category: CATEGORY, description: string): Promise<TodoItem> => {
    const currentDate: number = Date.now();
    const newTodoItem: TodoItem = {
        userLogin,
        title,
        category,
        description,
        isCompleted: false,
        createDate: currentDate,
        updateDate: currentDate,
        _id: null,
    };
    await collections.todoList.insertOne(newTodoItem);
    return newTodoItem;
}

export const updateTodoItem = async (query: mongoDB.Filter<mongoDB.BSON.Document>, updatedItem: TodoItem): Promise<TodoItem> => {
    const toUpdate: TodoItem = await collections.todoList.findOne(query);
    if (toUpdate !== null) {
        Object.assign(toUpdate, {...updatedItem, updateDate: Date.now()});
        await collections.todoList.updateOne(query, { $set: toUpdate})
    }
    return toUpdate;
}

export const deleteTodoItem = async (id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<mongoDB.DeleteResult> => {
    const itemToDelete = await collections.todoList.deleteOne(id);
    if (!itemToDelete) {
        return null;
    }
    return itemToDelete;
}
