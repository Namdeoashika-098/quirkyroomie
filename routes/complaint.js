const express = require('express');
const router = express.Router();
const { createComplaint, getComplaints, resolveComplaint } = require('../controllers/complaintController');
const { verifyToken } = require('../middleware/auth');

// POST - Create a new complaint
router.post('/', verifyToken, createComplaint);

// GET - Get all complaints
router.get('/', verifyToken, getComplaints);

// PUT - Mark complaint as resolved
router.put('/:id/resolve', verifyToken, resolveComplaint);

module.exports = router;
