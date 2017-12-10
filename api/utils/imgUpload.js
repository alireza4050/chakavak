// const util = require('util');
const path = require('path');
const crypto = require('mz/crypto');
const mime = require('mime');
const debug = require('debug')('chakavak:upload');
const multer = require('multer');
// const mongoose = require('mongoose');
// const { config } = require('../config');

const storage = require('multer-gridfs-storage')({
  db: global.conn.then(conn => conn.db),
  // url: config.dbUrl,
  file: async (req, file) => {
    const ext = path.extname(file.originalname);
    debug(file);
    if (!(file.mimetype === mime.getType(ext) && /^image\/.*/.test(file.mimetype))) { throw new Error('Invalid image mime type or extension'); }
    return {
      filename: (await crypto.randomBytes(16)).toString('hex') + ext,
      bucketName: 'images',
    };
  },
});

module.exports = multer({
  storage,
  limits: {
    fieldNameSize: 20,
    fields: 3,
    fieldSize: 810,
    fileSize: 1024 * 1024,
  },
}).single('image');
