import express, { Request, Router } from 'express';
import graphqlHTTP from 'express-graphql';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import { createNewProject } from '../business/projects/createNewProject';
import { ProjectModel, UserModel } from '../db/models';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectModel.graphQLObjectType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { title, description }) => {
        return createNewProject({ title, description, createdBy: 1 }).then(
          model => model.toJSON()
        );
      }
    },
    patchProject: {
      type: ProjectModel.graphQLObjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        title: {
          type: GraphQLString
        },
        description: {
          type: GraphQLString
        }
      },
      resolve: (root, { id, title, description }) => {
        return new ProjectModel({ id })
          .save({ title, description }, { patch: true })
          .then(model => model.toJSON());
      }
    }
  }
});

// Define the Query type
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    project: {
      type: ProjectModel.graphQLObjectType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_, args: any) => {
        return new ProjectModel().where({ id: args.id }).fetch();
      }
    },
    projects: {
      type: new GraphQLList(ProjectModel.graphQLObjectType),
      args: {
        mine: { type: GraphQLBoolean },
        userId: { type: GraphQLInt }
      },
      resolve: (_, args: any, request: Request) => {
        const whereFilter: { createdBy?: number } = {};
        if (args.mine === true && request.session) {
          whereFilter.createdBy = parseInt(request.session.id, 10);
        } else if (args.userId) {
          whereFilter.createdBy = args.userId;
        }
        return new ProjectModel().where(whereFilter).fetchAll();
      }
    },
    user: {
      type: UserModel.graphQLObjectType,
      args: {
        id: { type: GraphQLInt },
        slug: { type: GraphQLString }
      },
      resolve: (_, args: any) => {
        return new UserModel().where({ slug: args.slug }).fetch();
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

export default class GraphQLRouter {
  private _router: Router;
  get router(): Router {
    return this._router;
  }

  constructor() {
    this._router = this.configureRouter();
  }

  private configureRouter(): Router {
    const router = express.Router({ mergeParams: true });

    router.post(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false,
        pretty: true,
        formatError: error => ({
          message: error.message,
          locations: error.locations,
          stack: error.stack ? error.stack.split('\n') : [],
          path: error.path
        })
      })
    );

    router.get(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: true,
        formatError: error => ({
          message: error.message,
          locations: error.locations,
          stack: error.stack ? error.stack.split('\n') : [],
          path: error.path
        })
      })
    );
    return router;

    // const router = express.Router({ mergeParams: true });
    // router.use(compression());
    // router.use(bodyParser.json());
    // router.use(bodyParser.urlencoded({ extended: true }));
    // // router.use(expressValidator());
    // router.use(lusca.xframe('SAMEORIGIN'));
    // router.use(lusca.xssProtection(true));
    // return router;
  }
}
