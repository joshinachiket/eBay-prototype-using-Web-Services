var passport = require('passport'),
    localStrategies = require('passport-local'),
    User = require('../models/User');


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new localStrategies({usernameField: 'email'},function(email, password, done){
  User.findOne({email: email}, function(err, user){
    if(err)
      return err;
    user.comparePassword(password, function(err, isMatch){
      if(isMatch)
        return done(null,user);
      else
        return done(null,false,{message: "Invalid password and email"});
    });
  });
}))