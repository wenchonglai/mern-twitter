const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput({handle, email, password, password2}){
  let errors = {};

  handle = validText(handle) ? handle : '';
  email = validText(email) ? email : '';
  password = validText(password) ? password : '';
  password2 = validText(password2) ? password2 : '';

  if (Validator.isEmpty(handle))
    errors.handle = 'Handle field is required'
  else if (!Validator.isLength(handle, { min: 2, max: 30 }))
    errors.handle = 'Handle must be between 2 - 30 characters';

  if (Validator.isEmpty(email))
    errors.email = 'Email field is required'
  else if (!Validator.isEmail(email))
    errors.email = 'Email is invalid';

  if (Validator.isEmpty(password))
    errors.password = 'Password field is required'
  else if (!Validator.isLength(password, {min: 6, max: 30}))
    errors.password = 'Password must be at least 6 characters';

    if (Validator.isEmpty(password2))
    errors.password2 = 'Confirm Password field is required'
  else if (!Validator.equals(password, password2))
    errors.password2 = 'Password must match';

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}