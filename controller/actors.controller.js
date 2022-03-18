const bcrypt = require('bcryptjs');

const { Actor } = require('../models/actor.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { filterObj } = require('../utils/filterObjects');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    attributes: { exclude: 'password' }
  });

  res.status(200).json({
    status: 'succes',
    data: { actors }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id }
  });

  if (!actor) {
    return next(new AppError(400, 'actor is not found'));
  }

  res.status(200).json({
    status: 'succes',
    data: { actor }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { id, name, country, rating, age, profilePic, status } = req.body;

  if (!name || !country || !age) {
    return next(new AppError(400, 'must provide all the fields'));
  }

  const newActor = await Actor.create({
    name,
    country,
    age,
    profilePic: ''
  });

  res.status(200).json({
    status: 'succes',
    data: newActor
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'name', 'country', 'age');

  const actor = await Actor.findOne({
    where: { id }
  });

  if (!actor) {
    return next(new AppError(400, 'actor not founded'));
  }

  await actor.update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = Actor.findOne({ where: { id } });

  if (!actor) {
    return next(new AppError(400, 'actor doesnt found'));
  }

  //(await actor).destroy();
  (await actor).update({ status: 'delete' });

  res.status(204).json({
    status: 'succes'
  });
});
