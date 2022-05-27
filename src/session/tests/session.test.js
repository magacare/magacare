const mongoose = require('mongoose');

const {
  describe, it, expect, beforeAll, afterAll,
} = require('@jest/globals');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createServer } = require('../../server');

const app = createServer();

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

describe('Session Autentication', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should create client and return status code 201', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/clients')
      .send(mockPayloadClient);

    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: 'Client registered' });
  });

  it('should autenticate client and return status code 200', async () => {
    const mockLogin = {
      email: 'test@email.com',
      password: 'test123',
    };
    const { statusCode, body } = await supertest(app)
      .post('/session')
      .send(mockLogin);

    expect(statusCode).toBe(200);
    expect(body.message).toContain('Successfully authenticated');
  });

  it('should not autenticate client not exist and return status code 401', async () => {
    const mockLogin = {
      email: 'test@email.com.br',
      password: 'test123',
    };
    const { statusCode, body } = await supertest(app)
      .post('/session')
      .send(mockLogin);

    expect(statusCode).toBe(401);
    expect(body.error).toContain('Client not exist');
  });

  it('should not autenticate client with invalid password and return status code 401', async () => {
    const mockLogin = {
      email: 'test@email.com',
      password: 'invalidpassword',
    };
    const { statusCode, body } = await supertest(app)
      .post('/session')
      .send(mockLogin);

    expect(statusCode).toBe(401);
    expect(body.error).toContain('Invalid Password');
  });
});
