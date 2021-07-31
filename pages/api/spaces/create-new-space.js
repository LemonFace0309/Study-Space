import dbConnect from 'utils/dbConnect';
import Space from 'models/Spaces';

export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { name, description, isActive, participants, music, spaceId } = req.body;

    if (!name || !description || !isActive || !participants || !spaceId) {
      return res.status(422).json({ message: 'Invalid input' });
    }
    await dbConnect();

    try {
      const space = new Space({
        name,
        description,
        music,
        spaceId,
        participants,
        isActive,
      });

      const result = space.save();
      return res.status(201).json({ message: 'Space created!', _id: result._id });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (method === 'GET') {
    const { spaceId } = req.body;

    if (!spaceId) {
      return res.status(422).json({ message: 'Invalid input' });
    }
    await dbConnect();

    try {
      const result = await Space.findOne({ spaceId });
      return res.status(201).json({ message: 'Space found!', data: { _id: result._id } });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};
