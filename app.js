const express = require('express');

const { actorsRoutes } = require('./Routes/actors.routes');
const { reviewRoutes } = require('./Routes/movieReview.route');
const { moviesRoutes } = require('./Routes/movies.routes');
const { usersRoutes } = require('./Routes/user.routes');

const { globalErrorHandler } = require('./utils/errorHandler');

const app = express();

//set pug as predeterminate maqueting (en vez de html)
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/actors', actorsRoutes);

app.use('/api/v1/movies', moviesRoutes);

app.use('/api/v1/users', usersRoutes);

app.use('/api/v1/reviews', reviewRoutes);

//access to errors from AppError
app.use(globalErrorHandler);

module.exports = { app };
