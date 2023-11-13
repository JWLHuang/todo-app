import { WithId, Document, ObjectId } from "mongodb";

export enum CATEGORY {
    Work = 'WORK',
    School = 'SCHOOL',
    Other = 'OTHER',
}

export interface TodoItem extends WithId<Document> {
    _id: ObjectId;
    userLogin?: string;
    title?: string;
    category?: CATEGORY;
    description?: string;
    isCompleted?: boolean;
    createDate?: number;
    updateDate?: number;
}

// export interface TodoItem extends TodoItemBase {
//     id?: number;
// }
