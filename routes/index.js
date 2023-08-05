const Router = require('express').Router();
const apiRoutes = require('./api/index.js');

Router.use('/api', apiRoutes);

Router.use((req, res) => res.send('Wrong Route...'));

module.exports = Router;