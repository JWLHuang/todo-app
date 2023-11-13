import express, { Request, Response } from "express";
import { TodoItem } from "../model/todoItem";
import * as CrudService from "../controller/todoListController";
import { ObjectId } from "mongodb";
import { ROLE } from "../model/user";

export const todoListRouter = express.Router();
todoListRouter.use(express.json());

todoListRouter.get('/', async (req: Request, res: Response) => {
    try {
        const todoList = await CrudService.getTodoList();
        res.status(200).send(todoList);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.get('/:id' , async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const foundTodoItem = await CrudService.findTodoItem(query);
        res.status(200).send(foundTodoItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.post('/new', async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.user.role === ROLE.Admin) {
            const {title, category, description} = req.body;
            const TodoItemToAdd = await CrudService.addTodoItem(title, category, description);
            res.status(201).json(TodoItemToAdd);
        } else {
            res.status(403).send('You are not authorized to modify the todoList');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.user.role === ROLE.Admin) {
            const id: string = req.params.id;
            const query = { _id: new ObjectId(id) };
            const infoToUpdate: TodoItem = {...req.body};
            const updatedItem = await CrudService.updateTodoItem(query, infoToUpdate);
            res.status(200).json(updatedItem);
        } else {
            res.status(403).send('You are not authorized to modify the todoList');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.user.role === ROLE.Admin) {
            const id: string = req.params.id;
            const idToDelete = { _id: new ObjectId(id)};
            const removedItem = await CrudService.deleteTodoItem(idToDelete);
            if (removedItem && removedItem.deletedCount) {
                    res.status(202).send(`Successfully removed todoItem with id ${id}`);
                } else if (!removedItem) {
                    res.status(400).send(`Failed to remove todoItem with id ${id}`);
                } else if (!removedItem.deletedCount) {
                    res.status(404).send(`todoItem with id ${id} does not exist`);
                }
        } else {
            res.status(403).send('You are not authorized to modify the todoList');
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
