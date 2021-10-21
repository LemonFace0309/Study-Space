import nextConnect from 'next-connect';
import multer from 'multer';

import User from 'models/User';

const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

/**
 * @todo: Change storage option. Memory storage is not scalable for large files.
 */
const storage = multer.memoryStorage();

const router = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

router.use(multer({ storage }).array('files'));

router.post(async (req, res) => {
  const data = [];
  const length = req.files.length;
  let success = false;

  const uploadFile = (data, file) => {
    const myFile = file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (error, resData) => {
      if (error) {
        return res.status(500).send(error);
      }
      data.push({ name: file.originalname, data: resData });
      if (data.length == length) {
        success = true;
        return res.status(200).json({ data });
      }
    });
  };

  for (const file of req.files) {
    uploadFile(data, file);
  }

  setTimeout(() => {
    if (!success) return res.status(500).json({ error: 'Timeout: Unable to upload files' });
  }, 4800);
});

export default router;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
