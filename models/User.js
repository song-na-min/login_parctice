const mongoose = require('mongoose')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type : String,
        trim:true,//space를 없애주는
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    role:{
        type:Number//1=>관리자, 0=>일반유저
        ,default:0
    },
    image:String,
    token:{
        type:String
    },tokenExp:{
        type:Number
    }

})
const User=mongoose.model('User',userSchema)//모델로 감싼다

module.exports={User}