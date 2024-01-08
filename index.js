import express from 'express';
import { config } from 'dotenv';
import livekitTokenRouter from './src/routes/livekitToken.route.js';
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql';
import { typeDefs, resolvers } from './src/schemas/schema.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { verifyToken } from './src/utils/auth.js';
const app = express();
config({ path: './development.env'})

const port = process.env.PORT || 3000;

const createContext = (req) => ({
    headers: req.headers,
    userIdFromToken: req.body.userIdFromToken
})

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  try{
    if(req.headers.authorization || (req.body.operationName!=='Login' && req.body.operationName!=='Register')){
      const verifiedUser = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RVc2VyMiIsImlhdCI6MTcwNDc0MTI2OSwiZXhwIjoxNzA0NzQ0ODY5fQ.XQs4NlCI92hVd-3fB9d1XB2-A01Aq1bH7CpGqJFg_58")
      req.body.userIdFromToken = verifiedUser;
      next();
    }
    else next()
  } catch(e) {
    res.status(401).send({ error: e.message })
    console.log(e.message);
  }
})
app.use("/getRoomToken", livekitTokenRouter);
app.use("/graphql", graphqlHTTP((request) => ({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    context: createContext(request),
    graphiql: true 
})))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})