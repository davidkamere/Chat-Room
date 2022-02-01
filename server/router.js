const express = require('express');
const {route} = require("express/lib/router");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('server is up and running');
});

module.exports = router;