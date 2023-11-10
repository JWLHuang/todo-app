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
