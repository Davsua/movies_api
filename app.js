const express = require('express');
const moviesRoutes = require('./Routes/movies.routes');

const app = express();
app.use(express.json());

//app.use('/api/v1/movies', moviesRoutes);

module.exports = { app };
