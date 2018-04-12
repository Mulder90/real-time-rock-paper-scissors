const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = express.Router();

const isEmailValid = email => {
  return (
    typeof email === 'string' &&
    email.trim().length !== 0 &&
    validator.isEmail(email)
  );
};

const isUsernameValid = username => {
  return typeof username === 'string' && username.trim().length !== 0;
};

const isPasswordValid = password => {
  return typeof password === 'string' && password.trim().length >= 8;
};

const validateSignupForm = payload => {
  const errors = {
    email: '',
    password: '',
    name: ''
  };
  let isFormValid = true;
  let message = '';

  if (!payload) {
    message = 'Please retry.';
    isFormValid = false;
  } else {
    if (!isEmailValid(payload.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }

    if (!isPasswordValid(payload.password)) {
      isFormValid = false;
      errors.password = 'Password must have at least 8 characters.';
    }

    if (!isUsernameValid(payload.name)) {
      isFormValid = false;
      errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

const validateLoginForm = payload => {
  const errors = {
    email: '',
    password: ''
  };
  let isFormValid = true;
  let message = '';

  if (!payload) {
    message = 'Please retry.';
    isFormValid = false;
  } else {
    if (!isEmailValid(payload.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }

    if (!isPasswordValid(payload.password)) {
      isFormValid = false;
      errors.password = 'Password must have at least 8 characters.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('localLogin', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully logged in.',
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('localSignup', err => {
    const MONGO_DUPLICATION_ERROR = 11000;
    if (err) {
      if (
        err.name === 'BulkWriteError' &&
        err.code === MONGO_DUPLICATION_ERROR
      ) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email:
              'This email is already taken. Please provide a different one.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfull signed up!.'
    });
  })(req, res, next);
});

module.exports = router;
