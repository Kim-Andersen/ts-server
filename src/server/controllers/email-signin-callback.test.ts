import request from 'supertest';

import HttpStatusCode from '../../shared/http-status-codes';
import app from '../app';

describe('GET /callback/email', () => {
  it(`should return ${
    HttpStatusCode.UnprocessableEntity
  } if no token in url`, done => {
    request(app)
      .get('/callback/email')
      .expect(HttpStatusCode.UnprocessableEntity, done);
  });

  it(`should return ${HttpStatusCode.NotFound} if token not found`, done => {
    request(app)
      .get('/callback/email?token=1234')
      .expect(HttpStatusCode.NotFound, done);
  });
});
