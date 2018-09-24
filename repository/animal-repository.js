const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: 'String',
    specie: 'String',
    alive: 'Boolean',
    habitat: 'String',
    age: 'Number'
});

schema.methods.announceSuccessfulSave = function() {
    const announcement = 'Successfully saved Animal with name: ' + this.name + ', specie: ' + this.specie + ', alive: ' +
        this.alive + ', habitat: ' + this.habitat + ' and age: ' + this.age;
    console.log(announcement);
};

schema.statics.findBySpecie = function(specie, callback) {
    return this.find({specie}, callback); // {specie} is short for {specie: specie}
};

const Animal = mongoose.model('Animal', schema);

const methods = {};

methods.animalTest = function(callback) {
    Animal.find().where('name').equals('Dragica').select('name habitat').exec(function(err, result) {
        callback(result);
    });
};

methods.customQuery = function(callback) {
    Animal.find().where('name').equals('Dragica').select('name habitat').exec(function(err, result) {
        callback(result);
    });
};

methods.fetchAnimal = function(id, callback) {
    Animal.find({_id: id}, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAllAnimals = function(callback) {
    Animal.find({}, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAnimalsBySpecie = function(specie, callback) {
    // findBySpecie is model's static method declared above
    Animal.findBySpecie(specie, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.saveAnimal = function(animal, callback) {
    const animalToSave = new Animal(animal);
    animalToSave.save(function(err, result) {
        if(err) throw err;
        result.announceSuccessfulSave();
        callback(result);
    });
};


module.exports = methods;