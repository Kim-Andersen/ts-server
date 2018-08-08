import request from 'supertest';

import app from '../../app';

describe('POST /api/auth/email', () => {
  it('should return 400 when no email supplied', done => {
    request(app)
      .post('/api/auth/email')
      .expect(400, done);
  });

  it('should return 400 when given an invalid email', done => {
    request(app)
      .post('/api/auth/email')
      .send({ email: 'bademail@' })
      .expect(400, done);
  });

  it('should return 200 when given a valid email', done => {
    request(app)
      .post('/api/auth/email')
      .send({ email: 'valid@email.com' })
      .expect(200, done);
  });
});
