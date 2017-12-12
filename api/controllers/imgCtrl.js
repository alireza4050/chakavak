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
  const { id } = req.params;
  const image = await db.collection('images.files').findOne({ id });
  res.set('Content-Type', image.contentType);
  const Image = await pImage;
  Image.readById(id).pipe(res);
}

module.exports = asyncHandleAll({
  getImage,
});
