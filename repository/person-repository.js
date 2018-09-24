const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personSchema = new Schema({
    name: 'String',
    age: 'Number',
    address: {type: Schema.Types.ObjectId, ref: 'Address'}
});

// ensure that when fetching a person its 'address' prop gets populated with the actual object, rather than just ObjID
// personSchema.pre('find', function() {
//     /*
//     NOTE: population can be done manually inside the query; populating through pre-hook is a bad idea if I intend:
//     1) To do the same on the other model,
//     2) To manually populate this model within another model
//     Will comment this call out as needed
//      */
//     this.populate('address');
// });

const addressSchema = new Schema({
    streetName: 'String',
    streetNumber: 'String',
    resident: {type: Schema.Types.ObjectId, ref: 'Person'}
});

// apparently circular population causes stack overflow; either comment out this pre method, or person's pre method
// addressSchema.pre('find', function() {
//     this.populate('resident');
// });


// NOTE: one-to-one-relation
// NOTE: this is an example where two schemas reference one another

const Address = mongoose.model('Address', addressSchema, 'addresses');
const Person = mongoose.model('Person', personSchema, 'persons');
// TODO extract models into separate files

const methods = {};

methods.personTest = function(callback) {

};

methods.customQuery = function(callback) {

};

methods.fetchPerson = function(id, callback) {
    Person.find({_id: id}, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAllPersons = function(callback) {
    // Person.find({}, function(err, result) {
    //     if(err) throw err;
    //     callback(result);
    // });
    // manually populating address fields; the fact that I'm not populating through pre hook allows me to also populate person (resident) when fetching addresses
    Person.find().populate('address').exec(function(err, result) {
        callback(result);
    });
};

methods.savePerson = function(person, callback) {
    // const addressToSave = new Address(person.address);
    // person.address = addressToSave;
    const personToSave = new Person(person);
    personToSave.save(function(err, result) {
        if(err) throw err;
        // addressToSave.resident = result._id; // ensuring bi-directional one-to-one; deliberately not putting object into object bi-directionally (to avoid stack overflow)
        // addressToSave.save(); // not saving the address would cause person to reference a nonexistent obj in DB
        callback(result);
    });
};

methods.updatePerson = function(person, callback) {
    // update and updateOne will use $set under the hood (aka only change properties that were different, it does NOT delete the omitted ones); if you want to overwrite the object, use replaceOne instead
    Person.update(person, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAddresses = function(callback) {
    // Address.find({}, function(err, result) {
    //     callback(result);
    // });
    // manually populating resident field
    Address.find().populate('resident').exec(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.saveAddress = function(address, callback) {
    const addressToSave = new Address(address);
    addressToSave.save(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};




module.exports = methods;