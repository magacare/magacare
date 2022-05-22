const express = require('express');
const mongoose = require('mongoose');
const HealthRoute = require('./config/health');
const { connectionString } = require('./config/database');
const clientRoutes = require('./clients/clients-routes');
const productRoutes = require('./products/products-routes')

const configRotas = (app) => {
  HealthRoute(app);
  clientRoutes(app);
  productRoutes(app);
};

const configServer = (app) => {
  app.use(express.json());
  mongoose.connect(connectionString);
  configRotas(app);
};

const createServer = () => {
  const app = express();
  configServer(app);
  return app;
};

const initServer = (app, port = 3000) => {
  console.log(`Running! Port: ${port}`);
  app.listen(port);
};

module.exports = {
  createServer,
  initServer,
  configServer,
  configRotas,
};
