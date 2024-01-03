export const UserTypes = `#graphql
    type User {
        id: ID!,
        name: String,
        password: String,
        userid: String
    }

    type AuthPayload {
        success: Boolean!,
        token: String,
        user: User
    }

    input LoginPayload {
        userid: String!,
        password: String!
    }

    input RegisterPayload {
        userid: String!,
        password: String!,
        name: String!
    }
`