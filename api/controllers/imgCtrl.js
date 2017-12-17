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
  const { id, filename } = req.params;
  const image = await db.collection('images.files').findOne({ filename });
  if (!image) { res.status(404).end(); return; }
  const Image = await pImage;
  res.set('Content-Type', image.contentType);
  Image.readById(id).pipe(res);
}

module.exports = asyncHandleAll({
  getImage,
});
