const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wizardSchemaOptions = { // not mandatory; can specify whether I want virtuals (e.g. 'title') to be included by default
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    } // apparently toJSON and toObject are pretty much the same
};
const wizardSchema = new Schema({
    name: 'String',
    alignment: 'String',
    race: 'String',
    spells: [{type: Schema.Types.ObjectId, ref: 'Spell'}]
}, wizardSchemaOptions);

wizardSchema.virtual('title').get(function() { // virtual props don't get persisted, but can be used throughout the application all the same
    return this.name + ' the ' + this.alignment;
});

// handy example of how virtuals can be configured to act as setters too
// personSchema.virtual('fullName').
// get(function() { return this.name.first + ' ' + this.name.last; }).
// set(function(v) {
//     this.name.first = v.substr(0, v.indexOf(' '));
//     this.name.last = v.substr(v.indexOf(' ') + 1);
// });
//axl.fullName = 'William Rose'; // Now `axl.name.first` is "William"

const spellSchema = new Schema({
    name: 'String',
    school: 'String',
    manaCost: 'Number',
    wizards: [{type: Schema.Types.ObjectId, ref: 'Wizard'}]
});

// NOTE: many-to-many-relation
// NOTE: this is an example where two schemas reference one another
const Spell = mongoose.model('Spell', spellSchema);
const Wizard = mongoose.model('Wizard', wizardSchema);

// simulating cascade updating using hooks (not a realistic scenario)
Wizard.schema.post('save', function(wizard) {
    const spellIds = wizard.spells;
    if(!Array.isArray(spellIds) || spellIds.length < 1) return;
    // NOTE: use $push on array properties (don't have to overwrite them); also, 'where' can be called directly off of the model as shown below
    Spell.where('_id').in(spellIds).updateMany({$push: {'wizards': wizard._id}}, function(err, result) {}); // this callback is needed even if empty (update does not get triggered otherwise)
    // TODO experiment with different syntax for above query (update)

});

Spell.schema.post('save', function(spell) {
    const wizardIds = spell.wizards;
    if(!Array.isArray(wizardIds) || wizardIds.length < 1) return;
    // NOTE: use $push on array properties (don't have to overwrite them); also, 'where' can be called directly off of the model as shown below
    Wizard.where('_id').in(wizardIds).updateMany({$push: {'spells': spell._id}}, function(err, result) {}); // this callback is needed even if empty (update does not get triggered otherwise)

});

const methods = {};

methods.wizardTest = function(callback) {
    Wizard.findOne({}, function(err, result) {
        callback(result.title);
    });
};

methods.customQuery = function(callback) {

};

methods.fetchWizard = function(id, callback) {
    // Wizard.find({_id: id}, function(err, result) {
    //     if(err) throw err;
    //     callback(result);
    // });
    Wizard.find({_id: id}).populate('spell').exec(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAllWizards = function(callback) {
    // Wizard.find({}, function(err, result) {
    //     if(err) throw err;
    //     callback(result);
    // });

    // second arg in populate refers to projection (which fields to include/exclude)
    Wizard.find().populate('spells', {name: 1, _id: 0}).exec(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

// NOTE: mongoose.Types.ObjectId.isValid() should be used to validate object IDs before using them in queries; mis-formed ObjectIds cause an exception to be thrown
methods.fetchWizardsBySpell = function(spellId, callback) {
    if(!mongoose.Types.ObjectId.isValid(spellId)) throw spellId + ' has incorrect ObjectId format'; // TODO handle this better
    // below .select('-spells') part is a different way of writing projection; in this particular case I want to exclude the 'spells' property from each wizard when fetching it
    Wizard.find().where("spells").in(spellId).select('-spells').exec(function(err, result) { // apparently $in works when checking whether an array property contains a specific value and not just whether a non-array property matches one of the values from passed array
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

methods.updateWizard = function(wizard, callback) {
    Wizard.update(wizard, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchSpell = function(id, callback) {
    Spell.find({_id: id}).populate('wizards').exec(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.fetchAllSpells = function(callback) {
    Spell.find().populate('wizards').exec(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};


methods.saveSpell = function(spell, callback) {
    const spellToSave = new Spell(spell);
    spellToSave.save(function(err, result) {
        if(err) throw err;
        callback(result);
    });
};

methods.updateSpell = function(spell, callback) {
    Spell.update(spell, function(err, result) {
        if(err) throw err;
        callback(result);
    });
};


module.exports = methods;