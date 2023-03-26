const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('pages/index', {val: "Joshua"})
})

module.exports = router;