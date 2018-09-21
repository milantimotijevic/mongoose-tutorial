const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: 'String',
    color: 'String'
});
const Cat = mongoose.model('Cat', schema);

const methods = {};

methods.saveCoolestCatInTheWorld = function(callback) {
    const cat1 = new Cat({name: "Maji Beji", color: "white"});
    cat1.save(function(err, result) {
        callback(result);
    });
};

module.exports = methods;
