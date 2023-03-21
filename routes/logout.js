const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    if(req.session.user) {
        req.session.destroy(err => {
            if(err) throw err;
            res.redirect('/')
        })
    }
    else {
        res.redirect('/')
    }
})


module.exports = router;