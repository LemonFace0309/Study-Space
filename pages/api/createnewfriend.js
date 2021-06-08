import dbConnect from '../../utils/dbConnect'
import User from '../../models/User'
import Friends from '../../models/Friends'

export default async (req, res) => {
  const { user1name, user1email, user2name, user2email } = req.body

  if (!user1name || !user1email || !user2name || !user2email) {
    return res.status(422).json({ message: 'Invalid input' })
  }

  await dbConnect()

  try {
    const user1 = await User.findOne({ name: user1name, email: user1email })
    const user2 = await User.findOne({ name: user2name, email: user2email })
  
    let status = 1
    const currentFriend = await Friends.findOne({
      requester: user2._id,
      recipient: user1._id,
      requester_email: user2.email,
      recipient_email: user1.email,
    })
    if (currentFriend) {
      status = 2;
      currentFriend.status = status
      currentFriend.upsert = true
      currentFriend.new = true
      currentFriend.save()
      return res.status(200).json({ success: true, data: { currentFriend } })
    }

    const friend = await Friends.findOneAndUpdate(
      {
        requester: user1._id,
        recipient: user2._id,
        requester_email: user1.email,
        recipient_email: user2.email,
      },
      { $set: { status: status } },
      { upsert: true, new: true }
    )


    res.status(200).json({ success: true, data: { friend } })
  } catch (err) {
    res.status(500).json({ success: false })
  }
}
