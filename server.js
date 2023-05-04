import express, { urlencoded } from 'express';
import useRoutes from './routes/routes.js';

const app = express();

app.set('view engine', 'ejs');

app.set('port', process.env.PORTNAME || 5000);

app.use('/public', express.static('./public'));

app.use(urlencoded({extended: true}));

useRoutes(app);

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});