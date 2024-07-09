const constants = {};
constants.REQUIRED_ENV_VARIABLES = ['JWT_SECRET'];
constants.OPTIONAL_ENV_VARIABLES = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
];
constants.requestWhitelist = ['/favicon.ico', '/static', '/public', '/fav.png'];
constants.thirtyDaysInMints = 30 * 24 * 60;
module.exports = constants;
