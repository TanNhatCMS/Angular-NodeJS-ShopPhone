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
            status: "success",
            message: `User ${username} created successfully`,
            data: {item:user},
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data:{item:{}}
        });
    }
};

// Get all users
UserController.GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.status(200).json({
            status: "success",
            message: '',
            data: {items:users},
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data:{items:[]}
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
                status: "error",
                message: `User with ID ${id} not found`,
            });
        }

        res.status(200).json(
            {
                status: "success",
                message: `User with ID ${id} retrieved successfully`,
                data:{item:user}
            }
        );
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data:{item:{}}
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
                status: "error",
                message: `User with username ${username} not found`,
                data:{item:{}}
            });
        }
        res.status(200).json({
            status: "success",
            message: `User with username ${username} retrieved successfully`,
            data:{item:user},
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data:{item:{}}
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
                status: "error",
                message: `User with ID ${id} not found`,
                data:{item:{}}
            });
        }
        res.status(200).json({
            status: "success",
            message: `User with ID ${id} updated successfully`,
            data:{item: updatedUser},
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
