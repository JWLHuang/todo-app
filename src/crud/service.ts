import { todoList } from "../data/list";
import { CATEGORY, TodoItem } from "../model/todoItem";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// export const getTodoList = async (): Promise<TodoItem[]> => Object.values(todoList);
export const collections: { todoList?: mongoDB.Collection } = {}


export const connectToDatabase = async () => {
    dotenv.config();
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    
    await client.connect();
    
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const todoList: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME);
    
    collections.todoList = todoList;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todoList.collectionName}`);
}


export const getTodoList = async (): Promise<TodoItem[]> => {
    return await collections.todoList.find({}).toArray();

}

export const findTodoItem = async (_id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<TodoItem> => {
    return await collections.todoList.findOne(_id);
}

export const addTodoItem = async (title: string, category: CATEGORY, description: string): Promise<TodoItem> => {
    // const newID: number = Object.keys(todoList).length + 1;
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

    // todoList[newID] = newTodoItem;
    // console.log("Added" + newTodoItem);
    return newTodoItem;
}

// export const findTodoItem = async (id: number): Promise<TodoItem> => todoList[id];

export const updateTodoItem = async (id: mongoDB.Filter<mongoDB.BSON.Document>, updatedItem: TodoItem): Promise<TodoItem> => {
    const toUpdate: TodoItem = await collections.todoList.findOne(id);
    Object.assign(toUpdate, {...updatedItem, updateDate: Date.now()});
    console.log("Updated" + toUpdate);
    await collections.todoList.updateOne(id, { $set: toUpdate})
    return toUpdate;
}

export const deleteTodoItem = async (id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<mongoDB.DeleteResult> => {
    // const itemToDelete: TodoItem = await findTodoItem(id);
    const itemToDelete = await collections.todoList.deleteOne(id);
    if (!itemToDelete) {
        return null;
    }
    
    console.log("Deleted" + id);
    return itemToDelete;
    // delete todoList[id];
}
