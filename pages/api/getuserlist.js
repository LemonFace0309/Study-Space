

import dbConnect from '../../utils/dbConnect'
import User from '../../models/User'
import Friends from '../../models/Friends'

export default async (req, res) => {
  const { name, email } = req.query

  if (( !name || !email )) {
    return res.status(422).json({ message: 'Invalid input' })
  }

  await dbConnect()

  try {
    const requester = await User.findOne({ name: name, email: email })
    const users = await User.find({})
    const friends = await Friends.find({})
    res.status(200).json({ success: true, users: users, friends: friends })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
