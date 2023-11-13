import express, { Request, Response } from "express";
import * as UserService from "../controller/userController";
import { ObjectId } from "bson";
import { User } from "../model/user";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/login', async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const loggedInUser = await UserService.verifyLogin(login, password);
    if (!loggedInUser) {
        res.status(401).send(`Failed to login`);
    } else {
        if (!req.session.user) {
            req.session.user = {
                login: loggedInUser.login,
                role: loggedInUser.role,
            };
        }
        console.log(req.session);
        res.status(200).send(`Logged in as user ${login}`)
    }
});

userRouter.get('/logout', async (req: Request, res: Response) => {
    if (req.session.user) {
        delete req.session.user;
        res.status(200).send('Logged out!');
    } else {
        res.status(201).send('You are already logged out!');
    }
});

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
        const userToAdd = await UserService.createUser(login, password, role);
        if (userToAdd === null) {
            res.status(400).send(`Login already exists.`);
        } else {
            res.status(201).json(userToAdd);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.put('/:id',async (req: Request, res: Response) => {
    try {
        const userID = req.params.id;
        const query = { _id: new ObjectId(userID) };
        const infoToUpdate: User = {...req.body};
        const updatedUser = await UserService.updateUser(query, infoToUpdate)
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userID = req.params.id;
        const userToDelete = { _id: new ObjectId(userID) };
        const removedUser = await UserService.deleteUser(userToDelete);
        if (removedUser && removedUser.deletedCount) {
                res.status(202).send(`Successfully removed user with id ${userID}`);
            } else if (!removedUser) {
                res.status(400).send(`Failed to remove user with id ${userID}`);
            } else if (!removedUser.deletedCount) {
                res.status(404).send(`user with id ${userID} does not exist`);
            }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
