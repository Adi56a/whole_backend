const express = require('express')
const app = express()
const userModel = require('./models/user');
const postModel  = require('./models/post');
const usermodel = require('../database/usermodel');

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.get('/create', async (req,res)=>{
    let createdUser = await userModel.create({
        username :"Adityax777777777",
        age:20,
        email:"aditya@newgmail.com"
    })

    res.send(createdUser)
})


app.get('/post/create', async function(req, res) {
    let createPost = await postModel.create({
        postdata: "Second post from my side",
        user: '67cc206be7648a5f12dfde2c',
    });

    let user = await usermodel.findOne({ _id: '67cc206be7648a5f12dfde2c' });
    user.posts.push(createPost._id);
    await user.save();

    res.send({ createPost });
});

app.listen(3000,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Server running at 3000")
    }
})