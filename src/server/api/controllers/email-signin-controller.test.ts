import request from 'supertest';

import HttpStatusCode from '../../../shared/http-status-codes';
import app from '../../app';

describe('POST /api/auth/email', () => {
  it('should return 400 when no email supplied', done => {
    request(app)
      .post('/api/auth/email')
      .expect(HttpStatusCode.UnprocessableEntity, done);
  });

  it('should return 400 when given an invalid email', done => {
    request(app)
      .post('/api/auth/email')
      .send({ email: 'bademail@' })
      .expect(HttpStatusCode.UnprocessableEntity, done);
  });

  it('should return 200 when given a valid email', done => {
    request(app)
      .post('/api/auth/email')
      .send({ email: 'valid@email.com' })
      .expect(HttpStatusCode.OK, done);
  });
});
