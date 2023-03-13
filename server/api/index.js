const express = require('express');
const apiRouter = express.Router();

const locationsRouter = require('./locations');
apiRouter.use('/locations', locationsRouter);

module.exports = apiRouter;
