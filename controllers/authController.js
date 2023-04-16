const authService = require('../services/auth.service');

exports.loginHandler = async (req, res, next) => {
    try {
        if(!(await authService.getUser(req.body.username, req.body.password))) res.redirect('/login')
        else {
            req.session.user = req.body.username;
            res.redirect('/auth/welcome')
        }
    }
    catch(err) {
        if(err) next(err);
    }
}