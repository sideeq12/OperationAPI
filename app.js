const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
require('dotenv').config()

const app = express();
app.use(express.static('body'))
app.use(bodyParser.urlencoded({extended : true}))
app.set("view engine", "ejs")

mongoose.connect("mongodb+srv://sideeq:"+process.env.PASS+"@cluster0.7rhnk.mongodb.net/MyAPI", {useNewUrlParser : true, useUnifiedTopology : true})

const myApischema = mongoose.Schema({
    title : String,
    Poem : String,
    Author : String
})

const MyPoem = mongoose.model("MyPoem", myApischema)


app.get("/write", (req, res)=>{
   res.render("index")
})
app.get("/", (req,res)=>{
    res.render("Poems")
})
app.post("/write", (req, res)=>{
    let newPoem = new MyPoem({
        title : req.body.title,
        Poem : req.body.poem,
        Author : req.body.author
    })
    newPoem.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.render("success")
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
app.get("/request/:userText", (req,res)=>{
    MyPoem.find({title : req.params.userText}, (err, result)=>{
        if(!err){
            if(result){
                    res.send(result)
            }else{
                res.send("No Article found with this title")
            }
        }else{
            res.send(err +"Is the issue with the API request")
        }
    })
})

app.get("/request/author/:userText", (req, res)=>{
    console.log(req.params.userText)
    MyPoem.find({Author :req.params.userText}, (err, result)=>{
        if(!err){
            if(result){
                res.send(result)
            }else{
                res.send("There is no article written by the specified author")
            }
        }else{
            res.send("there's an error with the connection string")
        }
    })
})

app.listen( process.env.PORT ||8008, ()=>{
    console.log("App running on Port 8008")
})