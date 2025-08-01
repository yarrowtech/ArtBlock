const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/explore.controller');

router.get('/creators', exploreController.getAllCreators);

module.exports = router;
