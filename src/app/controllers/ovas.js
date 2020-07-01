const express = require('express');
const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);
const OVAs = require('../views/ovas');

routes.post('/', OVAs.create);

routes.get('/:season', OVAs.read);

routes.get('/:season/:id', OVAs.readOne);

routes.put('/:id', OVAs.update);

routes.delete('/:id', OVAs.delete);

module.exports = app => app.use('/ovas', routes);
