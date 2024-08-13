
const express = require('express');
const router = express.Router();

// Root route for the application
router.get('/', (req, res) => {
    res.send('Welcome to the Product Management API');
});

module.exports = router;
