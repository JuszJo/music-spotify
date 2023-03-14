const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongo');
require('dotenv').config()
// const nodemailer = require('nodemailer');

const app = express();

const sessionStore = mongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.NAME}:${process.env.PASSWD}@cluster0.xjoqb.mongodb.net/test`,
})

const indexRoute = require('./routes/index');
const artistRoute = require('./routes/artist');
const loginRoute = require('./routes/login');
const welcomeRoute = require('./routes/welcome');

app.set('view engine', 'ejs');

app.set('port', process.env.PORTNAME || 5000);

app.use(express.static(__dirname));

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60)
    },
    store: sessionStore
}));

app.use(indexRoute);

app.use(artistRoute);

app.use(loginRoute);

app.use(welcomeRoute);

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
})

