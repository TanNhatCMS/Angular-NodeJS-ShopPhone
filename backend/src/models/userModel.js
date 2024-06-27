const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    city: {type: String},
    district: {type: String},
    ward: {type: String},
    street: {type: String}
});

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    fullName: {type: String},
    avatar: {type: String}, // URL của ảnh đại diện
    phoneNumber: {type: String, unique: true},
    address: {
        city: {type: String},
        district: {type: String},
        ward: {type: String},
        street: {type: String}
    },
    role: {type: String, enum: ['admin', 'user'], required: true}
}, {timestamps: true, versionKey: false });

class UserModel {
    constructor() {
        this.model = mongoose.model('User', UserSchema);
    }

    async createUser(data) {
        const user = new this.model(data);
        return await user.save();
    }

    async getUserById(id) {
        return await this.model.findById(id).lean().exec();
    }

    async getUserByUsername(username) {
        return await this.model.findOne({username}).lean().exec();
    }

    async updateUser(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {new: true}).exec();
    }

    async deleteUser(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getAllUsers() {
        return await this.model.find().lean().exec();
    }
}

module.exports = new UserModel();

