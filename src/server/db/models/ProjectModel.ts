import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

import bookshelf from '../bookshelf';

export default class ProjectModel extends bookshelf.Model<ProjectModel> {
  static MAX_TITLE_LENGTH = 100;
  static MAX_DESCRIPTION_LENGTH = 1000;

  static graphQLObjectType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Project',
    fields: {
      id: { type: GraphQLInt },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
      createdBy: { type: GraphQLInt }
    }
  });

  get tableName() {
    return 'project';
  }

  get hasTimestamps() {
    // Rverride the default attribute names.
    return ['createdAt', 'updatedAt'];
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
