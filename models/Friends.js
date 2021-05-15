import mongoose from 'mongoose'

const FriendsSchema = mongoose.Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: Number,
      enums: [
        0,    //'add friend',
        1,    //'requested',
        2,    //'friends'
      ]
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Friends', FriendsSchema)