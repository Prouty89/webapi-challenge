const express = require('express');
const server = express();

const projectsRoutes = require('./projects/projectsRouter');
const actionsRoutes = require('./actions/actionsRouter');

 server.use('/projects', projectsRoutes)
 server.use('/actions', actionsRoutes)


 module.exports = server;