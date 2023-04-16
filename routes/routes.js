const indexRoute = require('./index');
const artistRoute = require('./artist');
const loginRoute = require('./login');
const welcomeRoute = require('./welcome');
const logoutRoute = require('./logout');

function useRoutes(app, checkAuth) {
    app.use(indexRoute);

    app.use(loginRoute);
    
    app.use('/auth', checkAuth);
    
    app.use('/auth', welcomeRoute);
    
    app.use('/auth', artistRoute);

    app.use(logoutRoute);

    //400 error handler
    app.use((req, res) => {
        res.status(404).send('404 - Not Found');
    });

    //500 error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);

        res.status(500).send('500 - Internal Server Error');
    });
}

module.exports = useRoutes;
