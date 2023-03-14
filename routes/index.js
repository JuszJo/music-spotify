const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/index', {val: "Joshua", /*expires: req.session.cookie.expires*/});
})

module.exports = router;