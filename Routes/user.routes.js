const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controller/user.controller');
const {
  authenticateSesion,
  protectedAdmin
} = require('../middleware/auth.middleware');

const {
  userExist,
  protectAccountOwner
} = require('../middleware/findUser.middleware');

const router = express.Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.use(authenticateSesion);

router.get('/', protectedAdmin, getAllUsers);

//simplify equal routes
router
  .use('/:id', userExist)
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRoutes: router };
