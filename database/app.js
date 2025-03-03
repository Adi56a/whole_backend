const express = require('express')

const app = express()
const usermodel = require('./usermodel')




app.get('/',function(req,res){
    res.send("starting...")
})


app.get('/create',async function(req,res){
    let createuser = await usermodel.create({
        name:"aditya1",
        email:"adityajogdand15@gmail.com",
        username:'aditya1'
    })

    res.send(createuser)
    
})





app.get('/update', async (req,res) =>{
    let updateduser = await usermodel.findOneAndUpdate({username:'aditya1'},{name:'Aditya_Jogdand'},{new:true});
    res.send(updateduser);
})



app.get('/read', async  (req,res) => { 
    let users  = await usermodel.find();
    res.send(users)

    
})

app.get('/readone/:username', async (req,res) => {
    let user  = await usermodel.find({username:req.params.username});
    res.send(user);
})


app.get('/delete',async (req,res) => {
    let deltedUser = await usermodel.findOneAndDelete({username:'aditya'});
    res.send(deltedUser)
})


app.listen(3000,function(err){
    console.log('server running at port 3000 ')
});