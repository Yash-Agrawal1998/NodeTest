const express = require('express');
const {generateShortHandUrl, getStoredUrl, getShortUrlById, getAnalyticsData} = require('../controllers/UrlController')

const router = express.Router();

router.post('/', generateShortHandUrl).get('/', getStoredUrl);

router.get('/:id', getShortUrlById);

router.get('/analytics/:id', getAnalyticsData);

module.exports = router; 