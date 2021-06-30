const bcrypt = require('bcrypt');

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { hashPassword } from '../../../utils/password';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'POST' || method !== 'PATCH') {
    return;
  }

  const { id, currentPassword, newPassword1, newPassword2 } = req.body;

  if (newPassword1 !== newPassword2) {
    return res.status(422).json({ message: "passwords don't match" });
  }

  await dbConnect();
  try {
    const user = await User.findById(id);
    const validCurrentPassword = bcrypt.compare(currentPassword, user.password);
    if (!validCurrentPassword) {
      return res.status(422).json({ message: 'invalid current password' });
    }
    const newHashedPassword = await hashPassword(newPassword2);
    user.password = newHashedPassword;
    const result = await user.save();
    return res.status(204).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};
