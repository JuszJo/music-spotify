const express = require('express');
const app = express();

const router = express.Router();

app.use(express.urlencoded({extended: true}));

let user = new Map()

user.set("joshua", 1234)
user.set("jo", 4321)

router.post('/welcome', (req, res) => {
    if(user.get(req.body.username) && user.get(req.body.username) == req.body.password) {
        req.session.user = req.body.username;
        res.render('pages/welcome');
    }
    else {
        res.redirect('/login')
    }
})

router.get('/welcome', (req, res) => {
    if(req.session.user) {
        res.render('pages/welcome');
    }
    else {
        res.redirect('/login')
    }
})

module.exports = router;