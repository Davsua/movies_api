const { validationResult } = require('express-validator');
const { ref, uploadBytes } = require('firebase/storage');

const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorsInMovie');
const { Movie } = require('../models/movie.model');

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObjects');
const { storage } = require('../utils/firebase');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    include: [
      {
        model: Actor
      }
    ]
  });

  res.status(200).json({
    status: 'succes',
    data: movies
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  res.status(200).json({
    status: 'succes',
    data: movie
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, genre, range, status, actors } =
    req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array() //devuelve arreglo de errores
      .map(({ msg }) => msg) //destructura el arreglo de errores, solo la propiedad msg
      .join('. ');
    return next(new AppError(400, errorMsg));
  }

  const imgRef = ref(
    storage,
    `imageMovie/${Date.now()}~${req.file.originalname}`
  );

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    image: result.metadata.fullPath,
    genre,
    status,
    actors
  });

  console.log(req.body);
  console.log(actors);

  //asignar los actores que participan en una pelicula con el modelo creado
  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return await ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  //esperar que esta promesa se cumpla
  await Promise.all(actorsInMoviesPromises);

  res.status(200).json({
    status: 'succes',
    data: newMovie
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  const data = filterObj(req.body, 'title', 'description', 'duration', 'genre');

  (await movie).update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  (await movie).update({ status: 'deleted' });

  res.status(200).json({
    status: 'succes'
  });
});
