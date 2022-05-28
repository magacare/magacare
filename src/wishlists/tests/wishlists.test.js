const mongoose = require('mongoose');

const {
  describe, it, expect, beforeAll, afterAll, beforeEach,
} = require('@jest/globals');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createServer } = require('../../server');
const { date } = require('joi');

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

  it('should not create wishlist without products', async () => {
    const mockWishlistLocal = {
      title: 'aniversario teste',
      client: '628d7aadf48fb4029356cc51',
      product: [],
    };

    const { statusCode, body } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockWishlistLocal);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: 'The wishlist must contain at least 1 product' });
  });

  it('should search wishlists and return status code 200', async () => {
    const { statusCode } = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });

  it('should search one wishlist successfully', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const idWishlist = response.body[0]._id;

    const { statusCode } = await supertest(app)
      .get(`/wishlists/id/${idWishlist}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(idWishlist);

    expect(statusCode).toBe(200);
  });

  it('should search wishlists by clients id successfully', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0].client;

    const { statusCode } = await supertest(app)
      .get(`/wishlists/client/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(idClient);

    expect(statusCode).toBe(200);
  });

  it('should search by filter by client', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0].client;

    const { statusCode, body } = await supertest(app)
      .get(`/wishlists/search?searchBy=client&filter=${idClient}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      _id: expect.any(String),
      title: expect.any(String),
      client: expect.any(String),
      product: expect.any(Array),
      createdAt: expect.any(String),
      __v: 0,
    }]);
  });

  it('should search by filter by id', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const idWishlist = response.body[0]._id;

    const { statusCode, body } = await supertest(app)
      .get(`/wishlists/search?searchBy=id&filter=${idWishlist}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      _id: expect.any(String),
      title: expect.any(String),
      client: expect.any(String),
      product: expect.any(Array),
      createdAt: expect.any(String),
      __v: 0,
    }]);
  });

  it('should search by filter by product', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = response.body[0].product[0];

    const { statusCode, body } = await supertest(app)
      .get(`/wishlists/search?searchBy=product&filter=${codeProduct}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      _id: expect.any(String),
      title: expect.any(String),
      client: expect.any(String),
      product: expect.any(Array),
      createdAt: expect.any(String),
      __v: 0,
    }]);
  });
});
