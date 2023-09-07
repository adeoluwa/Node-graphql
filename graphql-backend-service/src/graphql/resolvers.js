const User = require('../model/User')

const bcrypt = require('bcrypt')

const jwt  = require('jsonwebtoken')

const resolvers = {
    Query: {
        me:(parent, args, context) => {
            return context.user
        },
    },
    Mutation: {
        signup: async (parent, args) => {
            const user = await User.create(args)
            // const salt = await bcrypt.genSalt()
            // const hashedPassword = await bcrypt.hash(user.password)
            const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY)
            return {
                token,
                user,
            }
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email}).select('+password')
            const valid = await bcrypt.comparePassword(password)
            if(!valid || !user){
                throw new Error('Invalid credentials')
            }
            const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY)
            return {
                token,
                user,
            };
        },
    },
};


module.exports = resolvers;