const express = require('express');

const { authenticateSesion } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticateSesion);

router.route('/').get(getReviews).post(createReview);

module.exports = { reviewRoutes: router };
