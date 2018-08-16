import bodyParser from 'body-parser';
import compression from 'compression';
import errorHandler from 'errorhandler';
import express, { NextFunction, Request, Response, Router } from 'express';
import lusca from 'lusca';

import HttpStatusCode from '../../shared/http-status-codes';
import { NODE_ENV } from '../util/env';
import ApiBaseRoute from './ApiBaseRoute';

class ProjectRoutes extends ApiBaseRoute {
  static create(router: Router): ProjectRoutes {
    return new ProjectRoutes(router);
  }

  constructor(router: Router) {
    super();

    router.get(
      '/projects',
      this.authenticate,
      (req: Request, res: Response, next: NextFunction) =>
        this.postNewProject(req, res, next)
    );
  }

  private postNewProject(req: Request, res: Response, next: NextFunction) {
    this.send(res, HttpStatusCode.OK, { projects: [] });
  }
}

// import expressValidator from 'express-validator';
export default class ApiRouter {
  private _router: Router;

  static create(): ApiRouter {
    return new ApiRouter();
  }

  constructor() {
    this._router = this.configureRouter();
    this.errorHandler();
    this.routes();
  }

  private routes(): void {
    ProjectRoutes.create(this.router);

    // 404 route catcher.
    this.router.all('*', function(req: Request, res: Response) {
      return res.status(404).json({ error: { error: 'Sorry, nothing here.' } });
    });
  }

  private configureRouter(): Router {
    const router = express.Router({ mergeParams: true });
    router.use(compression());
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));
    // router.use(expressValidator());
    router.use(lusca.xframe('SAMEORIGIN'));
    router.use(lusca.xssProtection(true));
    return router;
  }

  private errorHandler(): void {
    this.router.use(errorHandler({ log: NODE_ENV !== 'production' }));
    // this.router.use((err: Error, req: Request, res: Response) => {
    //   if (NODE_ENV !== 'production') {
    //     return res.status(500).json({
    //       error: { code: 'ERROR', message: err.message, stack: err.stack }
    //     });
    //   } else {
    //     return res
    //       .status(500)
    //       .json({ error: { code: 'ERROR', message: 'server error' } });
    //   }
    // });
  }

  public get router(): Router {
    return this._router;
  }
}
