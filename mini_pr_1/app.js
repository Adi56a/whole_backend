const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const crypto  = require('crypto')
const path = require('path')
const multerconfig  = require('./config/multerConfig')



app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))





app.get('/' , (req , res)=>{
     
   res.render('index')

})

app.post('/register',async (req,res) =>{
    let {username , name , password , age , email} = req.body;

    let userExist =  await userModel.findOne({email})

    if(userExist) return res.status(409).send('User already exist ')
    
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async (err,hash) => {
            
        const registerUser  = await userModel.create({
            username,
            name, 
            password: hash,
            age,
            email


        })


        let token  = jwt.sign({email:email,userid:registerUser._id },'secretkey');
        res.cookie("token",token)
        res.redirect('/login')



        })
     })

    
})

app.get('/login' ,(req,res) => {
    res.render('login')
})


app.post('/login' , async (req , res)=>{

    let {email , password} = req.body;

    let userExist = await userModel.findOne({email});

    if(!userExist) return res.status(409).send('something Went Wrong')

    bcrypt.compare(password,userExist.password,function(err,result){
        if(result === true){
            let token  = jwt.sign({email:email,userid:userExist._id },'secretkey');
             res.cookie("token",token)
            res.redirect('/profile')
        } 
        else {
            res.send('please check your password again')
        }
    })

   

})

app.get('/profile',isLoggedIn,async (req,res) => {
     let thisuser = await userModel.findOne({email:req.currentUser.email}).populate('posts')
     
    
     res.render('profile',{thisuser})
})


app.post('/post',isLoggedIn, async  (req,res) => {
    let user  = await userModel.findOne({email:req.currentUser.email})
    let {content} = req.body;
    let createdPost =  await postModel.create({
        user: user._id,
        content,
    })

    user.posts.push(createdPost._id);
    await user.save();

    res.redirect('/profile')

})


app.get('/logout',(req,res) => {
    res.cookie('token',"")
    res.redirect('/login')
})


app.get('/like/:id',isLoggedIn, async (req,res) => {
    let post  = await postModel.findOne({_id : req.params.id}).populate('user')
   
    if(post.likes.indexOf(req.currentUser.userid) === -1){
        post.likes.push(req.currentUser.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.currentUser.userid),1);

    }

     await post.save()
 
//  post.like.push()
  res.redirect('/profile')
})
 


app.get('/edit/:id',isLoggedIn,async (req,res) => {
   let post  = await postModel.findOne({_id:req.params.id}).populate('user');

  
    console.log(post)
   res.render('edit',{post})
})

app.post('/update/:id', isLoggedIn , async (req,res) => {
    let updatedPost  = await postModel.findOneAndUpdate({_id : req.params.id},{content : req.body.content})
    res.redirect('/profile')
})




function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');  // Token is missing, send response and return
    }

    try {
        let data = jwt.verify(token, 'secretkey');  // Verify JWT
        req.currentUser = data;  
        console.log(data)// Attach decoded data to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).send('Invalid or expired token');  // Handle invalid token error
    }
}

app.get('/feed' , isLoggedIn , async (req,res) => {

    let posts  =  await postModel.find().populate('user');
    console.log(posts)
  
    res.render('feed',{posts})
   
})







app.listen(3000,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log("server is running on port 3000 ")
    }
})