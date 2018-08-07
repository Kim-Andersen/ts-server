import request from 'supertest';

import app from '../app';

describe('GET /', () => {
  it('should return 202', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
