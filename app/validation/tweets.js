const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTweetInput({text}){
  const errors = {};

  text = validText(text) ? text : '';
  if (Validator.isEmpty(text))
    errors.text = 'Text field is required'
  else if (!Validator.isLength(text, {min: 5, max: 140}))
    errors.text = 'Tweet must be between 5 and 140 characters';

  return {
    errors, 
    isValid: Object.keys(errors).length === 0
  }
}