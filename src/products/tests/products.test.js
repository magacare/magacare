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

describe('Products routes', () => {
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
  });

  it('should create product and return status code 201', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProduct);

    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: 'Product registered' });
  });

  it('should not create product with code already registered in database and return status code 400', async () => {
    const mockProductLocal = {
      name: 'hidratante facial',
      code: '123456',
      description: 'hidratação da pele',
      volume: '50ml',
      recommendation: 'pele seca',
    };

    const { statusCode, body } = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProductLocal);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'This code already exists' });
  });

  it('should not create product with name already registered in database and return status code 400', async () => {
    const mockProductLocal = {
      name: 'água micelar',
      code: '7777',
      description: 'água para pele',
      volume: '70ml',
      recommendation: 'pele mista',
    };

    const { statusCode, body } = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProductLocal);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'This name already exists' });
  });

  it('should update product successfully and return status code 200', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = response.body[0].code;

    const mockProductLocal = {
      name: 'tônico facial',
      description: 'tônico para o rosto',
      volume: '120ml',
      recommendation: 'pele mista',
    };

    const { statusCode } = await supertest(app)
      .put(`/products/${codeProduct}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProductLocal);

    expect(statusCode).toBe(200);
  });

  it('should not update product if the name already exists in database and return status code 400', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = response.body[0].code;

    const mockProductLocal = {
      name: 'tônico facial',
    };

    const { statusCode, body } = await supertest(app)
      .put(`/products/${codeProduct}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProductLocal);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'This name already exists' });
  });

  it('should search product successfully', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = response.body[0].code;

    const { statusCode } = await supertest(app)
      .get(`/products/code/${codeProduct}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(codeProduct);

    expect(statusCode).toBe(200);
  });

  it('should not search product with inexistent id and return status code 400', async () => {
    const codeProduct = '6565';

    const { statusCode } = await supertest(app)
      .get(`/products/code/${codeProduct}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(codeProduct);

    expect(statusCode).toBe(400);
  });

  it('should search by filter by name', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const productName = response.body[0].name;

    const { statusCode, body } = await supertest(app)
      .get(`/products/search?searchBy=name&filter=${productName}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      __v: 0,
      _id: expect.any(String),
      code: expect.any(String),
      description: expect.any(String),
      name: expect.any(String),
      recommendation: expect.any(String),
      volume: expect.any(String),
    }]);
  });

  it('should search by filter by code', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = response.body[0].code;

    const { statusCode, body } = await supertest(app)
      .get(`/products/search?searchBy=code&filter=${codeProduct}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual({
      __v: 0,
      _id: expect.any(String),
      code: expect.any(String),
      description: expect.any(String),
      name: expect.any(String),
      recommendation: expect.any(String),
      volume: expect.any(String),
    });
  });

  it('should search by filter by recommendation', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const recommendationProduct = response.body[0].recommendation;

    const { statusCode, body } = await supertest(app)
      .get(`/products/search?searchBy=recommendation&filter=${recommendationProduct}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      __v: 0,
      _id: expect.any(String),
      code: expect.any(String),
      description: expect.any(String),
      name: expect.any(String),
      recommendation: expect.any(String),
      volume: expect.any(String),
    }]);
  });

  it('should search by filter without params', async () => {
    const { statusCode, body } = await supertest(app)
      .get('/products/search')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      __v: 0,
      _id: expect.any(String),
      code: expect.any(String),
      description: expect.any(String),
      name: expect.any(String),
      recommendation: expect.any(String),
      volume: expect.any(String),
    }]);
  });

  it('should get client by filter by name and return 400', async () => {
    const productName = 'wrong name';

    const { statusCode, body } = await supertest(app)
      .get(`/products/search?searchBy=name&filter=${productName}&page=1&limit=1`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(400);

    expect(body).toEqual({
      error: 'No product found.',
    });
  });

  it('should search wishlist by product code', async () => {
    const responseProduct = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = responseProduct.body[0].code;

    const responseClient = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = responseClient.body[0]._id;

    const mockWishlist = {
      title: 'lista de compras',
      client: idClient,
      product: [codeProduct],
    };

    await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockWishlist);

    const { statusCode } = await supertest(app)
      .get(`/products/wishlists/${codeProduct}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toEqual(200);
  });
  it('should not search wishlist by product code and return error 400', async () => {
    const { statusCode, body } = await supertest(app)
      .get('/products/wishlists/12321231')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toEqual(400);
    expect(body.error).toEqual('No product found.');
  });

  it('should create wishlist and return status code 201', async () => {
    const responseProduct = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);
    const codeProduct = responseProduct.body[0].code;

    const responseClient = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = responseClient.body[0]._id;

    const mockWishlist = {
      title: 'lista de compras',
      client: idClient,
      product: [codeProduct],
    };

    const { statusCode, body } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockWishlist);

    expect(statusCode).toBe(201);

    expect(body.message).toEqual('WishList registered');
  });

  it('delete product by code successfully', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${jwt}`);

    const codeProduct = response.body[0].code;

    const responseClient = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = responseClient.body[0]._id;

    const mockWishlist = {
      title: 'lista de compras',
      client: idClient,
      product: [codeProduct],
    };

    await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockWishlist);

    const { statusCode } = await supertest(app)
      .delete(`/products/${codeProduct}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });

  it('should not delete product by code', async () => {
    const { statusCode } = await supertest(app)
      .delete('/products/123')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(400);
  });
});
