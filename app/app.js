const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const {mongoURI} = require("../config/keys");
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const _ = require("../config/passport");

const app = express();
const port = process.env.PORT || 8080
const db = mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { console.log('connected to mongoDB'); })
  .catch((err) => { console.log(err); });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.use(passport.initialize());
_(passport);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));