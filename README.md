# TODO-APP

## quickstart

```
$ npm run install
$ npm run dev
```

The service will then be available at http://localhost:3000/.

From the UI, you can:

- Login and logout
- After login: create, update, or delete todo items at http://localhost:3000/todoList
- View all todo items at http://localhost:3000/api/todoList
  - Advanced search using `http://localhost:3000/api/todoList?<queryKey1>=<queryValue1>&<queryKey2>=<queryValue2>`
  - Advanced search supports filtering by userLogin, title, category, description, and isCompleted

Not available from UI:

- Creating, updating, or deleting users. Please see below for how to call API to do it.

## calling the api

### Register a new user

```
curl -X POST -H 'Content-Type: application/json' \
-d '{ "login":"<username>", "password":"<password>", "role":"USER"}' \
http://localhost:3000/api/user/new -i
```

### Update an existing user

```
curl -X PUT -H 'Content-Type: application/json' \
-d '{ "login":"<new username>", "password":"<new password>", "role":"USER"}' \
http://localhost:3000/api/user/<_id> -i
```

### Delete an existing user

```
curl -X DELETE http://localhost:3000/api/user/<_id> -i
```

### List all users

```
curl http://localhost:3000/api/user -i
```

(or just go here: http://localhost:3000/api/user)

### Get the todolist

```
$ curl http://localhost:3000/api/todoList -i
```

(or just go here: http://localhost:3000/api/todoList)

## stack/technologies used

- typescript (javascript ES6)
- express, express-session
- mongodb
- bcrypt

## todo

- more 400 error handling
- more unit tests
- use jwt for secure password handling

## references

- tutorial for [server setup](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)
- tutorial for [basic typescript crud app](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/)
- login: [authentication with nodejs](https://medium.com/@rahulrulz680/nodejs-typescript-authentication-and-authorization-10728722ba6b), [using express-session](https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/)
