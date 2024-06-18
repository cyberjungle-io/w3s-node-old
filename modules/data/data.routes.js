const express = require('express');
const dataController = require('./data.controllers');

const router = express.Router();
// Default route
router.get('/', (req, res) => {
    res.send('Success');
});
// Route for getting data
router.post('/getData', (req, res) => {
    console.log("getData");
    dataController.getData(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Route for setting data
router.post('/setData', (req, res) => {
    dataController.setData(req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;