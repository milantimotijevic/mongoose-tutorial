const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: 'String',
    color: 'String'
});

// apparently these methods can only be called when saving an entry, NOT when fetching it
schema.methods.introduce = function() {
    const intro = 'I am ' + this.name + ' and my color is ' + this.color;
    console.log(intro);
};
const Cat = mongoose.model('Cat', schema);

const methods = {}; //used with module.export (for convenience)

methods.fetchCat = function(id, callback) {
    Cat.find({_id: id}, function(err, result) {
        callback(result);
    });
};

methods.fetchAllCats = function(callback) {
    Cat.find({}, function(err, result) {
        callback(result);
    });
};

methods.saveCat = function(cat, callback) {
    const catForSaving = new Cat(cat);
    catForSaving.save(function(err, result) {
        result.introduce(); // this method was saved in the schema earlier
        callback(result);
    });
};

module.exports = methods;
