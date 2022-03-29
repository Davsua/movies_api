const reviewRoutes = require('../Routes/movieReview.route');

const { Review } = require('../models/review.model');

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObjects');
const { validationResult } = require('express-validator');
const { Movie } = require('../models/movie.model');
const { User } = require('../models/user.model');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.findAll({
    where: { status: 'active' },
    include: [{ model: User }, { model: Movie }]
  });

  res.status(200).json({
    status: 'succes',
    data: reviews
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { title, comment, rating, status, userId, movieId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  const newReview = await Review.create({
    title,
    comment,
    rating,
    status,
    userId,
    movieId
  });

  res.status(200).json({
    status: 'succes',
    data: newReview
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const data = filterObj(req.body, 'title', 'comment');

  await review.update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  (await review).update({ status: 'delete' });

  res.status(200).json({
    status: 'succes'
  });
});
