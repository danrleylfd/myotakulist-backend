const express = require('express');
const routes = express.Router();
const Auth = require('../views/auth');

routes.post('/signup', Auth.signUp);

routes.post('/signin', Auth.signIn);

routes.put('/signin_with_discord', Auth.signInWithDiscord);

routes.post('/forgot_password', Auth.forgotPassword);

routes.post('/reset_password', Auth.resetPassword);

routes.get('/user/:discrim', Auth.read);

routes.get('/discord', Auth.discord);

routes.get('/discord/callback', Auth.discordCallback);

module.exports = app => app.use('/auth', routes);
