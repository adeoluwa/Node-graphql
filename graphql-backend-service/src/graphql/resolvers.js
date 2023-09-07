const User = require('../model/User')

const bcrypt = require('bcrypt')

const jwt  = require('jsonwebtoken')

// const { ApolloError } = require('apollo-server-error')
resolvers = {
    Query: {
        me:(parent, args, context) => {
            return context.user
        },
    },
    Mutation: {
        signup: async (parent, args) => {
            const user = await User.create(args)
            const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY)
            return {
                token,
                user,
            }
        },
        login: async (_, {email, password}) => {
            try {
                const user = await User.findOne({email})
                if(!user){
                    throw new Error('invalid Credentials: User not found')
                }
                const valid = await bcrypt.compare(password, user.password)
                if(!valid){
                    throw new Error('Invalid credentials: Password is Incorrect')
                }
                const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY)
                return {
                    token,
                    user,
                };
            } catch (error) {
                console.error('Login Error',error.message)
                throw new Error('An error occurred during login')
            }
            
        },
    },
};


module.exports = resolvers;