const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('pages/login');
})

router.post('/login', authController.loginHandler)

module.exports = router;