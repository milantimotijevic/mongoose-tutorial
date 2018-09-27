const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done) {
        User.findOne({email}).then(function(user) {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, {errors: "missing email or pw"});
            }
            return done(null, user);
        }).catch(done);
}));
