require('dotenv').config();

// Q1
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Q2
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);
// Q3
const createAndSavePerson = function(done) {
  const person1 = new Person({name: "Lee Kim Min", age: 23, favoriteFoods: ["cup cake", "banh trang tron", "che"]});

  person1.save(function(err, doc) {
    if (err) return console.error(err);
    done(null, doc)
  });
};
/** 4) Create many People with `Model.create()` */
// const arrayOfPeople = [
//   {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
//   {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
//   {name: "Robert", age: 78, favoriteFoods: ["wine"]}
// ];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 7) Use `Model.findById()` */
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 8) */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
/* 9)
 * findOneAndUpdate uses (conditions, update, options, callback) as arguments.
 * Don’t forget the use new option to return the updated document. By default, these methods return the unmodified object.
 */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};
/** 10) findByIdAndRemove, findOneAndRemove */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};
/* 11)
 * Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.
 */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};
/* 12)
 * yourArray.sort({ age: 1 }); // Here: 1 for ascending	order and -1 for descending order.
 * yourArray.select({ name: 0, age: 1 }); // Here: 0 means false and thus hide name property; 1 means true so age property will show.
 */
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, data) {
    if(err) return console.log(err)
    done(null, data)
  });
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
