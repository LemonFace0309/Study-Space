import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // avoid using deprecated findAndModify function from MongoDB driver for mongoose findOneAndUpdate
  mongoose.set('useFindAndModify', false);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
