"use strict";

var express = require("express");

var mongoose = require("mongoose");

var passport = require("passport");

var _require = require("../config/keys"),
    mongoURI = _require.mongoURI;

var users = require("./routes/api/users");

var tweets = require("./routes/api/tweets");

var _ = require("../config/passport");

var app = express();
var port = process.env.PORT || 8080;
var db = mongoURI;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('connected to mongoDB');
})["catch"](function (err) {
  console.log(err);
});
app.use(passport.initialize());

_(passport);

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.listen(port, function () {
  return console.log("Server is running on port ".concat(port));
});