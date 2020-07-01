const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const Volumes = require('../views/volumes');

routes.post('/', Volumes.create);

routes.get('/:manga', Volumes.read);

routes.get('/:manga/:id', Volumes.readOne);

routes.put('/:id', Volumes.update);

routes.delete('/:id', Volumes.delete);

module.exports = app => app.use('/volumes', routes);
