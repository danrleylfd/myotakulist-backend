const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Animes = require('../views/animes');

routes.post('/', Animes.create);

routes.get('/', Animes.read);

routes.get('/:alias', Animes.readOne);

routes.put('/:id', Animes.update);

routes.delete('/:id', Animes.delete);

routes.post('/bookmarks/:id', Animes.createBookmark);

routes.get('/bookmarks/:id', Animes.readBookmarks);

routes.delete('/bookmarks/:id', Animes.deleteBookmark);

module.exports = app => app.use('/animes', routes);
