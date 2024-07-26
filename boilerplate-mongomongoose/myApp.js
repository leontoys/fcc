require('dotenv').config();


let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//create schema
const Schema = mongoose.Schema;

//create person schema - this is like a structure in SQL - it defines the shape of the document - record/row
//documents will be stored in collections - similar to tables in SQL
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

//this is model - this can be used to create documents of this strucute
const Person = mongoose.model("Person", personSchema);

/********************************************************************************** */

//let Person;

const createAndSavePerson = (done) => {
  //create a new instance of the person model - this is a document
  const alanTuring = new Person({
    name : "Bob",
    age : 40,
    favoriteFoods : ["idli","dosa"]
  })

  //save the document
  alanTuring.save((err,data)=>{
    if(err){
      return console.error(err)
    }
  //this document we need to save to the database

  done(null, data);   
  
  console.log(data)
  })


};

arrayOfPeople = [{name : "Alan",age : 40, favoriteFoods : ["idli","dosa"]},
                 {name : "Bob", age : 50, favoriteFoods : ["sambar","chutney"]}
]

const createManyPeople = (arrayOfPeople, done) => {

//use model.create
  Person.create(arrayOfPeople,(err,data)=>{
    if(err){
      return console.error(err)
    }

    done(null,data)
  })

};

const findPeopleByName = (personName, done) => {

  Person.find({name:personName},(err,data)=>{
    if(err){
      return console.err(err)
    }
    console.log(data)
    done(null ,data);
  })


};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err){
      return console.err(err)
    }
    done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=>{
    if(err){
      return console.err(err)
    }
    done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

    console.log(personId)
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
      console.log(person)
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove({_id:personId},(err,data)=>{
    if(err) return console.log(err);
    done(null , data);
  })


};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove},(err,data)=>{
    done(null , data);
  })


};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch})               // find all users
  .sort({ name : 1 })      // sort ascending by firstName
  .limit(2)                   // limit to 10 items
  .select({ age: false }) // select firstName only
  .exec((err,data)=>{
    if(err) return console.log(err);
    done(null , data);
  })                      // execute the query


};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
