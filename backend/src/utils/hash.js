const CryptoJS = require('crypto-js');

const md5 = (data) => CryptoJS.MD5(data).toString();
const sha256 = (data) => CryptoJS.SHA256(data).toString();

module.exports = {
	md5,
	sha256,
};
