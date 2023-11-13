import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";


export const collections: { todoList?: mongoDB.Collection, userList?: mongoDB.Collection } = {}

export const connectToDatabase = async () => {
    dotenv.config();
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    
    await client.connect();
    
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const todoList: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME);
    const userList: mongoDB.Collection = db.collection(process.env.USER_COLLECTION);
    
    collections.todoList = todoList;
    collections.userList = userList;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todoList.collectionName}, ${userList.collectionName}`);
}
