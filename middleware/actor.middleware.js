const { Actor } = require('../models/actor.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.actorExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(400, 'actor doesnt exist'));
  }

  req.actor = actor;
  next();
});
