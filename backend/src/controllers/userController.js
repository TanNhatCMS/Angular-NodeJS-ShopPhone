const UserModel = require('../models/userModel');
const UserController = {};
const {verifyInput, verifyOutput} = require('../helpers/helpersMongoDB');
// Create a new user
UserController.CreateUser = async (req, res) => {
    try {
        const { username, password, email, fullName, avatar, phoneNumber, address, role } = req.body;
        const newUser = {
            username,
            password,
            email,
            fullName,
            avatar,
            phoneNumber,
            address,
            role
        };

        const user = await UserModel.createUser(newUser);
        res.status(201).json({
            payload: user,
            message: `User ${username} created successfully`,
            status: 201,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Get all users
UserController.GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();

        res.status(200).json({
            payload: verifyOutput(users),
            message: 'Users retrieved successfully',
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Get user by ID
UserController.GetUserByID = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: `User with ID ${id} not found`,
                status: 404,
                success: false
            });
        }

        res.status(200).json(
            {
                payload: verifyOutput(user),
                message: `User with ID ${id} retrieved successfully`,
                status: 200,
                success: true
            }
        );
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Get user by username
UserController.GetUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await UserModel.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                message: `User with username ${username} not found`,
                status: 404,
                success: false
            });
        }
        res.status(200).json({
            payload: verifyOutput(user),
            message: `User with username ${username} retrieved successfully`,
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Update a user
UserController.UpdateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.updateUser(id, req.body);

        if (!updatedUser) {
            return res.status(404).json({
                message: `User with ID ${id} not found`,
                status: 404,
                success: false
            });
        }

        res.status(200).json({
            payload: verifyOutput(updatedUser),
            message: `User with ID ${id} updated successfully`,
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Delete a user
UserController.DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: `User with ID ${id} not found`,
                status: 404,
                success: false
            });
        }

        res.status(200).json({
            message: `User with ID ${id} deleted successfully`,
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

module.exports = UserController;
