require('dotenv').config()
let bodyParser = require('body-parser')

let express = require('express');
let app = express();

//console.log("Hello World")

/* app.get("/",(req,res)=>{
    res.end("Hello Express")
})
 */

//middleware-specific-to-get
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

//in index.html we are calling /public/style.css
//app.use loads it as below
app.use("/public",express.static(__dirname+"/public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
    //res.end()
})

app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message":"HELLO JSON"})
    }
    else{
        res.json({"message": "Hello json"})
    }

})

app.get('/now',(req,res,next)=>{
    req.time = new Date().toString()
    console.log(req.time)
    next()
},(req,res)=>{
    res.json({"time":req.time})
})


app.get('/:word/echo',(req,res)=>{
    res.json({"echo":req.params.word})
})

/* app.get('/name',(req,res)=>{
    console.log(req.query.first)
    res.json({"name":`${req.query.first} ${req.query.last}`})
}) */


//for url
app.use(bodyParser.urlencoded({extended:false}))

//for json    
app.use(bodyParser.json())

app.route('/name').get((req,res)=>{
    res.json({"name":`${req.query.first} ${req.query.last}`})
}).post((req,res)=>{
    //same as above - get request - bodyparser parses and gives
    //otherwise we won't be able to read req.body
    res.json({"name":`${req.body.first} ${req.body.last}`})
})




































 module.exports = app;
