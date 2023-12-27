import express from 'express';
import { config } from 'dotenv';
import livekitTokenRouter from './src/routes/livekitToken.route.js';
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql';
import { typeDefs, resolvers } from './src/schemas/schema.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
const app = express();
config({ path: './development.env'})

const port = process.env.PORT || 3000;

app.use(cors())
app.use("/getRoomToken", livekitTokenRouter);
app.use("/graphql", graphqlHTTP({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    graphiql: true 
}))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})