const indexRoute = require('./index');
const artistRoute = require('./artist');
const loginRoute = require('./login');
const welcomeRoute = require('./welcome');
const logoutRoute = require('./logout');

function useRoutes(app) {
    app.use(indexRoute);

    app.use(artistRoute);

    app.use(loginRoute);

    app.use(welcomeRoute);

    app.use(logoutRoute);
}

module.exports = useRoutes;
