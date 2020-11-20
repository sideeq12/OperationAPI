const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://sideeq:sideeq12@cluster0.7rhnk.mongodb.net/myapiDB", {useNewUrlParser : true, useUnifiedTopology : true})

const myApischema = mongoose.Schema({
    title : String,
    Poem : String,
    Author : String
})

const MyPoem = mongoose.model("MyPoem", myApischema)


app.get("/", (req, res)=>{
   res.sendFile( __dirname +"/index.html")
})

app.listen(8008, ()=>{
    console.log("App running on Port 8008")
})