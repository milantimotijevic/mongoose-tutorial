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
    manaCost: 'Number',
    wizards: [{type: Schema.Types.ObjectId, ref: 'Wizard'}]
});

// NOTE: many-to-many-relation
// NOTE: this is an example where two schemas reference one another
const Spell = mongoose.model('Spell', spellSchema);
const Wizard = mongoose.model('Wizard', wizardSchema);

// simulating cascade updating using hooks
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
    Wizard.find().populate('spells').exec(function(err, result) {
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