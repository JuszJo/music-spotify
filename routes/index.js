const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).render('pages/index', {val: "Joshua"})
})

module.exports = router;