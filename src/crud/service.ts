import { todoList } from "../data/list";
import { CATEGORY, TodoItem } from "../model/todoItem";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// export const getTodoList = async (): Promise<TodoItem[]> => Object.values(todoList);
export const collections: { todoList?: mongoDB.Collection } = {}

export async function connectToDatabase () {
   dotenv.config();

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

   await client.connect();

   const db: mongoDB.Db = client.db(process.env.DB_NAME);
   const todoList: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME);

    collections.todoList = todoList;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todoList.collectionName}`);
}

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

export const findTodoItem = async (id: number): Promise<TodoItem> => todoList[id];

export const updateTodoItem = async (id: number, updatedItem: TodoItem): Promise<TodoItem> => {
    const toUpdate = todoList[id];
    Object.assign(toUpdate, {...updatedItem, updateDate: Date.now()});
    console.log("Updated" + toUpdate);
    return toUpdate;
}

export const deleteTodoItem = async (id: number): Promise<null | void> => {
    const itemToDelete: TodoItem = await findTodoItem(id);
    if (!itemToDelete) {
        return null;
    }
    console.log("Deleted" + todoList[id]);
    delete todoList[id];
}
