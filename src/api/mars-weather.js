const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 10,
});

const speedLimiter = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500
});

const router = express.Router();

const BASE_URL = process.env.apiUrl;
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZXItZ2VuZXJhdGUtand0IiwiaXNzIjoiY2VyLWp3dC11dGlsaXR5IiwiYXVkIjoiY2VyLWp3dC11dGlsaXR5IiwicGF5bG9hZCI6IntcImN1c3RvbWVyVWlkXCI6MjM0MzgsXCJiaWxsTGFuZ3VhZ2VcIjpcImVuLWdiXCJ9In0.rmeiAtJzNUG6ypH60lqmwjwKGPLTwScOfTU47_GHKv8';

let cachedData;
let cacheTime;

const apiKeys = new Map();
apiKeys.set('12345', true);

router.get('/', async (req, res, next) => {
  try {
    const headers = { 'content-type': 'application/json', 'Authorization': 'Api-Key ' + process.env.apiKey }
    const body = JSON.stringify({ "token": token });
    // 1. make a request to ors api
    const { data } = await axios.post(`${BASE_URL}`, body, { headers: headers });
    // 2. respond to this request with data from ors api
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
