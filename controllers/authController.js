import { getUser } from '../services/auth.service.js';

export async function loginHandler(req, res, next) {
    try {
        if(!(await getUser(req.body.username, req.body.password))) res.redirect('/login')
        else {
            req.session.user = req.body.username;
            res.redirect('/auth/welcome')
        }
    }
    catch(err) {
        if(err) next(err);
    }
}