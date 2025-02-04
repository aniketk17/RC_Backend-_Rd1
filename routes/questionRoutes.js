const express = require('express');
const firstQuestion = require('../controllers/firstQuestion');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/send', authMiddleware, firstQuestion);

module.exports = router;
