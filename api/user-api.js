const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.post('/register', function(req, res) {
    const user = req.body.user;

    const newUser = new User(user);
    newUser.setPassword(user.password);
    newUser.save().then(function(result) {
        res.json({user: result.toAuthJSON()});
    });
});

router.post('/login', function(req, res, next) {
    const user = req.body.user;

    if(!user.email || !user.password) {
        return res.status(422).send({errors: 'Email or password is missing'});
    }

    return passport.authenticate('local', {session: false}, function(err, passportUser, info) {
        if(err) throw err;

        if(passportUser) {
            const currentUser = passportUser;
            currentUser.token = passportUser.generateJWT();
            return res.json({user: currentUser.toAuthJSON()});
        }
        return res.status(400).json({error: 'You are NOT PREPARED!'});
    })(req, res, next);

});

module.exports = router;