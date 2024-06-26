const httpCodes = require('./httpCodes');

const constants = {};

constants.REQUIRED_ENV_VARIABLES = ['JWT_SECRET'];
constants.OPTIONAL_ENV_VARIABLES = [
  'FRONTEND_URL',
  'MONGODB_URI',
  'MONGODB_DB_NAME',
];

constants.requestWhitelist = ['/favicon.ico', '/static', '/public', '/fav.png'];

constants.httpCodes = httpCodes;

constants.imageMimeTypes = {
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
};

constants.allowedImageTypes = Object.keys(constants.imageMimeTypes);

constants.thirtyDaysInMints = 30 * 24 * 60;

module.exports = constants;
