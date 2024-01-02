export const UserTypes = `#graphql
    type User {
        id: ID!,
        name: String,
        password: String,
        userid: String
    }

    type Login {
        success: Boolean!,
        token: String,
        user: User
    }
`