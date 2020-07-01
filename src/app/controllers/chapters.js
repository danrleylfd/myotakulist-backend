const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Chapters = require('../views/chapters');

routes.post('/', Chapters.create);

routes.get('/:volume', Chapters.read);

routes.get('/:volume/:id', Chapters.readOne);

routes.put('/:id', Chapters.update);

routes.delete('/:id', Chapters.delete);

module.exports = app => app.use('/chapters', routes);
