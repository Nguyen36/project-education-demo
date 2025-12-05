const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// POST /api/register
router.post('/register', registrationController.registerCourse);

module.exports = router;
