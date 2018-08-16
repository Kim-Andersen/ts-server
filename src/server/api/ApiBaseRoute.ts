import { Response } from 'express';
import jwt from 'express-jwt';

import HttpStatusCode from '../../shared/http-status-codes';
import { SESSION_SECRET } from '../util/env';

export default class ApiBaseRoute {
  protected send(res: Response, status: HttpStatusCode, json: any): Response {
    return res.status(status).json(json);
  }

  protected get authenticate(): jwt.RequestHandler {
    return jwt({ secret: SESSION_SECRET });
  }
}
