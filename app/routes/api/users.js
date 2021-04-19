const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../../models/User.js");
const keys = require("../../../config/keys");
const jsonWebToken = require("jsonwebtoken");
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.get("/test", (req, res) => res.json({msg: "This is the users router"}));

router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  
  if (!isValid)
    return res.status(400).json(errors);
  
  User
    .findOne({ handle: req.body.handle })
    .then(user => {
      if (user){
        errors.handle = "User already exists";
        return res
          .status(400)
          .json(errors);
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = {id: user.id, handle: user.handle};

                jsonWebToken.sign(
                  payload,
                  keys.secretOrKey, 
                  {expiresIn: 3600},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: `Bearer ${token}`
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
});

router.post('/login', (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid)
    return res.status(400).json(errors);

  const {email, password} = req.body;

  User.findOne({email})
    .then(user => {
      if (!user){
        errors.email = "User does not exist";
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch){
            const payload = {id: user.id, email: user.email};

            jsonWebToken.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                })
              }
            );
          }
          else 
            return res.status(400).json({password: 'Incorrect password'});
        })
    });
});

router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {id, handle, email} = req.user;
    res.json({id, handle, email});
  }
);

module.exports = router;