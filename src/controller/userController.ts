import * as mongoDB from "mongodb";
import { User } from "../model/user";
import { collections } from "../db";

export const getUserList = async (): Promise<User[]> => {
    return await collections.userList.find({}).toArray();
}

export const findUser = async (_id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<User> => {
    return await collections.userList.findOne(_id);
}
