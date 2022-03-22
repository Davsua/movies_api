const express = require('express');
const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor
} = require('../controller/actors.controller');

const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.post('/', upload.single('postImg'), createActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

module.exports = { actorsRoutes: router };
