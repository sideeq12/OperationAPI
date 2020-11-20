const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://sideeq:"+process.env.PASS+"@cluster0.7rhnk.mongodb.net/MyAPI", {useNewUrlParser : true, useUnifiedTopology : true})

const myApischema = mongoose.Schema({
    title : String,
    Poem : String,
    Author : String
})

const MyPoem = mongoose.model("MyPoem", myApischema)


app.get("/", (req, res)=>{
   res.sendFile( __dirname +"/index.html")
})
app.post("/", (req, res)=>{
    let newPoem = new MyPoem({
        title : req.body.title,
        Poem : req.body.poem,
        Author : req.body.author
    })
    newPoem.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.sendFile(__dirname+"/success.html")
        }
    })
  
})
app.get("/request", (req,res)=>{
    MyPoem.findOne({ _id : "5fb802863b16901d48c188cc"}, (err, result)=>{
        if(err){
            console.log(err)
        }else{
          res.send(result)
        }
    })
})

app.listen(8008, ()=>{
    console.log("App running on Port 8008")
})