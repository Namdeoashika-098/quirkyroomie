const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  // If no token is found
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token and extract user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debugging line to check decoded token

    req.user = decoded; // Attach entire decoded token to req.user

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token is not valid', err.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { verifyToken };
