import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

const app = express()
const port = 4000

// In-memory data store
const data = {
  warriors: [
    { id: '001', name: 'Jaime', weight: 152, sibling: ['Sarah', 'Michael'] },
    { id: '002', name: 'Jorah', weight: 180, sibling: ['Justin', 'Anna'] },
    { id: '003', name: 'Austin', weight: 175, sibling: ['Ralph'] },
  ],
}

// Schema
const typeDefs = `
type Warrior {
  id: ID!
  name: String!
  weight: Int!
  sibling: [String]
}

type Query {
  warriors: [Warrior]
}
`

// Resolver for warriors
const resolvers = {
  Query: {
    warriors: (obj, args, context) => context.warriors,
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Entrypoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})