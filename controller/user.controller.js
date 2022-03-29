const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const actorsRoutes = require('../Routes/actors.routes');
const { AppError } = require('../utils/appError');

const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObjects');
const { Review } = require('../models/review.model');

dotenv.config({ path: './config.env' });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
    where: { status: 'active' },
    include: [{ model: Review }]
  });

  res.status(200).json({
    status: 'succes',
    data: { users }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'succes',
    data: { user }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    next(new AppError(400, 'must provide all the fields'));
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role
  });

  newUser.password = undefined;

  res.status(200).json({
    status: 'succes',
    data: {
      newUser
    }
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'credentials are invalid'));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'succes',
    data: { token }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const data = filterObj(req.body, 'username', 'email', 'password');

  await user.update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  (await user).update({ status: 'delete' });

  res.status(200).json({
    status: 'succes'
  });
});
