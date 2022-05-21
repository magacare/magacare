const ping = (_, resp) => {
  resp.json({ pong: true });
};

module.exports = (app) => {
  app.get('/api/health/ping', ping);
};
