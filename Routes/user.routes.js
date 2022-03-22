const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controller/user.controller');
const { authenticateSesion } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', authenticateSesion, getUserById);

router.post('/', createUser);

router.post('/login', loginUser);

router.patch('/:id', authenticateSesion, updateUser);

router.delete('/:id', authenticateSesion, deleteUser);

module.exports = { usersRoutes: router };
