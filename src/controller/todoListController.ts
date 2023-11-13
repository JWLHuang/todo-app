import * as mongoDB from "mongodb";
import { CATEGORY, TodoItem } from "../model/todoItem";
import { collections } from "../db";

export const getTodoList = async (): Promise<TodoItem[]> => {
    return await collections.todoList.find({}).toArray();

}

export const findTodoItem = async (_id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<TodoItem> => {
    return await collections.todoList.findOne(_id);
}

export const addTodoItem = async (title: string, category: CATEGORY, description: string): Promise<TodoItem> => {
    const currentDate: number = Date.now();
    const newTodoItem: TodoItem = {
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

export const updateTodoItem = async (id: mongoDB.Filter<mongoDB.BSON.Document>, updatedItem: TodoItem): Promise<TodoItem> => {
    const toUpdate: TodoItem = await collections.todoList.findOne(id);
    Object.assign(toUpdate, {...updatedItem, updateDate: Date.now()});
    console.log("Updated" + toUpdate);
    await collections.todoList.updateOne(id, { $set: toUpdate})
    return toUpdate;
}

export const deleteTodoItem = async (id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<mongoDB.DeleteResult> => {
    const itemToDelete = await collections.todoList.deleteOne(id);
    if (!itemToDelete) {
        return null;
    }
    console.log("Deleted" + id);
    return itemToDelete;
}
