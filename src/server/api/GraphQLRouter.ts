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
import { ProjectModel } from '../db/models';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectModel.graphQLObjectType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { title, description }) => {
        return createNewProject({ title, description, createdBy: 1 }).then(
          model => model.toJSON()
        );
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
        mine: { type: GraphQLBoolean }
      },
      resolve: (_, args: any, request: Request) => {
        const whereFilter: { createdBy?: number } = {};
        if (args.mine === true && request.session) {
          whereFilter.createdBy = 1;
        }
        return new ProjectModel().where(whereFilter).fetchAll();
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
        graphiql: false
      })
    );

    router.get(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: true
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
