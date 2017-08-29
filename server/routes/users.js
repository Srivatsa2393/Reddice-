import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

router.post('/', (req, res) => {
  setTimeout(() => {
    //console.log(req.body);
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }
  }, 5000);
});

export default router;
