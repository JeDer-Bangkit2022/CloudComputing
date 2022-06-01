const util = require('util')
const gs = require('../config')
const bucket = gs.bucket('test-bucket-for-new-model')

const { format } = util

const uploadImage = (file, userId) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, "_"));
  blob.name = `${userId}_${blob.name}`;
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)

});

module.exports = uploadImage
