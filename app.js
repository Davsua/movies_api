const express = require('express');

const { actorsRoutes } = require('./Routes/actors.routes');
const { moviesRoutes } = require('./Routes/movies.routes');
const { usersRoutes } = require('./Routes/user.routes');

const { globalErrorHandler } = require('./utils/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/actors', actorsRoutes);

app.use('/api/v1/actors', moviesRoutes);

app.use('/api/v1/actors', usersRoutes);

//access to errors from AppError
app.use(globalErrorHandler);

module.exports = { app };
