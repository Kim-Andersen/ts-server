import { camelCase, mapKeys, snakeCase } from 'lodash';

import bookshelf from '../bookshelf';

export default class ProjectModel extends bookshelf.Model<ProjectModel> {
  static MAX_TITLE_LENGTH = 100;
  static MAX_DESCRIPTION_LENGTH = 1000;

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
    return 'project';
  }
  get hasTimestamps() {
    return true;
  }

  // public createdByUser() {
  //   return this.hasOne(UserModel);
  // }

  public get createdAt(): Date {
    return this.get('createdAt');
  }

  public get updatedAt(): Date {
    return this.get('updatedAt');
  }

  public get createdBy(): number {
    return this.get('createdBy');
  }

  public get title(): string {
    return this.get('title');
  }
  public set title(title: string) {
    this.set({ title });
  }

  public get description(): string {
    return this.get('description');
  }
  public set description(description: string) {
    this.set({ description });
  }
}
