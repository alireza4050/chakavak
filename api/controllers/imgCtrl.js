const mongoose = require('mongoose');
const mongooseGridfs = require('mongoose-gridfs');
const { asyncHandleAll } = require('../utils/asyncHandler');

const pImage = (async () => {
  const gfs = mongooseGridfs({
    collection: 'images',
    model: 'Image',
    mongooseConnection: await global.conn,
  });
  return gfs.model;
})();

const db = mongoose.connection;

async function getImage(req, res) {
  const { filename } = req.params;
  const image = await db.collection('images.files').findOne({ filename });
  res.set('Content-Type', image.contentType);
  const { _id: id } = image;
  const Image = await pImage;
  Image.readById(id).pipe(res);
}

module.exports = asyncHandleAll({
  getImage,
});
