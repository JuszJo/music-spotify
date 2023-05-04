/* import session from 'express-session';
import MongoStore from 'connect-mongo';
import databaseConfig from '../config/mongo.config.js';

const sessionStore = MongoStore.create({
    mongoUrl: databaseConfig.url
})

export default session({
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60)
    },
    store: sessionStore
}) */