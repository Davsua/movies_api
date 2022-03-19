const { User } = require('../models/user.model');
const actorsRoutes = require('../Routes/actors.routes');
const { AppError } = require('../utils/appError');

const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObjects');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });

  res.status(200).json({
    status: 'succes',
    data: { users }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: 'password' }
  });

  if (!user) {
    next(new AppError(400, 'user not found'));
  }

  res.status(200).json({
    status: 'succes',
    data: { user }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(new AppError(400, 'must provide all the fields'));
  }

  const newUser = await User.create({
    username,
    email,
    password
  });

  res.status(200).json({
    status: 'succes',
    data: {
      newUser
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'username', 'email', 'password');

  const user = await User.findOne({
    where: { id }
  });

  if (!user) {
    next(new AppError(400, 'user not found'));
  }

  await user.update({ ...data });

  res.status(200).json({
    status: 'succes'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = User.findOne({
    where: { id }
  });

  (await user).update({ status: 'delete' });

  res.status(200).json({
    status: 'succes'
  });
});
