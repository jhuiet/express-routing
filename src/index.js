import 'dotenv/config'; //this needs to come before other imports if they need access to the details
// import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';
// import models from './models';
import routes from './routes';
import models, { sequelize } from './models';
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();



console.log(process.env.MY_SECRET);
app.use(cors());


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

// app.use(async (req, res, next) => {
//     req.context = {
//         models,
//         me: await models.users.findByLogin('jacob'),
//     };
//     next();
// });

app.use('/session', routes.session);
app.use('/messages', routes.message);
app.use('/users', routes.user);

// app.get('/', (req, res) => {
//     res.json({ info: 'Node.js, Express, and PostGres API' })
// });

// app.get('/users', (req, res) => {
//     return res.send(Object.values(req.context.models.users));
// });

// app.get('/users/:userId', (req, res) => {
//     return res.send(req.context.models.users[req.params.userId]);
// });

// app.get('/messages', (req, res) => {
//     return res.send(Object.values(req.context.models.messages));
// });

// app.get('/session', (req, res) => {
//     return res.send(req.context.models.users[req.context.me.id]);
//   });

// app.get('/messages/:messageId', (req, res) => {
//     return res.send(req.context.models.messages[req.params.messageId]);
// });
// // return res.text();
// app.post('/messages', (req,res) => {
//     console.log(req.body.text);
//     const id = uuidv4();
//     const message = {
//         id,
//         text: req.body.text,
//         userId: req.context.me.id,
//     };
//     req.context.models.messages[id] = message;
//     return res.send(message);
// });

// app.delete('/messages/:messageId', (req, res) => {
//     const {
//         [req.params.messageId]: message,
//         ...othermessages
//     } = req.context.models.messages;

//     req.context.models.messages = othermessages;

//     return res.send(message);
// })

sequelize.sync().then(() => {
    app.listen(process.env.port, () => {
        console.log(`App is listening on port ${process.env.port}.`)
    });
});