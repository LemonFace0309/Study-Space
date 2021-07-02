const bcrypt = require('bcrypt');

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'POST' && method !== 'PATCH') {
    return;
  }

  const { id, currentPassword, newPassword1, newPassword2 } = req.body;

  if (newPassword1 !== newPassword2) {
    return res.status(422).json({ message: "Passwords don't match." });
  }

  await dbConnect();
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user.password) {
      return res.status(409).json({
        message: 'Cannot update password for users signed up through third party services like Google or Facebook.',
      });
    }
    const validCurrentPassword = await bcrypt.compare(currentPassword, user?.password);
    console.log(validCurrentPassword);
    if (!validCurrentPassword) {
      return res.status(422).json({ message: 'Invalid current password.' });
    }
    const newHashedPassword = await bcrypt.hash(newPassword2, 12);
    user.password = newHashedPassword;
    const result = await user.save();
    return res.status(204).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};
