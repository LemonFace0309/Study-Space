import nextConnect from 'next-connect';
import multer from 'multer';

import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

const { body } = require('express-validator');
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

// not sure if this is gonna work
// router.use(
//   body('username').not().isEmpty().trim().escape(),
//   body('email').isEmail().normalizeEmail(),
//   body('phoneNumber').trim()
// );

// validating input data
router.use((req, res, next) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  const { username, email, phoneNumber } = reqBody;
  const validUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const validPhoneNumber = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
  if (!(validUsername && validEmail && validPhoneNumber)) {
    return res.status(422).json({ message: 'Invalid Input' });
  }
  next();
});

router.patch(async (req, res) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  const { username, email, phoneNumber } = reqBody;
  const userId = reqBody?.id;
  if (!userId) {
    return res.status(422).json({ message: 'invalid input' });
  }

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

  const saveTextData = async () => {
    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    try {
      await user.save();
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  if (myFile && myFile !== []) {
    s3.upload(params, async (error, data) => {
      if (error) {
        res.status(500).send(error);
      }
      user.image = data.Location;
      await saveTextData();
      console.debug(user);
      res.status(200).json({ data });
    });
  } else {
    await saveTextData();
    res.status(200).json({ message: 'user sucessfully updated' });
  }
});

export default router;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
