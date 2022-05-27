const {
  describe, it, expect,
} = require('@jest/globals');
const supertest = require('supertest');
const { createServer } = require('../../server');

const app = createServer();

describe('Health routes', () => {
  it('should return "pong"', async () => {
    const { body } = await supertest(app)
      .get('/api/health/ping');

    expect(body.pong).toBe(true);
  });
});
