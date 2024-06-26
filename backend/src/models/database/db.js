const JsonDB = require('./JsonDB');
const MongoDB = require('./MongoDB');



const dbType = process.env.DB_TYPE || 'json';

let db;

switch (dbType) {
    case 'mongodb':
        db = new MongoDB();
        break;
    case 'json':
    default:
        db = new JsonDB();
        break;
}

module.exports = db;
