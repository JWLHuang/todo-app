import express from 'express';
import { connectToDatabase } from './db';
import { todoListRouter } from './router/todoListRouter';
import { userRouter } from './router/userRouter';

const port = 3000;
const app = express();
app.use(express.json());

connectToDatabase()
    .then(() => {
        app.use('/api/todoList', todoListRouter);
        app.use('/api/user', userRouter);

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        app.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
