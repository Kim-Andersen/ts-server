import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check';

import HttpStatusCode from '../../../shared/http-status-codes';
import { createNewProject, NewProjectRequest } from '../../business/projects';
import { ProjectModel } from '../../db/models';
import logger from '../../util/logger';

export const postCreateNewProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  body('title', 'Email is not valid')
    .isString()
    .isLength({ min: 1, max: ProjectModel.MAX_TITLE_LENGTH });
  body('description', 'Description is not valid')
    .optional()
    .isLength({
      min: 0,
      max: ProjectModel.MAX_DESCRIPTION_LENGTH
    });

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res
      .status(HttpStatusCode.UnprocessableEntity)
      .send({ errors: validationErrors.array() });
  }

  const { title, description } = req.body;
  const newProjectRequest: NewProjectRequest = {
    title,
    description,
    createdBy: 1 // TODO: !!!!!!!! req.session!.userSession.user.id
  };

  logger.info('API creating new project', newProjectRequest);

  return createNewProject(newProjectRequest)
    .then((project: ProjectModel) => {
      return res.status(HttpStatusCode.OK).json({
        project: project.toJSON()
      });
    })
    .catch(function(err: any) {
      logger.error('API failed to create new project');
      return next(err);
    });
};
