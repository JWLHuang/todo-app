import express, { Request, Response } from "express";
import * as UserService from "../controller/userController";
import { ObjectId } from "bson";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        console.log("Successfully reached user page");
        const userList = await UserService.getUserList();
        console.log(userList);
        res.status(200).send(userList);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const userID = req.params.id;
        const query = { _id: new ObjectId(userID) };
        const foundUser = await UserService.findUser(query);
        res.status(200).send(foundUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.post('/new', async (req: Request, res: Response) => {
    try {
        const { login, password, role } = req.body;
        const userToAdd = await UserService.register(login, password, role);
        if (userToAdd === null) {
            res.status(400).send(`Login already exists.`);
        } else {
            res.status(201).json(userToAdd);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});
