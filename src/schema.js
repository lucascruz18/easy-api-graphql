import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import User from "./models/User";

const Person = new GraphQLObjectType({
  name: "Person",
  description: "This represents a Person",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(person) {
          return person.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(person) {
          return person.name;
        }
      },
      lastname: {
        type: GraphQLString,
        resolve(person) {
          return person.lastname;
        }
      },
      email: {
        type: GraphQLString,
        resolve(person) {
          return person.email;
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Root query object",
  fields: () => {
    return {
      users: {
        type: new GraphQLList(Person),
        resolve(root) {
          return User.findAll();
        }
      },
      user: {
        type: new GraphQLList(Person),
        args: {
          id: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return User.findAll({ where: { id: args.id } });
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  description: "Functions to set stuff",
  fields() {
    return {
      createUser: {
        type: Person,
        args: {
          name: {
            type: GraphQLNonNull(GraphQLString)
          },
          lastname: {
            type: GraphQLNonNull(GraphQLString)
          },
          email: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return User.create({
            name: args.name,
            lastname: args.lastname,
            email: args.email
          });
        }
      },
      updateUser: {
        type: Person,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLString)
          },
          name: {
            type: GraphQLString
          },
          lastname: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        },
        resolve: async (_, args) => {
          const user = await User.findByPk(args.id);

          return user.update({
            name: args.name,
            lastname: args.lastname,
            email: args.email
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
