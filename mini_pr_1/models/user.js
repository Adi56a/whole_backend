const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://adityajogdand15:ugaZmh2bXP8URUoe@practice.5gmcg.mongodb.net/?retryWrites=true&w=majority&appName=practice')


const userSchema  = mongoose.Schema({
    username : String,
    name : String,
    age:Number , 
    email : String,
    password : String,
    profilepic:{
        type:String,
        default:'default.jpg'
    },
    posts:[
        {type:mongoose.Schema.Types.ObjectId,ref:'post'}
    ]
});


module.exports = mongoose.model('user',userSchema)