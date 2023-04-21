import express, { urlencoded } from 'express';
import session from 'express-session';
import useRoutes from './routes/routes.js';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

dotenv.config();

const app = express();

const sessionStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.NAME}:${process.env.PASSWD}@cluster0.xjoqb.mongodb.net/test`,
})

function checkAuth(req, res, next) {
    if(req.session.user || req.path == '/login') {
        next();
    }
    else res.redirect("/login");
}

app.set('view engine', 'ejs');

app.set('port', process.env.PORTNAME || 5000);

app.use('/public', express.static(__dirname + '/public'));

app.use(urlencoded({extended: true}));

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

