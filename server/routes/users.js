import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcryptjs';
//import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  })
    .fetch()
    .then(user => {
      if (user) {
        if (user.get('username') === data.username) {
          errors.username = 'There is a user with such username';
        }
        if (user.get('email') === data.email) {
          errors.email = 'There is a user with such email';
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
    });

  //return Promise;
}

router.get('/:identifier', (req, res) => {
  User.query({
    select: ['username', 'email'],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  })
    .fetch()
    .then(user => {
      res.json({ user });
    });
});

router.post('/', (req, res) => {
  //console.log(req.body);
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      //create a user
      //encrypt password
      //res.json({ success: true });
      const { username, password, email, timezone } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.forge(
        {
          username,
          timezone,
          email,
          password_digest
        },
        { hasTimeStamps: true }
      )
        .save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;
