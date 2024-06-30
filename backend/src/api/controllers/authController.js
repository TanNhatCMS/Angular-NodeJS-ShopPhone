const {apiError, HttpError} = require('../helpers');
const {ctrlWrapper} = require('../decorators');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const {v4: uuid} = require('uuid');
const {handlerResponse} = require('../middleware/handler');

const avatarPath = path.resolve("public", "avatars");

const {JWT_SECRET, BASE_URL} = process.env;

const signUp = async (req, res) => {
    const {fullName, email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw apiError(
            409,
            "Email In Use: The provided email address is already associated with an existing account. If you already have an account, please log in.",
            null,
            true
        );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, {s: "200", r: "pg", d: "mm"});
    //const verificationToken = uuid();
    // console.log("verification code", verificationToken);
    const newUser = await User.create({
        fullName,
        email,
        password: hashPassword,
        avatarURL,
        verify: true,
        // verificationToken,
    });

    // const verifyEmail = {
    //   to: email,
    //   subject: "Action Required: Verify Your Email",
    //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
    // };

    //await sendEmail(verifyEmail);
    handlerResponse(
        res,
        201,
        "Congratulations! Your registration was successful. You can now sign in with your new account.",
        {
            user: {
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
                avatarURL: newUser.avatarURL || '',
                //verificationToken,
            }
        });
};

const signIn = async (req, res) => {
    const {password, email} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        throw apiError(
            401,
            "Authentication Failed: Incorrect login or password. Please double-check your credentials and try again.",
            null,
            true
        );
    }

    if (!user.verify) {
        throw apiError(
            401,
            "Email Not Verified: Please verify your email to access this resource. Check your inbox for instructions on how to complete the verification process.",
            null,
            true
        );
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw apiError(
            401,
            "Authentication Failed: Incorrect login or password. Please double-check your credentials and try again",
            null,
            true
        );
    }

    const {_id: id} = user;
    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    console.log(token);
    await User.findByIdAndUpdate(id, {token});
    handlerResponse(
        res,
        200,
        "Login Successful: You have been successfully logged in.",
        {
            user: {
                id: id,
                email: user.email,
                fullName: user.fullName,
                avatarURL: user.avatarURL || '',
            }
        },
        {token: token}
    );
};

const logOut = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    handlerResponse(
        res,
        200,
        "Logout Successful: You have been successfully logged out."
    );

};
//todo
const updateSubscription = async (req, res) => {
    const {subscription} = req.body;
    const {_id: owner} = req.user;
    const updatedUser = await User.findOneAndUpdate(
        owner,
        {subscription},
        {new: true}
    );

    if (!updatedUser) {
        throw apiError(
            401,
            "Authentication Failed: User not found or incorrect login. Please verify your credentials and try again."
        );
    }

    res.json(updatedUser);
};

const getCurrent = async (req, res) => {
    const {email, _id, fullName, role, verify, address, avatar, phoneNumber} = req.user;

    handlerResponse(
        res,
        200,
        'Current User Data',
       {
        user: {
            id: _id,
            email: email,
            fullName: fullName,
            avatar: avatar || '',
            address: [
                {city: address.city || ''},
                {district: address.district || ''},
                {ward: address.ward || ''},
                {street: address.street || ''}
            ],
            role: role,
            phoneNumber: phoneNumber || '',
            verify: verify || false,
        },
    });
};
//todo
const updateAvatar = async (req, res) => {
    const {user} = req;
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(avatarPath, filename);

    await Jimp.read(oldPath).then((image) =>
        image.resize(256, 256).writeAsync(newPath)
    );

    await fs.unlink(oldPath);

    const avatar = path.join("avatars", filename);

    await User.findByIdAndUpdate(user._id, {avatarURL: avatar});

    res.json({
        avatarURL: avatar,
    });
};
//todo
const verify = async (req, res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if (!user) {
        throw HttpError(
            400,
            "Verification Issue: The provided email was not found or has already been verified."
        );
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });
    res.json({
        message:
            "Email Verification Successful: Your email has been successfully verified. You can now access and enjoy our services. Thank you for confirming your email!",
    });
};
//todo
const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(
            404,
            "User Not Found: The provided email address could not be found in our records. Please make sure you've entered the correct email or consider registering for an account."
        );
    }
    if (user.verify) {
        throw HttpError(
            400,
            "Email Already Verified: This email address has already been verified."
        );
    }

    const verifyEmail = {
        to: email,
        subject: "Action Required: Verify Your Email",
        html: `<a target="_blank" href="http://${BASE_URL}/api/auth/${verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message:
            "Verification Email Sent: An email with instructions to verify your email has been successfully sent. Please check your inbox and follow the provided instructions. If you don't receive the email, please check your spam folder or contact our support team for assistance.",
    });
};

module.exports = {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    getCurrent: ctrlWrapper(getCurrent),
    logOut: ctrlWrapper(logOut),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
