const multer = require('multer');

const { AppError } = require('./appError');

const storage = multer.memoryStorage();

const multerFileFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith('image')) {
    callback(new AppError(400, 'must provide an image as a file'));
  } else {
    callback(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter: multerFileFilter
});

module.exports = { upload };
