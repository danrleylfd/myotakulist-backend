const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Seasons = require('../views/seasons');

routes.post('/', Seasons.create);

routes.get('/:anime', Seasons.read);

routes.get('/:anime/:id', Seasons.readOne);

routes.put('/:id', Seasons.update);

routes.delete('/:id', Seasons.delete);

module.exports = app => app.use('/seasons', routes);
