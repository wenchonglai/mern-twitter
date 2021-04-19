const {Strategy, ExtractJwt} = require("passport-jwt");
const mongoose = require("mongoose");

const keys = require("./keys");

const User = mongoose.model("User");
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

console.log(options.secretOrKey, keys.secretOrKey);

module.exports = function(passport){
  passport.use(new Strategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => done(null, user || false))
      .catch(err => console.log(err));
  }));
}