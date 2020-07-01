const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Mangas = require('../views/mangas');

routes.post('/', Mangas.create);

routes.get('/', Mangas.read);

routes.get('/:id', Mangas.readOne);

routes.put('/:id', Mangas.update);

routes.delete('/:id', Mangas.delete);

routes.post('/bookmarks/:id', Mangas.createBookmark);

routes.get('/bookmarks/:id', Mangas.readBookmarks);

routes.delete('/bookmarks/:id', Mangas.deleteBookmark);

module.exports = app => app.use('/mangas', routes);
