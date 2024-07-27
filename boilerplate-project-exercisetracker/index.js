const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//load mongoose library 
let mongoose = require('mongoose')
//connect to mongo db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/**
 * Begin of my code
 */
//documents ie, records are stored in collections(tables). For the collections we need 
//shape or structure. To define this we need to define schema, for that load schema 
const Schema = mongoose.Schema

//now we can create schema
const userSchema = new Schema({
  username: String
})

//for saving logs
const logSchema = new Schema({
  user_id : {type : String, required:true},
  description: {type : String, required:true},
  duration: {type:Number,required:true},
  date: String
})

//now with this schema, we need to create model - using the methods of model we can save
//the documents to the db
const User = mongoose.model("User",userSchema)
const Log  = mongoose.model("Log",logSchema)

//let us define for the create new user api
//we first neeed middle to parse the url
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: "false" }))
app.use(bodyParser.json())

/*********POST Users************************************* */
//POST to new user
app.post("/api/users",(req,res)=>{
  let username = req.body.username
  //create a new instance of userschema for new document
  const new_user = new User({
    username : username
  })
  //save document
  new_user.save()
  .then((data)=>{
    res.json(data)//({"username":username,"_id":data._id})
  }).catch((error)=>{
    console.error(error)
  })
})


/***************GET all users*****************************/
//GET all users
app.get('/api/users',(req,res)=>{
  // find all athletes that play tennis
  User.find()
  .then((data)=>{
    console.log(data)
    res.send(data)
  }).catch((error)=>{
    console.error(error)
  })
})

/************POST Exercises *****************************/
//POST fromt the form "/api/users/:_id/exercises"
/app.post("/api/users/:_id/exercises",(req,res)=>{

  let date = new Date().toDateString()
  if(req.body.date){
    date = new Date(req.body.date).toDateString()
  }
  const user_id = req.params._id
  const description = req.body.description
  const duration = req.body.duration
  let username = ""

//create a new instance of userschema for new document
const new_log = new Log({
  user_id : user_id,
  description: description,
  duration: duration,
  date: date
})

//find the user and get the user name
User.findById(user_id)
.then((data)=>{ username = data.username })
.catch(error=>console.error(error))

//save document
new_log.save()
.then((data)=>{
  res.json({"_id":user_id,"username":username,"date":date,"duration":duration,"description":description}) })
.catch(error=>console.error(error))


})

/********Logs********************************************/
app.get("/api/users/:_id/logs",(req,res)=>{

  const user_id = req.params._id

    let username = ""
//find the user and get the user name
User.findById(user_id)
.then((data)=>{ username = data.username })
.catch(error=>console.error(error))

Log.find({user_id: user_id})
.then((logs)=>{
  let aLogs = []
  aLogs = logs
  console.log(aLogs.length)
  res.json(logs)
})
.catch(error=>console.error(error))

})
/**
 * End of my code
 */


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
