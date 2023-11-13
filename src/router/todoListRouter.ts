import express, { Request, Response } from "express";
import { TodoItem } from "../model/todoItem";
import * as TodoListService from "../controller/todoListController";
import { ObjectId } from "mongodb";

export const todoListRouter = express.Router();
todoListRouter.use(express.json());

todoListRouter.get('/', async (req: Request, res: Response) => {
    try {
        let todoList = [];
        if (req.session.user) {
            todoList = await TodoListService.getTodoList(req.session.user.login);
        } else {
            todoList = await TodoListService.getTodoList();
        }
        res.status(200).send(todoList);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.get('/:id' , async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const foundTodoItem = await TodoListService.findTodoItem(query);
        res.status(200).send(foundTodoItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.post('/item', async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            // Allow this in order to test with form field
            if (req.body.action === 'delete') {
                await deleteItem(req, res);
            } else if (req.body.action === 'update') {
                await putItem(req, res);
            } else {
                const userLogin = req.session.user.login;
                const {title, category, description} = req.body;
                const TodoItemToAdd = await TodoListService.addTodoItem(userLogin, title, category, description);
                res.status(201).json(TodoItemToAdd);
            }
        } else {
            res.status(403).send('You are not authorized to modify the todoList');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

todoListRouter.put('/item', async (req: Request, res: Response) => {
    await putItem(req, res);
});

todoListRouter.delete('/item', async (req: Request, res: Response) => {
   await deleteItem(req, res);
});

const putItem = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const userLogin = req.session.user.login;
            const query = { _id: new ObjectId(req.body.id), userLogin };
            const infoToUpdate: TodoItem = {...req.body, userLogin };
            const updatedItem = await TodoListService.updateTodoItem(query, infoToUpdate);
            if (updatedItem === null) {
                res.status(404).send(`todoItem with id ${query._id} does not exist`);
            } else {
                res.status(200).json(updatedItem);
            }
        } else {
            res.status(403).send('You are not authorized to modify the todoList');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const deleteItem = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const id = req.body.id;
            const idToDelete = { _id: new ObjectId(id), userLogin: req.session.user.login };
            const removedItem = await TodoListService.deleteTodoItem(idToDelete);
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
};
