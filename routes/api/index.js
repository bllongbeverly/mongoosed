const Router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

Router.use('/users', userRoutes);
Router.use('/thoughts', thoughtRoutes);

module.exports = Router;