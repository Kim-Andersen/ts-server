import { camelCase, isNumber, mapKeys, snakeCase } from 'lodash';

import bookshelf from '../bookshelf';
import ProjectModel from './ProjectModel';
import UserModel from './user';

export default class ProjectUserModel extends bookshelf.Model<
  ProjectUserModel
> {
  static ValidationError = Error;

  constructor(projectId: number, userId: number) {
    super();

    this.on('saving', this.validate);

    // this.projectId = projectId;
    // this.userId = userId;

    this.set({ projectId, userId });
  }

  private validate() {
    console.log('validate', this.userId, this.projectId);

    if (!isNumber(this.userId) || this.userId < 0) {
      throw new ProjectUserModel.ValidationError('userId {Number} is required');
    }
    if (!isNumber(this.projectId) || this.projectId < 0) {
      throw new ProjectUserModel.ValidationError(
        'projectId {Number} is required'
      );
    }
  }

  public parse(response: any) {
    return mapKeys(response, function(value, key) {
      return camelCase(key);
    });
  }

  public format(attributes: any) {
    return mapKeys(attributes, function(value, key) {
      return snakeCase(key);
    });
  }

  get tableName() {
    return 'project_user';
  }
  get hasTimestamps() {
    return true;
  }

  public user() {
    return this.hasOne(UserModel);
  }

  public project() {
    return this.hasOne(ProjectModel);
  }

  public get createdAt(): Date {
    return this.get('createdAt');
  }

  public get updatedAt(): Date {
    return this.get('updatedAt');
  }

  // public set userId(userId: number) {
  //   this.set({ userId });
  // }
  public get userId() {
    return this.get('userId');
  }
  public get projectId() {
    return this.get('projectId');
  }

  // public set projectId(projectId: number) {
  //   this.set({ projectId });
  // }
}
