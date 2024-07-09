
const {
  REQUIRED_ENV_VARIABLES,
  OPTIONAL_ENV_VARIABLES,
} = require('../constants');
const utils = {};
utils.isDev = process.env.NODE_ENV !== 'production';
utils.getObjectSubset = function(obj, keys) {
  return Object.assign({}, ...keys.map(key => ({ [key]: obj[key] })));
};
utils.getMultiObjectSubset = function(arr, keys) {
  return arr.map(p => utils.getObjectSubset(p, keys));
};
utils.isNumber = num => !Number.isNaN(Number(num));
utils.validateEnvVar = () => {
  const requiredUnsetEnv = REQUIRED_ENV_VARIABLES.filter(
    env => !(typeof process.env[env] !== 'undefined'),
  );
  if (requiredUnsetEnv.length) {
    throw new Error(
      `Required ENV variables are not set: [${requiredUnsetEnv.join(', ')}]`,
    );
  }
  const optionalUnsetEnv = OPTIONAL_ENV_VARIABLES.filter(
    env => !(typeof process.env[env] !== 'undefined'),
  );
  if (optionalUnsetEnv.length) {
    console.warn(
      `Optional ENV variables are not set: [${optionalUnsetEnv.join(', ')}]`,
    );
  }
};

utils.trueTypeOf = obj => {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
};


utils.deepCopy = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const copy = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach(key => {
    copy[key] = utils.deepCopy(obj[key]);
  });
  return copy;
};

utils.getNestedValue = (obj, keys) => {
  return keys.split('.').reduce((o, k) => (o || {})[k], obj);
};

utils.limitArray = (arr, limit) => {
  return limit === 0 || limit > arr.length ? arr : arr.slice(0, limit);
};

utils.sortArray = (arr, sortBy, order) => {
  const arrCopy = utils.deepCopy(arr);

  return arrCopy.sort((a, b) => {
    if (a[sortBy] === b[sortBy]) return 0;
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });
};

utils.capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

utils.isValidNumberInRange = (num, start, end) => {
  const parsedNum = Number(num);
  return !Number.isNaN(parsedNum) && parsedNum >= start && parsedNum <= end;
};

utils.getRandomFromArray = array => {
  return array[Math.floor(Math.random() * array.length)];
};

utils.capitalizeWords = str => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

utils.setHeader =(cb) =>{
  cb.header("Access-Control-Allow-Origin", "*");
  cb.header("Content-Type", "application/json");
}
module.exports = utils;
