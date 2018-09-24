const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wizardSchema = new Schema({
    name: 'String',
    alignment: 'String',
    race: 'String',
    spells: [{type: Schema.Types.ObjectId, ref: 'Spell'}]
});

const spellSchema = new Schema({
    name: 'String',
    school: 'String',
    manaCost: 'Number'
});


// NOTE: one-to-many-relation
// NOTE: this is an example where two schemas reference one another

const Wizard = mongoose.model('Wizard', wizardSchema);

const methods = {};

methods.wizardTest = function(callback) {

};

methods.customQuery = function(callback) {

};

methods.fetchWizard = function(id, callback) {
    Wizard.find({_id: id}, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAllWizards = function(callback) {
    Wizard.find({}, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};


methods.saveWizard = function(wizard, callback) {
    const wizardToSave = new Wizard(wizard);
    wizardToSave.save(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};


module.exports = methods;