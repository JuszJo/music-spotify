export function checkAuth(req, res, next) {
    if(req.session.user || req.path == '/login') {
        next();
    }
    else res.redirect("/login");
}