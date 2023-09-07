const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        firstName: String!
        lastName: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        me: User
    }

    type Mutation {
        signup(email: String!, password: String!, firstName: String!, lastName:String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
`

module.exports = typeDefs