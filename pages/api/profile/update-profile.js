import nextConnect from 'next-connect';

import User from 'models/User';
import dbConnect from 'utils/dbConnect';

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
  body('username').trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phoneNumber').trim(),
  async (req, res, next) => {
    const { username, email, phoneNumber } = req.body;
    const validUsername = username === '' || /^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]/.test(username);
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    const validPhoneNumber =
      phoneNumber === '' || /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
    if (!(validUsername && validEmail && validPhoneNumber)) {
      return res.status(422).json({ message: 'Invalid Input' });
    }
    next();
  }
);

const checkExistingUsers = async (res, userId, query, value) => {
  if (value && value !== '') {
    const checkUser = await User.findOne({ [query]: value });
    if (checkUser && JSON.stringify(checkUser._id) !== JSON.stringify(userId)) {
      throw new Error(`User with that ${query} already exists`);
    }
  }
};

router.patch(async (req, res) => {
  const { id: userId, username, email, phoneNumber } = req.body;
  const parsedPhoneNumber = phoneNumber.replace(/\D/g, '');
  if (!userId) {
    console.debug('no userId');
    return res.status(422).json({ message: 'invalid input' });
  }

  let user = {};
  try {
    await dbConnect();
    user = await User.findById(userId);
    if (!user) {
      console.debug("can't find user");
      return res.status(422).json({ message: 'invalid input' });
    }
    try {
      await checkExistingUsers(res, userId, 'username', username);
      await checkExistingUsers(res, userId, 'email', email);
      await checkExistingUsers(res, userId, 'phoneNumber', parsedPhoneNumber);
    } catch (err) {
      console.warn(err);
      return res.status(409).json({ message: err.message });
    }
  } catch (err) {
    console.warn(err);
    return res.status(500).send(err);
  }

  user.email = email;
  if (username !== '') {
    user.username = username;
  }
  if (parsedPhoneNumber !== '') {
    user.phoneNumber = parsedPhoneNumber;
  }
  try {
    const newUser = await user.save();
    console.debug(newUser);
  } catch (err) {
    console.warn(err);
    return res.status(500).send(err);
  }
  res.status(200).json({ message: 'You account info has been updated sucessfully 😃' });
});

export default router;
