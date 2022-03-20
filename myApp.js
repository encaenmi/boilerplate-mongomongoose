require('dotenv').config();
const mongoose = require('mongoose');
const mongoUri = process.env['MONGO_URI'];
const { Schema } = mongoose;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// creating schema for second challenge
const personSchema = new Schema({
	name: {type: String, required: true},
	age: Number,
	favoriteFoods: [String]
})
// create model from schema
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
	let mister = new Person({name: "Mister", age: 2, favoriteFoods: ["pollo", "cacahuata"]});

	mister.save(function(err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

// array for creating many people
const arrayOfPeople = [
	{name: "person1", age: 20, favoriteFoods: ["kk"]},
	{name: "person2", age: 30, favoriteFoods: ["menudo"]}
];

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function(err, people) {
		if (err) return console.error(err);
		done(null, people);
	})
};

const findPeopleByName = (personName, done) => {
	Person.find({name: personName}, function(err, foundPerson) {
		if (err) return console.error(err);
		done(null, foundPerson);
	})
};

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods: food}, function(err, foundPerson) {
		if (err) return console.error(err);
		done(null, foundPerson);
	})
};

const findPersonById = (personId, done) => {
	Person.findById({_id: personId}, function(err, foundPerson) {
		if(err) return console.error(err);
		done(null, foundPerson);
	})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
	
	// find
	Person.findById({_id: personId}, (err, person) => {
		if(err) return console.error(err);
		
		// edit
		person.favoriteFoods.push(foodToAdd);

		// save
		person.save((err, updatedPerson) => {
			if(err) return console.error(err);
			done(null, updatedPerson);
		})
		
	})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

	Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
		if(err) return console.error(err);
		done(null, updatedPerson);
	})
	
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, person) => {
		if(err) return console.error(err);
		done(null, person);
	})
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

	Person.remove({name: nameToRemove}, (err, response) => {
		if(err) return console.error(err);
		done(null, response);
	})

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

	Person.find({favoriteFoods: foodToSearch})
		.sort({name: 1})
		.limit(2)
		.select({age: 0})
		.exec((err, people) => {
			if(err) return console.error(err);
			done(null, people);
		})
	
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
