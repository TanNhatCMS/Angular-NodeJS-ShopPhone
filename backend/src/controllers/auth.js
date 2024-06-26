const APIError = require('../utils/error');
const {generateAccessToken, generateRefreshToken, verifyRefreshToken} = require('../utils/jwt');
const {
    dataInMemory: frozenData,
    getUserPayload,
    isValidNumberInRange,
    findUserWithUsernameAndId,
} = require('../utils/util');
const {thirtyDaysInMints: maxTokenExpireTime} = require('../constants');

const controller = {};
const MongoDB = require("../db/MongoDB");
const db = new MongoDB();

// login user by username and password
controller.loginByUsernamePassword = async (req, res, next) => {
    const {username, password, expiresInMins = 60} = req.body;
    if (!isValidNumberInRange(expiresInMins, 1, maxTokenExpireTime)) {
        throw new APIError(`maximum token expire time can be ${maxTokenExpireTime} minutes`);
    }
    await db.fetchAll('users', async (err, result) => {
      let users = [];
      if (err) {
        throw new APIError(`Failed to fetch Users`, 500);
      }
      users = result;

      users = users.find(u => {
        const validUsername = (u.username.toLowerCase() === username.toLowerCase());
        const validPassword = (u.password === password);
        return validUsername && validPassword;
      });
      if (!users) {
        throw new APIError(`Invalid credentials`, 400);
      }
      const payload = getUserPayload(users);
      try {
        const token = await generateAccessToken(payload, expiresInMins);
        const refreshToken = await generateRefreshToken(payload, maxTokenExpireTime);
        res.status(200).json({
          ...payload,
          token,
          refreshToken,
          message: '',
          success: true,
          status: 200,
        });
      } catch (err) {
        next(err);
        throw new APIError(err.message, 400);
      }
    });
};

// get new refresh token
controller.getNewRefreshToken = async data => {
    const {refreshToken, expiresInMins = 60} = data;

    if (!isValidNumberInRange(expiresInMins, 1, maxTokenExpireTime)) {
        throw new APIError(`maximum token expire time can be ${maxTokenExpireTime} minutes`);
    }

    if (!refreshToken) {
        throw new APIError(`Refresh token required`, 401);
    }

    let user;

    try {
        const decoded = await verifyRefreshToken(refreshToken);
        user = findUserWithUsernameAndId(decoded);
    } catch (error) {
        throw new APIError(`Invalid refresh token`, 403);
    }

    if (!user) {
        throw new APIError(`Refresh token expired`, 403);
    }

    const payload = getUserPayload(user);

    const newAccessToken = await generateAccessToken(payload);
    const newRefreshToken = await generateRefreshToken(payload, maxTokenExpireTime);

    return {token: newAccessToken, refreshToken: newRefreshToken};
};

module.exports = controller;
