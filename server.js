const express = require('express');
const session = require('express-session');
const useRoutes = require('./routes/routes')
const mongoStore = require('connect-mongo');
require('dotenv').config()
// const nodemailer = require('nodemailer');

const app = express();

const sessionStore = mongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.NAME}:${process.env.PASSWD}@cluster0.xjoqb.mongodb.net/test`,
})

function checkAuth(req, res, next) {
    console.log(req.path);
    if(req.session.user || req.path == '/login') {
        next();
    }
    else res.redirect("/login");
}

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

useRoutes(app, checkAuth);

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
})

