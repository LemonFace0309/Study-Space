const bcrypt = require('bcrypt');

import dbConnect from 'utils/dbConnect';
import User from 'models/User';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return;
  }

  const { name, email, password, friends, type } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  await dbConnect();

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(422).json({ message: 'User with that email already exists 😱' });
    }

    const user = new User({
      name,
      email,
      password: hashedPw,
      friends,
      type: type,
    });
    const result = await user.save();
    return res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
