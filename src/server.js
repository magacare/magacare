const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const HealthRoute = require('./config/health');
const { connectionString } = require('./config/database');
const clientRoutes = require('./clients/clients-routes');
const clientRoutesNotAuth = require('./clients/clients-routes-notauth');
const productRoutes = require('./products/products-routes');
const wishListRoutes = require('./wishlists/wishlists-routes');
const sessionRoute = require('./session/session-routes');
const authMiddleware = require('./auth');

const configRoutesNotProtected = (app) => {
  HealthRoute(app);
  sessionRoute(app);
  clientRoutesNotAuth(app);
};

const configRoutesProtected = (app) => {
  clientRoutes(app);
  productRoutes(app);
  wishListRoutes(app);
};

const configServer = (app) => {
  app.use(express.json());
  configRoutesNotProtected(app);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // REQUIRE A TOKEN FOR REQUEST
  app.use(authMiddleware);
  configRoutesProtected(app);
};

const createServer = () => {
  const app = express();
  configServer(app);
  return app;
};

const initServer = async (app, port = process.env.PORT || 3000) => {
  app.listen(port);
  console.log(`Running! Port: ${port}`);
  await mongoose.connect(connectionString);
};

module.exports = {
  createServer,
  initServer,
  configServer,
  configRoutesNotProtected,
  configRoutesProtected,
};
