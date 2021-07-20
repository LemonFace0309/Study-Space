import nextConnect from 'next-connect';
import multer from 'multer';

import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage();

const router = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

router.use(multer({ storage }).single('image'));

router.patch(async (req, res) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  const userId = reqBody?.id;
  if (!userId) {
    return res.status(422).json({ message: 'invalid input' });
  }

  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  let user = {};
  try {
    await dbConnect();
    user = await User.findById(userId);
    if (!user) {
      return res.status(422).json({ message: 'invalid input' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  console.debug(user);

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    user.image = data.Location;
    try {
      await user.save();
    } catch (err) {
      return res.status(500).send(err);
    }
    console.debug(user);
    res.status(200).json({ data });
  });
});

export default router;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
