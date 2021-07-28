import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import Friends from '../../models/Friends';

export default async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const { name, email } = req.query;

    if (!name || !email) {
      return res.status(422).json({ message: 'Invalid input' });
    }

    await dbConnect();

    try {
      const user = await User.findOne({ name: name, email: email });
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};
