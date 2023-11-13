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

export const createUser = async (login: string, password: string, role: ROLE) => {
    const user = await collections.userList.findOne({login: `${login}`});
    if (user) return null;
    const newUser: User = {
        login,
        password: hashPassword(password),
        role,
        _id: null,
    }

    await collections.userList.insertOne(newUser)
    return newUser;
}

export const updateUser = async (id: mongoDB.Filter<mongoDB.BSON.Document>, infoToUpdate: User): Promise<User> => {
    if (infoToUpdate.password) {
        infoToUpdate.password = hashPassword(infoToUpdate.password);
    }
    const userToUpdate: User = await collections.userList.findOne(id);
    Object.assign(userToUpdate, {...infoToUpdate});
    await collections.userList.updateOne(id, {$set: userToUpdate});
    return userToUpdate;
}

export const deleteUser = async (id: mongoDB.Filter<mongoDB.BSON.Document>): Promise<mongoDB.DeleteResult> => {
    const userToDelete = await collections.userList.deleteOne(id);
    if (!userToDelete) return null;
    console.log("Deleted" + id);
    return userToDelete;
}

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
}

export const verifyLogin = async (login: string, password: string): Promise<User> => {
    const user = await collections.userList.findOne({login: `${login}`}) as User;
    if (!user || bcrypt.compareSync(password, user.password) == false) return null;
    return user;
}
