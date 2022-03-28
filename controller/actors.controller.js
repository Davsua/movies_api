const { ref, uploadBytes } = require('firebase/storage');
const { validationResult } = require('express-validator');

const { Actor } = require('../models/actor.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');
const { filterObj } = require('../utils/filterObjects');
const { ActorInMovie } = require('../models/actorsInMovie');
const { Movie } = require('../models/movie.model');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    include: [{ model: Movie }]
  });

  res.status(200).json({
    status: 'succes',
    data: { actors }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { actor } = req;

  res.status(200).json({
    status: 'succes',
    data: { actor }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { id, name, country, rating, age, profilePic, status, movies } =
    req.body;

  //validation w express validation
  const errors = validationResult(req);

  //errors.isEmpty evalua los campos y devuelve error si encuentra alguno
  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array() //devuelve arreglo de errores
      .map(({ msg }) => msg) //destructura el arreglo de errores, solo la propiedad msg
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  //almacenar imagen en firebase
  const imgRef = ref(storage, `image/${Date.now()}~${req.file.originalname}`);

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name,
    country,
    age,
    rating,
    profilePic: result.metadata.fullPath
  });

  const moviesInActorPromises = movies.map(async (movieId) => {
    return await ActorInMovie.create({ movieId, actorId: newActor.id });
  });

  await Promise.all(moviesInActorPromises);

  res.status(200).json({
    status: 'succes',
    data: newActor
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  const data = filterObj(
    req.body,
    'name',
    'country',
    'age',
    'rating',
    'profilePic'
  );

  await actor.update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  //(await actor).destroy();
  (await actor).update({ status: 'delete' });

  res.status(204).json({
    status: 'succes'
  });
});
