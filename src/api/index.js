const express = require('express');

const marsWeather = require('./mars-weather');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/get-proxy-data', marsWeather);

module.exports = router;
