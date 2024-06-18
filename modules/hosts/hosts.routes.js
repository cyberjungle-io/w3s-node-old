const express = require('express');
const hostsController = require('./hosts.controllers');
const router = express.Router();


// Default route
router.get('/', (req, res) => {
    res.send('Success');
});


router.post('/registerHost', (req, res) => {
    console.log("registerHost" + JSON.stringify(req.body))
    hostsController.registerHost(req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;