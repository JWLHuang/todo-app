import express from 'express';
import session from 'express-session';
import { connectToDatabase } from './db';
import { todoListRouter } from './router/todoListRouter';
import { userRouter } from './router/userRouter';

// https://github.com/expressjs/session/issues/792
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

connectToDatabase()
    .then(() => {
        app.use(session({
            secret: 'todoappsecret!!!',
            cookie: { maxAge: 3600 * 1000 }, //1 hour
            saveUninitialized: true,
            resave: false,
        }));

        app.use('/api/todoList', todoListRouter);
        app.use('/api/user', userRouter);

        app.get('/', (req, res) => {
            if (req.session.user) {
                res.send(`Hello ${req.session.user}!`);
            } else {
                res.sendFile('static/login.html', {root: __dirname});
            }
        });
        app.get('/new', (req, res) => {
            if (req.session.user) {
                res.sendFile('static/addTodo.html', {root: __dirname});
            } else {
                res.sendFile('static/login.html', {root: __dirname});
            }
        });

        app.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
