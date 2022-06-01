'use strict';
const gs = require('../config')
const bucket = gs.bucket('test-bucket-for-new-model')

const getResult = async () => new Promise((resolve, reject) => {
  setTimeout(function(){
    let buf = ''
    bucket.file('result.json')
      .createReadStream()
      .on('data', d => (buf += d))
      .on('end', () => resolve(JSON.parse(buf)))
      .on('error', e => reject(e))
  }, 5000)
});

module.exports = getResult;