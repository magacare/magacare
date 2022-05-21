const express = require('express');
const mongoose = require('mongoose');
const HealthRoute = require('./config/health');
const { connectionString } = require('./config/database');

const configRotas = (app) => {
  HealthRoute(app);
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
