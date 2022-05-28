const mongoose = require('mongoose');

const {
  describe, it, expect, beforeAll, afterAll, beforeEach,
} = require('@jest/globals');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createServer } = require('../../server');

const app = createServer();

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
+ '.eyJpZCI6IjYyOGU5N2FkZDI5MWE0ZDc2OGViMTE5ZSIsImlhdCI6MTY1MzU4NTEwNywiZXhwIjoxNjU0MTg5OTA3fQ'
+ '.oF_W40Xwng4BrK85xDoKQ4v-JUWi4wr03LR8479OtiE';

const mockWishlist = {
  title: 'lista de compras',
  product: ['123456'],
};

const mockProduct = {
  name: 'água micelar',
  code: '123456',
  description: 'água para tonificar o rosto',
  volume: '120ml',
  recommendation: 'pele mista',
};

const mockPayloadClient = {
  fullName: 'Test test',
  email: 'test@email.com',
  birthDate: '09/15/1996',
  cpf: '99944455566',
  phoneNumber: '11995863214',
  postalCode: '13212378',
  gender: 'Mulher cis',
  password: 'test123',
};

describe('Wishlist routes', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await supertest(app).post('/clients')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockPayloadClient);

    await supertest(app).post('/products')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProduct);
  });

  it('should create wishlists and return status code 201', async () => {
    const responseClient = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const clientId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
      client: clientId,
    };

    const { statusCode, body } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: 'WishList registered' });
  });

  it('should search wishlists and return status code 200', async () => {
    const { statusCode } = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });
});
