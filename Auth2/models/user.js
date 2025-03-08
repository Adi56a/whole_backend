const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adityajogdand15:ugaZmh2bXP8URUoe@practice.5gmcg.mongodb.net/?retryWrites=true&w=majority&appName=practice')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age:Number
})

module.exports = mongoose.model('User', userSchema)