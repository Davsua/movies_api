const express = require('express');

const { actorsRoutes } = require('./Routes/actors.routes');
const { moviesRoutes } = require('./Routes/movies.routes');
const { usersRoutes } = require('./Routes/user.routes');

const app = express();
app.use(express.json());

app.use('/api/v1/actors', actorsRoutes);

app.use('/api/v1/actors', moviesRoutes);

app.use('/api/v1/actors', usersRoutes);

module.exports = { app };
