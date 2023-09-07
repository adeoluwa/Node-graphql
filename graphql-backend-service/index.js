const express = require('express')

const { ApolloServer} = require('apollo-server-express')

// const {ApolloServerPluginLandingPageLocalDefault,} = require('@apollo/server/plugin/landingPage/default');

const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const mongoose = require('mongoose')

// const graphqlPlayground = require('graphql-playground-middleware-express')

const cors = require('cors')

const helment = require('helmet')

const morgan = require('morgan')

const typeDefs = require('./src/graphql/typeDefs')

const resolvers = require('./src/graphql/resolvers')

const {getUser} = require('./src/middleware/auth')

const dotenv= require('dotenv')

const app = express()

// Middleware
app.use(cors())
app.use(helment())
app.use(morgan("common"))

mongoose.set('strictQuery', true)

async function startServer(){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
                // options
            }), ApolloServerPluginLandingPageDisabled()
        ],
        context: async ({req}) => {
            if (req){
                const user = await getUser(req)
                return {user}
            }
        },
    })

    await server.start()

    server.applyMiddleware({app})
}

startServer().catch(error => console.error(error))



//DB config
if (process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

const PORT = process.env.PORT || 8080

const CONNECTION = process.env.CONNECTION_URI

const mongoConnect = async () => {
    try {
        await mongoose.connect(CONNECTION)
        app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}/graphql`))
    } catch (error) {
        console.log(error.message)
    }
}

mongoConnect()
