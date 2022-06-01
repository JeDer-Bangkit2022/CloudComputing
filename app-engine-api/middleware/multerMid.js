const multer = require('multer');

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 1.5 * 1024 * 1024,
    } 
  }).single('image');

module.exports =multerMid;