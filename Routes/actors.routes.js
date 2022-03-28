const { body } = require('express-validator');
const express = require('express');
const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor
} = require('../controller/actors.controller');
const { actorExist } = require('../middleware/actor.middleware');

const { authenticateSesion } = require('../middleware/auth.middleware');

const { upload } = require('../utils/multer');

const router = express.Router();

router.use(authenticateSesion);

router.get('/', getAllActors);

router.post(
  '/',
  upload.single('postImg'),
  [
    //express-validator
    //inspecciona propiedad body con el nombre indicado, que sea string y q no este vacio
    body('name').isString().notEmpty().withMessage('must provide the name'),
    body('country')
      .isString()
      .withMessage('must provide the country')
      .notEmpty(),
    body('rating')
      .isNumeric()
      .custom((value) => {
        return value > 0 && value <= 5;
      }),
    body('age')
      .isNumeric()
      .withMessage('must provide the age')
      .notEmpty()
      .custom((value) => {
        return value > 0;
      })
  ],
  createActor
);

router
  .use('/:id', actorExist)
  .route('/:id')
  .get(getActorById)
  .patch(updateActor)
  .delete(deleteActor);

module.exports = { actorsRoutes: router };
