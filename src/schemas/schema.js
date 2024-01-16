import { UserTypes ,UserResolvers } from "./user/index.js";

const typeDefs = `#graphql
    type Query {
        users: [User],
        loggedInUser: User
    }

    type Mutation {
        login(loginPayload: LoginPayload!): AuthPayload
        register(registerPayload: RegisterPayload!): AuthPayload
    }

    ${UserTypes}
`;

const resolvers = {
    Query : {
        ...UserResolvers.Query
    },
    Mutation: {
        ...UserResolvers.Mutation
    }
}

export {typeDefs, resolvers}