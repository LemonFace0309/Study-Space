import nextConnect from 'next-connect';
import multer from 'multer';
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

import dbConnect from '../../../utils/dbConnect';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage();

const router = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

router.use(multer({ storage }).single('image'));

router.post(async (req, res) => {
  await dbConnect();

  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: req.file.buffer,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }

    res.status(200).json({ data });
  });
});

export default router;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
