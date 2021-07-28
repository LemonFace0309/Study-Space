import dbConnect from '../../../utils/dbConnect';
import Space from '../../../models/Spaces';
import User from '../../../models/User';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'GET') {
    return;
  }

  const { spaceId } = req.body;

  if (!name || !description) {
    return res.status(422).json({ message: 'Invalid input' });
  }
  await dbConnect();

  try {
    const result = await Space.findOne({ spaceId });
    res.status(201).json({ message: 'Space found!', data: { _id: result._id } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
