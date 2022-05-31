const gcp = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, '../named-reporter-343719-27d37cb51a8e.json');

const { Storage } = gcp;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'named-reporter-343719 ',
});

module.exports = storage;
