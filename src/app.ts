import express, { Request, Response } from 'express';
import { TodoItem } from './model/todoItem';
import * as CrudService from './crud/service';

// api router - TODO move this to its own module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const todoList: TodoItem[] = await CrudService.getTodoList();
        res.status(200).send(todoList);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id' , async (req: Request, res: Response) => {
    try {
    const idNumber: number = parseInt(req.params.id);
    const foundTodoItem = await CrudService.findTodoItem(idNumber);
    res.status(200).send(foundTodoItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/new', async (req:Request, res: Response) => {
    try {
        const {title, category, description} = req.body;
        const newTodoItem = await CrudService.addTodoItem(title, category, description);
        res.status(201).json(newTodoItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
    const idToUpdate: number = parseInt(req.params.id);
    const infoToUpdate: TodoItem = { id: idToUpdate, ...req.body };
    const updatedItem = await CrudService.updateTodoItem(idToUpdate, infoToUpdate);
    res.status(200).json(updatedItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// app
const port = 3000;
const app = express();

app.use(express.json());

app.use('/api/todoList', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
