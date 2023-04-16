const express = require('express');
const artistController = require('../controllers/artistController');
const router = express.Router();

router.get('/artist', artistController.get)

module.exports = router;