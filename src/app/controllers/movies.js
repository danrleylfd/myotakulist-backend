const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Movies = require('../views/movies');

routes.post('/', Movies.create);

routes.get('/:season', Movies.read);

routes.get('/:season/:id', Movies.readOne);

routes.put('/:id', Movies.update);

routes.delete('/:id', Movies.delete);

module.exports = app => app.use('/movies', routes);
