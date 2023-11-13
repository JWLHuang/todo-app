import * as mongoDB from "mongodb";
import { ROLE, User } from "../model/user";
import { collections } from "../db";
import bcrypt from "bcrypt";

export const getUserList = async (): Promise<User[]> => {
    return await collections.userList.find({}).toArray();
}

export const findUser = async (_id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<User> => {
    return await collections.userList.findOne(_id);
}

export const register = async (login: string, password: string, role: ROLE) => {
    const user = await collections.userList.findOne({login: `${login}`});
    if (user) return null;
    const newUser: User = {
        login,
        password: bcrypt.hashSync(password, 10),
        role,
        _id: null,
    }

    await collections.userList.insertOne(newUser)
    return newUser;
}
