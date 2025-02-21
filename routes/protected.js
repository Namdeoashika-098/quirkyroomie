const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Middleware import karo

// Correct route definition
router.get('/protected', (req, res) => {
      res.send('This is a protected route');
    });


module.exports = router;
