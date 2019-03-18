const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');

const fileDb = require('../fileDb');
fileDb.init();

const port = 8000;

router.get('/', (req, res) => {
    const dateTime = req.query.dateTime;
    const response = dateTime ? fileDb.getItems(dateTime) : fileDb.getItems()
    res.send(response)
});

router.post('/', (req, res) => {
    const { message, author } = req.body;
    if (!message || !author) return res.status(404).send(JSON.stringify({"error": "Author and message must be present in the request"}))
    req.body.id = nanoid();
    req.body.dateTime = (new Date()).toISOString();
    fileDb.addItem(req.body)
    res.send('OK')
});

router.get('/:id', (req, res) => {
    res.send('Single product')
});

module.exports = router;