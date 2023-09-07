const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        min:5,
        max:10,
    },
    lasttName:{
        type:String,
        required: true,
        min:5,
        max:10,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:18,
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User