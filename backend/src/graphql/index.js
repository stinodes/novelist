import { makeExecutableSchema } from 'graphql-tools'
import schemas from './schemas'
import resolvers from './resolvefunction'

const rootQuery = `
    type RootQuery {
      me: User
    }
  `,
  schemaDef = `
    schema {
      query: RootQuery
    }
  `,
  rootResolvers = {
    RootQuery: {
      me (_, args, ctx) {
        return ctx.state.user
      }
    }
  },
  schema = makeExecutableSchema({
    typeDefs: [...schemas, rootQuery, schemaDef],
    resolvers: {...resolvers, ...rootResolvers},
  })

export default schema
