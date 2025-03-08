const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cookieParser())


// app.get('/',function(req,res){
// //    res.cookie('name',"harsh");
// bcrypt.genSalt(10,function(err,salt){
//     bcrypt.hash('polo',salt , function(err,hash){
//         console.log(hash)


//         bcrypt.compare('polo',hash,function(err,result){
//             console.log(result)
//         })
//     })
   

  


// })


//    res.send('done')
// })

// app.get('/read',function(req,res){
//     // console.log(req.cookies)
//     res.send('read page')
// })


app.get('/',function(req,res){
    let token  = jwt.sign({email:"aditya@gmail.com"},"secret")
    res.cookie('token',token)
    console.log(token)
    res.send('cookie sended ')
})

app.get('/read',function(req,res){
   let data = jwt.verify(req.cookies.token,'secret');
   console.log(data)
})

app.listen(3000)