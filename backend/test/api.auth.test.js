const request = require('supertest');
const app = require('../index');

describe('Auth guards', () => {
  it('401 without JWT', async () => {
    const res = await request(app).post('/payments/initiate').send({amount:1, currency:'USD', payee:'0x0'});
    expect(res.statusCode).toBe(401);
  });
});
