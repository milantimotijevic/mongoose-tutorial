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
                return done(user, false, {errors: "missing email or pw"});
            }
            return done(user, null);
        }).catch(done);
}));
