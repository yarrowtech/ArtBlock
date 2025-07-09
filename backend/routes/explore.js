// backend/routes/explore.js
const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/explore.controller');

router.get('/featured-creators', exploreController.getFeaturedCreators);
router.get('/new-creators', exploreController.getNewCreators);
router.get('/categories', exploreController.getCategories);

module.exports = router; 