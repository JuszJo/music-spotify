// const MC = require('mongodb').MongoClient
const express = require('express');
const app = express();

const router = express.Router();

router.get('/login', (req, res) => {
    res.status(200).render('pages/login');
})

module.exports = router;