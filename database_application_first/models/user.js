const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://adityajogdand15:ugaZmh2bXP8URUoe@practice.5gmcg.mongodb.net/?retryWrites=true&w=majority&appName=practice');


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    image : String
})

module.exports = mongoose.model('user',userSchema);