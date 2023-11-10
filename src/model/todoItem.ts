export enum CATEGORY {
    Work = 'WORK',
    School = 'SCHOOL',
    Other = 'OTHER',
}

export interface TodoItemBase {
    title: string;
    category: CATEGORY;
    description: string;
    isCompleted: boolean;
    createDate: number;
    updateDate: number;
}

export interface TodoItem extends TodoItemBase {
    id: number;
}
