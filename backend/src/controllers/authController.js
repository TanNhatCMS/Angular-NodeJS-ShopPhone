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

const {JWT_SECRET} = process.env;

const signUp = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw apiError(
            409,
            "Email đang sử dụng: Địa chỉ email được cung cấp đã được liên kết với một tài khoản hiện có. Nếu bạn đã có tài khoản, vui lòng đăng nhập.",
            null,
            true
        );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, {s: "200", r: "pg", d: "mm"});
    //const verificationToken = uuid();
    // console.log("verification code", verificationToken);
    const newUser = await User.create({
        name,
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
        "Chúc mừng! Đăng ký của bạn đã thành công. Bây giờ bạn có thể đăng nhập bằng tài khoản mới của mình.",
        {
            user: {
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar || '',
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
            "Xác thực không thành công: Đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra kỹ thông tin đăng nhập của bạn và thử lại.",
            null,
            true
        );
    }

    if (!user.verify) {
        throw apiError(
            401,
            "Email chưa được xác minh: Vui lòng xác minh email của bạn để truy cập tài nguyên này. Kiểm tra hộp thư đến của bạn để biết hướng dẫn về cách hoàn tất quy trình xác minh.",
            null,
            true
        );
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw apiError(
            401,
            "Xác thực không thành công: Đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra kỹ thông tin đăng nhập của bạn và thử lại",
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
        "Đăng nhập thành công: Bạn đã đăng nhập thành công.",
        {
            user: {
                id: id,
                email: user.email,
                fullName: user.fullName,
                avatarURL: user.avatarURL || '',
            },
            token: token
        },
    );
};

const logOut = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    handlerResponse(
        res,
        200,
        "Đăng xuất thành công: Bạn đã đăng xuất thành công."
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
            "Xác thực không thành công: Không tìm thấy người dùng hoặc đăng nhập không chính xác. Vui lòng xác minh thông tin đăng nhập của bạn và thử lại."
        );
    }

    res.json(updatedUser);
};

const getCurrent = async (req, res) => {
    const {email, _id, fullName, role, verify, address, avatar, phoneNumber} = req.user;

    handlerResponse(
        res,
        200,
        'Dữ liệu người dùng hiện tại',
       {
        user: {
            id: _id,
            email: email,
            fullName: fullName,
            avatar: avatar || '',
            address: {
                city: address.city || '',
                district: address.district || '',
                ward: address.ward || '',
                street: address.street || '',
            },
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
// const verify = async (req, res) => {
//     const {verificationToken} = req.params;
//     const user = await User.findOne({verificationToken});
//     if (!user) {
//         throw HttpError(
//             400,
//             "Vấn đề xác minh: Không tìm thấy email được cung cấp hoặc đã được xác minh."
//         );
//     }
//
//     await User.findByIdAndUpdate({ _id: user._id }, {
//         verify: true,
//         verificationToken: "",
//     });
//     res.json({
//         message:
//             "Email Verification Successful: Your email has been successfully verified. You can now access and enjoy our services. Thank you for confirming your email!",
//     });
// };
//todo
// const resendVerifyEmail = async (req, res) => {
//     const {email} = req.body;
//     const user = await User.findOne({email});
//     if (!user) {
//         throw HttpError(
//             404,
//             "User Not Found: The provided email address could not be found in our records. Please make sure you've entered the correct email or consider registering for an account."
//         );
//     }
//     if (user.verify) {
//         throw HttpError(
//             400,
//             "Email Already Verified: This email address has already been verified."
//         );
//     }
//
//     const verifyEmail = {
//         to: email,
//         subject: "Action Required: Verify Your Email",
//         html: `<a target="_blank" href="http://${BASE_URL}/api/auth/${verificationToken}">Click to verify email</a>`,
//     };
//
//     await sendEmail(verifyEmail);
//
//     res.json({
//         message:
//             "Verification Email Sent: An email with instructions to verify your email has been successfully sent. Please check your inbox and follow the provided instructions. If you don't receive the email, please check your spam folder or contact our support team for assistance.",
//     });
// };

module.exports = {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    getCurrent: ctrlWrapper(getCurrent),
    logOut: ctrlWrapper(logOut),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
   // verify: ctrlWrapper(verify),
    //resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
