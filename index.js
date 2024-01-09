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
    if(req.body.operationName && (req.body.operationName!=='Login' && req.body.operationName!=='Register')){
      if(!req.headers.authorization && false) //Remove false once test with acutal auth field
        throw Error("No token found");
      const verifiedUser = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RVc2VyMiIsImlhdCI6MTcwNDgyODcxNCwiZXhwIjoxNzA0ODMyMzE0fQ.0EJLhcdBqu_ZS0Ti7Nt9aWyAGt8KktHpfZpuDWFB7IA")
      //const verifiedUser = verifyToken(req.headers.authorization.split(' ')[1]);
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