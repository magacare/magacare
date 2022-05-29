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

  it('should not create wishlist and return status code 404', async () => {
    const clientId = '123';

    const mockLocal = {
      ...mockWishlist,
      client: clientId,
    };

    const { statusCode } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(404);
  });

  it('should not create wishlist with client not exist and return status code 400', async () => {
    const clientId = new mongoose.Types.ObjectId().toString();

    const mockLocal = {
      ...mockWishlist,
      client: clientId,
    };

    const { statusCode, body } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('This client does not exist');
  });

  it('should not create a wishlist with duplicate products', async () => {
    const responseClient = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const clientId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
      product: ['123456', '123456'],
      client: clientId,
    };

    const { statusCode, body } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('You cannot add duplicate products');
  });

  it('should not create a wishlist with a product not exists', async () => {
    const responseClient = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const clientId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
      product: ['55555'],
      client: clientId,
    };

    const { statusCode, body } = await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('You cannot add product not existent');
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

  it('should update wishlist and return status code 200', async () => {
    const responseClient = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const wishlistId = responseClient.body[0]._id;

    const mockLocal = {
      title: 'lista de desejos',
    };

    const { statusCode } = await supertest(app)
      .put(`/wishlists/${wishlistId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(200);
  });

  it('should not update wishlist with duplicate products and return status code 400', async () => {
    const responseClient = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const wishlistId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
    };

    const { statusCode, body } = await supertest(app)
      .put(`/wishlists/${wishlistId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('You cannot add duplicate products');
  });

  it('should not update wishlist with no products and return status code 400', async () => {
    const responseClient = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const wishlistId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
      product: [],
    };

    const { statusCode, body } = await supertest(app)
      .put(`/wishlists/${wishlistId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('The wishlist must contain at least 1 product');
  });

  it('should not update wishlist with duplicated products in body and return status code 400', async () => {
    const responseClient = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const wishlistId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
      product: ['8888888', '8888888'],
    };

    const { statusCode, body } = await supertest(app)
      .put(`/wishlists/${wishlistId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('You cannot add duplicate products');
  });

  it('should not update wishlist with not exist product and return status code 400', async () => {
    const responseClient = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const wishlistId = responseClient.body[0]._id;

    const mockLocal = {
      ...mockWishlist,
      product: ['888888'],
    };

    const { statusCode, body } = await supertest(app)
      .put(`/wishlists/${wishlistId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockLocal);

    expect(statusCode).toBe(400);
    expect(body.error).toEqual('You cannot add products not existents');
  });

  it('should search wishlists and return status code 200', async () => {
    const { statusCode } = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });

  it('should delete wishlists and return status code 200', async () => {
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

    expect(body).toEqual({
      _id: expect.any(String),
      title: expect.any(String),
      client: expect.any(String),
      product: expect.any(Array),
      createdAt: expect.any(String),
      __v: 0,
    });
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

  it('should not delete wishlists and return status code 404', async () => {
    const wishListId = '123';

    const { statusCode } = await supertest(app)
      .delete(`/wishlists/${wishListId}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(404);
  });

  it('should delete product on wishlist successfully', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const idWishlist = response.body[0]._id;
    const productToDelete = response.body[0].product[0];

    const { statusCode } = await supertest(app)
      .delete(`/wishlists/product/${idWishlist}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ product: productToDelete });

    expect(statusCode).toBe(200);
  });

  it('should not delete product that dont exist on wishlist', async () => {
    const response = await supertest(app)
      .get('/wishlists')
      .set('Authorization', `Bearer ${jwt}`);

    const idWishlist = response.body[0]._id;

    const { statusCode } = await supertest(app)
      .delete(`/wishlists/product/${idWishlist}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ product: '00000' });

    expect(statusCode).toBe(200);
  });

  it('should not delete product on wishlist that does not exist', async () => {
    const { statusCode } = await supertest(app)
      .delete('/wishlists/product/123987756asd5687')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ product: '000000' });

    expect(statusCode).toBe(404);
  });
});
