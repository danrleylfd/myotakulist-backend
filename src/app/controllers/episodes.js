const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Episodes = require('../views/episodes');

routes.post('/', Episodes.create);

routes.get('/:season', Episodes.read);

routes.get('/:season/:id', Episodes.readOne);

routes.put('/:id', Episodes.update);

routes.delete('/:id', Episodes.delete);

module.exports = app => app.use('/episodes', routes);
