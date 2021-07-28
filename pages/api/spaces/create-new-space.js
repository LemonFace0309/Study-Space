import dbConnect from '../../../utils/dbConnect';
import Spaces from '../../../models/Spaces';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return;
  }

  const { name, description, isActive, participants, roomId } = req.body;

  if (!name || !description) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  await dbConnect();

  try {
    const room = new Spaces({
      name,
      description,
    });
    const result = await room.save();
    res.status(201).json({ message: 'Space created!', roomId: result._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
