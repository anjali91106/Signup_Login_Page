const joi = require('joi');

const userSchema = joi.object({
  Name: joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be under 30 characters'
  }),
  Email: joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid'
  }),
  password: joi.string().min(6).max(20).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must not exceed 20 characters'
  }),
});

const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    req.flash('error', error.details[0].message); // Flash the validation error
    return res.redirect('/user/signup'); // Redirect to signup page
  }

  next(); // Continue to signUp controller if no error
};

module.exports = userValidation;