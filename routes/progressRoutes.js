const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateProgress } = require('../controllers/progressController');

const router = express.Router();

router.post('/update', authMiddleware, updateProgress);

module.exports = router;