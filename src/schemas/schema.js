const typeDefs = `#graphql
    type Query {
        name: String!   
    }
`;

const resolvers = {
    Query : {
        name: () => "Ruturaj"
    }
}

export {typeDefs, resolvers}