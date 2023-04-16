const indexRoute = require('./index');
const artistRoute = require('./artist');
const loginRoute = require('./login');
const welcomeRoute = require('./welcome');
const logoutRoute = require('./logout');

function useRoutes(app, checkAuth) {
    app.use(indexRoute);

    app.use(checkAuth);

    app.use(artistRoute);

    app.use(loginRoute);

    app.use(welcomeRoute);

    app.use(logoutRoute);

    //500 error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);

        res.status(500).send('500 - Internal Server Error');
    });
}

module.exports = useRoutes;
