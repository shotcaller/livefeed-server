import { UserTypes ,UserResolvers } from "./user/index.js";

const typeDefs = `#graphql
    type Query {
        users: [User]
        login(userid: String!, password: String!): Login   
    }

    ${UserTypes}
`;

const resolvers = {
    Query : {
        ...UserResolvers
    }
}

export {typeDefs, resolvers}