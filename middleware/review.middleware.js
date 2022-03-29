const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: { id }
  });

  if (!review) {
    return next(new AppError(400, 'review doesnt exist'));
  }

  res.status(200).json({
    status: 'succes'
  });

  req.review = review;
  next();
});
