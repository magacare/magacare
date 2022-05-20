const express = require('express')
const HealthRoute = require('./config/health')

const createServer = () => {
  const app = express()
  configServer(app)
  return app
}

const configServer = (app) => {
  app.use(express.json())
  configRotas(app)
}

const configRotas = (app) => {
  HealthRoute(app)
}

const initServer = (app, port = 3000) => {
  console.log(`Running! Port: ${port}`)
  app.listen(port)
}

module.exports = {
  createServer,
  initServer,
  configServer,
  configRotas
}