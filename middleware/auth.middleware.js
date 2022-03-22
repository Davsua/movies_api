const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

const { User } = require('../models/user.model');

dotenv.config({ path: './config.env' });

const authenticateSesion = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError(401, 'invalid session'));
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETKEY
  );

  const user = await User.findOne({
    where: { id: decodedToken.id, status: 'active' },
    attributes: { exclude: 'password' }
  });

  if (!user) {
    return next(new AppError(401, 'invalid session, id doesnt exist'));
  }

  next();
});

module.exports = { authenticateSesion };
