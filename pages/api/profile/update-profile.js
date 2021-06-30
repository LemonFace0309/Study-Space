import nextConnect from 'next-connect';

import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

const { body } = require('express-validator');

const router = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// sanitizing and validating input data
router.use(
  body('username').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phoneNumber').trim(),
  (req, res, next) => {
    const { username, email, phoneNumber } = req.body;
    const validUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    const validPhoneNumber = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
    if (!(validUsername && validEmail && validPhoneNumber)) {
      return res.status(422).json({ message: 'Invalid Input' });
    }
    next();
  }
);

router.patch(async (req, res) => {
  const { id: userId, username, email, phoneNumber } = req.body;
  if (!userId) {
    return res.status(422).json({ message: 'invalid input' });
  }

  let user = {};
  try {
    await dbConnect();
    user = await User.findById(userId);
    if (!user) {
      return res.status(422).json({ message: 'invalid input' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  console.debug(user);

  user.username = username;
  user.email = email;
  user.phoneNumber = phoneNumber;
  try {
    await user.save();
  } catch (err) {
    return res.status(500).send(err);
  }
  res.status(200).json({ message: 'user sucessfully updated' });
});
