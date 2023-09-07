const jwt = require('jsonwebtoken')

const User = require('../model/User')

const dotenv = require('dotenv')

const getUser = async(req) => {
    const header = req.headers.authorization;
    if(header){
        const token = header.replace('Bearer ', '')
        const {userId} = jwt.verify(token, process.env.SECRET_KEY)
        return await User.findById(userId)
    }
}

module.exports = {
    getUser,
}