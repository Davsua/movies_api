const { Movie } = require('../models/movie.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.movieExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(400, 'movie doesnt exist'));
  }

  req.movie = movie;
  next();
});
