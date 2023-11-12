import express from 'express';
import * as CrudService from './crud/service';
import { router } from './router';

// app
const port = 3000;
const app = express();
app.use(express.json());

CrudService.connectToDatabase()
    .then(() => {
        app.use('/api/todoList', router);

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
