// const fs = require('node:fs');
// const http = require('http');

// const server = http.createServer(function(req,res){
//     console.log("Hello world ")
    
// })

// server.listen(3000);

// fs.writeFile('create.txt','Hello this is created usign the follwing code',function(err){
//     if(err) console.log(err);
//     else console.log("written successfully")
// }



const express  = require('express')
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req,res,next){
    // res.send("middle Ware challa ")
    console.log("Middleware running")
    next();
})

app.get('/',function(req,res){
    res.send('Hello World this is response from server')
})

app.get('/profile',function(req,res,next){
    return next(new Error("Something Went wrong "))
})


app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("something broken")
})

app.listen(3000)