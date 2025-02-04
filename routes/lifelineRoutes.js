const express = require('express');
const double  = require('../controllers/double');
const freeze = require('../controllers/freeze');
const skip = require('../controllers/skip');
const authMiddleware = require('../middlewares/authMiddleware');
const validateLifeline = require('../middlewares/lifelineMiddleware');
const handleEdgeCases = require('../middlewares/handleEdgeCases');

const router = express.Router();

router.post('/lifelines/double' , authMiddleware, validateLifeline, handleEdgeCases, double);
router.post('/lifelines/freeze' , authMiddleware, validateLifeline, handleEdgeCases, freeze);
router.post('/lifelines/skip' , authMiddleware, validateLifeline, handleEdgeCases, skip);

module.exports = router;