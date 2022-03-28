const express = require('express');
const { body } = require('express-validator');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controller/movies.controller');
const { authenticateSesion } = require('../middleware/auth.middleware');
const { movieExist } = require('../middleware/movies.middleware');

const { upload } = require('../utils/multer');

const router = express.Router();
router.use(authenticateSesion);

router.get('/', getAllMovies);

router.post(
  '/',
  upload.single('postImg'),
  [
    body('title')
      .isString()
      .withMessage('title must be a string')
      .notEmpty()
      .withMessage('must provide the title'),
    body('description')
      .isString()
      .withMessage('description must be a string')
      .notEmpty()
      .withMessage('must provide the description'),
    body('duration')
      .isNumeric()
      .withMessage('duration must be numeric')
      .custom((value) => value > 0)
      .withMessage('rating must be greater than 0'),
    body('rating')
      .isNumeric()
      .withMessage('rating must be numeric')
      .custom((value) => value > 0 && value < 5)
      .withMessage('rating must be between 0 and 5'),
    body('genre')
      .isString()
      .withMessage('genre must be a string')
      .notEmpty()
      .withMessage('must provide the genre'),
    body('actors')
      .isArray({ min: 1 })
      .withMessage('must provide at least 1 actor Id')
  ],
  createMovie
);

router
  .use('/:id', movieExist)
  .route('/:id')
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = { moviesRoutes: router };
