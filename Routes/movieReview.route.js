const express = require('express');
const { body } = require('express-validator');
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controller/review.controller');

const { reviewExist } = require('../middleware/review.middleware');
const { authenticateSesion } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticateSesion);

router.get('/', getAllReviews);

router.post(
  '/',
  [
    body('title').isString().notEmpty().withMessage('must provide the title'),
    body('comment')
      .isString()
      .withMessage('must provide the comment')
      .notEmpty(),
    body('rating')
      .isNumeric()
      .custom((value) => {
        return value > 0 && value <= 5;
      })
  ],
  createReview
);

router
  .use('/:id', reviewExist)
  .route('/:id')
  .patch(updateReview)
  .delete(deleteReview);

module.exports = { reviewRoutes: router };
