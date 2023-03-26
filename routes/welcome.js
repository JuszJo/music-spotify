const express = require('express');
const router = express.Router();

router.get('/welcome', (req, res) => {
    if(req.session.user) {
        res.render('pages/welcome');
    }
    else {
        res.redirect('/login')
    }
})

module.exports = router;