const {Schema, model} = require('mongoose');
const {handleSaveError, addUpdateSettings} = require('./hooks');

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
    email: {
        type: String,
        match: emailRegExp,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Set password for user"]
    },
    fullName: {
        type: String,
        required: [true, "Set FullName for user"],
    },
    avatar: {
        type: String
    }, // URL của ảnh đại diện
    phoneNumber: {
        type: String,
        unique: true
    },
    address: {
        city: {
            type: String
        },
        district: {
            type: String
        },
        ward: {
            type: String
        },
        street: {
            type: String
        }
    },
    verify: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user",
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", addUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
