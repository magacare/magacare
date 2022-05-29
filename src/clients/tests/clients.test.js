const mongoose = require('mongoose');

const {
  describe, it, expect, beforeAll, afterAll,
} = require('@jest/globals');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createServer } = require('../../server');

const app = createServer();

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
+ '.eyJpZCI6IjYyOGU5N2FkZDI5MWE0ZDc2OGViMTE5ZSIsImlhdCI6MTY1MzU4NTEwNywiZXhwIjoxNjU0MTg5OTA3fQ'
+ '.oF_W40Xwng4BrK85xDoKQ4v-JUWi4wr03LR8479OtiE';

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

describe('Clients routes', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  const clientId = new mongoose.Types.ObjectId().toString();

  it('should return 401 when user is not logged', async () => {
    const { statusCode } = await supertest(app).get(`/clients/${clientId}`);
    expect(statusCode).toBe(401);
  });

  it('should create a client and return status code 201', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/clients')
      .send(mockPayloadClient);

    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: 'Client registered' });
  });

  it('should try create client with email already existent and return status code 400', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/clients')
      .send(mockPayloadClient);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'This email is already in use' });
  });

  it('should try create client with cpf already existent and return status code 400', async () => {
    const mockClient = {
      ...mockPayloadClient,
      email: 'test_route@email.com.br',
    };

    const { statusCode, body } = await supertest(app)
      .post('/clients')
      .send(mockClient);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'This cpf is already in use' });
  });

  it('should return list of clients', async () => {
    const { statusCode, body } = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      __v: 0,
      _id: expect.any(String),
      fullName: expect.any(String),
      email: expect.any(String),
      birthDate: expect.any(String),
      cpf: expect.any(String),
      phoneNumber: expect.any(String),
      postalCode: expect.any(String),
      gender: expect.any(String),
      password: expect.any(String),
    }]);
  });

  it('should get client by id', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const { statusCode, body } = await supertest(app)
      .get(`/clients/id/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual({
      __v: 0,
      _id: expect.any(String),
      fullName: expect.any(String),
      email: expect.any(String),
      birthDate: expect.any(String),
      cpf: expect.any(String),
      phoneNumber: expect.any(String),
      postalCode: expect.any(String),
      gender: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should not get client by id and return error 400', async () => {
    const idClient = '213123123123123';

    const { statusCode } = await supertest(app)
      .get(`/clients/id/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(500);
  });

  it('should get client by email', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const emailClient = response.body[0].email;

    const { statusCode, body } = await supertest(app)
      .get(`/clients/email?email=${emailClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual({
      __v: 0,
      _id: expect.any(String),
      fullName: expect.any(String),
      email: expect.any(String),
      birthDate: expect.any(String),
      cpf: expect.any(String),
      phoneNumber: expect.any(String),
      postalCode: expect.any(String),
      gender: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should get client by email and return error 400', async () => {
    const emailClient = 'teste_2022@email.com';

    const { statusCode, body } = await supertest(app)
      .get(`/clients/email?email=${emailClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(400);

    expect(body).toEqual({
      message: 'No client found.',
    });
  });

  it('should get client by filter by gender', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const clientGender = response.body[0].gender;

    const { statusCode, body } = await supertest(app)
      .get(`/clients/search?searchBy=gender&filter=${clientGender}&page=1&limit=4`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      __v: 0,
      _id: expect.any(String),
      fullName: expect.any(String),
      email: expect.any(String),
      birthDate: expect.any(String),
      cpf: expect.any(String),
      phoneNumber: expect.any(String),
      postalCode: expect.any(String),
      gender: expect.any(String),
      password: expect.any(String),
    }]);
  });

  it('should get client by filter by id', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const { statusCode, body } = await supertest(app)
      .get(`/clients/search?searchBy=id&filter=${idClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual({
      __v: 0,
      _id: expect.any(String),
      fullName: expect.any(String),
      email: expect.any(String),
      birthDate: expect.any(String),
      cpf: expect.any(String),
      phoneNumber: expect.any(String),
      postalCode: expect.any(String),
      gender: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should get client by filter by fullName', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const fullNameClient = response.body[0].fullName;

    const { statusCode, body } = await supertest(app)
      .get(`/clients/search?searchBy=fullName&filter=${fullNameClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);

    expect(body).toEqual([{
      __v: 0,
      _id: expect.any(String),
      fullName: expect.any(String),
      email: expect.any(String),
      birthDate: expect.any(String),
      cpf: expect.any(String),
      phoneNumber: expect.any(String),
      postalCode: expect.any(String),
      gender: expect.any(String),
      password: expect.any(String),
    }]);
  });

  it('should get client by filter and not send param', async () => {
    const { statusCode } = await supertest(app)
      .get('/clients/search')
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });

  it('should update a client successfully', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const updateClient = {
      fullName: 'Test Luiza Code',
      password: 'luizacode123',
      confirmPassword: 'luizacode123',
      oldPassword: 'test123',
    };

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(200);
  });

  it('should update a client with invalid email and return error 400', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const updateClient = {
      fullName: 'Test Code',
      password: 'code123',
      confirmPassword: 'code123',
      oldPassword: 'luizacode123',
      email: 'test@email.com',
    };

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(400);
  });

  it('should update a client with invalid cpf and return error 400', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const updateClient = {
      fullName: 'Test Code',
      password: 'code123',
      confirmPassword: 'code123',
      oldPassword: 'luizacode123',
      email: 'test_321@email.com',
      cpf: '99944455566',
    };

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(400);
  });

  it('should update a client and return error 400', async () => {
    const idClient = 6;

    const updateClient = {
      fullName: 'Test Code',
      password: 'code123',
      confirmPassword: 'code123',
      oldPassword: 'luizacode123',
      email: 'test_321@email.com',
      cpf: '12345678912',
    };

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(404);
  });

  it('should not update a client without oldPassword and cofirmPassword and return error 401', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const updateClient = {
      password: 'test2022',
    };

    const idClient = response.body[0]._id;

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(401);
  });

  it('should not update a client with wrong oldPassword and return error 401', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const updateClient = {
      oldPassword: 'wrongPassword',
    };

    const idClient = response.body[0]._id;

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(401);
  });

  it('should not update a client with not matcher in password and confirmPassword, and return error 401', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const updateClient = {
      oldPassword: 'luizacode123',
      password: 'update',
      confirmPassword: 'notMatch',
    };

    const idClient = response.body[0]._id;

    const { statusCode } = await supertest(app)
      .put(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updateClient);

    expect(statusCode).toBe(401);
  });

  it('should search wishlist by client', async () => {
    const mockProduct = {
      code: '123456',
      name: 'Produto',
      description: 'Produto para pele',
      volume: '30ml',
      recommendation: 'Pele mista',
    };

    await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockProduct);

    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const mockWishlist = {
      title: 'Wishlist de Testes',
      client: idClient,
      product: ['123456'],
    };

    await supertest(app)
      .post('/wishlists')
      .set('Authorization', `Bearer ${jwt}`)
      .send(mockWishlist);

    const { statusCode } = await supertest(app)
      .get(`/clients/wishlists/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });

  it('delete client by id successfully', async () => {
    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${jwt}`);

    const idClient = response.body[0]._id;

    const { statusCode } = await supertest(app)
      .delete(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(200);
  });

  it('delete client by id not existent and return error 404', async () => {
    const idClient = 5;

    const { statusCode } = await supertest(app)
      .delete(`/clients/${idClient}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(statusCode).toBe(404);
  });
});
