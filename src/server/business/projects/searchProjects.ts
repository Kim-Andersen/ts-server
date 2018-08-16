// import Promise from 'bluebird';

// import bookshelf from '../../db/bookshelf';
// import { ProjectModel, ProjectUserModel } from '../../db/models';
// import logger from '../../util/logger';

// export function createNewProjects(
//   request: NewProjectRequest
// ): Promise<ProjectModel> {
//   logger.info(`Creating new project`, request);

//   return bookshelf.transaction(transaction => {
//     // Insert new project in DB.
//     return new ProjectModel({
//       title: request.title,
//       description: request.description,
//       createdBy: request.createdBy
//     })
//       .save(undefined, { transacting: transaction, require: true })
//       .then((project: ProjectModel) => {
//         // Insert new project_user in DB.
//         return new ProjectUserModel(project.id, project.createdBy)
//           .save(undefined, { transacting: transaction, require: true })
//           .then(() => project);
//       });
//   });
// }
