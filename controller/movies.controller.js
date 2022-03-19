const { Movie } = require('../models/movie.model');
const { AppError } = require('../utils/appError');

const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObjects');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll();

  res.status(200).json({
    status: 'succes',
    data: movies
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id }
  });

  if (!movie) {
    next(new AppError(400, 'movie not found'));
  }

  res.status(200).json({
    status: 'succes',
    data: movie
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { id, title, description, duration, image, genre, range, status } =
    req.body;

  if (!title || !description || !genre) {
    return next(new AppError(400, 'must be provide all the fields'));
  }

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    image: '',
    genre
  });

  res.status(200).json({
    status: 'succes',
    data: newMovie
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'title', 'description', 'duration', 'genre');

  const movie = Movie.findOne({
    where: { id }
  });

  if (!movie) {
    next(new AppError(400, 'movie dont find'));
  }

  (await movie).update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id }
  });

  if (!movie) {
    next(new AppError(400, 'movie not found'));
  }

  (await movie).update({ status: 'deleted' });

  res.status(200).json({
    status: 'succes'
  });
});
