import { WithId, Document, ObjectId } from "mongodb";

export enum ROLE {
    Admin = 'ADMIN',
    User = 'USER',
}

export interface User extends WithId<Document> {
    _id: ObjectId;
    login?: string;
    password?: string;
    role?: ROLE;
}
