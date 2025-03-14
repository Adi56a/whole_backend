const express = require('express')
const app = express()
const path = require('path')
const usermodel = require('./models/user')
const { default: mongoose } = require('mongoose')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs')


app.get('/',(req,res) => {
    res.render("index")
})

app.get('/read', async (req,res) => {
     let alluser = await  usermodel.find();
     res.render('read',{alluser:alluser})
})

app.get('/delete/:id', async (req,res) => {
    let deltedUser  = await usermodel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read')
    
})

app.post('/create', async  function(req,res){
    
     let newuser  = await usermodel.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.url
     })
    
     res.redirect('/')
     
})

app.get('/edit/:editid', async (req,res) => {
    let edituser = await usermodel.findOne({_id:req.params.editid})
    res.render('edit',{edituser})
})

app.post('/update/:userid', async (req,res) =>{
    let {image, name , email} = req.body;
    let user  = await usermodel.findOneAndUpdate({_id:req.params.userid},{image , name , email} , {new : true })
    res.redirect('/read')
})

app.listen(3000,function(err){
    if(err){
        console.log(err)
    }else{
        console.log('server running at port 3000')
    }
});