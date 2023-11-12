import express, { Request, Response } from "express";
import { TodoItem } from "./model/todoItem";
import * as CrudService from "./crud/service";
import { ObjectId } from "mongodb";

export const router = express.Router();
router.use(express.json())

router.get('/', async (req: Request, res: Response) => {
    try {
        // const todoList: TodoItem[] = await CrudService.getTodoList();
        const todoList = await CrudService.collections.todoList.find({}).toArray();
        res.status(200).send(todoList);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id' , async (req: Request, res: Response) => {
    try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    // const query = {"_id" : idNumber} 
    // const foundTodoItem = await CrudService.findTodoItem(idNumber);
    const foundTodoItem = await CrudService.collections.todoList.findOne(query);
    res.status(200).send(foundTodoItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/new', async (req: Request, res: Response) => {
    try {
        const {title, category, description} = req.body;
        const TodoItemToAdd = await CrudService.addTodoItem(title, category, description);
        const newToDoItem = await CrudService.collections.todoList.insertOne(TodoItemToAdd);
        res.status(201).json(newToDoItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const infoToUpdate: TodoItem = {...req.body};
        const updatedItem = await CrudService.updateTodoItem(query, infoToUpdate);
        const updateDataBase = await CrudService.collections.todoList.updateOne(query, { $set: updatedItem});

        res.status(200).json(updateDataBase);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
    const idToDelete: number = parseInt(req.params.id);
    await CrudService.deleteTodoItem(idToDelete);
    res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
