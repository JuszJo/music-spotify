import express, { urlencoded } from 'express';
import sessionMiddleware from './middleware/session.middleware.js';
import useRoutes from './routes/routes.js';

const app = express();

app.set('view engine', 'ejs');

app.set('port', process.env.PORTNAME || 5000);

app.use('/public', express.static('./public'))

app.use(urlencoded({extended: true}));

app.use(sessionMiddleware);

useRoutes(app);

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
})