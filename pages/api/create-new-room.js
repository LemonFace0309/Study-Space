import dbConnect from '../../utils/dbConnect';
import Room from '../../models/Room';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return;
  }

  const { name, email, password, friends, type } = req.body;

  if (!name || !description) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  await dbConnect();

  try {
    const room = new Room({
      name,
      description,
    });
    const result = await room.save();
    res.status(201).json({ message: 'User created!', roomId: result._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
